import { LitElement, html } from '../node_modules/@polymer/lit-element/lit-element.js';
import { until } from '../node_modules/lit-html/lib/until.js'
import { unsafeHTML } from '../node_modules/lit-html/lib/unsafe-html.js'

import './components/am-banner.js';
import './components/am-list.js';
import './components/am-summary.js';
import './components/am-paging.js';
import './components/am-card.js';
import './components/am-link.js';
import './components/am-article.js';
import './components/am-leading.js';

class BlogRoute extends LitElement {
    static get properties() {
        return {
            uri: String,
            active: Boolean,
            state: Object,
        }
    }

    constructor() {
        super();
        this.state = {"monthly":13,"timeline":52,"tags":{"blogms":{"Name":"BlogMS","Pages":35,"Count":308,"Latest":"2010-07-31 15:00:00 +0800"},"chinese-balance-heal":{"Name":"Chinese-Balance-Heal","Pages":1,"Count":8,"Latest":"2014-06-14 20:30:00 +0800"},"chrome-app":{"Name":"Chrome-App","Pages":2,"Count":13,"Latest":"2018-08-10 15:44:44 +0800"},"light-air-water-m-sci":{"Name":"Light-Air-Water-M-Sci","Pages":2,"Count":14,"Latest":"2014-08-23 16:18:00 +0800"},"mindon":{"Name":"Mindon","Pages":12,"Count":101,"Latest":"2018-08-10 15:44:44 +0800"},"mobile-app":{"Name":"Mobile-App","Pages":2,"Count":16,"Latest":"2014-05-02 08:17:00 +0800"},"readings":{"Name":"Readings","Pages":2,"Count":17,"Latest":"2015-05-26 22:05:49 +0800"},"web-tech":{"Name":"Web-Tech","Pages":4,"Count":36,"Latest":"2018-08-10 15:44:44 +0800"}}};
    }

    _pagebar(g) {
        let d = g.split('/'), n = 1;
        let s = this.state[d[0]];
        if (!s || s == 1) return '';

        let i = 1;
        if (d[0] == "tags") {
            s = s[d[1]].Pages;
            if (!s || s == 1) return '';
            i++;
        }
        n = d[i] ? parseInt(d[i], 10) : s;
        let timeline = d[0] == 'timeline';
        let ubase = (d[i] ? d.slice(timeline ? 1 : 0, i) : (timeline ? d.slice(1) : d)).join('/');
        ubase = '/blog/' + (ubase ? ubase + '/' : '') + '%d';
        return html`<am-paging query="${ubase}" max="${s}" current="${n}"></am-paging>`;
    }

    _shouldRender(props, changedProps, oldProps) {
        return props.active;
    }

    _render({ uri, state }) {
        let u = '', ubase = '/blog/posts/';
        let m = uri.match(/^blog\/(.*)/);
        let paging = '';
        if (m) {
            let r = {
                "article": {
                    rule: /^(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)/, goto: (m, u) => {
                        if (m) {
                            return ubase + 'article/' + m[1] + '-' + m[2] + '/' + m[3] + '-' + m[4] + '.html';
                        }
                    }
                },
                "timeline": {
                    rule: /^(\d*)$/, goto: (m, u) => {
                        let pn = m[1] || state.timeline || '1';
                        return ubase + 'timeline/' + pn + '.html';
                    }
                },
                "monthly": {
                    rule: /^(archives|monthly)\/?(\d*)/, goto: (m, u) => {
                        let pn = m[2] || state.monthly || '1';
                        return ubase + 'monthly/' + pn + '.html';
                    }
                },
                "tags": {
                    rule: /^(categories|tags)\/([^\/]+)(\/\d*)?/, goto: (m, u) => {
                        if (m) {
                            let tag = m[2].toLowerCase();
                            let n = state.tags && state.tags[tag] ? state.tags[tag].Pages : '1';
                            let pn = m[3] ? m[3].substr(1) || n : n;
                            return ubase + 'tags/' + tag + '/' + pn + '.html';
                        }
                    }
                },
                "special": {
                    rule: /^(about|note|trouble)/, goto: (m, u) => {
                        if (m) {
                            return '/blog/' + (m[1]=='trouble'?'note':m[1]) +'.html';
                        }
                    }
                },
            };
            for (let k in r) {
                let kr = r[k];
                if (kr.rule.test(m[1])) {
                    u = kr.goto(m[1].match(kr.rule), m[1]);
                    if (k != 'article') {
                        paging = u.substring(ubase.length, u.indexOf('.'));
                    }
                    break;
                }
            }
        }
        if (!u) u = '/blog/posts/timeline/' + (state.timeline || '1') + '.html';
        let leading = u.match(/\/tags\/([^\/]+)/);
        let bar = paging ? this._pagebar(paging) : '';
        window.scrollTo(0, 0);
    return html`<style>
div.sides {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;      
  flex-direction: column;
  max-width: 260px;
  margin-left: 2em;
}
#mindon-if {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;      
  flex-flow: row;
}
div.main {flex: 1}
@media screen and (max-width: 64rem) {
    #mindon-if { flex-flow: column }
    div.sides { max-width:none; margin-left: 0; flex-direction: row; flex-wrap: wrap}
}
div.copyright {border-top:thin solid #eee; padding-top: 8px; margin:2em auto; color:#666; font-size:12px; clear: both; text-align:center;}
</style>
<div id="mindon-if"><div class="main">
<am-banner home="/blog/">
    <h1 slot="title">MINDON.if 麦盾.風</h1>
    <div slot="slogan">magic inside future 探寻未知的形态</div>
    <div slot="nav" class="nav">
        <style>.nav a{color:#333}.nav a:hover{color:#0181eb}</style>
        ❯ <a href="/blog/">Home</a> |
        <a href="/blog/archives">Archives</a> | 
        <a href="/note">Note</a> | <a href="/about">About</a>
    </div>
</am-banner><div>
${ leading ? fetch('/blog/posts/tags/' + leading[1] + '.html').then(r => {
                if (r.status >= 400) return '';
                return r.text().then(v => unsafeHTML(v))
            }) : ''}
${bar}
${fetch(u).then(r => {
                if (r.status >= 400) return r.status;
                return r.text().then(v => unsafeHTML(v))
            })}
${bar}
</div>
</div>
<div class="sides">
<am-card topic="About Me">
  <a href="/blog/about"><img src="/images/mindon.png" width="128" height="128" title="Mindon Logo" /></a>
  <div class="info">麥盾，Mindon<br/>Web Engineer @10¢</div>
</am-card>
<am-card topic="Categories">
  <am-tags query="/blog/tags/%s" tags=${state.tags} blockStyle=${true}></am-tags>
</am-card>
<am-card topic="Recently Posts" links="[{%22href%22:%22/blog/2018/08/10/turn-the-blog-into-pwa%22,%22text%22:%22Turn the blog into PWA%22,%22title%22:%222018-08-10 15:44:44 +0800%22},{%22href%22:%22/blog/2015/06/25/how-to-keep-comments-in-golang-template%22,%22text%22:%22How to keep comments in golang template?%22,%22title%22:%222015-06-25 18:02:44 +0800%22},{%22href%22:%22/blog/2015/06/19/maker-faire-2015-shenzhen%22,%22text%22:%22Maker Faire 2015 ShenZhen%22,%22title%22:%222015-06-19 21:35:52 +0800%22},{%22href%22:%22/blog/2015/05/26/the-lean-startup%22,%22text%22:%22The Lean Startup%22,%22title%22:%222015-05-26 22:05:49 +0800%22},{%22href%22:%22/blog/2015/05/17/my-first-flight-with-dji-phantom-3-professional%22,%22text%22:%22My first flight with DJI Phantom 3 Professional%22,%22title%22:%222015-05-26 21:42:00 +0800%22},{%22href%22:%22/blog/2015/05/06/my-first-drone-a-dji-phantom-3-professional%22,%22text%22:%22My first drone: a DJI Phantom 3 Professional%22,%22title%22:%222015-05-06 20:58:20 +0800%22},{%22href%22:%22/blog/2015/02/18/what-makes-everything-connected%22,%22text%22:%22连接一切？是什么让连接建立起来了？%22,%22title%22:%222015-02-18 04:46:18 +0800%22}]" target="_self" itemStyle="article"></am-card>
${fetch('/blog/card/links.html').then(r => {
    if (r.status >= 400) return r.status;
    return r.text().then(v => unsafeHTML(v))
})}
</div>
</div>
<div class="copyright">Copyright © 2012 - 2018, Mindon Feng</div>`
    }
}

customElements.define('blog-route', BlogRoute);
