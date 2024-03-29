// Elements
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');
const clearAllButton = document.querySelector('.clear-all-btn');
const clearButton = document.querySelector('.clear-btn');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal-btn');

// Calculation variables
let operand1 = 0;
let operand2 = 0;
let currentResult = 0;
let currentOperator = '';
let operatorActive = false;

// Init calculator
result.textContent = '0';

// Event listeners
clearAllButton.addEventListener('click', clearAll);
clearButton.addEventListener('click', clear);

for (const digit of digits) {
    digit.addEventListener('click', typeNumber);
}

for (const operator of operators) {
    operator.addEventListener('click', chooseOperator);
}

equalButton.addEventListener('click', showResult);

// Functions
function clearAll() {
    calculation.textContent = '';
    result.textContent = '0';
    operand1 = 0;
    operand2 = 0;
    currentResult = 0;
    currentOperator = '';
    operatorActive = false;
}

function clear() {
    if (operand1 !== 0 && !operatorActive) clearAll();
    else result.textContent = '0';
}

function typeNumber() {
    if (result.textContent.length < 9) {
        if (result.textContent.includes('.') && this.textContent === '.') return;

        if (result.textContent === '0' || result.textContent == currentResult) {
            result.textContent = this.textContent;
        } else {
            result.textContent += this.textContent;
        }
    }
}

function chooseOperator() {
    if (result.textContent.includes('.') && result.textContent.length === 1) return;

    if (!operatorActive) {
        operatorActive = true;
        operand2 = 0;
    }

    if (this.textContent !== currentOperator) {
        currentOperator = this.textContent;
    }

    if (!operand1) {
        operand1 = Number(result.textContent);
        result.textContent = '0';
    }

    calculation.textContent = `${operand1} ${currentOperator}`;
}

function showResult() {
    if (currentOperator) {
        if (!operand2) operand2 = Number(result.textContent);

        switch (currentOperator) {
            case '+':
                currentResult = operand1 + operand2;
                break;
            case '-':
                currentResult = operand1 - operand2;
                break;
            case 'x':
                currentResult = operand1 * operand2;
                break;
            case '÷':
                currentResult = operand1 / operand2;
                break;
        }

        if (
            currentResult.toString().length > 9 ||
            isNaN(currentResult) ||
            !isFinite(currentResult)
        ) {
            alert(`Result is longer than 9 digits:\n${currentResult}`);
            clearAll();
        } else {
            calculation.textContent = `${operand1} ${currentOperator} ${operand2} =`;
            result.textContent = currentResult;
            operand1 = currentResult;
            operatorActive = false;
        }
    }
}
