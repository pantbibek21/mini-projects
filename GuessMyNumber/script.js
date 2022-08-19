"use strict";

//getting access to element nodes

const againBtn = document.querySelector(".top-bar .btn");
const checkBtn = document.querySelector(".left .btn");
let inputNumber = document.querySelector(".left input");
let resultMsg = document.querySelector(".right .result");
let score = document.getElementById("score-number");
let highscore = document.getElementById("high-score-number");
let secretNumber = document.querySelector(".header .secret-number");
let gameWon = false;

//global variable declaration
let currentScore = 20;

//random number generator
function generateRandomNumber() {
    return (Math.trunc(Math.random() * 20 + 1));
}
let randomNumber = generateRandomNumber();

//attaching event to check button
checkBtn.addEventListener('click', checkGuessedNumber);

//function to validate guessed number and display appropriate message
function checkGuessedNumber() {

    let currentNumber = inputNumber.value;
    //depending on whether difference is positive or negative, we set message

    let difference = currentNumber - randomNumber;

    //depending on gap, we will set different  message

    let numberGap = Math.abs(randomNumber - currentNumber);

    if (currentNumber == "") {
        displayMessage("💥 No Number!");
    }

    //when the guessed number is correct
    else if (numberGap == 0) {
        displayMessage("🎉 Correct Number!");
        document.body.style.backgroundColor = "#2bdb0f";
        secretNumber.innerHTML = randomNumber;
        checkHighScore(currentScore);
        checkBtn.disabled = true;
        gameWon = true;
    }
    else if (currentNumber > 20) {
        displayMessage("🚧 Out of range !");
        reduceScore();
    }

    else if (numberGap > 0 && numberGap <= 4) {
        (difference > 0) ? displayMessage("Little High!") : displayMessage("Little Low!");
        reduceScore();

    }
    else if (numberGap > 4 && numberGap <= 9) {
        (difference > 0) ? displayMessage("High!") : displayMessage("Low!");
        reduceScore();
    }
    else if (numberGap >= 10 && numberGap <= 16) {
        (difference > 0) ? displayMessage("Very High!") : displayMessage("Very Low!");
        reduceScore();
    }
    else {
        resultMsg.innerHTML = "☃️ Gone AntarTica!"
        reduceScore();
    }
}

//function to display message 
const displayMessage = (message) => {
    resultMsg.innerHTML = `${message}`;
}

//function to reduce score with every incorrect guess
const reduceScore = () => {
    if (currentScore == 1) {
        gameLost();
    }
    currentScore--;
    score.innerHTML = `${currentScore}`;
}

//attaching event handler to again Button to play again
againBtn.addEventListener('click', () => {
    currentScore = 20;
    randomNumber = generateRandomNumber();
    console.log(randomNumber);
    resetEverything();
    checkBtn.disabled = false;
})

//function to be called when game is lost
const gameLost = () => {
    displayMessage("😭 You lost!");
    document.body.style.backgroundColor = "red";
    secretNumber.innerHTML = randomNumber;
    checkBtn.disabled = true;
}

// reset everything back to original interface
const resetEverything = () => {
    score.innerHTML = "20";
    document.body.style.backgroundColor = "#222";
    secretNumber.innerHTML = "?";
    inputNumber.value = "";
    displayMessage("🤔 Start Guessing...");
}

//check the previous highscore before setting new highscore
const checkHighScore = (currentScore) => {
    let previousHighScore = parseInt(highscore.innerHTML);
    if (previousHighScore < currentScore) {
        highscore.innerHTML = `${currentScore}`;
    }
}

document.onkeydown = (e) => {
    if (e.key == 'Enter') {
        if(!gameWon){
            checkGuessedNumber();
        }
        
    }
}