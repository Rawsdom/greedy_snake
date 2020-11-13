class Snake {
  constructor(map, food) {
    this.data = [
      { x: 6, y: 4, color: "green" },
      { x: 5, y: 4, color: "white" },
      { x: 4, y: 4, color: "white" },
      { x: 3, y: 4, color: "white" },
      { x: 2, y: 4, color: "white" },
    ];

    this.map = map;
    this.food = food;
    this.direction = "right";

    this.map.setData(this.data);
  }

  move() {
    let i = this.data.length - 1;
    this.lastData = {
      x: this.data[i].x,
      y: this.data[i].y,
      color: this.data[i].color,
    };

    for (i; i > 0; i--) {
      this.data[i].x = this.data[i - 1].x;
      this.data[i].y = this.data[i - 1].y;
    }

    switch (this.direction) {
      case "right":
        this.data[0].x++;
        break;
      case "left":
        this.data[0].x--;
        break;
      case "top":
        this.data[0].y--;
        break;
      case "bottom":
        this.data[0].y++;
        break;
    }
  }

  isChangeDir(dir) {
    const vertical = ["top", "bottom"];
    const level = ["left", "right"];

    if (vertical.includes(this.direction) && vertical.includes(dir)) {
      return false;
    } else if (level.includes(this.direction) && level.includes(dir)) {
      return false;
    } else if (!level.includes(dir) && !vertical.includes(dir)) {
      return false;
    }

    return true;
  }

  changeDirection(dir) {
    // 因为蛇本身是向右移动的话，那再往右移动没意义、也不可以往左移动，可以直接不处理
    if (this.isChangeDir(dir)) {
      this.direction = dir;
    }
    return this.isChangeDir(dir);
  }

  eatFood() {
    this.data.push(this.lastData);
  }

}
