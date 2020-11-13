class Food {
  constructor(map, colors = ['red', 'blue', 'yellow','pink']){
    this.map = map;
    this.colors = colors;
    this.data = null
    this.maxLength = map.rows * map.cells

    this.create()
  }

  create(){
    // TODO 游戏通关
    if(this.map.data.length >= this.maxLength) return

    let x = Math.floor(Math.random()*this.map.cells)
    let y = Math.floor(Math.random()*this.map.rows)
    let color = this.colors[parseInt(Math.random() * this.colors.length)]
    this.data = { x, y, color }

    if(this.map.include(this.data)){
      this.create()
    }

    this.map.setData(this.data)
  }
  clearData(){
    this.data = null
  }
}
