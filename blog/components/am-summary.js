import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'
import './am-tags.js'

class AmSummary extends LitElement {
    static get properties() {
        return {
            href: String,
            time: String,
            slug: String,
            tags: String,
        }
    }

    _render({ href, time, slug, tags }) {
        return html`<style>
:host{display:block; margin-bottom: 2.7em;}
i {color:#999;}
a {text-decoration:none}
h2 {margin-bottom:0; font-size: 1.9em;}
div.meta {color:#999;margin-left:1.1em}
h2 ::slotted(a) {text-decoration:none;color:#000}
h2 ::slotted(a)::before {content:'❜'; color: #d63;margin-right:.3em}
a.more {background:#666; color:#fff; padding: 4px 1em; border-radius:3px 9px 9px 3px}
</style>

<h2><slot name="title"></slot></h2>
<div class="meta">posted in <am-tags query="${slug}" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags> <i>${time}</i></div>
<div><slot name="summary"></slot>
<a class="more" href="${href}">details...</a>
</div>`;
    }
}

customElements.define('am-summary', AmSummary);