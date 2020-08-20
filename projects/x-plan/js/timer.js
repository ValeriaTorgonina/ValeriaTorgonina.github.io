myTimer();
var myVar = setInterval(function() {
    myTimer()
}, 1000);

function myTimer() {
    var dateThen = new Date(2020 , 11, 0);
    var dateNow = new Date();
    var diff = dateThen - dateNow;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff - (days * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff - (hours * 1000 * 60 * 60) - (days * 1000 * 60 * 60 * 24)) / (1000 * 60));

    var daysArr = days.toString().split('');
    var hoursArr = hours.toString().split('');
    var minutesArr = minutes.toString().split('');

    if(daysArr.length < 3) {
        while(daysArr.length < 3) {
            daysArr.unshift('0');
        }
    }

    if(hoursArr.length < 2) {
        while(hoursArr.length < 2) {
            hoursArr.unshift('0');
        }
    }

    if(minutesArr.length < 2) {
        while(minutesArr.length < 2) {
            minutesArr.unshift('0');
        }
    }

    var daysElements = document.querySelectorAll('#days .timer__counter-item');
    var hoursElements = document.querySelectorAll('#hours .timer__counter-item');
    var minutesElements = document.querySelectorAll('#minutes .timer__counter-item');

    Array.prototype.forEach.call(daysElements, function(el, i) {
        el.innerHTML = daysArr[i];
    })
    Array.prototype.forEach.call(hoursElements, function(el, i) {
        el.innerHTML = hoursArr[i];
    })
    Array.prototype.forEach.call(minutesElements, function(el, i) {
        el.innerHTML = minutesArr[i];
    })
}