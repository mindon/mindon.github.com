import { LitElement, html } from '../node_modules/@polymer/lit-element/lit-element.js';

// import '@polymer/app-layout/app-drawer/app-drawer';
// import '@polymer/app-layout/app-header/app-header';
// import '@polymer/app-layout/app-scroll-effects/effects/waterfall';
// import '@polymer/app-layout/app-toolbar/app-toolbar';
import { setPassiveTouchGestures } from '../node_modules/@polymer/polymer/lib/utils/settings.js';

import { installRouter } from '../node_modules/pwa-helpers/router.js';
import { installOfflineWatcher } from '../node_modules/pwa-helpers/network.js';
import { installMediaQueryWatcher } from '../node_modules/pwa-helpers/media-query.js';
import { updateMetadata } from '../node_modules/pwa-helpers/metadata.js';

class AmApp extends LitElement {

    static get properties() {
        return {
            appTitle: String,
            _views: Array,
            _page: String,
            _drawerOpened: Boolean,
            _snackbarOpened: Boolean,
            _offline: Boolean
        }
    }

    constructor() {
        super();
        this._drawerOpened = false;
        // To force all event listeners for gestures to be passive.
        // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
        setPassiveTouchGestures(true);
    }

    _firstRendered() {
        installRouter((location) => this._locationChanged(location));
        installOfflineWatcher((offline) => this._offlineChanged(offline));
        installMediaQueryWatcher(`(min-width: 460px)`,
            (matches) => this._layoutChanged(matches));
    }

    _didRender(properties, changeList) {
        if ('_page' in changeList) {
            const pageTitle = properties.appTitle + ' - ' + changeList._page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                // This object also takes an image property, that points to an img src.
            });
        }
    }

    _updateDrawerState(opened) {
        if (opened !== this._drawerOpened) {
            this._drawerOpened = opened;
        }
    }

    _layoutChanged(isWideLayout) {
        // The drawer doesn't make sense in a wide layout, so if it's opened, close it.
        this._updateDrawerState(false);
    }

    _locationChanged() {
        var path = window.decodeURIComponent(window.location.pathname);
        if(path=='/' && /^#~.+/.test(location.hash)){
            path = location.hash.substr(2);
            if(path.charAt(0) != '/') path = '/' +path;
        }
        const page = path === '/' || !path ? 'blog/' : path.slice(1);
        this._loadPage(page);
        this._updateDrawerState(false);
    }

    _verify(page) {
        if(page.indexOf('trouble') === 0) {
            page = "note"
        }
        if(page.indexOf('about') === 0
         || page.indexOf('note') === 0) {
            
            page = 'blog/' + page;
        }
        let i = page ? page.indexOf('/') : -1;
        this._page = page;
        if (i > 0) {
            return page.substr(0, i + 1) + 'route';
        }
        return 'src/route';
    }

    async _loadPage(page) {
        await import('../' + this._verify(page) + '.js');
    }

    _offlineChanged(offline) {
        const previousOffline = this._offline;
        this._offline = offline;

        // Don't show the snackbar on the first load of the page.
        if (previousOffline === undefined) {
            return;
        }

        // clearTimeout(this.__snackbarTimer);
        // this.snackbarOpened = true;
        // this.__snackbarTimer = setTimeout(() => { this.snackbarOpened = false }, 3000);
    }

    _render({ appTitle, _page }) {
        return html`<blog-route uri=${_page} active=${_page && _page.indexOf('blog/') === 0}></blog-route>`;
    }
} // AmApp

customElements.define('am-app', AmApp);
