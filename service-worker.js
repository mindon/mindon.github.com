'use strict';

var precacheConfig = [["/index.html","9de346650873e19ff4615659f5eb32e9"],["/blog/about.html","51513cf1085c7efc22d9b4c9d535730c"],["/blog/note.html","87586d5800a4a614543857b71b180ebe"],["/blog/card/links.html","9427aec7d3fe8f64fdd7ffa41f0e749e"],["/manifest.json","a45152296b07c45b8eea0103c512319f"],["/images/favicon.ico","82b34d0faee76b89a9f946763428f668"],["/blog/route.js","a1de352214c5de444129403af288fb7e"],["/blog/am-app.js","d2065309f9ac2a3e6b7dd8be5b45c826"],["/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js","6faaea1b73a1b28a47c737c013ae0dc6"],["/node_modules/@polymer/lit-element/lit-element.js","ed66c5c22f4d291fab6697e13f56d48c"],["/node_modules/lit-html/lit-html.js","b3ac63e7c372c6f23f70d307667256b9"],["/node_modules/lit-html/lib/until.js","5c149fcee4354ebda36af2e9bb63a79a"],["/node_modules/lit-html/lib/repeat.js","f4cbcb7a4a2b453fa2df5460a7ca3faa"],["/node_modules/lit-html/lib/unsafe-html.js","68d76f033adbaf4fea06ad13cf0980ce"],["/node_modules/pwa-helpers/metadata.js","1e51e7aa2b6ab47705ac8bffb59e08c9"],["/node_modules/pwa-helpers/router.js","e6ab39cdcd7e788261b21c3f8854abe7"],["/node_modules/pwa-helpers/network.js","f617a345081ead70f9f87c3d9caa7fb2"],["/node_modules/pwa-helpers/media-query.js","2220d0bba986b7fd79a2fd52fcc70a1b"],["/node_modules/@polymer/polymer/lib/utils/settings.js","6a0f4f16077d795d1761f8f0a9479f3d"],["/node_modules/@polymer/polymer/lib/mixins/properties-mixin.js","ada233eb1d5d614fcee01c95816db46f"],["/node_modules/@polymer/polymer/lib/utils/case-map.js","478e9b53a30533c8776d410a378ba5b2"],["/node_modules/lit-html/lib/shady-render.js","a77476b03a11424b79374febc0a97a56"],["/node_modules/lit-html/lib/lit-extended.js","18188821f488357c2d47a45d62d22890"],["/node_modules/@polymer/polymer/lib/utils/boot.js","458eb673c1ad5ecc0a81de9a39e2b7f3"],["/node_modules/@polymer/polymer/lib/utils/resolve-url.js","629dc2f004c2602ea2d583f4c68001b2"],["/node_modules/@polymer/polymer/lib/utils/mixin.js","32a83dfee673e8c6dfbc32f4681c9a65"],["/node_modules/@polymer/polymer/lib/mixins/properties-changed.js","07f24b9f6d5be048364800e0fe36a7e8"],["/node_modules/@polymer/polymer/lib/utils/async.js","2a974e258a076e51aba1b45361964c08"],["/blog/components/am-article.js","3b3183e83c9ca9aa430b269cbda5700b"],["/blog/components/am-banner.js","07d0985f1ac076620f60e3ad51596896"],["/blog/components/am-card.js","ca36fd2e54d1e2c30c3aea8a56a879cd"],["/blog/components/am-leading.js","ebd92e6baa66ce6a2daaafca5876c528"],["/blog/components/am-link.js","0b67cde04af121e150bdcc061a3880c5"],["/blog/components/am-list.js","d187b0418eb92531cf84f2e142d07db0"],["/blog/components/am-paging.js","a4411c8c3e128d11480ae4237c437fb0"],["/blog/components/am-summary.js","13e9afdbaa15221fd3a525807b07fe9d"],["/blog/components/am-tags.js","17ed5754d7c68c08b43db63ed9ec000c"],["/blog/posts/timeline/1.html","0c5555311cd43811bfcb237da2c11d02"],["/blog/posts/timeline/10.html","78cb0b1742ecaf8a83a45bd8428cae6a"],["/blog/posts/timeline/11.html","2889b297b5245f421eae362c8c6c1f61"],["/blog/posts/timeline/12.html","8ffb673294aa50a23d0a373aa67c38bb"],["/blog/posts/timeline/13.html","f2bc1744c7a9be1d9095d368551b555a"],["/blog/posts/timeline/14.html","2c11065ac38bc21daf841e5ba109d6fc"],["/blog/posts/timeline/15.html","8658daface8d5483e48a0e86b2bca36c"],["/blog/posts/timeline/16.html","0213056e28c34d93931f96eaf4174c47"],["/blog/posts/timeline/17.html","5c032ec6bf83ea0fa8d07d046b7398e2"],["/blog/posts/timeline/18.html","1c9c1c18fb294463212c107d337b297b"],["/blog/posts/timeline/19.html","d5dd1cad99b9b01157e76528059ed250"],["/blog/posts/timeline/2.html","144961e36561d32130c21cbe6e7b8b41"],["/blog/posts/timeline/20.html","eda63b9bfa194d9e39c3d5904e3a6730"],["/blog/posts/timeline/21.html","92faba6cc4542237a965aeadee926f3b"],["/blog/posts/timeline/22.html","076e9bc622a4c2b8531b3949a8003f09"],["/blog/posts/timeline/23.html","597f6a80b3af71a5834aa0c01abfb26b"],["/blog/posts/timeline/24.html","88783a7be96f6e4f0e8e337baf49f487"],["/blog/posts/timeline/25.html","703075bba7fc9e416e01787b88a70297"],["/blog/posts/timeline/26.html","090536a02ef76b9f9a2249a8856831a8"],["/blog/posts/timeline/27.html","26cf0e0a3cbefa8fd98bd25cdc01045f"],["/blog/posts/timeline/28.html","12a243f8cc519f19603730fc76a35ddd"],["/blog/posts/timeline/29.html","ff008f3e907ded31fdfada935e63ad19"],["/blog/posts/timeline/3.html","3e1516e25cdd73aaff8de193db422f6c"],["/blog/posts/timeline/30.html","931a1c31577d10c639e61d5d7c27a8a8"],["/blog/posts/timeline/31.html","7b027a77b9d23bd4a8bc30abe8f7c6a9"],["/blog/posts/timeline/32.html","69e1b10949ae4a39167a366c6c12d5c5"],["/blog/posts/timeline/33.html","921e829c5fbb1e8bb6681fe17b3b74c5"],["/blog/posts/timeline/34.html","1ee84146c043ce834106728dbb032530"],["/blog/posts/timeline/35.html","be5f171d7a1ac0da2674b07dd65e0533"],["/blog/posts/timeline/36.html","91a962016354bfd25f6bff3e94519435"],["/blog/posts/timeline/37.html","93a84921bfb39c380f36f4d9a9173fc6"],["/blog/posts/timeline/38.html","17dc7a2d5d6d8b8c98a2fdb44d32e871"],["/blog/posts/timeline/39.html","7dca6d07f4ec1fb985769e976afd279c"],["/blog/posts/timeline/4.html","cbf80d027b2e3132e52c730b6d0dc8b1"],["/blog/posts/timeline/40.html","46216ded6248ddd05701730e038ca5eb"],["/blog/posts/timeline/41.html","54075a02499e10afd85f77d2ed8d040c"],["/blog/posts/timeline/42.html","07c13c951e00eaccf2e42e9109ba3e7c"],["/blog/posts/timeline/43.html","64f83289032dc950e9c892c5170def06"],["/blog/posts/timeline/44.html","3b6dc0553467cbe1c57ea55ee33f8f67"],["/blog/posts/timeline/45.html","1794619b8041996d5c39f01a3b43dcaa"],["/blog/posts/timeline/46.html","b797dbdb988099619ea754a5e49c6238"],["/blog/posts/timeline/47.html","89b6ef57f92e190dba622a83aeb3fcd6"],["/blog/posts/timeline/48.html","6c31154ed503c98be46cb2c84a5bac02"],["/blog/posts/timeline/49.html","5b1946a5f831c8cf3583adc58a2e9339"],["/blog/posts/timeline/5.html","3fcea2eaea51394006e333d5d5049853"],["/blog/posts/timeline/50.html","5b49769dcbf259cadd99481828f6cd8e"],["/blog/posts/timeline/51.html","7d7ed394f251294496b7d66a72fed087"],["/blog/posts/timeline/52.html","bbe7426ed32c48cddc613a436dea8183"],["/blog/posts/timeline/6.html","de7b93f78374bcd6f13829508d87b0d4"],["/blog/posts/timeline/7.html","e5e75123faa3960fdcf80623f95359fe"],["/blog/posts/timeline/8.html","7f48cea3e83a26cfca74482314aea0c7"],["/blog/posts/timeline/9.html","45da6b242f8259982b54bdc4f11d4e9b"],["/images/mindon.png","c08c7c19c341bc9bb02172a2602880ac"]];
var cacheName = 'mindon-if-v1--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
  var url = new URL(originalUrl);
  if (url.pathname.slice(-1) === '/') {
    url.pathname += index;
  }
  return url.toString();
};

var cleanResponse = function (originalResponse) {
  // If this is not a redirected response, then we don't have to do anything.
  if (!originalResponse.redirected) {
    return Promise.resolve(originalResponse);
  }

  // Firefox 50 and below doesn't support the Response.body stream, so we may
  // need to read the entire body to memory as a Blob.
  var bodyPromise = 'body' in originalResponse ?
    Promise.resolve(originalResponse.body) :
    originalResponse.blob();

  return bodyPromise.then(function (body) {
    // new Response() is happy when passed either a stream or a Blob.
    return new Response(body, {
      headers: originalResponse.headers,
      status: originalResponse.status,
      statusText: originalResponse.statusText
    });
  });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
  dontCacheBustUrlsMatching) {
  // Create a new URL object to avoid modifying originalUrl.
  var url = new URL(originalUrl);

  // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
  // then add in the extra cache-busting URL parameter.
  if (!dontCacheBustUrlsMatching ||
    !(url.pathname.match(dontCacheBustUrlsMatching))) {
    url.search += (url.search ? '&' : '') +
      encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
  }

  return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
  // If the whitelist is empty, then consider all URLs to be whitelisted.
  if (whitelist.length === 0) {
    return true;
  }

  // Otherwise compare each path regex to the path of the URL passed in.
  var path = (new URL(absoluteUrlString)).pathname;
  return whitelist.some(function (whitelistedPathRegex) {
    return path.match(whitelistedPathRegex);
  });
};

var stripIgnoredUrlParameters = function (originalUrl,
  ignoreUrlParametersMatching) {
  var url = new URL(originalUrl);
  // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
  url.hash = '';

  url.search = url.search.slice(1) // Exclude initial '?'
    .split('&') // Split into an array of 'key=value' strings
    .map(function (kv) {
      return kv.split('='); // Split each 'key=value' string into a [key, value] array
    })
    .filter(function (kv) {
      return ignoreUrlParametersMatching.every(function (ignoredRegex) {
        return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
      });
    })
    .map(function (kv) {
      return kv.join('='); // Join each [key, value] array into a 'key=value' string
    })
    .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

  return url.toString();
};


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function (item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, { credentials: 'same-origin' });
              return fetch(request).then(function (response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {

      // Force the SW to transition from installing -> active state
      return self.skipWaiting();

    })
  );
});

self.addEventListener('activate', function (event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingRequests) {
        return Promise.all(
          existingRequests.map(function (existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function () {

      return self.clients.claim();

    })
  );
});


self.addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
      navigateFallback &&
      (event.request.mode === 'navigate') &&
      isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function (e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function (e) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else { var t; t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.toolbox = e() } }(function () { return function e(t, n, r) { function o(c, s) { if (!n[c]) { if (!t[c]) { var a = "function" == typeof require && require; if (!s && a) return a(c, !0); if (i) return i(c, !0); var u = new Error("Cannot find module '" + c + "'"); throw u.code = "MODULE_NOT_FOUND", u } var f = n[c] = { exports: {} }; t[c][0].call(f.exports, function (e) { var n = t[c][1][e]; return o(n ? n : e) }, f, f.exports, e, t, n, r) } return n[c].exports } for (var i = "function" == typeof require && require, c = 0; c < r.length; c++)o(r[c]); return o }({ 1: [function (e, t, n) { "use strict"; function r(e, t) { t = t || {}; var n = t.debug || m.debug; n && console.log("[sw-toolbox] " + e) } function o(e) { var t; return e && e.cache && (t = e.cache.name), t = t || m.cache.name, caches.open(t) } function i(e, t) { t = t || {}; var n = t.successResponses || m.successResponses; return fetch(e.clone()).then(function (r) { return "GET" === e.method && n.test(r.status) && o(t).then(function (n) { n.put(e, r).then(function () { var r = t.cache || m.cache; (r.maxEntries || r.maxAgeSeconds) && r.name && c(e, n, r) }) }), r.clone() }) } function c(e, t, n) { var r = s.bind(null, e, t, n); d = d ? d.then(r) : r() } function s(e, t, n) { var o = e.url, i = n.maxAgeSeconds, c = n.maxEntries, s = n.name, a = Date.now(); return r("Updating LRU order for " + o + ". Max entries is " + c + ", max age is " + i), g.getDb(s).then(function (e) { return g.setTimestampForUrl(e, o, a) }).then(function (e) { return g.expireEntries(e, c, i, a) }).then(function (e) { r("Successfully updated IDB."); var n = e.map(function (e) { return t.delete(e) }); return Promise.all(n).then(function () { r("Done with cache cleanup.") }) }).catch(function (e) { r(e) }) } function a(e, t, n) { return r("Renaming cache: [" + e + "] to [" + t + "]", n), caches.delete(t).then(function () { return Promise.all([caches.open(e), caches.open(t)]).then(function (t) { var n = t[0], r = t[1]; return n.keys().then(function (e) { return Promise.all(e.map(function (e) { return n.match(e).then(function (t) { return r.put(e, t) }) })) }).then(function () { return caches.delete(e) }) }) }) } function u(e, t) { return o(t).then(function (t) { return t.add(e) }) } function f(e, t) { return o(t).then(function (t) { return t.delete(e) }) } function h(e) { e instanceof Promise || p(e), m.preCacheItems = m.preCacheItems.concat(e) } function p(e) { var t = Array.isArray(e); if (t && e.forEach(function (e) { "string" == typeof e || e instanceof Request || (t = !1) }), !t) throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests."); return e } function l(e, t, n) { if (!e) return !1; if (t) { var r = e.headers.get("date"); if (r) { var o = new Date(r); if (o.getTime() + 1e3 * t < n) return !1 } } return !0 } var d, m = e("./options"), g = e("./idb-cache-expiration"); t.exports = { debug: r, fetchAndCache: i, openCache: o, renameCache: a, cache: u, uncache: f, precache: h, validatePrecacheInput: p, isResponseFresh: l } }, { "./idb-cache-expiration": 2, "./options": 4 }], 2: [function (e, t, n) { "use strict"; function r(e) { return new Promise(function (t, n) { var r = indexedDB.open(u + e, f); r.onupgradeneeded = function () { var e = r.result.createObjectStore(h, { keyPath: p }); e.createIndex(l, l, { unique: !1 }) }, r.onsuccess = function () { t(r.result) }, r.onerror = function () { n(r.error) } }) } function o(e) { return e in d || (d[e] = r(e)), d[e] } function i(e, t, n) { return new Promise(function (r, o) { var i = e.transaction(h, "readwrite"), c = i.objectStore(h); c.put({ url: t, timestamp: n }), i.oncomplete = function () { r(e) }, i.onabort = function () { o(i.error) } }) } function c(e, t, n) { return t ? new Promise(function (r, o) { var i = 1e3 * t, c = [], s = e.transaction(h, "readwrite"), a = s.objectStore(h), u = a.index(l); u.openCursor().onsuccess = function (e) { var t = e.target.result; if (t && n - i > t.value[l]) { var r = t.value[p]; c.push(r), a.delete(r), t.continue() } }, s.oncomplete = function () { r(c) }, s.onabort = o }) : Promise.resolve([]) } function s(e, t) { return t ? new Promise(function (n, r) { var o = [], i = e.transaction(h, "readwrite"), c = i.objectStore(h), s = c.index(l), a = s.count(); s.count().onsuccess = function () { var e = a.result; e > t && (s.openCursor().onsuccess = function (n) { var r = n.target.result; if (r) { var i = r.value[p]; o.push(i), c.delete(i), e - o.length > t && r.continue() } }) }, i.oncomplete = function () { n(o) }, i.onabort = r }) : Promise.resolve([]) } function a(e, t, n, r) { return c(e, n, r).then(function (n) { return s(e, t).then(function (e) { return n.concat(e) }) }) } var u = "sw-toolbox-", f = 1, h = "store", p = "url", l = "timestamp", d = {}; t.exports = { getDb: o, setTimestampForUrl: i, expireEntries: a } }, {}], 3: [function (e, t, n) { "use strict"; function r(e) { var t = a.match(e.request); t ? e.respondWith(t(e.request)) : a.default && "GET" === e.request.method && 0 === e.request.url.indexOf("http") && e.respondWith(a.default(e.request)) } function o(e) { s.debug("activate event fired"); var t = u.cache.name + "$$$inactive$$$"; e.waitUntil(s.renameCache(t, u.cache.name)) } function i(e) { return e.reduce(function (e, t) { return e.concat(t) }, []) } function c(e) { var t = u.cache.name + "$$$inactive$$$"; s.debug("install event fired"), s.debug("creating cache [" + t + "]"), e.waitUntil(s.openCache({ cache: { name: t } }).then(function (e) { return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function (t) { return s.debug("preCache list: " + (t.join(", ") || "(none)")), e.addAll(t) }) })) } e("serviceworker-cache-polyfill"); var s = e("./helpers"), a = e("./router"), u = e("./options"); t.exports = { fetchListener: r, activateListener: o, installListener: c } }, { "./helpers": 1, "./options": 4, "./router": 6, "serviceworker-cache-polyfill": 16 }], 4: [function (e, t, n) { "use strict"; var r; r = self.registration ? self.registration.scope : self.scope || new URL("./", self.location).href, t.exports = { cache: { name: "$$$toolbox-cache$$$" + r + "$$$", maxAgeSeconds: null, maxEntries: null }, debug: !1, networkTimeoutSeconds: null, preCacheItems: [], successResponses: /^0|([123]\d\d)|(40[14567])|410$/ } }, {}], 5: [function (e, t, n) { "use strict"; var r = new URL("./", self.location), o = r.pathname, i = e("path-to-regexp"), c = function (e, t, n, r) { t instanceof RegExp ? this.fullUrlRegExp = t : (0 !== t.indexOf("/") && (t = o + t), this.keys = [], this.regexp = i(t, this.keys)), this.method = e, this.options = r, this.handler = n }; c.prototype.makeHandler = function (e) { var t; if (this.regexp) { var n = this.regexp.exec(e); t = {}, this.keys.forEach(function (e, r) { t[e.name] = n[r + 1] }) } return function (e) { return this.handler(e, t, this.options) }.bind(this) }, t.exports = c }, { "path-to-regexp": 15 }], 6: [function (e, t, n) { "use strict"; function r(e) { return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") } var o = e("./route"), i = e("./helpers"), c = function (e, t) { for (var n = e.entries(), r = n.next(), o = []; !r.done;) { var i = new RegExp(r.value[0]); i.test(t) && o.push(r.value[1]), r = n.next() } return o }, s = function () { this.routes = new Map, this.routes.set(RegExp, new Map), this.default = null };["get", "post", "put", "delete", "head", "any"].forEach(function (e) { s.prototype[e] = function (t, n, r) { return this.add(e, t, n, r) } }), s.prototype.add = function (e, t, n, c) { c = c || {}; var s; t instanceof RegExp ? s = RegExp : (s = c.origin || self.location.origin, s = s instanceof RegExp ? s.source : r(s)), e = e.toLowerCase(); var a = new o(e, t, n, c); this.routes.has(s) || this.routes.set(s, new Map); var u = this.routes.get(s); u.has(e) || u.set(e, new Map); var f = u.get(e), h = a.regexp || a.fullUrlRegExp; f.has(h.source) && i.debug('"' + t + '" resolves to same regex as existing route.'), f.set(h.source, a) }, s.prototype.matchMethod = function (e, t) { var n = new URL(t), r = n.origin, o = n.pathname; return this._match(e, c(this.routes, r), o) || this._match(e, [this.routes.get(RegExp)], t) }, s.prototype._match = function (e, t, n) { if (0 === t.length) return null; for (var r = 0; r < t.length; r++) { var o = t[r], i = o && o.get(e.toLowerCase()); if (i) { var s = c(i, n); if (s.length > 0) return s[0].makeHandler(n) } } return null }, s.prototype.match = function (e) { return this.matchMethod(e.method, e.url) || this.matchMethod("any", e.url) }, t.exports = new s }, { "./helpers": 1, "./route": 5 }], 7: [function (e, t, n) { "use strict"; function r(e, t, n) { return n = n || {}, i.debug("Strategy: cache first [" + e.url + "]", n), i.openCache(n).then(function (t) { return t.match(e).then(function (t) { var r = n.cache || o.cache, c = Date.now(); return i.isResponseFresh(t, r.maxAgeSeconds, c) ? t : i.fetchAndCache(e, n) }) }) } var o = e("../options"), i = e("../helpers"); t.exports = r }, { "../helpers": 1, "../options": 4 }], 8: [function (e, t, n) { "use strict"; function r(e, t, n) { return n = n || {}, i.debug("Strategy: cache only [" + e.url + "]", n), i.openCache(n).then(function (t) { return t.match(e).then(function (e) { var t = n.cache || o.cache, r = Date.now(); if (i.isResponseFresh(e, t.maxAgeSeconds, r)) return e }) }) } var o = e("../options"), i = e("../helpers"); t.exports = r }, { "../helpers": 1, "../options": 4 }], 9: [function (e, t, n) { "use strict"; function r(e, t, n) { return o.debug("Strategy: fastest [" + e.url + "]", n), new Promise(function (r, c) { var s = !1, a = [], u = function (e) { a.push(e.toString()), s ? c(new Error('Both cache and network failed: "' + a.join('", "') + '"')) : s = !0 }, f = function (e) { e instanceof Response ? r(e) : u("No result returned") }; o.fetchAndCache(e.clone(), n).then(f, u), i(e, t, n).then(f, u) }) } var o = e("../helpers"), i = e("./cacheOnly"); t.exports = r }, { "../helpers": 1, "./cacheOnly": 8 }], 10: [function (e, t, n) { t.exports = { networkOnly: e("./networkOnly"), networkFirst: e("./networkFirst"), cacheOnly: e("./cacheOnly"), cacheFirst: e("./cacheFirst"), fastest: e("./fastest") } }, { "./cacheFirst": 7, "./cacheOnly": 8, "./fastest": 9, "./networkFirst": 11, "./networkOnly": 12 }], 11: [function (e, t, n) { "use strict"; function r(e, t, n) { n = n || {}; var r = n.successResponses || o.successResponses, c = n.networkTimeoutSeconds || o.networkTimeoutSeconds; return i.debug("Strategy: network first [" + e.url + "]", n), i.openCache(n).then(function (t) { var s, a, u = []; if (c) { var f = new Promise(function (r) { s = setTimeout(function () { t.match(e).then(function (e) { var t = n.cache || o.cache, c = Date.now(), s = t.maxAgeSeconds; i.isResponseFresh(e, s, c) && r(e) }) }, 1e3 * c) }); u.push(f) } var h = i.fetchAndCache(e, n).then(function (e) { if (s && clearTimeout(s), r.test(e.status)) return e; throw i.debug("Response was an HTTP error: " + e.statusText, n), a = e, new Error("Bad response") }).catch(function (r) { return i.debug("Network or response error, fallback to cache [" + e.url + "]", n), t.match(e).then(function (e) { if (e) return e; if (a) return a; throw r }) }); return u.push(h), Promise.race(u) }) } var o = e("../options"), i = e("../helpers"); t.exports = r }, { "../helpers": 1, "../options": 4 }], 12: [function (e, t, n) { "use strict"; function r(e, t, n) { return o.debug("Strategy: network only [" + e.url + "]", n), fetch(e) } var o = e("../helpers"); t.exports = r }, { "../helpers": 1 }], 13: [function (e, t, n) { "use strict"; var r = e("./options"), o = e("./router"), i = e("./helpers"), c = e("./strategies"), s = e("./listeners"); i.debug("Service Worker Toolbox is loading"), self.addEventListener("install", s.installListener), self.addEventListener("activate", s.activateListener), self.addEventListener("fetch", s.fetchListener), t.exports = { networkOnly: c.networkOnly, networkFirst: c.networkFirst, cacheOnly: c.cacheOnly, cacheFirst: c.cacheFirst, fastest: c.fastest, router: o, options: r, cache: i.cache, uncache: i.uncache, precache: i.precache } }, { "./helpers": 1, "./listeners": 3, "./options": 4, "./router": 6, "./strategies": 10 }], 14: [function (e, t, n) { t.exports = Array.isArray || function (e) { return "[object Array]" == Object.prototype.toString.call(e) } }, {}], 15: [function (e, t, n) { function r(e, t) { for (var n, r = [], o = 0, i = 0, c = "", s = t && t.delimiter || "/"; null != (n = x.exec(e));) { var f = n[0], h = n[1], p = n.index; if (c += e.slice(i, p), i = p + f.length, h) c += h[1]; else { var l = e[i], d = n[2], m = n[3], g = n[4], v = n[5], w = n[6], y = n[7]; c && (r.push(c), c = ""); var b = null != d && null != l && l !== d, E = "+" === w || "*" === w, R = "?" === w || "*" === w, k = n[2] || s, $ = g || v; r.push({ name: m || o++, prefix: d || "", delimiter: k, optional: R, repeat: E, partial: b, asterisk: !!y, pattern: $ ? u($) : y ? ".*" : "[^" + a(k) + "]+?" }) } } return i < e.length && (c += e.substr(i)), c && r.push(c), r } function o(e, t) { return s(r(e, t)) } function i(e) { return encodeURI(e).replace(/[\/?#]/g, function (e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) } function c(e) { return encodeURI(e).replace(/[?#]/g, function (e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) } function s(e) { for (var t = new Array(e.length), n = 0; n < e.length; n++)"object" == typeof e[n] && (t[n] = new RegExp("^(?:" + e[n].pattern + ")$")); return function (n, r) { for (var o = "", s = n || {}, a = r || {}, u = a.pretty ? i : encodeURIComponent, f = 0; f < e.length; f++) { var h = e[f]; if ("string" != typeof h) { var p, l = s[h.name]; if (null == l) { if (h.optional) { h.partial && (o += h.prefix); continue } throw new TypeError('Expected "' + h.name + '" to be defined') } if (v(l)) { if (!h.repeat) throw new TypeError('Expected "' + h.name + '" to not repeat, but received `' + JSON.stringify(l) + "`"); if (0 === l.length) { if (h.optional) continue; throw new TypeError('Expected "' + h.name + '" to not be empty') } for (var d = 0; d < l.length; d++) { if (p = u(l[d]), !t[f].test(p)) throw new TypeError('Expected all "' + h.name + '" to match "' + h.pattern + '", but received `' + JSON.stringify(p) + "`"); o += (0 === d ? h.prefix : h.delimiter) + p } } else { if (p = h.asterisk ? c(l) : u(l), !t[f].test(p)) throw new TypeError('Expected "' + h.name + '" to match "' + h.pattern + '", but received "' + p + '"'); o += h.prefix + p } } else o += h } return o } } function a(e) { return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1") } function u(e) { return e.replace(/([=!:$\/()])/g, "\\$1") } function f(e, t) { return e.keys = t, e } function h(e) { return e.sensitive ? "" : "i" } function p(e, t) { var n = e.source.match(/\((?!\?)/g); if (n) for (var r = 0; r < n.length; r++)t.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null }); return f(e, t) } function l(e, t, n) { for (var r = [], o = 0; o < e.length; o++)r.push(g(e[o], t, n).source); var i = new RegExp("(?:" + r.join("|") + ")", h(n)); return f(i, t) } function d(e, t, n) { return m(r(e, n), t, n) } function m(e, t, n) { v(t) || (n = t || n, t = []), n = n || {}; for (var r = n.strict, o = n.end !== !1, i = "", c = 0; c < e.length; c++) { var s = e[c]; if ("string" == typeof s) i += a(s); else { var u = a(s.prefix), p = "(?:" + s.pattern + ")"; t.push(s), s.repeat && (p += "(?:" + u + p + ")*"), p = s.optional ? s.partial ? u + "(" + p + ")?" : "(?:" + u + "(" + p + "))?" : u + "(" + p + ")", i += p } } var l = a(n.delimiter || "/"), d = i.slice(-l.length) === l; return r || (i = (d ? i.slice(0, -l.length) : i) + "(?:" + l + "(?=$))?"), i += o ? "$" : r && d ? "" : "(?=" + l + "|$)", f(new RegExp("^" + i, h(n)), t) } function g(e, t, n) { return v(t) || (n = t || n, t = []), n = n || {}, e instanceof RegExp ? p(e, t) : v(e) ? l(e, t, n) : d(e, t, n) } var v = e("isarray"); t.exports = g, t.exports.parse = r, t.exports.compile = o, t.exports.tokensToFunction = s, t.exports.tokensToRegExp = m; var x = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g") }, { isarray: 14 }], 16: [function (e, t, n) { !function () { var e = Cache.prototype.addAll, t = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/); if (t) var n = t[1], r = parseInt(t[2]); e && (!t || "Firefox" === n && r >= 46 || "Chrome" === n && r >= 50) || (Cache.prototype.addAll = function (e) { function t(e) { this.name = "NetworkError", this.code = 19, this.message = e } var n = this; return t.prototype = Object.create(Error.prototype), Promise.resolve().then(function () { if (arguments.length < 1) throw new TypeError; return e = e.map(function (e) { return e instanceof Request ? e : String(e) }), Promise.all(e.map(function (e) { "string" == typeof e && (e = new Request(e)); var n = new URL(e.url).protocol; if ("http:" !== n && "https:" !== n) throw new t("Invalid scheme"); return fetch(e.clone()) })) }).then(function (r) { if (r.some(function (e) { return !e.ok })) throw new t("Incorrect response status"); return Promise.all(r.map(function (t, r) { return n.put(e[r], t) })) }).then(function () { }) }, Cache.prototype.add = function (e) { return this.addAll([e]) }) }() }, {}] }, {}, [13])(13) });


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.
toolbox.router.get(/\/@webcomponents\/webcomponentsjs\//, toolbox.fastest, {});
