import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'
import './am-tags.js'

class AmArticle extends LitElement {
    static get properties() {
        return {
            slug: String,
            time: String,
            tags: String,
            content: String,
        }
    }

    _render({ slug, time, tags, content }) {
        let dcc = navigator.userAgent.indexOf(" Chrome/") > 0 ?
             html`<style>
div.meta ::slotted(.next)::before {content:'❛ ';color:#333;margin-left:1em}
div.meta ::slotted(.next)::after {content:' ❯ ';color:#d63}
div.meta ::slotted(.prev)::before {content:' ❮ ';color:#d63;margin-left:1em}
div.meta ::slotted(.prev)::after {content:' ❜';color:#333}
</style>` :
             html`<style>
slot[name=next]::before {content:'❛';color:#333;margin-left:1em;margin-right:4px}
slot[name=next]::after {content:'❯ ';color:#d63;margin-left:4px;}
slot[name=prev]::before {content:'❮ ';color:#d63;margin-left:1em;margin-right:4px}
slot[name=prev]::after {content:'❜';color:#333;margin-left:4px}
</style>`;
        return html`<style>
:host{display:block;margin-bottom: 2em}
div.meta {color:#999;}
.flex {display:-webkit-box;display:-ms-flexbox;display: flex;flex-direction:row;flex-wrap:wrap}
img {max-width:100%}
::slotted(h1){display:inline-block}
slot[name=title]::before {font-size:2em;content:'❜'; color: #d63; margin-right:4px;}
div.body {
  padding-bottom: 1em;
  border-bottom: thin solid #eee;
  max-width:100%; overflow-x:hidden;
}
div.meta ::slotted(.next), div.meta ::slotted(.prev){
    text-decoration: none;
    color: #09d;
}
</style>${dcc}<div>
<div><slot name="title"></slot></div>
<div class="meta">POSTED IN <am-tags query="/blog/tags/%s" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags><i>${time}</i></div>
<div class="body"><slot name="content"></slot></div>
<div class="meta flex">
<div>POSTED IN <am-tags query="/blog/tags/%s" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags><i>${time}</i> &nbsp; </div>
<div class="flex"><slot name="next" title="Newer Post"></slot><slot name="prev" title="Older Post"></slot></div>
</div>
</div>
`;
    }
}

customElements.define('am-article', AmArticle);