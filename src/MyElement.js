import { LitElement, html, property } from '@polymer/lit-element'

class MyElement extends LitElement {
    @property()
    mood = 'happy'

    // static get properties() {
    //   return {
    //     mood: {type: String}
    //   };
    // }

    handleButtonClick() {
        console.log('button clicked!')
    }

    render() {
        console.log('render()')
        return html`<style> .mood { color: green; } </style>
      <button @click=${e => {
          this.handleButtonClick()
      }}>click me</button>
      Web Components are <span class="mood">${this.mood}</span>!`
    }
}

customElements.define('my-element', MyElement)
