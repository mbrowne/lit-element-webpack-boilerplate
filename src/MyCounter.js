// import { LitElement, html, property } from '@polymer/lit-element'
import { LitElement, html } from '@polymer/lit-element'
import { property } from './decorators'

class MyCounter extends LitElement {
    @property({ type: Number })
    count = 0

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
          <button @click="${this.decrement}" aria-label="decrement">-</button>
          <p>${this.count}</p>
          <button @click="${this.increment}" aria-label="increment">+</button>
        `
    }
}

customElements.define('my-counter', MyCounter)
