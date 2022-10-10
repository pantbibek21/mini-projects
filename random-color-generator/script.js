//accessing the elements

let body = document.querySelector("body");
let button = document.getElementById("button");
let colorBox = document.getElementById("sample-color-box");

//adding the event listener to button 
button.addEventListener("click", generateRandomColor);

//function to generate the random color code
function generateRandomColor() {
    let randomNumber = Math.random();
    let hexColorCode = randomNumber.toString(16);
    hexColorCode = hexColorCode.substring(2, 8);
    hexColorCode = "#" + hexColorCode;
    colorBox.style.backgroundColor = hexColorCode;
    body.style.backgroundColor = hexColorCode;
}