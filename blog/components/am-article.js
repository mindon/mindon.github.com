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
        return html`<style>
:host{display:block;margin-bottom: 2em;
max-width:100%;word-break:break-all;word-wrap:break-word;
}
div.meta {color:#999;}
img {max-width:100%;}
slot[name=title]::slotted(h1)::before {
  content:'❜'; color: #d63; margin-right:4px;
}
div.body {
  padding-bottom: 1em;
  border-bottom: thin solid #eee;
}
slot[name=next]::slotted(a),slot[name=prev]::slotted(a){
    text-transform: uppercase;
    text-decoration: none;
    margin-left: .5em;
    color: #09d;
}
slot[name=next]::slotted(a)::before {content:'«';color:#666}
slot[name=prev]::slotted(a)::after {content:'»';color:#666}
</style>
<div>
<div><slot name="title"></slot></div>
<div class="meta">POSTED IN <am-tags query="/blog/tags/%s" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags><i>${time}</i></div>
<div class="body"><slot name="content"></slot></div>
<div class="meta">
POSTED IN <am-tags query="/blog/tags/%s" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags><i>${time}</i>
<slot name="next"></slot><slot name="prev"></slot>
</div>
</div>
`;
    }
}

customElements.define('am-article', AmArticle);