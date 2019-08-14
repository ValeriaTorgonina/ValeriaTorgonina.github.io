var close = document.body.querySelector(".close-btn");
var open = document.body.querySelector(".btn--adress");
var form = document.body.querySelector(".form-container");
// var logo = document.body.querySelector(".page-logo");

 
 open.onclick = function(e){
  e.preventDefault();
  form.classList.add('form-container--active')
};

close.addEventListener("click", function(e){
  form.classList.remove('form-container--active');
});
  
// logo.onclick = function(e){
  // e.target.style.background = 'red';
// }