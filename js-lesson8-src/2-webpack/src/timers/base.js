export default class {
  constructor(boxSelector, initialTime) {
    this.box = document.querySelector(boxSelector);
    this.time = initialTime;
    this.interval = null;
    this.render();
    this.start();
  }

  render() {
    this.box.innerHTML = this.time;
  }

  tick() {
    this.time--;
    this.render();

    if (this.time < 1) {
      this.stop();
    }
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
