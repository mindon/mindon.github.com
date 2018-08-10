import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'

class AmBanner extends LitElement {
    static get properties() {
        return {
            home: String,
        }
    }

    _render({ home }) {
        return html`<style>
:host{display:block;margin-bottom:1em; border-bottom: thin solid #eee}
a {text-decoration:none; color:#000}
slot[name=nav] {text-transform: uppercase; font-size:1.2em}
::slotted(h1) {margin:4px 0}
div.slogan {font-size:1.1em; color:#333}
</style>
<div>
        <div class="title"><a href="${home}"><slot name="title"></slot></a></div>
        <div class="slogan"><slot name="slogan"></slot></div>
        <div><slot name="nav"></slot></div>
</div>`;
    }
}

customElements.define('am-banner', AmBanner);