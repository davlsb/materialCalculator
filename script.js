//create variables for current input, last result, operand

let currInput = "";
let lastRes = [];
let operand = "";

let buttons = document.querySelector("#buttons");
let screenInput = document.querySelector("#currentNumber");
let pastCalc = document.querySelector("#pastCalc");

// create a stack, the stack will show on the top line every time we click +, -, /, *

buttons.addEventListener("click", (event) => {
    if(event.target.tagName === 'BUTTON' || event.target.tagName === "svg" || event.target.tagName === "path") {
        
        if(event.target.classList.contains('num')){
            currInput = currInput + event.target.innerText;
            screenInput.innerText = currInput;
        } else if (event.target.classList.contains('op')) {
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
                operand = event.target.id;
                lastRes.push(currInput, operand);
                pastCalc.innerText += " " + currInput + " " + operand + " ";
                screenInput.innerHTML = '<span class="input-cursor"></span>';
                currInput = "";
            }
        } else if (event.target.classList.contains('percent')) {
            currInput = Number(currInput) * 0.01;
            screenInput.innerText = currInput;
        } else if (event.target.classList.contains('back')) {
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
        } else if (event.target.classList.contains('eq')){
            pastCalc.innerText += " " + currInput + " =";
            lastRes.push(currInput);
            currInput = (calculateExpression());
            let formattedNumber = formatNumber(currInput);
            if(!screenInput.innerText.startsWith("You tried")) screenInput.innerText = String(formattedNumber);
        } else if (event.target.classList.contains('github')){
            window.open("https://github.com/davlsb", '_blank').focus();
        } else if (event.target.classList.contains('reset')){
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
    const isEnter = event.key === 'Enter' || ['='].includes(event.key);;
    const isBackspace = event.key === 'Backspace';
    const isPercentage = event.key === "%";

    if (isNumber) {
        currInput += event.key;
        screenInput.innerText = currInput;
    } else if (isPercentage) {
        currInput = Number(currInput) * 0.01;
        screenInput.innerText = currInput;
    } else if (isOperator) {
        if (
            lastRes.length > 0 &&
            /^[\+\-\*\/\x]$/.test(lastRes[lastRes.length - 1]) &&
            currInput === ""
        ) {
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

        currInput = (calculateExpression());
        let formattedNumber = formatNumber(currInput);
        if(!screenInput.innerText.startsWith("You tried")) screenInput.innerText = String(formattedNumber);
    }
  });


function calculateExpression() {
    let newResult = Number(lastRes[0]);
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

    if (!error) {
        screenInput.innerText = String(newResult);
    } else {
        screenInput.innerText = "You tried to divide by 0. AC and try again.";
        screenInput.style.overflow = "visible"; // Allow overflow
        screenInput.style.whiteSpace = "wrap"; // No whitespace wrapping
        screenInput.style.direction = "ltr"; // Direction is left-to-right (normal)
    }

    return newResult.toString(); // Set current input to the result
}


function deleteScreen(){
    let currNum = document.querySelector("#currentNumber");
    let screen = document.querySelector("#screen");
    let acColor = getComputedStyle(document.querySelector("#AC")).backgroundColor;
    let previousColor = screen.style.backgroundColor;
    currNum.classList.add('ripple');
    //add a cute little fade to the background to AC button color;
    //screen.style.backgroundColor = acColor;
    setTimeout(function(){
        currNum.classList.remove('ripple');
        //screen.style.backgroundColor = previousColor;
   },400);
}


function formatNumber(currInput) {
    // Convert to string to count digits
    let numString = currInput.toString();

    // Check if the absolute value of the number is greater than or equal to 1 million
    if (Math.abs(currInput) >= 1e6) {
        // Convert the number to exponential notation
        let newResult = Number(currInput).toExponential();
        // Check if the length of the resulting string is greater than 9
        if (newResult.length > 9) {
            // If it's greater than 9, display the first 9 digits followed by the exponent
            let exponentPart = newResult.slice(newResult.indexOf('e'));
            newResult = numString.slice(0, 9) + exponentPart;
        }
        return newResult;
    } else {
        // Check if the length of the number is greater than 9
        if (numString.length > 9) {
            // If it's greater than 9, round the number to fit 9 characters
            let decimalPlaces = 9 - numString.indexOf('.') - 1; // Calculate available decimal places
            currInput = parseFloat(Number(currInput).toFixed(decimalPlaces)); // Convert currInput to number before calling toFixed
        }
        return currInput;
    }
}


// calc number of int, number of decimals
// calc allowed num of decimals (9-number of int)
// round num of decimals to that number and replace the curr num decimals with that rounded one
// if number of the int is larger than 9, make it scientific notation
// function formatNumber(num) {
//     // Convert number to string
//     let numStr = num.toString();
//     console.log("new numStr", numStr);

//     // Split the number into integer and decimal parts
//     let parts = numStr.split('.');
//     let integerPart = parts[0];
//     let decimalPart = parts[1] || '';

//     // Calculate the number of integer digits
//     let numIntegers = integerPart.length;

//     // Calculate the number of decimal digits
//     let numDecimals = decimalPart.length;
//     let allowedDecimals = 9 - numIntegers >= 0 ? 9 - numIntegers : 0 ;


//     //fix the decimal part
//     if (numDecimals > allowedDecimals) {
//     // Get the integer part as a number
//         let integerPartNum = parseInt(integerPart);

//         // Get the decimal part as a number
//         let decimalPartNum = parseFloat('0.' + decimalPart);

//         // Round the decimal part to the allowed number of digits
//         let roundedDecimal = decimalPartNum.toFixed(allowedDecimals);

//         // Combine integer and rounded decimal parts to get the new number
//         numStr = integerPartNum + parseFloat(roundedDecimal);

//         // If the new number is an integer, convert it to a string without decimal part
//         if (roundedDecimal === '0') {
//             numStr = integerPartNum.toString();
//         }

//         // If the rounded decimal part starts with 1, increment the integer part
//         if (roundedDecimal[0] === '1') {
//             numStr = (integerPartNum + 1).toString();
//         }
//     }

//     // If the total number of digits is within 9, return the number as is
//     if (numStr.length - 1 <= 9) {
//         return numStr;
//     }

//     if (Math.abs(numStr) >= 1e10) {
//         // Convert the number to exponential notation
//         numStr = Number(numStr).toExponential();
//     }

//     return numStr;


// }



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

