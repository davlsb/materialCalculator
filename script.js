//create variables for current input, last result, operand

let currInput = "";
let lastRes = "";
let operand = "";

let buttons = document.querySelector("#buttons");
let screenInput = document.querySelector("#currentNumber");

buttons.addEventListener("click", (event) => {
    if(event.target.tagName === 'BUTTON') {
        if(event.target.classList.contains('num')){
            currInput = currInput + event.target.innerText;
            screenInput.innerText = currInput;
        }
    }
});