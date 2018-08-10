import { LitElement, html } from '@polymer/lit-element'
import { repeat } from 'lit-html/lib/repeat'
import './am-tags.js'

class AmLink extends LitElement {
    static get properties() {
        return {
            time: String,
            slug: String,
            tags: String,
        }
    }

    _render({ time, slug, tags }) {
        return html`<style>
:host{display:block;padding:4px;}
i {color:#999;}
div.meta {color:#999;}
slot::before {content:'❜'; color: #d63;font-size:1.6em; margin-right:.3em;}
::slotted(a) {font-size:1.9em;text-decoration:none;color:#000}
</style>
<slot name="title"></slot><div class="meta">posted in <am-tags query="${slug}" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags> <i>${time}</i></div>`;
    }
}

customElements.define('am-link', AmLink);