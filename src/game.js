class Game {
  constructor(el, rect, toControl = null) {
    this.map = new Map(el, rect);
    this.food = new Food(this.map);
    this.snake = new Snake(this.map);

    this.map.render();
    this.timer = 0;
    this.interval = 200;
    this.toControl = toControl;
    this.keyDown = this.keyDown.bind(this);
    this.control();
    this.codeKey = { left: 37, top: 38, right: 39, bottom: 40 };
  }

  start() {
    this.move();
  }

  stop() {
    clearInterval(this.timer);
  }

  move() {
    this.stop();
    this.timer = setInterval(() => {
      this.snake.move();
      this.map.clearData();
      if(this.isEat()){
        this.snake.eatFood()
        this.food.clearData();
        this.food.create()
      }

      this.map.setData(this.snake.data);
      this.map.setData(this.food.data);
      this.map.render();
    }, this.interval);
  }

  isEat(){
    return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y
  }

  isOver() {}

  over() {}

  keyDown({ keyCode }) {
    const keyArr = Object.keys(this.codeKey);
    const index = keyArr.findIndex((item) => this.codeKey[item] === keyCode);
    if (index !== -1) {
      const key = keyArr[index];
      this.snake.changeDirection(key);
    }
  }

  control() {
    if (this.toControl) {
      return this.toControl();
    }
    window.addEventListener("keydown", this.keyDown);
  }

  changeControl(key, value) {
    this.codeKey[key] = value;
  }
}
