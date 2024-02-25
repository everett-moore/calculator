let operatorReady = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";
const displayValue = document.querySelector("#displayValue");
displayValue.textContent = "0";
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.value = button.textContent;
  button.addEventListener("click", () => {
    currentValue = button.value;
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

function appendDecimal() {
  if (operatorReady) {
    if (secondOperand.includes(".")) return;
    secondOperand = secondOperand += ".";
    displayValue.textContent = secondOperand;
    return;
  }
  if (firstOperand == "") {
    firstOperand = "0" + ".";
    displayValue.textContent = firstOperand;
  }
  if (firstOperand.includes(".")) return;
  firstOperand = firstOperand += ".";
  displayValue.textContent = firstOperand;
}

function appendNumber() {
  if (operatorReady) {
    secondOperand += currentValue;
    displayValue.textContent = secondOperand;
    return;
  }
  firstOperand += currentValue;
  displayValue.textContent = firstOperand;
}

function getOperator() {
  if (operatorReady) {
    calculate();
  }
  operator = currentValue;
  operatorReady = true;
}

function calculate() {
  operatorReady = false;
  if (operator == "÷" && secondOperand == 0) {
    clear();
    displayValue.textContent = "Error";
    return;
  }
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);
  firstOperand = operate(operator, firstOperand, secondOperand);
  secondOperand = "";
  displayValue.textContent = firstOperand;
  if (displayValue.textContent.length > 7) {
    displayValue.textContent = Math.round(firstOperand * 1000) / 1000;
  }
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
