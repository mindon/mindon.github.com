import { LitElement, html } from '@polymer/lit-element'

class AmList extends LitElement {
    static get properties() {
        return {
            topic: String,
        }
    }

    _render({ topic }) {
        return html`<style>
:host{display:block; border: solid thin #eee; border-width: thin 0; padding: 1em 0;}
</style>
${ topic ? html`<style>
div.topic {font-size: 2em; color:#666;}
</style><div class="topic">${topic}</div>` : ''}
<div><slot></slot></div>`;
    }
}

customElements.define('am-list', AmList);