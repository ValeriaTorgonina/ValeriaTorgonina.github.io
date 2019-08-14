var loginForm = document.body.querySelector(".log-in-form");
var signIn = document.body.querySelector(".sign-in");
var closeLoginForm = loginForm.querySelector(".close-btn");

var map = document.body.querySelector(".map");
var mapTrigger = document.body.querySelector("#map-trigger");
var closeMap = map.querySelector(".close-btn");

signIn.onclick = function() { 
    loginForm.removeAttribute('hidden');
}

closeLoginForm.onclick = function() {
    loginForm.setAttribute('hidden', '');
}

mapTrigger.onclick = function() {
    map.removeAttribute('hidden');
}

closeMap.onclick = function() {
    map.setAttribute('hidden', '');
}