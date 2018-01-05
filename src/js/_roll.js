
var col2 = document.getElementsByClassName('content')[0];
var st = 0;

window.addEventListener('scroll', function(){
  st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  
});

console.log(st);
  col2.style.transform = "translate(0, " + st + ")";