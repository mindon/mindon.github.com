import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js'

class AmTags extends LitElement {
    static get properties() {
        return {
            query: String,
            tags: Object,
            blockStyle: Boolean,
        }
    }
    _render({ query, tags, blockStyle }) {
        if (!tags) return '';
        let arr = [];
        if(tags instanceof Array) {
            arr = tags;
        } else {
            for(var t in tags) {
                arr.push(tags[t].Name);
            }
            arr.sort((a,b)=>{let k1=a.toLowerCase(), k2=b.toLowerCase(); return tags[k1].Latest < tags[k2].Latest})
        }
        return html`<style>
:host{display: inline-block }
a.tag {
    display: block;
    text-decoration:none;
    color:#333;
    padding: 2px 4px;
}
div.block a.tag {
    margin-bottom: 2px;
}
div.block a.tag::before {
    content: '❝';
    color: #d63;
    margin-right:4px;
}
div.inline a.tag {
    display: inline-block;
    background:#f0f6f9;
    color:#39f;
    margin:0 2px;
}
a.tag i {color:#963}
</style><div class$="${blockStyle ? 'block' : 'inline'}">
${arr.map((tag) => {
    let key = tag.toLowerCase();
    return html`<a class="tag" href="${query.replace('%s', key)}">${tag}${(tags[key] && tags[key].Count ? html`<i>: ${tags[key].Count}</i>`:'')}</a>`
})}</div>`;
    }
}

customElements.define('am-tags', AmTags);