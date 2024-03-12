//create variables for current input, last result, operand

let currInput = "";
let lastRes = "";
let operand = "";

let buttons = document.querySelector("#buttons");
let screenInput = document.querySelector("#currentNumber");
let pastCalc = document.querySelector("#pastCalc");

buttons.addEventListener("click", (event) => {
    if(event.target.tagName === 'BUTTON') {
        if(event.target.classList.contains('num')){
            currInput = currInput + event.target.innerText;
            screenInput.innerText = currInput;
        }
        if(event.target.classList.contains('op')){
            operand = event.target.id;
            lastRes = [currInput, operand];
            pastCalc.innerText = lastRes[0] + " " + lastRes[1];
            screenInput.innerHTML = '<span class="input-cursor"></span>';
            currInput = "";
        }
        if (event.target.classList.contains('back')) {
            console.log(currInput);
            // Trim currInput to remove leading and trailing whitespace
            currInput = currInput.trim();
            // Check if currInput is not empty
            if (currInput !== "") {
                // Remove the last character from currInput
                currInput = currInput.substring(0, currInput.length - 1);
                screenInput.innerText = currInput;
            }
            if (currInput === "") {
                screenInput.innerHTML = '<span class="input-cursor"></span>';
            }
        }
        if(event.target.classList.contains('eq')){
            let newResult = "";
            switch(lastRes[1]){
                case "x":
                    newResult = Number(lastRes[0]) * Number(currInput);
                    break;
                case "/":
                    newResult = Number(lastRes[0]) / Number(currInput);
                    break;
                case "+":
                    newResult = Number(lastRes[0]) + Number(currInput);
                    break;
                case "-":
                    newResult = Number(lastRes[0]) - Number(currInput);
                    break;
            } 
            pastCalc.innerText = lastRes[0] + " " + lastRes[1] + " " + currInput;
            screenInput.innerText = String(newResult);
            currInput = String(newResult);
        }
        if(event.target.classList.contains('github')){
            window.open("https://github.com/davlsb", '_blank').focus();
        }
    }
});