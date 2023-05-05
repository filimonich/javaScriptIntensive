// Добавление обработчика события при загрузке страницы
window.addEventListener("load", function () {
  // Создание нового экземпляра класса Slider для элемента с классом 'gallery-1'
  new Slider(".gallery-1");
  // Создание нового экземпляра класса Slider для элемента с классом 'gallery-2' и сохранение его в переменной s2
  let s2 = new Slider(".gallery-2");
  // Вывод в консоль значения переменной s2
  console.log(s2);

  // Установка интервала в 3000 миллисекунд (3 секунды) для вызова метода next() у экземпляра класса Slider, сохраненного в переменной s2
  setInterval(function () {
    s2.next();
  }, 3000);
});

// Определение класса Slider
class Slider {
  // Приватное свойство #animatedNow для отслеживания анимации
  #animatedNow = false;

  // Конструктор класса, принимает селектор в качестве аргумента
  constructor(selector) {
    // Нахождение корневого элемента по селектору
    let rootElem = document.querySelector(selector);
    // Нахождение кнопок "предыдущий" и "следующий" внутри корневого элемента
    let btnPrev = rootElem.querySelector(".buttons .prev");
    let btnNext = rootElem.querySelector(".buttons .next");

    // Сохранение всех изображений внутри элемента с классом 'photos' в свойство images
    this.images = rootElem.querySelectorAll(".photos img");
    // Инициализация свойства i значением 0
    this.i = 0;

    // Определение анимации движения влево
    this.animMoveToLeft = [
      { transform: "translateX(0)" },
      { transform: "translateX(-100%)" },
    ];

    // Определение анимации движения вправо
    this.animMoveToRight = [
      { transform: "translateX(0)" },
      { transform: "translateX(100%)" },
    ];

    // Добавление обработчиков событий клика на кнопки "предыдущий" и "следующий"
    btnPrev.addEventListener("click", () => this.prev());
    btnNext.addEventListener("click", () => this.next());
  }

  // Метод prev() для переключения на предыдущее изображение
  prev() {
    // Проверка, если анимация уже запущена, то выходим из метода
    if (this.#animatedNow) {
      return;
    }

    // Сохранение текущего изображения в переменную imgHide
    let imgHide = this.images[this.i];
    // Уменьшение значения свойства i на 1, если i больше 0, иначе установка значения i равным длине массива изображений минус 1
    this.i = this.i > 0 ? this.i - 1 : this.images.length - 1;
    // Вызов приватного метода #toggleSlides с передачей соответствующих аргументов
    this.#toggleSlides(imgHide, this.images[this.i], false);
  }

  // Метод next() для переключения на следующее изображение
  next() {
    // Проверка, если анимация уже запущена, то выходим из метода
    if (this.#animatedNow) {
      return;
    }

    // Сохранение текущего изображения в переменную imgHide
    let imgHide = this.images[this.i];

    // Увеличение значения свойства i на 1, если i меньше длины массива изображений минус 1, иначе установка значения i равным 0
    this.i = this.i < this.images.length - 1 ? this.i + 1 : 0;
    // Вызов приватного метода #toggleSlides с передачей соответствующих аргументов
    this.#toggleSlides(imgHide, this.images[this.i], true);
  }

  // Приватный метод #toggleSlides для переключения между изображениями
  #toggleSlides(imgHide, imgShow, isNext) {
    // Установка значения свойства #animatedNow в true
    this.#animatedNow = true;

    // Удаление класса 'showed' у скрываемого изображения
    imgHide.classList.remove("showed");
    // Запуск анимации для скрываемого изображения
    imgHide.animate(isNext ? this.animMoveToLeft : this.animMoveToRight, {
      duration: 500,
    });

    // Добавление класса 'showed' к показываемому изображению
    imgShow.classList.add("showed");
    // Запуск анимации для показываемого изображения и сохранение ее в переменную anim
    let anim = imgShow.animate(
      isNext ? this.animMoveToRight : this.animMoveToLeft,
      { duration: 500, direction: "reverse" }
    );

    // Добавление обработчика события 'finish' к анимации anim
    anim.addEventListener("finish", () => {
      // Установка значения свойства #animatedNow в false
      this.#animatedNow = false;
    });
  }
}
