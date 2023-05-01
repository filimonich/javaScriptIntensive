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
    if (op === "+") res = n1 + n2;
    else if (op === "-") res = n1 - n2;
    else if (op === "*") res = n1 * n2;
    else if (op === "/")
      if (n2 === "0") {
        res = undefined;
      } else {
        res = n1 / n2;
      }

    result.textContent = `Результат: ${res ?? "деление на ноль запрещено"}`;
    btnRun.disabled = true;
  });
});
