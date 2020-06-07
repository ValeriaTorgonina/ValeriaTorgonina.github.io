(function getTime () {
    const arrowHour = document.querySelector('.hour');
    const arrowMin = document.querySelector('.minute');
    const arrowSec = document.querySelector('.second');
    const hourAngle = 360 / 720;
    const minuteAngle = 360 / 60;
    const numberOfHours = 12;
    const numberOfMinutes = 60;
    setInterval(() => {
        const date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        arrowHour.style.transform = `translate(-50%, -50%) rotate(${hour > 
            numberOfHours ? 
            hourAngle * ((hour - numberOfHours) * numberOfMinutes + minute): 
            hourAngle * (hour * numberOfMinutes + minute)
        }deg)`;
        arrowMin.style.transform = `translate(-50%, -50%) rotate(${minuteAngle * minute}deg)`;
        arrowSec.style.transform = `translate(-50%, -50%) rotate(${minuteAngle * second}deg)`;
    }, 1000);
})();

(function getDate () {
    const allMonths = ['Dec','Jan','Feb','Mar','Apr','May','June',`July`,`Aug`,`Sept`,`Oct`,`Nov`];
    const monthItem = document.querySelector('.month');
    const dayItem = document.querySelector('.day');
    const date = new Date();
    let month = allMonths.find((item, i) => i == date.getMonth())
    let day = date.getDate();
    monthItem.innerHTML = `${month}`;
    dayItem.innerHTML = `${day}`;
})();

const drawGarland = function (garland) {
    const bulbs = document.querySelectorAll(`${garland} .garland__bulb`);
    const bulbsArray = Array.from(bulbs);
    bulbsArray.map((bulb, i) => {
        const left = 40;
        const bottom = Math.cos((i)/9.5)*-18;
        const rotate  = -4;
        bulb.style.left = `${50 + left * i}px`;
        bulb.style.bottom = `${60 + bottom * i}px`;
        bulb.style.transform = `rotate(${30 + rotate * i}deg)`;
    })
};

(function toggleLight () {
    const toggler = document.querySelector('.toggler');
    toggler.addEventListener('click', function() {
        const garlands = document.querySelectorAll('.garland');
        const blackWall = document.querySelector('.black-wall');
        this.classList.toggle('light');
        blackWall.classList.toggle('light');
        garlands.forEach(garland => garland.classList.toggle('light'));
    })
})();

drawGarland('.garland');
drawGarland('.garland--right');