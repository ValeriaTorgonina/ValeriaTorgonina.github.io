myTimer();
var myVar = setInterval(function() {
    myTimer()
}, 1000);

function myTimer() {
    var dateThen = new Date(2020 , 10, 29, 10, 10, 10);
    var dateNow = new Date();
    var diff = dateThen - dateNow;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff - (days * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff - (hours * 1000 * 60 * 60) - (days * 1000 * 60 * 60 * 24)) / (1000 * 60));
    var seconds = Math.floor((diff - (minutes * 1000 * 60) - (hours * 1000 * 60 * 60) - (days * 1000 * 60 * 60 * 24)) / (1000));

    var daysElements = document.querySelector('#days-timer');
    var hoursElements = document.querySelector('#hours-timer');
    var minutesElements = document.querySelector('#minutes-timer');
    var secondsElements = document.querySelector('#seconds-timer');

    daysElements.innerHTML = days;
    hoursElements.innerHTML = hours;
    minutesElements.innerHTML = minutes;
    secondsElements.innerHTML = seconds;
}