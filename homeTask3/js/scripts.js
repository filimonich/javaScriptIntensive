document.forms[0].addEventListener("submit", function (e) {
  let inputs = document.querySelectorAll(".check-error");
  let form = document.querySelector(".form");
  let emptyErr = false;

  const validation = {
    name: (input) => !/^[a-zA-Zа-яА-Я]{2,}$/.test(input.value),
    phone: (input) => !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(input.value),
    email: (input) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value),
  };

  const errorMessages = {
    name: "Имя должно содержать больше двух символов и только буквы",
    phone: "Телефон только в таком формате +79991112200",
    email: "Некорректный адрес электронной почты",
  };

  inputs.forEach(function (input) {
    if (input.value === "") {
      input.classList.add("err");
      emptyErr = true;
    } else if (validation[input.name] && validation[input.name](input)) {
      input.classList.add("err");
      emptyErr = true;
      let errorNextElement = input.nextElementSibling;
      if (
        !errorNextElement ||
        !errorNextElement.classList.contains("error-message")
      ) {
        errorNextElement = document.createElement("div");
        errorNextElement.classList.add("error-message");
        input.parentNode.insertBefore(errorNextElement, input.nextSibling);
      }
      errorNextElement.textContent = errorMessages[input.name];
    } else {
      input.classList.remove("err");
      let errorNextSibling = e.target.nextSibling;
      if (
        errorNextSibling &&
        errorNextSibling.classList &&
        errorNextSibling.classList.contains("error-message")
      ) {
        errorNextSibling.remove();
      }
    }
  });

  if (emptyErr) {
    e.preventDefault();
  }

  form.addEventListener("focusin", function (e) {
    if (e.target.classList.contains("check-error")) {
      e.target.classList.remove("err");
      let errorNextInput = e.target.nextElementSibling;
      if (
        errorNextInput &&
        errorNextInput.classList &&
        errorNextInput.classList.contains("error-message")
      ) {
        errorNextInput.remove();
      }
    }
  });
});
