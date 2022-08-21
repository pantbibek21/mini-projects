const newBtn = document.querySelector(".new-btn");
const rollBtn = document.querySelector(".roll-btn");
const holdBtn = document.querySelector(".hold-btn");

const mainScore0 = document.querySelector(".left-player .main-score");
const mainScore1 = document.querySelector(".right-player .main-score");

const currentScore0 = document.querySelector(".left-player .current-score");
const currentScore1 = document.querySelector(".right-player .current-score");

const images = document.querySelectorAll(".dice-wrapper img");


let currentScore = 0;
let activePlayer = 0;
let totalScore = [0,0];

rollBtn.addEventListener("click",()=>{
    let diceNumber = Math.trunc(Math.random() * 6 + 1);
    let imageIndex = diceNumber - 1;

    images.forEach(image => {
        image.style.display = "none";
    })
    images[imageIndex].style.display = "block";

    if(diceNumber != 1){
        currentScore += diceNumber;
         document.getElementById(`score-${activePlayer}`).innerText = currentScore;
    }
    else{
        currentScore = 0;
        togglePlayer();
    }
    
})

function togglePlayer(){
    document.getElementById(`score-${activePlayer}`).innerText = currentScore;
    document.getElementById(`player-${activePlayer}`).classList.toggle("player-active");    
    activePlayer = (activePlayer == 0)? 1: 0;
    document.getElementById(`player-${activePlayer}`).classList.toggle("player-active");
}


holdBtn.addEventListener("click",()=>{
    totalScore[activePlayer] = currentScore;

    //add to main score 
    let previousScore = Number(document.getElementById(`mainScore-${activePlayer}`).innerText);
    document.getElementById(`mainScore-${activePlayer}`).innerText = totalScore[activePlayer] + previousScore;
    if(previousScore + currentScore >= 100){
        document.getElementById(`player-${activePlayer}`).classList.add("winner");
        rollBtn.disabled = true;
        holdBtn.disabled = true;
        return;
    }
    currentScore = 0;
    togglePlayer();
    
})

newBtn.addEventListener("click",()=>{
    currentScore = 0;
    document.getElementById(`player-${activePlayer}`).classList.remove("winner", "player-active");
    activePlayer = 0;
    totalScore = [0,0];
    mainScore0.innerText = 0;
    mainScore1.innerText = 0;
    currentScore0.innerText = 0;
    currentScore1.innerText = 0;
    document.getElementById(`player-${activePlayer}`).classList.add("player-active");  
    rollBtn.disabled = false;
    holdBtn.disabled = false;
})
