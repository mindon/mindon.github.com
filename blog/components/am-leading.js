import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'

class AmLeading extends LitElement {
    static get properties() {
        return { tag: String };
    }

    _render({ tag }) {
        return html`<style>
:host {
    display: block;
    margin: .2em 0 1em 0;
}
::slotted(h1) {margin:0 0 4px 0; color:#333}
div.tag {
    color:#9bd;
    cursor: default;
}
div.tag::before {
    content: "❝";
    color: #d63;
    margin-right: 4px;
}
</style>
${tag ? html`<div class="tag">${tag}</div>` : ''}
<slot name="topic"></slot>
<slot name="content"></slot>`;
    }
}

customElements.define('am-leading', AmLeading);