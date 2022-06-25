class Point {
  constructor(x, y){
    this._x = Math.max(0, x)
    this._y = Math.max(0, y)
  }
  get x(){
    return this._x
  }
  set x(newX){
    this._x = Math.max(0, newX)
  }
  get y(){
    return this._y
  }
  set y(newY){
    this._y = Math.max(0, newY)
  }

  toString(){
    return `(x: ${this._x}, y: ${this._y})`
  }
}

