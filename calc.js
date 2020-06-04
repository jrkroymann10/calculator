// Basic Calculator Functions

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return round((a*b), 3);
}

function divide(a, b) {
    return round((a/b), 3);
}

function operate(a, b, operator) {
    if (operator === '+'){
        return add(a, b);
    }   else if (operator === '-') {
        return subtract(a, b);
    }   else if (operator === 'x') {
        return multiply(a, b);
    }   else if (operator === '÷') {
        return divide(a, b);
    }
}

// Variables and References
const displayCont = document.querySelector('.display');
const calcNums = document.querySelectorAll('.displayCap');
const calcOps = document.querySelectorAll('.operator');
const equalsBut = document.querySelector('.equals');
const clearBut = document.querySelector('.clear');
let step = 0;
let operator;
let num1;
let num2;
let holder;

console.log(num1);

// Functions and Event Listeners that make calculator work

function displayRes(num1, num2, op) {
    holder = operate(num1, num2, op);
    displayCont.innerHTML = holder;
}

calcNums.forEach((button) => {
    button.addEventListener('click', (e) => {
        step === 0 ? displayCont.innerHTML += e.target.textContent : displayCont.innerHTML = e.target.textContent;
        step = 0;
    });
});

calcOps.forEach((button) => {
    button.addEventListener('click', (e) => {
        operator = e.target.innerHTML;
        !num1 ? num1 = displayCont.textContent : num1 = holder;
        step = 1;
    })
});

equalsBut.addEventListener('click', function() {
    num2 = displayCont.textContent;
    displayRes(num1, num2, operator);
});

clearBut.addEventListener('click', function() {
    window.location.reload();
})


