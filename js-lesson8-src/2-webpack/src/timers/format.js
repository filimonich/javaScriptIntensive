import Timer from "./base.js";

export default class extends Timer {
  render() {
    let h = parseInt(this.time / 3600);
    let hs = this.time % 3600;
    let m = parseInt(hs / 60);
    let s = hs % 60;

    this.box.innerHTML = `${h}:${m}:${s}`;
  }
}
