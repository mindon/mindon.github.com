var keyLinks = {};
function tagLink( key ) {
  var ikey = key.toLowerCase();
  return '<a href="' + (keyLinks[ikey] || ('http://www.google.com/cse?cx=partner-pub-6997921015773263:4467526896&ie=UTF-8&q=' +encodeURIComponent(ikey))) +'">' + key  +'</a>';
}

function linkTags( tags ) {
  if( !tags )
    return;
  var t = [], i, v;
  for(var k=0, kmax=tags.length; k<kmax; k++) {
    v = tags[k];
    i = v.indexOf('=');
    var key = '';
    if( i > 0 ) {
      key = v.substr(0, i).toLowerCase();
      keyLinks[key] = v.substr( i+1 );
    } else if( i != 0 ) {
      key = v;
    }
    if( key ) {
      t.push( key );
    }
  }

  var trxp = new RegExp('\\b(' + t.join('|') +')\\b', 'gi')
    , tl = '<';
  t = null;

  var pt = /(a|code|pre|xmp|script|textarea|select|embed|object)/i;
  $('.entry-content').find('h1,h2,p,div,span,b,li').each(function() {
    if( this.className != 'adpost' && !pt.test(this.parentNode.tagName) && this.innerHTML ) {
      if( this.innerHTML.indexOf(tl) < 0 ) {
        this.innerHTML = this.innerHTML.replace(trxp, tagLink);
      }
    }
  });
}

if( $('#link-tags').length > 0 ) {
  var tags = $('#link-tags').html().match(/([^;=]+((=[^;]*)|(?=;)|$))/g);
  $('#link-tags').remove();
  linkTags( tags );
}
