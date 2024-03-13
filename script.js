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

        if(event.target.classList.contains('op')) {
            if (
                lastRes.length > 0 &&
                /^[\+\-\/\x]$/.test(lastRes[lastRes.length - 1]) &&
                currInput === ""
            ) {
                // Replace the last operand in the array
                lastRes[lastRes.length - 1] = event.target.id;
                console.log(pastCalc.innerText.length);
                console.log(currInput);
                let pastCalcText = pastCalc.innerText;
                pastCalc.innerText = pastCalcText.slice(0, -1) + event.target.id + " ";
            } else {
                console.log("it won't get here");
                operand = event.target.id;
                lastRes.push(currInput, operand);
                pastCalc.innerText += " " + currInput + " " + operand + " ";
                screenInput.innerHTML = '<span class="input-cursor"></span>';
                currInput = "";
            }
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
            if (Math.abs(newResult) >= 1e10) {
                // Convert the number to exponential notation
                newResult = newResult.toExponential();
            }
            if(!error) screenInput.innerText = String(newResult);
            else{
                screenInput.innerText = "You tried to divide by 0. AC and try again.";
                screenInput.style.overflow = "visible"; // Allow overflow
                screenInput.style.whiteSpace = "wrap"; // No whitespace wrapping
                screenInput.style.direction = "ltr"; // Direction is left-to-right (normal)
            }
            currInput = newResult;
        }
        if(event.target.classList.contains('github')){
            window.open("https://github.com/davlsb", '_blank').focus();
        }

        if(event.target.classList.contains('reset')){
            currInput = "";
            screenInput.style.overflow = "hidden"; // no overflow
            screenInput.style.whiteSpace = "nowrap"; // No whitespace wrapping
            screenInput.style.direction = "rtl"; // Direction is right-to-left
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
    const isOperator = ['+', '-', '*', '/', 'x'].includes(event.key);
    const isEnter = event.key === 'Enter';
    const isBackspace = event.key === 'Backspace';

    if (isNumber) {
        currInput += event.key;
        screenInput.innerText = currInput;
    } else if (isOperator) {
        if (
            lastRes.length > 0 &&
            /^[\+\-\*\/\x]$/.test(lastRes[lastRes.length - 1]) &&
            currInput === ""
        ) {
            console.log(event.key);
            
            lastRes[lastRes.length - 1] = event.key;
            let pastCalcText = pastCalc.innerText;
            console.log(pastCalcText);
            pastCalc.innerText = pastCalcText.slice(0, -1) + event.key + " ";
        } else {
            operand = event.key;
            lastRes.push(currInput, operand);
            pastCalc.innerText += " " + currInput + " " + operand + " ";
            screenInput.innerHTML = '<span class="input-cursor"></span>';
            currInput = "";
        }
    }  else if (isBackspace) {
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
                case "x":
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
        if (Math.abs(newResult) >= 1e10) {
            // Convert the number to exponential notation
            newResult = newResult.toExponential();
        }
        if(!error) screenInput.innerText = String(newResult);
        else{
            screenInput.innerText = "You tried to divide by 0. AC and try again.";
            screenInput.style.overflow = "visible"; // Allow overflow
            screenInput.style.whiteSpace = "wrap"; // No whitespace wrapping
            screenInput.style.direction = "ltr"; // Direction is left-to-right (normal)
        }

        currInput = newResult.toString(); // Set current input to the result
    }
  });

function deleteScreen(){
    //add a cute little fade to the background to AC button color;
    let screen = document.querySelector("#screen");
    let acColor = getComputedStyle(document.querySelector("#AC")).backgroundColor;
    console.log(acColor);
    let previousColor = screen.style.backgroundColor;
    screen.style.backgroundColor = acColor;
    setTimeout(function(){
        screen.style.backgroundColor = previousColor;
   },300);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Get the stored theme or use the system theme
var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(storedTheme);

// Listener to detect changes in system theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    setTheme(e.matches ? 'dark' : 'light');
});

