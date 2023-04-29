"use strict";

window.addEventListener("load", function () {
  let inp1 = this.document.querySelector(".num1");
  let inp2 = this.document.querySelector(".num2");
  let btnRun = this.document.querySelector(".btnRun");
  let resultBox = this.document.querySelector(".result");

  btnRun.addEventListener("click", function () {
    let total = parseInt(inp1.value) + parseInt(inp2.value);
    resultBox.innerHTML = total;
  });
});
