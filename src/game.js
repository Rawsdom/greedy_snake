class Game {
  constructor(el, rect, toControl = null) {
    this.map = new Map(el, rect);
    this.food = new Food(this.map);
    this.snake = new Snake(this.map);

    this.map.render();
    this.timer = 0;
    this.grade = 0
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
        this.grade+=2
        this.changeGrade()
        this.food.create()
        this.changeInterval()

      }


      this.map.setData(this.snake.data);
      this.map.setData(this.food.data);
      if(this.isOver()){
        return this.over()
      }

      this.map.render();
    }, this.interval);
  }

  isEat(){
    return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y
  }

  changeGrade(){
    document.getElementById('grade').innerHTML = this.grade;
  }

  changeInterval(grade = this.grade){

    if(grade === 50||grade === 30||grade === 40){
      this.interval *= .9
    }else if(grade === 50){
      this.interval *= .9
    }else{
      this.interval -=5
    }
    this.stop()
    this.start()
  }

  isOver() {
    const head = this.snake.data[0]

    if(head.x<0||head.x>=this.map.cells||head.y<0||head.y>=this.map.rows){
      return true
    }

    const index = this.snake.data.findIndex((item, index) => item.x === head.x && item.y ===head.y && index !== 0 )

    if(index !== -1) {
      this.snake.data[index].color = head.color
      return true
    }

    return false

  }

  over() {
    this.stop()
    this.toOver && this.toOver(this.grade/2>=this.map.cells * this.map.rows)
  }

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
