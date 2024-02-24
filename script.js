let operatorReady = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";
const displayValue = document.querySelector("#displayValue");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.value = button.textContent;
  button.addEventListener("click", () => {
    currentValue = button.value;
    console.log(currentValue);
    switch (currentValue) {
      case "AC":
        clear();
        break;
      case "±":
        sign();
        break;
      case "%":
        percent();
        break;
      case ".":
        appendDecimal();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        getOperator();
        break;
      case "=":
        calculate();
        break;
      default:
        appendNumber();
    }
  });
});

function clear() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  currentValue = "";
  displayValue.textContent = "0";
  operatorReady = false;
}

function sign() {
  if (operatorReady) {
    secondOperand = Number(secondOperand) * -1;
    displayValue.textContent = secondOperand;
    return;
  }
  if (firstOperand == "") return;
  firstOperand = Number(firstOperand) * -1;
  displayValue.textContent = firstOperand;
}

function percent() {
  if (operatorReady) {
    secondOperand = Number(secondOperand) * 0.01;
    displayValue.textContent = secondOperand;
    return;
  }
  if (firstOperand == "") return;
  firstOperand = Number(firstOperand) * 0.01;
  displayValue.textContent = firstOperand;
}

function appendNumber() {
  if (displayValue.textContent.length < 7) {
    if (operatorReady) {
      secondOperand += currentValue;
      displayValue.textContent = secondOperand;
      return;
    }
    firstOperand += currentValue;
    displayValue.textContent = firstOperand;
  }
}

function getOperator() {
  if (operatorReady) {
    calculate();
  }
  operator = currentValue;
  operatorReady = true;
}

function calculate() {
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);
  firstOperand = operate(operator, firstOperand, secondOperand);
  secondOperand = "";
  displayValue.textContent = firstOperand;
  operatorReady = false;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return;
  }
}
