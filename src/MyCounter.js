// import { LitElement, html, property } from '@polymer/lit-element'
import { LitElement, html } from '@polymer/lit-element'
import { property } from './decorators'
import { observable, autorun, action } from 'mobx'
import { observer } from './mobx-lit-element'

var person = observable(
    {
        // observable properties:
        name: 'John',
        age: 42,
        showAge: false,

        // computed property:
        get labelText() {
            return this.showAge ? `${this.name} (age: ${this.age})` : this.name
        },

        setAge(age) {
            this.age = age
        }
    },
    {
        setAge: action
    }
)

@observer
class MyCounter extends LitElement {
    @property({ type: Number })
    count = 0

    static foo = 1

    constructor() {
        super()
        // const disposer = autorun(() => {
        //     console.log('person.labelText', person.labelText)
        //     this.requestUpdate()
        // })
        // // TODO call disposer on unmount

        setTimeout(() => {
            console.log('changing model')
            person.name = 'Dave'
            // person.setAge(21)
        }, 500)
    }

    // static get properties() {
    //     return {
    //         count: { type: Number }
    //     }
    // }

    increment() {
        this.count++
    }

    decrement() {
        this.count--
    }

    render() {
        return html`
          <style>
            button, p {
              display: inline-block;
            }
          </style>
          name: ${person.name}
          <button @click="${this.decrement}" aria-label="decrement">-</button>
          <p>${this.count}</p>
          <button @click="${this.increment}" aria-label="increment">+</button>
        `
    }
}

customElements.define('my-counter', MyCounter)
