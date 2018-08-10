import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'

class AmPaging extends LitElement {
    static get properties() {
        return {
            query: String, // with %d as page number placeholder
            max: Number,
            current: Number,
        }
    }

    _render({ query, max, current }) {
        if (!query) return '';
        let n = 3, x = Math.min(max, 2 * 3 + 1), from = 0, to = 0;
        let pageBar = max > 1 ? Array.apply(null, Array(x)).map((_, i) => {
            let pn = max <= 7 ? max - i : (max + current + x - i - n - 1) % max;
            if (pn == 0) pn = max;
            if (i == 0) from = pn; else if (i == x - 1) to = pn;
            return html`<a class$="${pn == current ? 'actived' : 'c' + i}"
href="${query.replace('%d', pn)}">${pn}</a>`
        }) : '';
        return html`<style>
:host {display:block;color:#ddd}
a {font-size: 14px; width:3em; line-height:2em; text-align:center; display:inline-block;margin:0 1px; background:#eee; color:#09d; text-decoration:none}
a.direct {padding:2px 4px; background:#fff; font-size: 12px; width:auto}
a.c2, a.c4 {background:#e6e6e6}
a.c0, a.c6 {background:#f2f2f2}
div.simple a {background: #f2f2f2}
a.actived {background:transparent !important; width:auto; padding:2px 4px; pointer-events:none; color:#d63}
</style>
<div class$="${max <= 7 ? "simple" : ""}">
${pageBar}
${to < from && (from != max || to != 1) ? ' …':'' }
${to < from && from != max ? html`<a class="direct latest" href="${query.replace('%d', max)}">Latest</a>` : ''}
${to < from && to != 1 ? html`<a class="direct oldest" href="${query.replace('%d', '1')}">First</a>` : ''}
</div>`
    }
}

customElements.define('am-paging', AmPaging);