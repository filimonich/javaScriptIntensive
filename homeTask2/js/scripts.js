// Добавляем обработчик события "submit" для первой формы на странице
document.forms[0].addEventListener("submit", function (e) {
  // Получаем все элементы с классом "check"
  let inputs = document.querySelectorAll(".check");
  let form = document.querySelector(".form");
  // Флаг для проверки пустых полей
  let emptyErr = false;
  // Перебираем все элементы
  inputs.forEach(function (input) {
    // Если значение поля пустое
    if (input.value === "") {
      // Добавляем класс "err"
      input.classList.add("err");
      // Устанавливаем флаг в true
      emptyErr = true;
    } else {
      // Иначе удаляем класс "err"
      input.classList.remove("err");
    }
  });
  // Если есть пустые поля
  if (emptyErr) {
    // Отменяем отправку формы
    e.preventDefault();
  }

  form.addEventListener("focusin", function (e) {
    if (e.target.classList.contains("check")) {
      e.target.classList.remove("err");
    }
  });
});
