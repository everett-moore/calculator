let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

const displayValue = document.getElementById("displayValue");
const allClear = document.getElementById("allClear");
const signBtn = document.getElementById("sign");
const percentBtn = document.getElementById("percent");
const pointBtn = document.getElementById("point");
const equalsBtn = document.getElementById("equalsBtn");
const numBtns = document.querySelectorAll(".numBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");

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

function clear() {
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  displayValue.textContent = 0;
}

function toggleSign() {
  if (secondOperand !== "") {
    secondOperand = (Number(secondOperand) * -1).toString(); // Toggle sign correctly
    displayValue.textContent = secondOperand;
  }
}

function applyPercent() {
  if (secondOperand !== "") {
    secondOperand = (Number(secondOperand) / 100).toString(); // Apply percent correctly
    displayValue.textContent = secondOperand;
  }
}

function appendPoint() {
  if (!secondOperand.includes(".")) {
    if (secondOperand == "") {
      secondOperand += "0.";
    } else {
      secondOperand += ".";
    }
    displayValue.textContent = secondOperand;
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
  displayValue.textContent = result;
  secondOperand = result.toString();
  firstOperand = "";
  currentOperator = null;
}

function updateOperand(num) {
  secondOperand += num;
  displayValue.textContent = secondOperand;
}

function updateOperator(op) {
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
