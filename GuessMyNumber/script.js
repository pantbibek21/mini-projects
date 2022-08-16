"use strict";

const againBtn = document.querySelector(".top-bar .btn");
const checkBtn = document.querySelector(".left .btn");
let inputNumber = document.querySelector(".left input");
let resultMsg = document.querySelector(".right .result");
let score = document.getElementById("score-number");
let highscore = document.getElementById("high-score-number");
let secretNumber = document.querySelector(".header .secret-number");



var currentScore = 20;

function generateRandomNumber() {

    return Math.trunc(Math.random() * 20 + 1);

}
let randomNumber = generateRandomNumber();


const checkHighScore = (currentScore) => {
   let previousHighScore = parseInt(highscore.innerHTML);
    if (previousHighScore < currentScore) {
        highscore.innerHTML = `${currentScore}`;
    }
}
checkBtn.addEventListener('click', () => {

    let currentNumber = inputNumber.value;
    let difference = currentNumber - randomNumber;
    let numberGap = Math.abs(randomNumber - currentNumber);
    if (numberGap == 0) {
        resultMsg.innerHTML = "🎉 Correct Number!"
        document.body.style.backgroundColor = "#2bdb0f";
        secretNumber.innerHTML = randomNumber;
        checkHighScore(currentScore);

    }

    else if (numberGap > 0 && numberGap <= 4) {
        if (difference > 0) {
            resultMsg.innerHTML = "Little High!";
        }
        else {
            resultMsg.innerHTML = "Little Low!";
        }
        reduceScore();

    }
    else if (numberGap > 4 && numberGap <= 9) {
        if (difference > 0) {
            resultMsg.innerHTML = "High!";
        }
        else {
            resultMsg.innerHTML = "Low!";
        }
        reduceScore();
    }
    else if (numberGap > 10 && numberGap <= 16) {
        if (difference > 0) {
            resultMsg.innerHTML = "Very High!"
        }
        else {
            resultMsg.innerHTML = "Very Low!";
        }
        reduceScore();
    }
    else {
        resultMsg.innerHTML = "Gone AntarTica!"
        reduceScore();
    }
})


const reduceScore = () => {
    currentScore--;
    score.innerHTML = `${currentScore}`;
}

againBtn.addEventListener('click', () => {
    currentScore = 20;
   randomNumber = generateRandomNumber();
    console.log(randomNumber);
    resetEverything();

})

const resetEverything = () => {
    score.innerHTML = "20";
    document.body.style.backgroundColor = "#222";
    secretNumber.innerHTML = "?";
    inputNumber.value = "";
}