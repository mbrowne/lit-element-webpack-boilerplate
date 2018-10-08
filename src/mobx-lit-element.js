// Adapted from https://github.com/mobxjs/mobx-react/blob/master/src/observer.js

import { Reaction, _allowStateChanges, $mobx } from 'mobx'
import { LitElement } from '@polymer/lit-element'

const mobxAdminProperty = $mobx || '$mobx'

/**
 * dev tool support
 */
let isDevtoolsEnabled = false

// const skipRenderKey = Symbol('skipRender')
// const isRequestingUpdateKey = Symbol('isRequestingUpdate')

export function observer({ kind, elements }) {
    if (kind !== 'class') {
        throw Error(
            '@observer decorator can only be used on classes, not individual properties and methods'
        )
    }

    const renderMethodDescriptor = elements.find(el => el.key === 'render')
    if (!renderMethodDescriptor) {
        throw Error(
            "Can't apply @observer() decorator: render method is missing"
        )
    }
    const { descriptor } = renderMethodDescriptor
    const baseRender = descriptor.value
    descriptor.value = function() {
        return makeComponentReactive.call(this, baseRender)
    }

    // Add
    // static isMobXLitElementObserver = true
    elements.push({
        key: 'isMobXLitElementObserver',
        initializer: () => true,
        kind: 'field',
        placement: 'static',
        descriptor: {
            configurable: true,
            enumerable: false,
            writable: false
        }
    })

    return {
        kind,
        elements
    }

    // makeObservableProp(target, 'props')
    // makeObservableProp(target, 'state')
    // return componentClass
}

function makeComponentReactive(render) {
    // @TODO when lit-element has server-side rendering, just return
    // `render.call(this)` when rendering on the server
    function reactiveRender() {
        isRenderingPending = false
        let exception = undefined
        let rendering = undefined
        reaction.track(() => {
            if (isDevtoolsEnabled) {
                this.__$mobRenderStart = Date.now()
            }
            try {
                rendering = _allowStateChanges(false, baseRender)
            } catch (e) {
                exception = e
            }
            if (isDevtoolsEnabled) {
                this.__$mobRenderEnd = Date.now()
            }
        })
        if (exception) {
            // @TODO
            // errorsReporter.emit(exception)
            throw exception
        }
        return rendering
    }

    // Generate friendly name for debugging
    const initialName =
        this.displayName ||
        this.name ||
        (this.constructor &&
            (this.constructor.displayName || this.constructor.name)) ||
        '<component>'
    // @TODO
    // const rootNodeID =

    // wire up reactive render
    const baseRender = render.bind(this)
    let isRenderingPending = false

    const reaction = new Reaction(
        `${initialName}.render()`,
        // `${initialName}#${rootNodeID}.render()`,
        () => {
            if (!isRenderingPending) {
                isRenderingPending = true
                if (typeof this.willReact === 'function') this.willReact() // TODO: wrap in action?
                if (this.__$mobxIsUnmounted !== true) {
                    let hasError = true
                    try {
                        // setHiddenProp(this, isRequestingUpdateKey, true)
                        LitElement.prototype.requestUpdate.call(this)
                        hasError = false
                    } finally {
                        // setHiddenProp(this, isRequestingUpdateKey, false)
                        if (hasError) reaction.dispose()
                    }
                }
            }
        }
    )
    // reaction.litElement = this
    reactiveRender[mobxAdminProperty] = reaction
    this.render = reactiveRender
    return reactiveRender.call(this)
}

// /**
//  * Helper to set `prop` to `this` as non-enumerable (hidden prop)
//  * @param target
//  * @param prop
//  * @param value
//  */
// function setHiddenProp(target, prop, value) {
//     if (!Object.hasOwnProperty.call(target, prop)) {
//         Object.defineProperty(target, prop, {
//             enumerable: false,
//             configurable: true,
//             writable: true,
//             value
//         })
//     } else {
//         target[prop] = value
//     }
// }
