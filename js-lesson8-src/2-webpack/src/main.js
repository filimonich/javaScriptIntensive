import "./main.css";
import Timer from "./timers/base.js";
import TimerFormatted from "./timers/format.js";
import Slider from "./sliders/index.js";
import count, { double, reset } from "./estest";

import "swiper/css";
import Swiper from "swiper";

window.addEventListener("load", function () {
  new Timer(".timer1", 10);
  let t2 = new TimerFormatted(".timer2", 5000);

  document.querySelector(".getSale").addEventListener("click", function () {
    this.disabled = true;
    this.innerHTML = "Скидка Ваша!";
    t2.stop();
  });

  let s1 = new Slider(".gallery-1");
  s1.initControls();

  /* console.log(count());
	console.log(count());
	console.log(count());
	console.log(double());
	console.log(count());
	console.log(reset());
	console.log(count()); */
  const swiper = new Swiper(".home-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      490: {
        slidesPerView: 2,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
      },
    },
    loop: true,
  });
});
