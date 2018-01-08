var wrapper = document.getElementsByClassName('columns')[0];
var col1 = document.getElementsByClassName('columns__col1')[0];
var col2 = document.getElementsByClassName('columns__col2')[0];
var items = col2.getElementsByClassName('content').length;

window.addEventListener('DOMContentLoaded', function() {
  col2.style = "top: -" + (items-1) * 100 + "vh";
  console.log('yay!');
}, false);


wrapper.addEventListener('scroll', function(){
  var s = wrapper.pageYOffset || wrapper.scrollTop || 0; //sets scrolltop :)
  col2.style = "top: -" + (items-1) * 100 + "vh;transform:translate(0," +(s*2)
   + "px);" //this sets top position of the element; above is an "if" statement in RegExp
});

//TODO: problem is in scrollbar; when col2 reach a "top = 0" and it up, then scrollbar makes smaller :/
