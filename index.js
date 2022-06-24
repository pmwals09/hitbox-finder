let appState

document.addEventListener("DOMContentLoaded", (e) => {
  init()
})

function init(){
  appState = new State()
  const imageLoader = document.querySelector("#imageLoader")
  imageLoader.addEventListener("change", handleImageUploader, false)

  const canvas = document.querySelector("#imageCanvas")
  canvas.addEventListener("mousemove", handleCanvasMousemove, false)
  canvas.addEventListener("click", handleCanvasClick, false)
}

function handleImageUploader(e){
  const canvas = document.querySelector("#imageCanvas")
  const file = e.target.files[0]
  drawImage(canvas, file)
}

function drawImage(canvas, file){
  const ctx = canvas.getContext("2d")
  const img = new Image()
  img.onload = function(){
    canvas.setAttribute("width", img.width)
    canvas.setAttribute("height", img.height)
    ctx.drawImage(img, 0, 0)
    const {x, y} = canvas.getBoundingClientRect()
    appState.canvasOrigin = new Point(x,y)
    if(appState.boxes.length > 0){
      appState.boxes.forEach(box => box.draw(canvas))
    }
    appState.outputState(canvas)
  }
  img.src = URL.createObjectURL(file)
}

function handleCanvasMousemove(e){
  if(appState.hasClicked){
    const box = appState.lastBox
    const p = box.points[1]
    p.x = e.clientX - appState.canvasOrigin.x
    p.y = e.clientY - appState.canvasOrigin.y
    const canvas = document.querySelector("#imageCanvas")
    const imageLoader = document.querySelector("#imageLoader")
    drawImage(canvas, imageLoader.files[0])
  }
}

function handleCanvasClick(e){
  appState.toggleHasClicked()
  const p1 = new Point(e.clientX - appState.canvasOrigin.x, e.clientY - appState.canvasOrigin.y)
  const p2 = new Point(e.clientX - appState.canvasOrigin.x, e.clientY - appState.canvasOrigin.y)
  if(appState.hasClicked){
    const box = new Box()
    box.addPoint(p1)
    box.addPoint(p2)
    appState.addBox(box)
    const canvas = document.querySelector("#imageCanvas")
    const fileInput = document.querySelector("#imageLoader")
    drawImage(canvas, fileInput.files[0])
  }
}

class Box {
  constructor(){
    this._points = []
  }
  get points() {
    return this._points
  }
  set points(newPoints){
    this._points = newPoints
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
    ctx.lineWidth = 5
    ctx.strokeRect(start.x, start.y, (end.x - start.x), (end.y - start.y))
  }

  toString(){
    return `Points: ${this._points.map(ea => ea.toString()).join(", ")}`
  }
}

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

class State {
  constructor(){
    this._hasClicked = false
    this._boxes = []
    this._canvasOrigin
  }
  get hasClicked() {
    return this._hasClicked
  }
  set hasClicked(bool){
    this._hasClicked = bool
  }
  get boxes() {
    return this._boxes
  }
  set boxes(newBoxes){
    this._boxes = newBoxes
  }
  get lastBox(){
    return this._boxes[this._boxes.length - 1]
  }
  get canvasOrigin(){
    return this._canvasOrigin
  }
  set canvasOrigin(point){
    this._canvasOrigin = point
  }

  toggleHasClicked(){
    this._hasClicked = !this._hasClicked
  }

  addBox(newBox){
    this._boxes.push(newBox)
  }

  outputState(canvas){
    const outputObj = {}
    outputObj.id = ""

    const file = document.querySelector("#imageLoader").files[0]
    outputObj.image = file.name

    const {width, height} = canvas.getBoundingClientRect()
    outputObj.imgCtx = {width, height}

    if(this._boxes.length > 0){
      outputObj.hotspots = []
      this._boxes.forEach(box => {
        const [p1, p2] = box.points
        const upperLeft = {
          x: p1.x < p2.x ? p1.x : p2.x,
          y: p1.y < p2.y ? p1.y : p2.y
        }
        const lowerRight = {
          x: p1.x < p2.x ? p2.x : p1.x,
          y: p1.y < p2.y ? p2.y : p1.y
        }
        const boxPoints = {
          upperLeft,
          lowerRight
        }
        boxPoints.action = ""
        boxPoints.to = ""
        outputObj.hotspots.push(boxPoints)
      })
    }
    const outputDiv = document.querySelector("#output")
    outputDiv.innerHTML = JSON.stringify(outputObj, null, 2)
  }
}
