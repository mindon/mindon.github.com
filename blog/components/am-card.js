import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'

class AmCard extends LitElement {
    static get properties() {
        return {
            topic: String,
            links: String,
            target: String,
            itemStyle: String,
        }
    }

    _link(item, target) {
        return item.inline ? html`${ item.inline.map(i=>this._link(i, target)) }`:
                html`${item.prefix ? item.prefix : ''}<a
                 href="${item.href}"
                 target="${target ? target :'_blank'}"
                 title="${item.title}">${item.text}</a>`
    }

    _render({ topic, links, target, itemStyle }) {
        let lnk = links ? JSON.parse(unescape(links)): null;
        return html`<style>
:host{display: block; border-bottom: thin solid #eee; margin: 0 .5em 1em .5em; padding: .2em 0;}
::slotted(a) {text-decoration: none; color:#333}
h2.topic {font-size: 1.6em; color:#666; margin:0 0 4px 0}
::slotted(.info) {font-size: 11px;color:#666}
ul {list-style:none;margin:0;padding:0}
li ul {margin-left:4px; margin-bottom:6px}
li b {margin-top:4px;display:block;font-size:.8em; color:#999}
li b::before {content:'❛ '; color:#d63}
li.article::before {content:'❜ '; color:#d63}
a {color:#333}
a:hover {color:#0181eb}
</style><div><slot name="prefix"></slot>
${ topic ? html`<h2 class="topic">${topic}</div>` : ''}
<slot></slot>
${ lnk ? html`<ul>${
    lnk.map(item => html`<li class$="${itemStyle}">
        ${item.links ? html`<b>${item.topic || ''}</b><ul>${
            item.links.map(j=>html`<li>${this._link(j)}</li>`)
        }</ul>` : html`${this._link(item, target)}`}</li>`)
    }</ul>`: '' }
</div>`;
    }
}

customElements.define('am-card', AmCard);