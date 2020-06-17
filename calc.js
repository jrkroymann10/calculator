// Basic Calculator Functions

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function multAdd(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '+') {
            let temp = operate(array[i-1], array[i+1], '+');
            array[i-1] = temp;
            array.splice(i, 2);
            i--
        }
    }
}

function subtract(a, b) {
    return a - b;
}

function multSubtract(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '-') {
            let temp = operate(array[i-1], array[i+1], '-');
            array[i-1] = temp;
            array.splice(i, 2);
            i--
        }
    }
}

function multiply(a, b) {
    return round((a * b), 3);
}

function multMultiply(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'x') {
            let temp = operate(array[i-1], array[i+1], 'x');
            array[i-1] = temp;
            array.splice(i, 2);
            i--
        }
    }
}

function divide(a, b) {
    return round((a / b), 3);
}

function multDivide(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '÷') {
            let temp = operate(array[i-1], array[i+1], '÷');
            array[i-1] = temp;
            array.splice(i, 2);
            i--
        }
    }
}

function modulo(a, b) {
    return a % b;
}

function operate(a, b, operator) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === 'x' || operator === "*") {
        return multiply(a, b);
    } else if (operator === '÷' || operator === '/') {
        return divide(a, b);
    } else if (operator === '%') {
        return modulo(a, b);
    }
}

function resetArray(array) {
    array.splice(0, array.length);
    array[0] = holder;
}

function multOpers(array) {
    let tempArray = array;
    multMultiply(tempArray);
    multDivide(tempArray);
    multAdd(tempArray);
    multSubtract(tempArray);
    return tempArray;
}

function updateTopNum(e) {
    displayTop.innerHTML += e.target.textContent;
}

function updateTopNumKey(e) {
  displayTop.innerHTML += e.key;
}

function updateTopOp(e) {
    displayTop.innerHTML += ` ${e.target.textContent} `;
}

function updateTopOpKey(e) {
  displayTop.innerHTML += ` ${e.key} `;
}

function contNum(e) {
    displayCont.innerHTML += e.target.textContent;
}

function contNumKey(e) {
  displayCont.innerHTML += e.key;
}

// Variables and References
const displayTop = document.querySelector('.displayTop');
const displayCont = document.querySelector('.display');
const calcNums = document.querySelectorAll('.displayCap');
const calcOps = document.querySelectorAll('.operator');
const equalsBut = document.querySelector('.equals');
const clearBut = document.querySelector('.clear');
let step = 0;
let expr = [];
let holder;
const ops = ['+', '-', '*', 'x', '÷', '/', '%'];

function numSelect(e) {
  step === 0 ? contNum(e) : displayCont.innerHTML = e.target.textContent;
  updateTopNum(e);
  step = 0;
}

function opSelect(e) {
  if (step === 2) {
    displayTop.innerHTML = expr[0];
    expr.push(e.target.textContent);
}   else {
    expr.push(parseFloat(displayCont.innerHTML));
    expr.push(e.target.textContent);
    console.log(expr);
}
  updateTopOp(e);
  step = 1;
}

function eqSelect() {
  expr.push(parseFloat(displayCont.innerHTML));
  expr.length === 3 ? holder = operate(expr[0], expr[2], expr[1]) : holder = multOpers(expr);
  displayCont.innerHTML = holder;
  resetArray(expr);
  step = 2;
}

calcNums.forEach((button) => {
    button.addEventListener('click', numSelect);
});

calcOps.forEach((button) => {
    button.addEventListener('click', opSelect);
});

equalsBut.addEventListener('click', eqSelect);

clearBut.addEventListener('click', function () {
    window.location.reload();
})


// Keyboard Input Functionality
const keyBoard = document.querySelector('body')

function handleKeyNum(e) {
  step === 0 ? contNumKey(e) : displayCont.innerHTML = e.key;
  updateTopNumKey(e);
  step = 0;
}

function handleKeyOps(e) {
  if (step === 2) {
    displayTop.innerHTML = expr[0];
    expr.push(e.key);
}   else {
    expr.push(parseFloat(displayCont.innerHTML));
    expr.push(e.key);
}
  updateTopOpKey(e);
  console.log(expr);
  step = 1;
}

const handleKeyPress = function(e) {
  if ((!isNaN(parseFloat(e.key)))) {
    handleKeyNum(e);
  }
    else if (ops.includes(e.key)) {
      handleKeyOps(e);
    }
    else if (e.key === '=' || e.key === 'Enter') {
      expr.push(parseFloat(displayCont.innerHTML));
      expr.length === 3 ? holder = operate(expr[0], expr[2], expr[1]) : holder = multOpers(expr);
      displayCont.innerHTML = holder;
      resetArray(expr);
      step = 2;
    }
};

keyBoard.addEventListener('keypress', handleKeyPress, false)