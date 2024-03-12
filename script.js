//create variables for current input, last result, operand

let currInput = "";
let lastRes = [];
let operand = "";

let buttons = document.querySelector("#buttons");
let screenInput = document.querySelector("#currentNumber");
let pastCalc = document.querySelector("#pastCalc");

// create a stack, the stack will show on the top line every time we click +, -, /, *

buttons.addEventListener("click", (event) => {
    if(event.target.tagName === 'BUTTON') {
        if(event.target.classList.contains('num')){
            currInput = currInput + event.target.innerText;
            screenInput.innerText = currInput;
        }

        if(event.target.classList.contains('op')){
            operand = event.target.id;
            lastRes.push(currInput, operand);
            pastCalc.innerText += " " + currInput + " " + operand + " ";
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
            pastCalc.innerText += " " + currInput + " =";
            lastRes.push(currInput);
            
            let newResult = Number(lastRes[0]); // Start with the first number in the array
            let error = false;


            for (let i = 1; i < lastRes.length; i += 2) {
                let operator = lastRes[i];
                let operand = lastRes[i + 1];
                
                switch (operator) {
                    case "x": // Assuming "x" represents multiplication
                        newResult *= Number(operand);
                        break;
                    case "/":
                        if (Number(operand) === 0) {
                            console.log("Error: Division by zero detected.");
                            error = true;
                            break;
                        }
                        newResult /= Number(operand);
                        break;
                    case "+":
                        newResult += Number(operand);
                        break;
                    case "-":
                        newResult -= Number(operand);
                        break;
                }
                if (error) {
                    break; // break out of the loop if error occurred
                }
            }
            lastRes = [];
            pastCalc.innerText = " ";
            if(!error) screenInput.innerText = String(newResult);
            else screenInput.innerText = "You tried to divide by 0. AC and try again.";
            currInput = newResult;
        }
        if(event.target.classList.contains('github')){
            window.open("https://github.com/davlsb", '_blank').focus();
        }

        if(event.target.classList.contains('reset')){
            currInput = "";
            lastRes = [];
            operand = "";
            pastCalc.innerText = " ";
            screenInput.innerHTML = '<span class="input-cursor"></span>';
            deleteScreen();
        }
    }
});


document.addEventListener('keydown', function(event) {
    const isNumber = isFinite(event.key);
    const isOperator = ['+', '-', '*', '/'].includes(event.key);
    const isEnter = event.key === 'Enter';
    const isBackspace = event.key === 'Backspace';

    if (isNumber) {
        currInput += event.key;
        screenInput.innerText = currInput;
    } else if (isOperator) {
        operand = event.key;
        lastRes.push(currInput, operand);
        pastCalc.innerText += " " + currInput + " " + operand + " ";
        screenInput.innerHTML = '<span class="input-cursor"></span>';
        currInput = "";
    } else if (isBackspace) {
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
    } else if (isEnter) {
        pastCalc.innerText += " " + currInput + " =";
        lastRes.push(currInput);
        
        let newResult = Number(lastRes[0]); // Start with the first number in the array
        let error = false;

        for (let i = 1; i < lastRes.length; i += 2) {
            let operator = lastRes[i];
            let operand = lastRes[i + 1];
            
            switch (operator) {
                case "*":
                    newResult *= Number(operand);
                    break;
                case "/":
                    if (Number(operand) === 0) {
                        console.log("Error: Division by zero detected.");
                        error = true;
                        break;
                    }
                    newResult /= Number(operand);
                    break;
                case "+":
                    newResult += Number(operand);
                    break;
                case "-":
                    newResult -= Number(operand);
                    break;
            }
            if (error) {
                break; // break out of the loop if error occurred
            }
        }
        lastRes = [];
        pastCalc.innerText = " ";
        if(!error) screenInput.innerText = String(newResult);
        else screenInput.innerText = "You tried to divide by 0. AC and try again.";
        currInput = newResult.toString(); // Set current input to the result
    }
  });

function deleteScreen(){
    //add a cute little fade to the background in red;
    let screen = document.querySelector("#screen");
    screen.style.backgroundColor = "#ffdad6";
    setTimeout(function(){
        screen.style.backgroundColor = "#f7efc7";
   },300);
}