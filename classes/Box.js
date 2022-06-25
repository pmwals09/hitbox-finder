export default class Box {
  constructor(){
    this._points = []
  }
  get points() {
    return this._points
  }
  set points(newPoints){
    this._points = newPoints
  }
  get topLeftPoint(){
    const [p1, p2] = this._points
    const x = p1.x < p2.x ? p1.x : p2.x
    const y = p1.y < p2.y ? p1.y : p2.y
    return new Point(x, y)
  }
  get bottomLeftPoint(){
    const [p1, p2] = this._points
    const x = p1.x < p2.x ? p1.x : p2.x
    const y = p1.y < p2.y ? p2.y : p1.y
    return new Point(x, y)

  }
  get bottomRightPoint(){
    const [p1, p2] = this._points
    const x = p1.x < p2.x ? p2.x : p1.x
    const y = p1.y < p2.y ? p2.y : p1.y
    return new Point(x, y)
  }
  get topRightPoint(){
    const [p1, p2] = this._points
    const x = p1.x < p2.x ? p2.x : p1.x
    const y = p1.y < p2.y ? p1.y : p2.y
    return new Point(x, y)
  }

  addPoint(point){
    if(this._points.length < 2){
      this._points.push(point)
    }
  }

  draw(canvas){
    const ctx = canvas.getContext("2d")
    const [start, end] = this._points
    ctx.strokeStyle = "green"
    ctx.lineWidth = 2
    ctx.strokeRect(start.x, start.y, (end.x - start.x), (end.y - start.y))
  }

  contains(newPoint){
    const newXInside = newPoint.x <= this.topRightPoint.x && newPoint.x >= this.topLeftPoint.x
    const newYInside = newPoint.y <= this.bottomLeftPoint.y && newPoint.y >= this.topLeftPoint.y
    return newXInside && newYInside
  }

  onLine(newPoint){
    // 5px margin for error
    const newNearVertLine = Math.abs(newPoint.x - this.topLeftPoint.x) < 5 || Math.abs(newPoint.x - this.topRightPoint.x) < 5
    const newYInBounds = newPoint.y < this.bottomLeftPoint.y + 5 && newPoint.y > this.topLeftPoint.y - 5
    const newNearHorizLine = Math.abs(newPoint.y - this.topLeftPoint.y) < 5 || Math.abs(newPoint.y - this.bottomLeftPoint.x) < 5
    const newXInBounds = newPoint.x > this.topLeftPoint.x - 5 && newPoint.x < this.topRightPoint.x + 5
    return (newNearVertLine && newYInBounds) || (newNearHorizLine && newXInBounds)
  }

  toString(){
    return `Points: ${this._points.map(ea => ea.toString()).join(", ")}`
  }
}
