const displayValue = document.getElementById("displayValue");
const allClear = document.getElementById("allClear");
const signBtn = document.getElementById("sign");
const percentBtn = document.getElementById("percent");
const pointBtn = document.getElementById("point");
const equalsBtn = document.getElementById("equalsBtn");
const numBtns = document.querySelectorAll(".numBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

allClear.addEventListener("click", clear);
signBtn.addEventListener("click", toggleSign);
percentBtn.addEventListener("click", applyPercent);
pointBtn.addEventListener("click", appendPoint);
equalsBtn.addEventListener("click", evaluate);

numBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", () => updateOperand(numBtn.textContent));
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () =>
    updateOperator(operatorBtn.textContent)
  );
});

function updateDisplay(val) {
  displayValue.textContent = val.toString();
}

function clear() {
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  updateDisplay(0);
}

function toggleSign() {
  if (secondOperand !== "") {
    secondOperand = (Number(secondOperand) * -1).toString();
    updateDisplay(secondOperand);
  }
}

function applyPercent() {
  if (secondOperand !== "") {
    secondOperand = (Number(secondOperand) / 100).toString();
    updateDisplay(secondOperand);
  }
}

function appendPoint() {
  if (!secondOperand.includes(".")) {
    secondOperand += secondOperand === "" ? "0." : ".";
    updateDisplay(secondOperand);
  }
}

function evaluate() {
  if (firstOperand === "" || secondOperand === "" || currentOperator === null)
    return;
  let result = operate(
    Number(firstOperand),
    Number(secondOperand),
    currentOperator
  );
  updateDisplay(result);
  secondOperand = result.toString();
  firstOperand = "";
  currentOperator = null;
}

function updateOperand(num) {
  secondOperand += num;
  updateDisplay(secondOperand);
}

function updateOperator(op) {
  if (currentOperator !== null && secondOperand === "") {
    currentOperator = op;
    return;
  }
  evaluate();
  if (secondOperand !== "") {
    firstOperand = secondOperand;
  } else {
    firstOperand = "0";
  }
  currentOperator = op;
  secondOperand = "";
}

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function operate(a, b, operator) {
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
