class Pause {
  constructor() {
    this.x = 10;
    this.y = 10;
    this.isClicked = false;
  }

  drawPausedScreen(context) {
    //Background
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, .7)';
    context.fill();
    context.closePath();
    
    //Background
    context.beginPath();
    context.rect(canvas.width / 2 - PhObj.cellWidth / 3 * 2, canvas.height / 2 - PhObj.cellWidth / 3 * 2, PhObj.cellWidth + PhObj.cellWidth / 3 * 2, PhObj.cellWidth + PhObj.cellWidth / 3 * 2);
    context.fillStyle = 'rgba(0, 0, 0, .7)';
    context.fill();
    context.closePath();

    //Play Symbol
    context.beginPath();
    context.moveTo(canvas.width / 2 - PhObj.cellWidth / 2, canvas.height / 2 - PhObj.cellWidth / 2);
    context.lineTo(canvas.width / 2 + PhObj.cellWidth / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 - PhObj.cellWidth / 2, canvas.height / 2 + PhObj.cellWidth / 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  }

  handlePaused() {
    console.log('hey');
  }

  draw(context) {
    //Background
    context.beginPath();
    context.rect(this.x, this. y, PhObj.cellWidth + PhObj.cellWidth / 3 * 2, PhObj.cellWidth + PhObj.cellWidth / 3 * 2);
    context.fillStyle = 'rgba(0, 0, 0, .7)';
    context.fill();
    context.closePath();

    //Horizontal Bars
    context.beginPath();
    context.rect(this.x + PhObj.cellWidth / 3, this.y + PhObj.cellWidth / 3, PhObj.cellWidth / 3, PhObj.cellWidth);
    context.rect(this.x + PhObj.cellWidth / 3 + PhObj.cellWidth / 3 * 2, this.y + PhObj.cellWidth / 3, PhObj.cellWidth / 3, PhObj.cellWidth);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  }
};

const pause = new Pause();

document.addEventListener('click', e => {
  if(e.x > pause.x && e.x < pause.x + PhObj.cellWidth / 3 * 5 && e.y > pause.y && e.y < pause.y + PhObj.cellWidth / 3 * 5) {
    pause.isClicked = true;
  }
})

document.addEventListener('mouseup', _ => pause.isClicked = false);