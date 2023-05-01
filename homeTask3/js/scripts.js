// Добавляем обработчик события "submit" для первой формы на странице
document.forms[0].addEventListener("submit", function (e) {
  e.preventDefault();
  // Получаем все элементы с классом "check"
  let inputs = document.querySelectorAll(".check");
  let form = document.querySelector(".form");
  // Флаг для проверки пустых полей
  let emptyErr = false;

  const validation = {
    name: function (input) {
      return !/^[a-zA-Zа-яА-Я]{2,}$/.test(input.value);
    },
    phone: function (input) {
      return !/^\d+$/.test(input.value);
    },
    email: function (input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
    },
  };

  const errorMessages = {
    name: "Имя должно содержать больше двух символов и только буквы",
    phone: "Телефон должен содержать только цифры",
    email: "Некорректный адрес электронной почты",
  };

  inputs.forEach(function (input) {
    // Если значение поля пустое
    if (input.value === "") {
      // Добавляем класс "err"
      input.classList.add("err");
      // Устанавливаем флаг в true
      emptyErr = true;
    } else if (validation[input.name] && validation[input.name](input)) {
      // Если проверка не прошла
      // Добавляем класс "err"
      input.classList.add("err");
      // Устанавливаем флаг в true
      emptyErr = true;
      let errorElement = input.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("div");
        errorElement.classList.add("error-message");
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }
      errorElement.textContent = errorMessages[input.name];
    } else {
      // Иначе удаляем класс "err"
      input.classList.remove("err");
      // Удаляем элемент с ошибкой, если он есть
      let errorElement = e.target.nextSibling;
      if (
        errorElement &&
        errorElement.classList &&
        errorElement.classList.contains("error-message")
      ) {
        errorElement.remove();
      }
    }
  });

  if (emptyErr) {
    // Отменяем отправку формы
    e.preventDefault();
  }

  form.addEventListener("focusin", function (e) {
    if (e.target.classList.contains("check")) {
      e.target.classList.remove("err");
      let errorElement = e.target.nextElementSibling;
      if (
        errorElement &&
        errorElement.classList &&
        errorElement.classList.contains("error-message")
      ) {
        errorElement.remove();
      }
    }
  });
});
