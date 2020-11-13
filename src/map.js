class Map {
  constructor(el, rect = 10) {
    this.el = el;
    this.data = [
      // {
      //   x: 0,
      //   y: 0,
      //   color: "red",
      // },
    ];
    this.rect = rect;

    this.rows = Math.ceil(Map.getStyle(el, "height") / rect);
    this.cells = Math.ceil(Map.getStyle(el, "width") / rect);
    Map.setStyle(el, "height", this.rows * rect);
  }
  static getStyle(el, attr) {
    return parseFloat(getComputedStyle(el)[attr]);
  }
  static setStyle(el, attr, val) {
    el.style[attr] = val + "px";
  }

  setData(newData) {
    if (typeof newData !== "object") return;
    Array.isArray(newData) ? (this.data = this.data.concat(newData)) : this.data.push(newData);
  }

  clearData() {
    this.data.length = 0;
  }

  include({ x, y }) {
    return this.data.some((item) => item.x === x && item.y === y);
  }

  render() {
    const str = this.data.map((item) => {
      return `<span style="position:absolute; left:${item.x * this.rect}px;top:${
        item.y * this.rect
      }px;width: ${this.rect}px;height: ${this.rect}px;background: ${item.color}" ></span>`;
    });

    this.el.innerHTML = str;
  }
}
