//accessing the placeholders
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const period = document.getElementById("period");

//defining the variables
let time = new Date();
let hr = time.getHours();
let min = time.getMinutes();
let sec = time.getSeconds();
let dayNight = "PM";
//this counter will help to toggle AM PM
let counter = 0;
//initially hardcoded the period
period.innerText = dayNight;

//calls digitalClock function every second
setInterval(() => {
    digitalClock();
}, 1000)

const digitalClock = function () {
    sec++;
    if (sec == 60) {
        sec = 0;
        min++;
    }

    (sec < 10) ? second.innerText = "0" + sec : second.innerText = sec;

    if (min == 60) {
        hr++;
        min = 0;
    }

    (min < 10) ? minute.innerText = "0" + min : minute.innerText = min;

    if (hr > 12) {
        hr = hr - 12;
        counter = 0;
    }

    (hr < 10) ? hour.innerText = "0" + hr : hour.innerText = hr;

    if (hr == 12) {
        counter++;
        if (counter == 1)
            dayNight = (dayNight == "AM") ? "PM" : "AM";
        period.innerText = dayNight;
    }
}


// Basically there are multiple ways of creating digital clock 
//we could have simple called our local time every sec and print it.