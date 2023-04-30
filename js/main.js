"use strict";

window.addEventListener("load", function () {
  const num1 = document.querySelector(".num1");
  const num2 = document.querySelector(".num2");
  const signs = document.querySelector(".signs");
  const btnRun = document.querySelector(".btnRun");
  const result = document.querySelector(".result");

  function updateButtonState() {
    if (num1.value && num2.value) {
      btnRun.disabled = false;
    } else {
      btnRun.disabled = true;
    }
  }

  updateButtonState();

  function handleInput(event) {
    event.target.value = event.target.value.replace(/\D/g, "");
    updateButtonState();
  }

  num1.addEventListener("input", handleInput);
  num2.addEventListener("input", handleInput);

  btnRun.addEventListener("click", () => {
    const n1 = Number(num1.value);
    const n2 = Number(num2.value);
    const op = signs.value;
    let res;
    switch (op) {
      case "+":
        res = n1 + n2;
        break;
      case "-":
        res = n1 - n2;
        break;
      case "*":
        res = n1 * n2;
        break;
      case "/":
        res = n1 / n2;
        break;
    }
    result.textContent = `Результат: ${res}`;
    btnRun.disabled = true;
  });
});
