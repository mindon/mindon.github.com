(window.deKi && deKi()) || (function() {
if( window.location.href.indexOf('https://www.amazon.com/gp/digital/fiona/manage') !== 0 ) {
  alert( 'Only works in https://www.amazon.com/gp/digital/fiona/manage' );
  return window.open("https://www.amazon.com/gp/digital/fiona/manage");
}

function _dkiOb(id){return document.getElementById(id)}

var prefix = '_dki_', css = ' style="cursor:pointer;padding:0 6px; display:inline-block;margin-left:6px;background:<bgc>;"';

window.deKi = function(flag) {
  var t = _dkiOb(prefix +'dekiArea')
    , hidden = t.style.display == 'none' || flag === true;
  t.style.display = hidden ? 'block' : 'none';

  if( hidden ) {
    _dkiOb(prefix+'confirm').style.display = 'none';
    _dkiOb(prefix+'del').style.display = 'block';
    _dkiOb(prefix +'word').focus();
  }
  t = null;
  return true; //!
}

var delKeys = [];

function del(n){
  delKeys = [];
  if( n )
    n = n.toLowerCase();

  var a=document.getElementsByClassName('rowHeaderCollapsed');
  for(var i = 0; i<a.length; i++){
   if (!n || a[i].getElementsByClassName('headerTitle')[0].textContent.toLowerCase().indexOf(n) > -1) {
      var id = a[i].getElementsByTagName('input')[1].value;
      delKeys.push(id);
    }
  }
};

var d = document.createElement('div');
d.id = prefix+'dekiArea';
d.style.cssText = 'display:none;border:8px solid #66A0D6;background:#fff;width:360px;position:fixed;right:16px;top:16px;border-radius:8px;z-index:999999;-webkit-box-shadow:0 7px 8px rgba(128,128,128,0.9);';
d.innerHTML = '<div style="margin:16px"><a id="'+prefix+'close"'+css.replace(/<bgc>/,'#c30;color:#fff;border-radius:3px;')+'>×</a> Filter: <input id="'+prefix+'word" placeholder="Search your library" style="width:230px"/></div><div style="display:block;line-height:3em;background: #66A0D6;color:#fff;text-align:center;" id="'+prefix+'del"><b>DeKi</b>: Delete Kindle Items <a id="'+prefix+'start"'+css.replace(/<bgc>/,'#fe0;color:#66A0D6')+'>Delete</a></div><div style="line-height:3em;display:none;background:#66A0D6;color:#fff;text-align:center;" id="'+prefix+'confirm">Delete <b id="'+prefix+'count"></b> Item(s) Permanently? <a'+css.replace(/<bgc>/,'#ccc;color:#fff')+' id="'+prefix+'no">No</a> <a'+css.replace(/<bgc>/,'#fe0;color:#66A0D6')+' id="'+prefix+'yes">Yes</a></div><p align="center" style="margin:2px 0;opacity:0.2"><b>DeKi</b> by <a href="https://mindon.github.io">https://mindon.github.io</a></p>';
document.body.appendChild( d );
_dkiOb(prefix +'close').onclick = function(){
  _dkiOb(prefix +'dekiArea').style.display = 'none';
  _dkiOb(prefix+'confirm').style.display = 'none';
  _dkiOb(prefix+'del').style.display = 'block';
};
d = null;

_dkiOb(prefix +'word').oninput = function() {
  _dkiOb('searchTextId').value = this.value;
  _dkiOb('searchTextGoButton').click();

  if( _dkiOb(prefix+'confirm').style.display != 'none' ) {
    _dkiOb(prefix+'confirm').style.display = 'none';
    _dkiOb(prefix+'del').style.display = 'block';
  }
};
_dkiOb(prefix+'start').onclick = function(){
  del();

  _dkiOb(prefix+'count').innerHTML = /^\s*$/.test( _dkiOb(prefix+'word').value ) ? 'All('+delKeys.length+')' : delKeys.length;

  _dkiOb(prefix+'del').style.display = 'none';
  _dkiOb(prefix+'confirm').style.display = 'block';

};

_dkiOb(prefix+'no').onclick = function(){
  _dkiOb(prefix+'confirm').style.display = 'none';
  _dkiOb(prefix+'del').style.display = 'block';
};

_dkiOb(prefix+'yes').onclick = function(){
  deKi(true);
  for(var i = 0; i<delKeys.length; i++){Fion.deleteItem('deleteItem_'+delKeys[i]);}  
};

deKi();
})();