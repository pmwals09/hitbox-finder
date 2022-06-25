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
        const upperLeft = box.topLeftPoint
        const lowerRight = box.bottomRightPoint
        const boxPoints = {
          upperLeft: {
            x: upperLeft.x,
            y: upperLeft.y
          },
          lowerRight: {
            x: lowerRight.x,
            y: lowerRight.y
          }
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

