// import { LitElement, html, property } from '@polymer/lit-element'
import { LitElement, html } from '@polymer/lit-element'
import { property } from './decorators'

class MyElement extends LitElement {
    @property()
    mood = 'happy'

    handleButtonClick() {
        console.log('button clicked!')
    }

    render() {
        return html`<style> .mood { color: green; } </style>
      Web Components are <span class="mood">${this.mood}</span>!<br>
      <button @click=${e => {
          this.handleButtonClick()
      }}>click me</button>`
    }
}

customElements.define('my-element', MyElement)
