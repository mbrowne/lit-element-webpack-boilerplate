// lit-element's @property decorator, upgraded for Babel 7 and current decorators proposal
export function property(options) {
    return elementDescriptor => {
        const name = elementDescriptor.key
        // key generation code copied from https://github.com/Polymer/lit-element/blob/master/src/lib/updating-element.ts
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`
        return {
            // We are creating an own property and using the original initializer, but changing the key,
            // so foo becomes __foo. The getter and setter methods are created by createProperty().
            ...elementDescriptor,
            key,
            finisher(clazz) {
                clazz.createProperty(name, options)
            }
        }
    }
}

// finisher(clazz) {
//     const proto = clazz.prototype
//     const tmp = { prototype: proto }
//     if (!proto._classProperties) {
//         UpdatingElement.createProperty.call(tmp, name, options)
//         proto._classProperties = tmp._classProperties
//     }
//     proto._classProperties.set(name, options)
// }

// export function property(options) {
//     return elementDescriptor => ({
//         ...elementDescriptor,
//         // TEMP WORKAROUND - rename instance field
//         key: '__' + elementDescriptor.key,
//         finisher(clazz) {
//             clazz.createProperty(elementDescriptor.key, options)
//         }
//     })
// }
