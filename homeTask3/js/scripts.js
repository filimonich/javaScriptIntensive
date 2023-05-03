document.forms[0].addEventListener("submit", function (e) {
  let inputs = document.querySelectorAll(".check-error");
  let form = document.querySelector(".form");
  // Объект с регулярными выражениями для валидации полей
  let emptyErr = false;

  // Объект с регулярными выражениями для валидации полей
  const validation = {
    name: (input) => !/^[a-zA-Zа-яА-Я]{2,}$/.test(input.value),
    phone: (input) => !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(input.value),
    email: (input) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value),
  };

  // Объект с сообщениями об ошибках
  const errorMessages = {
    name: "Имя должно содержать больше двух символов и только буквы",
    phone: "Телефон только в таком формате +79991112200",
    email: "Некорректный адрес электронной почты",
  };

  // Проверить все поля в цикле
  inputs.forEach(function (input) {
    // Если поле пустое, добавить класс "err" и установить флаг ошибки
    if (input.value === "") {
      input.classList.add("err");
      emptyErr = true;
      // Если поле не соответствует заданным условиям валидации,
      // добавить класс "err", установить флаг ошибки и отобразить сообщение об ошибке
    } else if (validation[input.name] && validation[input.name](input)) {
      input.classList.add("err");
      emptyErr = true;
      // Создать или обновить div-элемент с сообщением об ошибке
      let errorNextElement = input.nextElementSibling;
      if (
        !errorNextElement ||
        !errorNextElement.classList.contains("error-message")
      ) {
        errorNextElement = document.createElement("div");
        errorNextElement.classList.add("error-message");
        // Вставить созданный элемент перед следующим элементом после текущего
        input.parentNode.insertBefore(errorNextElement, input.nextSibling);
      }
      errorNextElement.textContent = errorMessages[input.name];
      // Если поле проходит валидацию, удалить класс "err"
      // и удалить сообщение об ошибке, если таковое было отображено ранее
    } else {
      input.classList.remove("err");
      // Удалить div-элемент с сообщением об ошибке
      let errorNextSibling = e.target.nextSibling;
      if (
        errorNextSibling &&
        errorNextSibling.classList &&
        errorNextSibling.classList.contains("error-message")
      ) {
        // удаление элемента из DOM
        errorNextSibling.remove();
      }
    }
  });

  // Если есть пустые поля, отменить отправку формы
  if (emptyErr) {
    e.preventDefault();
  }

  // Добавить обработчик событий для form
  form.addEventListener("focusin", function (e) {
    if (e.target.classList.contains("check-error")) {
      e.target.classList.remove("err");
      // удаление элемента из DOM
      let errorNextInput = e.target.nextElementSibling;
      if (
        errorNextInput &&
        errorNextInput.classList &&
        errorNextInput.classList.contains("error-message")
      ) {
        // удаление элемента из DOM
        errorNextInput.remove();
      }
    }
  });
});
