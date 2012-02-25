(function(ID, url, conf) {
  // Loader Module
  // root: images/bz.gif to stat, images/none.gif to fix ie6 blinking fixed position

  // for better compress effect
  var win = window, doc = document,
    _ready = '-ready', _body = 'body', _domain = 'domain',
    _createElement = 'createElement',
    _script = 'script', _null = null,
    _appendChild = 'appendChild',
    _readyState = 'readyState',
    _documentElement = 'documentElement',
    _addEventListener = 'addEventListener',
    _attachEvent = 'attachEvent',
    _insertBefore = 'insertBefore',
    _firstChild = 'firstChild',
    _callee = 'callee', _src = 'src',
    root = (conf && conf.root) || '', // default root
    domain = conf && conf.domain,
    ie6fixed = (conf && conf.fixed) || '', 
    uri = win.location.href, 
    ms = win._chat_sites;

  if(ms && ms.off && uri.match(ms.off)) // hide
    return;

  // stat
  root && setTimeout(function(){(new Image).src=root+'images/bz.gif?'+(new Date).getTime()});

  // prevent reload
  if(win[ID])
    return true;
  var M = win[ID] = {};

  // domain setting for interaction
  if(domain && doc[_domain] != domain)
    doc[_domain] = domain;

  var ieo = doc[_createElement]('div'), drfn;

  // dom ready detector
  var isdr = 0, drr = 0, _DOMContentLoaded = 'DOMContentLoaded', _onreadystatechange = 'onreadystatechange', _COMPLETE = 'complete';
  function dr(fn) {
    if(drr || !fn) return; drr = 1;
    // already
    if(doc[_body] && (!(!+'\v1') || /interactive|complete/i.test(doc[_readyState])))
      return fn();

    if(doc[_addEventListener]) {
      doc[_addEventListener](_DOMContentLoaded, function(){
        doc.removeEventListener(_DOMContentLoaded, arguments[_callee], false);
        fn();
      }, false);
      win[_addEventListener]('load', fn, false);

    } else if (doc[_attachEvent]) {
      doc[_attachEvent](_onreadystatechange, function(){
        if (doc[_readyState] === _COMPLETE) {
          doc.detachEvent(_onreadystatechange, arguments[_callee]);
          fn();
        }
      });

      if(doc[_documentElement] && doc[_documentElement].doScroll && win == win.top)
        (function(){
          if(isdr)
            return;
          try {
            doc[_documentElement].doScroll("left");
          } catch(e) {
            return setTimeout(arguments[_callee], 10);
          }
          fn();
        })();
      win[_attachEvent]('onload', fn);
    }
  }

  ieo.innerHTML = '<!--[if IE]><span style="_width:1px"/><![endif]-->';
  var ied = ieo.childNodes[0],
      ie6 = ied ? ied.nodeType == 1 && ied.style.width=='1px' : 0;
  ieo = ied = _null;
  M.ie6 = ie6;
  //if(ie6) return false; // not support in ie6

  var _contentWindow = 'contentWindow',
    _document = 'document',
    _style = 'style',
    el = doc[_createElement]('div'),
    ifr = doc[_createElement]('iframe');
  el.id = ID +'-zone';
  ifr.id = ID;
  ifr.frameBorder = "0";
  ifr.scrolling = "no";
  ifr[_style].width = ifr[_style].height = '100%';
  if(!ie6)
    ifr.allowTransparency = "true";
  var et = el[_style];
  et.zIndex = 99999999;
  et.display = 'none';
  et.width = '1px';
  et.height = '1px';
  et.overflow = 'hidden';
  et = null;
  var src = '', _html = '', d;
  dr(function() {
    if(isdr)
      return;
    isdr = 1; // prevent re-call
    // fix IE6 fixed position
    if(ie6 || (!+'\v' && !(function(){var o=doc.createElement("div"),r;o.style.position="fixed";o.style.top=0;doc.body.appendChild(o);r=!isNaN(o.offsetTop)&&parseInt(o.offsetTop)===0;o.parentNode.removeChild(o);o=null;return r;})())) {
      el.innerHTML = ie6fixed ? '<br style="display:none" /><style>.fixed,#'+el.id +(typeof ie6fixed == 'string' ? ','+ie6fixed: '')+' {position:absolute !important; top:expression((function(ob){try{var d=document.compatMode=="CSS1Compat"?document.'+_documentElement+':document.body;return (d.scrollTop+d.clientHeight-ob.clientHeight)-parseInt((ob.currentStyle&&ob.currentStyle.bottom)||0)}catch(e){return 0}})(this)) !important; left:expression((function(ob){try{var d=document.compatMode=="CSS1Compat"?document.'+_documentElement+':document.body;return (d.scrollLeft+d.clientWidth-ob.clientWidth)-parseInt((ob.currentStyle&&ob.currentStyle.right)||0)}catch(e){return 0}})(this)) !important}' + (root ? 'html{background:url("'+ root +'images/none.gif") no-repeat -1 -1}' : '') +'</style>' : '';
      // html background to avoid ie6 fixed scroll blinking
    } else {
      M.fixed = !0;
      if(ie6fixed)
        el[_style].position = 'fixed';
    }
    el[_appendChild](ifr);
    doc[_body][_insertBefore](el, doc[_body][_firstChild]);
    src = "javascript:var d=" + _document + ".open();" + (doc[_domain] ? "d."+_domain+"='" + doc[_domain] + "';": "");
    try {
      (ifr[_contentWindow] || ifr)[_document].open();
    } catch(e) {
      ifr[_src] = src + "void(0);";
    }

    _html = ['<head/><'+_body, ie6 ? ' ie6="1"': '' ,' onload=\"var d=', _document, ";d.getElementsByTagName('head')[0].",
          _appendChild, '(d.', _createElement, "('",_script,"')).", _src, "='", url,
          '\'\"></body>'].join('');
    setTimeout(function() { // avoid IE6 problem
      try {
          d = (ifr[_contentWindow] || ifr)[_document];
          d.write(_html);
          d.M = M;
          d.close();
      } catch(e) {
        ifr[_src] = src + 'd.write("' + _html.replace(/\"/g, '\\\"') + '");d.M=parent[\''+ID+'\'];d.close();';
      }
      el = ifr = _null;
    });

    // DOM ready callback
    conf && conf.ready && conf.ready();
  });

// ID, url, conf = {root: 'http://test.com/', domain:'test.com', fixed: '', ready: function(){}}
})('IfrCHAT-10C', 'demo.js?c', {fixed: true});
