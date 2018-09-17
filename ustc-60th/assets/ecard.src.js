var readonly;
/**
 * Mega pixel image rendering library for iOS6 Safari
 *
 * Fixes iOS6 Safari's image file rendering issue for large size image (over mega-pixel),
 * which causes unexpected subsampling when drawing it in canvas.
 * By using this library, you can safely render the image with proper stretching.
 *
 * Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
 * Released under the MIT license
 */
(function() {

  /**
   * Detect subsampling in loaded image.
   * In iOS, larger images than 2M pixels may be subsampled in rendering.
   */
  function detectSubsampling(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (iw * ih > 1024 * 1024) { // subsampling may happen over megapixel image
      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, -iw + 1, 0);
      // subsampled image becomes half smaller in rendering size.
      // check alpha channel value to confirm image is covering edge pixel or not.
      // if alpha value is 0 image is not covering, hence subsampled.
      return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
    } else {
      return false;
    }
  }

  /**
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some images.
   */
  function detectVerticalSquash(img, iw, ih) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
      var alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
  }

  /**
   * Rendering image element (with resizing) and get its data URL
   */
  function renderImageToDataURL(img, options, doSquash) {
    var canvas = document.createElement('canvas');
    renderImageToCanvas(img, canvas, options, doSquash);
    return canvas.toDataURL("image/jpeg", options.quality || 0.8);
  }

  /**
   * Rendering image element (with resizing) into the canvas element
   */
  function renderImageToCanvas(img, canvas, options, doSquash) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (!(iw+ih)) return;
    var width = options.width, height = options.height;
    var ctx = canvas.getContext('2d');
    ctx.save();
    transformCoordinate(canvas, ctx, width, height, options.orientation);
    var subsampled = detectSubsampling(img);
    if (subsampled) {
      iw /= 2;
      ih /= 2;
    }
    var d = 1024; // size of tiling canvas
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = d;
    var tmpCtx = tmpCanvas.getContext('2d');
    var vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1;
    var dw = Math.ceil(d * width / iw);
    var dh = Math.ceil(d * height / ih / vertSquashRatio);
    var sy = 0;
    var dy = 0;
    while (sy < ih) {
      var sx = 0;
      var dx = 0;
      while (sx < iw) {
        tmpCtx.clearRect(0, 0, d, d);
        tmpCtx.drawImage(img, -sx, -sy);
        ctx.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh);
        sx += d;
        dx += dw;
      }
      sy += d;
      dy += dh;
    }
    ctx.restore();
    tmpCanvas = tmpCtx = null;
  }

  /**
   * Transform canvas coordination according to specified frame size and orientation
   * Orientation value is from EXIF tag
   */
  function transformCoordinate(canvas, ctx, width, height, orientation) {
    switch (orientation) {
      case 5:
      case 6:
      case 7:
      case 8:
        canvas.width = height;
        canvas.height = width;
        break;
      default:
        canvas.width = width;
        canvas.height = height;
    }
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        // 180 rotate left
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        break;
      case 4:
        // vertical flip
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6:
        // 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -height);
        break;
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
      case 8:
        // 90 rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-width, 0);
        break;
      default:
        break;
    }
  }

  var URL = window.URL && window.URL.createObjectURL ? window.URL :
            window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
            null;

  /**
   * MegaPixImage class
   */
  function MegaPixImage(srcImage) {
    if (window.Blob && srcImage instanceof Blob) {
      if (!URL) { throw Error("No createObjectURL function found to create blob url"); }
      var img = new Image();
      img.src = URL.createObjectURL(srcImage);
      this.blob = srcImage;
      srcImage = img;
    }
    if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
      var _this = this;
      srcImage.onload = srcImage.onerror = function() {
        var listeners = _this.imageLoadListeners;
        if (listeners) {
          _this.imageLoadListeners = null;
          for (var i=0, len=listeners.length; i<len; i++) {
            listeners[i]();
          }
        }
      };
      this.imageLoadListeners = [];
    }
    this.srcImage = srcImage;
  }

  /**
   * Rendering megapix image into specified target element
   */
  MegaPixImage.prototype.render = function(target, options, callback) {
    if (this.imageLoadListeners) {
      var _this = this;
      this.imageLoadListeners.push(function() { _this.render(target, options, callback); });
      return;
    }
    options = options || {};
    var imgWidth = this.srcImage.naturalWidth, imgHeight = this.srcImage.naturalHeight,
        width = options.width, height = options.height,
        maxWidth = options.maxWidth, maxHeight = options.maxHeight,
        doSquash = !this.blob || this.blob.type === 'image/jpeg';
    if (width && !height) {
      height = (imgHeight * width / imgWidth) << 0;
    } else if (height && !width) {
      width = (imgWidth * height / imgHeight) << 0;
    } else {
      width = imgWidth;
      height = imgHeight;
    }
    if (maxWidth && width > maxWidth) {
      width = maxWidth;
      height = (imgHeight * width / imgWidth) << 0;
    }
    if (maxHeight && height > maxHeight) {
      height = maxHeight;
      width = (imgWidth * height / imgHeight) << 0;
    }
    var opt = { width : width, height : height };
    for (var k in options) opt[k] = options[k];

    var tagName = target.tagName.toLowerCase();
    if (tagName === 'img') {
      target.src = renderImageToDataURL(this.srcImage, opt, doSquash);
    } else if (tagName === 'canvas') {
      renderImageToCanvas(this.srcImage, target, opt, doSquash);
    }
    if (typeof this.onrender === 'function') {
      this.onrender(target);
    }
    if (callback) {
      callback();
    }
    if (this.blob) {
      this.blob = null;
      URL.revokeObjectURL(this.srcImage.src);
    }
  };

  /**
   * Export class to global
   */
  if (typeof define === 'function' && define.amd) {
    define([], function() { return MegaPixImage; }); // for AMD loader
  } else {
    window.MegaPixImage = MegaPixImage;
  }

})();

if(!window._CLICK) {
    window._CLICK = ('ontouchstart' in window)?'tap':'click';
}
var reqAnimationFrame = (function() {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var ds = [0,0,1,0,0,0,1], readonly = true;

var toastTid, toastOb;
function toast(c,kept) {
  if(toastTid) clearTimeout(toastTid);
  if(typeof c == 'number') 
    c = tif[lang][''+c]||'';
  var tsob = $('#mytoast');
  if(!c) {tsob.hide();tsob=null;return;}
  if(tsob.length==0) {
    $(document.body).append('<div id="mytoast"><div>');
    tsob = $('#mytoast');
    tsob.click(function(){
      $(this).hide();
    });
  }
  tsob.html(c).show(); tsob = null;
  if(!kept)
    toastTid = setTimeout(function(){
      $('#mytoast').hide();
    }, 5000);
}

(function(){
var atTarget = $('#myarea').get(0);

var START_X = 0, xoff = 0;
var START_Y = 0, yoff = 0;
var ticking = false;
var transform;

var mc = new Hammer.Manager(document.body);
mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

mc.on("panstart panmove", onPan);
mc.on("rotatestart rotatemove", onRotate);
mc.on("pinchstart pinchmove", onPinch);

function resetElement(d) {
  if(!d) d=[0,0,1,0,0,0,1];
  xoff = 0; yoff = 0;
  transform = {
      translate: { x: START_X +d[0], y: START_Y+d[1] },
      scale: d[2],
      angle: d[3],
      rx: d[4],
      ry: d[5],
      rz: d[6]
  };
  requestElementUpdate();
}

function updateElementTransform() {
    var value = [
                'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
                'scale(' + transform.scale + ', ' + transform.scale + ')',
                'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
    ];
    ds = [transform.translate.x, transform.translate.y,  transform.scale, transform.angle, transform.rx, transform.ry, transform.rz];

    value = value.join(" ");
    atTarget.style.webkitTransform = value;
    atTarget.style.mozTransform = value;
    atTarget.style.transform = value;
    ticking = false;
}

function requestElementUpdate() {
    if(!ticking) {
        reqAnimationFrame(updateElementTransform);
        ticking = true;
    }
}

function onPan(ev) {
    if(readonly || $(ev.target).hasClass("nopan") || $(ev.target).parent().hasClass("nopan")) return true; // locked
    if(ev.type == 'panstart') {

      START_X += xoff;
      START_Y += yoff;
      xoff = 0;
      yoff = 0;
      transform.translate = {
          x: START_X,
          y: START_Y
      };
    } else {
      xoff = ev.deltaX;
      yoff = ev.deltaY;
      transform.translate = {
          x: START_X + ev.deltaX,
          y: START_Y + ev.deltaY
      };
    }
    requestElementUpdate();
}

var initScale = 1;
function onPinch(ev) {
    if(readonly) return true; // locked
    if(ev.type == 'pinchstart') {
        initScale = transform.scale || 1;
    }

    atTarget.className = '';
    transform.scale = initScale * ev.scale;

    requestElementUpdate();
}

var initAngle = 0;
function onRotate(ev) {
    if(readonly) return true;  // locked
    if(ev.type == 'rotatestart') {
        initAngle = transform.angle || 0;
    }

    atTarget.className = '';
    transform.rz = 1;
    transform.angle = initAngle + ev.rotation;
    requestElementUpdate();
}

window.resetEl = resetElement;
})(); // touch manager

var upSrc = '';

function getMyOpts(w0, h0) {
  var x = ds[0], y = ds[1];
  x += refer.left + refer.offset.x;
  y += refer.top + refer.offset.y;
  // init position (screen scale)
  
  var r = Math.max(w0/refer.width, h0/refer.height);
  var offset = {x: refer.width - w0 / r, y: refer.height - h0/r };
  x += offset.x / 2;
  y += offset.y / 2;
  // image position offset inside area (screen scale)

  var scale = 1.0; // render scale
  var angle = ds[3]; // render angle

  var w = (refer.width - offset.x) / refer.ratio,
    h = (refer.height - offset.y) / refer.ratio;

  var opts = {
    x: x / refer.ratio - (ds[2] * w - w)/2,
    y: y / refer.ratio - (ds[2] * h - h)/2,
    scale: scale,
    angle: angle,
    w: ds[2] * w,
    h: ds[2] * h
  };
  return opts;
}

var A2RAD = Math.PI/180.0; 
function drawMe(ctx, img, opts) {
  var x = opts.x || 0, y = opts.y || 0;
  var scale = opts.scale || 1.0,
    angle = (opts.angle || 0) * A2RAD;

  ctx.save();
  var w0 = opts.w, h0 = opts.h;
  var cx = w0/2, cy = h0/2;
  var xt = x, yt = y;
  if(angle != 0.0) {
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.translate(-cx, -cy);

    xt = x * Math.cos(angle) + y*Math.sin(angle);
    yt = -x *Math.sin(angle) + y*Math.cos(angle);
  }

  if(false && scale != 1.0) { // size scaled before draw
    ctx.scale(scale, scale);
    xt += (w0*scale-w0)/2;
    yt += (h0*scale-h0)/2;
  }

  ctx.drawImage(img, xt, yt, w0, h0);
  ctx.restore();
}

var aCanvas, aCTX;
function saveWork() {
  var w = card.width, h = card.height;
  if(!aCTX) {
    aCanvas = document.createElement('canvas');
    aCanvas.style.display = 'none';
    document.body.appendChild(aCanvas);
    $(aCanvas).attr({width: w, height: h});
    aCTX = aCanvas.getContext("2d");
  }
  aCTX.fillStyle = '#FFFFFF';
  aCTX.fillRect(0, 0, w, h);

  var img = $('#myface').get(0);
  var opts = getMyOpts(img.width, img.height);
  drawMe(aCTX, img, opts);
  aCTX.drawImage($('#myimg').get(0), 0, 0, w, h);
  this.href = aCanvas.toDataURL();
}

//--------- choose photo
$('#upform').on('submit',function(e) {
   e.preventDefault();
   var formData = new FormData(this);
   upload(formData); 
});

function upload(data, enctype, url) {
   toast(99,!0);
   $.ajax({
       type:'POST',
       url: url ? url : $('#upform').attr('action'),
       data: data,
       dataType: 'text',
       contentType: enctype? enctype : $('#upform').attr('enctype'),
       processData: false,
       success:function(data){
         var d;
         if(typeof data=='string') {
           try {
             d = JSON.parse(data.replace(/^\s+|\s+$/g,'').replace(/\}[^a-z]*$/, '}'));
           } catch(e){ }
         } else {
           d = data;
         }
         if(d && d.url) {
           upSrc = d.url;
           toast(1);
         } else {
            toast(-1,!0);
         }
       },
       error: function(xhr, textStatus, err){
         toast(-1,!0);
       }
   });
}

function dropChangeHandler(e) {
  toast(9,!0);

  e.preventDefault();
  var target = e.dataTransfer || e.target,
      file = target && target.files && target.files[0],
      options = {
          maxWidth: 8192,
          canvas: true
      };
  if (!file) {
      return;
  }

  var mpImg = new MegaPixImage(file);

  var resImg = $('#myface').get(0);
  mpImg.render(resImg, { maxWidth: ($('#myarea').width() < card.width/2 ? 4: 1)* $('#myarea').width(), maxHeight: ($('#myarea').width() < card.width/2 ? 4: 1) *$('#myarea').height(), quality: 0.85 }, function(){
    $('#myarea').css('background-image', 'url(' +resImg.src +')');
    var tag = ';base64,', i = resImg.src.indexOf(tag);
    var im = resImg.src.substr(0, i).match(/image\/([a-z]+)/);
    i += tag.length;
    setTimeout(function(){
      upload((im?im[1].replace(/jpeg/i, 'jpg'): 'jpg') +';'+ resImg.src.substr(i), 'application/x-www-form-urlencoded');
      mpImg = resImg = null;
      // $('#upform').submit(); // upload using form
    });

  });

}
// file
$('#mypick').on('change', dropChangeHandler);
//---

var ubase = 'http://tips.wechat.com/mojime/', ubase2='http://translate.wechat.com/mojime/';
var cardStyle = Qp.i||'';
var card;
var shareConf;

var refer = {};
function adjArea() {
  if(!card)
    return false;
  var m = {w:$('#mystage').width(), h:$('#mystage').height()};
  var r = Math.max(m.w/card.width, m.h/card.height);
  var moff = {x:(card.width * r -m.w)/2, y:(card.height * r -m.h)/2};
  var area = card.area;
  refer = {left: area.x * r - moff.x , top: area.y * r - moff.y, width: area.w * r, height: area.h *r};
  $('#myarea').css(refer);
  refer.stage = m;
  refer.ratio = r;
  refer.offset = moff;
  adjFile();
}

function adjFile(){
  if($('#myselect').length==0)
      return;
  var zxy = $('#myselect').offset();
  if(zxy) $('#upform').css({left:zxy.left, top: zxy.top, width:$('#myselect').width(), height: $('#myselect').height()});
}

function setMoji(src) {
  $('#myface').attr('src', src);
  $('#myarea').css('background-image', 'url("'+src +'")');
}

var DEFAULT_TITLE = document.title;
var SHARE_TITLE = $('#t_SHARE ' +lang).text();
var SHARE_TITLE2 = SHARE_TITLE;

var SharePack = {
    "appid": "",
    "img_url": 'ecard/' +cardStyle +'-thumb.jpg',
    "img_width": "120",
    "img_height": "120",
    "link": window.location.href,
    "desc": SHARE_TITLE,
    "title": DEFAULT_TITLE
};
$('meta[name="description"], meta[property="og:description"]').attr('content', SHARE_TITLE);

function styCard(styId) {
  if(!cards[styId])
    return false;

  var u = 'ecard/'+styId+'.png';
  $('#myimg').attr('src', u);
  $('#mymask').css('background-image', 'url("'+u +'")');
  if(card) card.last = ds; // keep last modified ds
  card = cards[styId];
  $('#mysave').attr('download', 'mojime-holiday-' +styId +'.png');
  if(card.text) {
    $('#mystage').addClass('text');
    var ts = (card.text.style||'');
    $('#mytext').attr('class', ts ? 'nopan dont ' +ts: 'nopan dont');
    $('#the-text').val(card.text.default || '');
  } else if($('#mystage').hasClass('text')) {
    $('#the-text').val('');
    $('#mystage').removeClass('text');
  }
  if(card.last) {
    ds = card.last;
  } else {
    if(shareConf && shareConf.d && shareConf.i == styId && 
      (!shareConf.u || $('#myface').attr('src').indexOf(shareConf.u) > -1)) {
      ds = shareConf.d.concat(0, 0, 1);
    } else {
      ds = [0,0,1,0,0,0,1];
      if(card.area.deg) {
        ds[3] = card.area.deg;
      }
    }
  }
  cardStyle = styId;
  SharePack.img_url = window.location.href.replace(/[^\/]*[\?#].*$/,'') +'ecard/' + cardStyle +'-thumb.jpg';
  adjArea();
  resetEl(ds);

  if(card.music == false) {
    $('#taskbar').addClass('no-music');
  } else if($('#taskbar').hasClass('no-music')) {
    $('#taskbar').removeClass('no-music');
  }
}

var stylisted = false, skipIds = ['mystyle', 'mycreate', 'listprev', 'listnext', 'stylist', 'listct'];
function stylize(evt) {
  if($(this).hasClass('active')) {
    return;
  }
  $('#stylist:visible').animate({height:0},'fast');
  var at = $(this).parent().find('img.active');
  if(at.length>0) {
    at.removeClass('active');
  }
  $(this).parent().find('img.active').removeClass('active');
  var um = $(this).addClass('active').attr('src').match(/ecard\/(.+)-thumb\.jpg$/);
  if(um) {
    styCard(um[1]);
    if(at.length===0) $('#mypick').click();
    window.ga && ga('send', 'event', 'button', 'click', 'E-Card Style = ' + cardStyle);
  }
}

function stypage(dir) {
  $('#listct img').unbind(_CLICK);
  if(dir==-1 && cardThumbPos>0) {
    cardThumbPos -= 4;
    if(cardThumbPos<0)
      cardThumbPos = 0;
  } else if(dir==1 && cardThumbPos<cardStyles.length-1) {
    cardThumbPos += 4;
  } else if(dir != 0) {
    return;
  }
  if(cardThumbPos==0) {
    if(!$('#listprev').hasClass('none'))
      $('#listprev').addClass('none');
  } else if($('#listprev').hasClass('none')) {
      $('#listprev').removeClass('none');
  }
  if(cardThumbPos+4>=cardStyles.length) {
      if(!$('#listnext').hasClass('none'))
        $('#listnext').addClass('none');
  } else if($('#listnext').hasClass('none')) {
      $('#listnext').removeClass('none');
  }
  var tbc = '', thumbs = cardStyles.slice(cardThumbPos, cardThumbPos+4);
  for(var i=0;i<thumbs.length;i++){var k=thumbs[i]; tbc += '<img src="ecard/'+k+'-thumb.jpg" class="'+(cards[k].be?cards[k].be:'')+(k==cardStyle?' active':'')+'" />';}
  $('#listct').html(tbc).find('img').on(_CLICK, stylize);
}

function styup() {
  if(!stylisted) {
    stylisted = true;
    setMoji('assets/demo.jpg'); // init
    $('#stylist').html('<div id="thumblist" class="nopan"><div id="listprev" class="none"></div><div id="listct" class="nopan"></div><div id="listnext"></div></div>'); // <a id="myselect"></a><a id="mysave" download="mojime.png"></a>
    stypage(0);
    $('#listprev').on(_CLICK, function(){if(!$(this).hasClass('none')) stypage(-1)});
    $('#listnext').on(_CLICK, function(){if(!$(this).hasClass('none')) stypage(1)});
    $('#myselect').on(_CLICK, function(){$('#mypick').click()});
    $('#mysave').on(_CLICK, saveWork);
    setTimeout(adjFile,50);
  }
  if(!$(document.body).hasClass('single')) { // dont display list
      $('#stylist').show().animate({height:95},'fast');
  }
}

$(function(){
  if(Qp.be && /^[\w-\.]+$/.test(Qp.be)) {
      $('#stylist').addClass(Qp.be);
  }
  if(Qp.d) {
    shareConf = JSON.parse(B64.decode(Qp.d));
    var d = shareConf;
    if(d) {
      var dd = d.d;
      if(d.u) {
        upSrc = d.u;
        if(upSrc.charAt(0)=='@') {
          upSrc = ubase +upSrc.substr(1);
        } else if(upSrc.charAt(0)=='>') {
          upSrc = ubase2 +upSrc.substr(1);
        }
        setMoji(upSrc);
        readonly = true;
      }
      if(d.i) {
        styCard(d.i);
      }
      if(d.t) {
        $('#the-text').val(d.t);
      }
    }
  } else {
    styCard(cardStyle||defaultStyle);
  }
  adjArea();

  if(shareConf && shareConf.d) {
      shareConf.d[0] *= refer.ratio;
      shareConf.d[1] *= refer.ratio;
      ds = shareConf.d.concat(0, 0, 1);
      resetEl(ds);
  } else {
    if(card.area.deg) {
      ds[3] = card.area.deg;
    }
    resetEl(ds);
  }
  var initDS = ds.slice(0);
  $(window).resize(adjArea);
  $(document.body).on('dblclick', function(ev){
    var eob = ev.target;
    if(readonly || (eob && ($(eob).hasClass('nopan') || $(eob).parent().hasClass('nopan')))) return; // lock
    initDS[3] = card.area.deg || 0;
    resetEl(initDS);
  }).on(_CLICK, function(evt){
      alert(123);
    if(readonly) return; // lock
    var t = evt.target;
    if(t && skipIds.indexOf(t.id) == -1 && 
      t.parentNode != document.getElementById('stylist')) {
      $('#stylist:visible').animate({height:0},'fast');
    }
  });

  $('#myarea').on(_CLICK, function(){
    if(readonly || $(this).css('background-image').indexOf('assets/demo.jpg')===-1) return; // lock
    $('#mypick').click();
  });
  $('#mystyle').on(_CLICK, function(){
    setTimeout(function(){
        styup();
    }, 10);
  });
});

function shareV(u) {
  var d = ds.slice(0,4);
  d[0] = (d[0]) / refer.ratio;
  d[1] = (d[1]) / refer.ratio;
  if(!u) u = upSrc;
  if(u.indexOf(ubase)===0) {
    u = '@' +u.substr(ubase.length);
  } else if(u.indexOf(ubase2)===0) {
    u = '>' +u.substr(ubase2.length);
  }
  var du = {i:cardStyle,u:u||'assets/demo.jpg',d:d};
  if($('#mystage').hasClass('text')) du.t = $('#the-text').val();
  return B64.encode(JSON.stringify(du));
}

// ----------- for wechat share
if(SharePack.img_url.indexOf('://') < 0) {
    SharePack.img_url = window.location.href.replace(/[^\/]*[\?#].*$/,'') +SharePack.img_url;
}
function shareCb(res) {}

function shareLink(u) {
  if(!u) {
    u = SharePack.link;
  }
  if(u) {
    u = u.replace(/([&\?])(af|d)=[^&#]+/,'');
    u += (u.indexOf('?')>0?'&':'?') +(window.af?'af='+window.af+'&':'')+'d=' +shareV();
    return u;
  } else {
    return window.location.href;
  }
}

function wxTask(cmd, info) {
  var ga = window.ga;
  if(!upSrc) {
    alert(tif[lang]['-3']);
    ga && ga('send', 'event', 'button', 'click', 'E-Card Share Failed - ' + cardStyle);
    return false;
  }
  if(!info) info = SharePack;
  var u = info.url||info.link;
  u = shareLink(u);
  if(info.url) {
    info.url = u;
  } else {
    info.link = u;
  }
  WeixinJSBridge.invoke(cmd, info, shareCb);
  ga && ga('send', 'event', 'button', 'click', 'E-Card Share - ' + cardStyle +': ' + cmd);
}
function onWxReady(){
   document.getElementsByTagName('html')[0].className = 'wechat';

   WeixinJSBridge.on('menu:share:appmessage', function(argv){ wxTask('sendAppMessage') });
   WeixinJSBridge.on('menu:share:timeline', function(argv){ wxTask('shareTimeline') });
   WeixinJSBridge.on('menu:share:weibo', function(argv){ wxTask('shareWeibo', {"content": SharePack.title, "url":SharePack.link}) });
   WeixinJSBridge.on('menu:share:facebook', function(argv){ wxTask('shareFB') });
}

if(document.addEventListener){
   document.addEventListener('WeixinJSBridgeReady', onWxReady, false);
} else if(document.attachEvent){
   document.attachEvent('WeixinJSBridgeReady'   , onWxReady);
   document.attachEvent('onWeixinJSBridgeReady' , onWxReady);
}

$(function(){
  $('#myshare').on(_CLICK, function(){
    readonly = true;
    window.touchEmulatorOff = true;
    $('#mytips').show().find('input').val(shareLink()).focus();
  });

  $('#mycreate').on(_CLICK, function(evt){
    evt.stopPropagation();
    $('#mystage').removeClass('readonly');
    if(card.text && card.text.default) {
        $('#the-text').val(card.text.default);
    }
    readonly = false;
    setTimeout(function() {
        styup();
        $('#mystage').removeClass('create');
    }, 10);
  });
  $('#mytips').on(_CLICK, function(evt){
    if(evt.target.tagName=='INPUT')
      return true;
    $(this).hide();
    readonly = false;
    window.touchEmulatorOff = false;
  });
  $('#mytips .web input').focus(function(){this.select()});
  $('#mytry').on(_CLICK, function(){window.open($('#mytips .web input').val())});
});