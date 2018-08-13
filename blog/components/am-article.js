import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'
import './am-tags.js'

class AmArticle extends LitElement {
    static get properties() {
        return {
            slug: String,
            time: String,
            tags: String,
            nav: Object,
            tagsOn: Boolean, 
        }
    }

    _render({ slug, time, tags, nav, tagsOn }) {
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
::slotted(h1){display:inline}
::slotted(h1)::before {content:'❜'; color: #d63; margin-right:4px;}
div.body {
  padding-bottom: 1em;
  border-bottom: thin solid #eee;
  max-width:100%; overflow-x:hidden;
}
div.meta ::slotted(.next), div.meta ::slotted(.prev){
    text-decoration: none;
    color: #09d;
}
#mydock {color:#ccc;position:fixed;top:8px;right:1em;}
#mydock a {text-decoration:none;color:#d63;
text-align:center;width:2em;
display:inline-block;background:rgba(200,200,200,.2)}
#mydock a:hover {color:#0181eb}
#thumbs-up {
display:block;text-decoration:none;
width:180px;height:190px;
text-align:center;font-size:7pt;color:#ccc;
background:url(/images/thumbs-up.jpg) no-repeat center bottom;margin:1em auto}
</style>${dcc}<div>
<div id="mydock">${
!nav?html`<a class="home" href="/">❜❜❜</a>`:
html`${nav.prev?html`<a id="myprev" href$="${nav.prev.href}" title$="${nav.prev.title}">❮</a>`:'❮ '}
<a class="home" href="/" title="HOME">❛❛❛</a>
${nav.next?html`<a id="mynext" href$="${nav.next.href}" title$="${nav.next.title}">❯</a>`:' ❯'}`}
</div>
<div><slot name="title"></slot></div>
<div class="meta">POSTED IN <am-tags query="/blog/tags/%s" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags><i>${time}</i></div>
<div class="body"><slot name="content"></slot>
</div>
<div class="meta">
<div>POSTED IN <am-tags query="/blog/tags/%s" tags=${tags.substr(1, tags.length - 2).split(' ')}></am-tags><i>${time}</i> &nbsp; </div>
<p><a id="thumbs-up" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YSVEJMBLM3AFG">
click to donate $0.99 by Paypal<br/>微信扫码赞赏</a></p>
<div class="flex"><slot name="next" title="Newer Post" on-changed=${this._slotChanged}></slot><slot name="prev" title="Older Post" on-change=${this._slotChanged}></slot></div>
</div>
</div>
`;
    }

    _didRender() {
        this._slotWatching("next");
        this._slotWatching("prev");
    }

    _slotWatching(key) {
        const t = this.shadowRoot.querySelector('slot[name='+key+']');
        if(!t) return;
        t.addEventListener('slotchange', e => {
            this._slotChanged(e.target, key);
        })
    }

    _slotChanged(slot, key) {
        if(!slot || !slot.assignedNodes) return;
        let elms = slot.assignedNodes();
        let nav = this.nav || {};
        if(!elms || elms.length == 0) {
            return;
        }
        let a = elms[0];
        if(a.href) {
            nav[key] = {href:a.href, title:a.innerText.replace(/"/g, '&quot;')};
        }
        this.nav = nav;
    }
}

customElements.define('am-article', AmArticle);