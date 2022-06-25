import Box from "./classes/Box"
import Point from "./classes/Point"
import State from "./classes/State"

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

