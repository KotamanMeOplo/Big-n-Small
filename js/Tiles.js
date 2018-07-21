const drawBrick = (context, x, y) => {
  [x, y] = [x * PhObj.cellWidth, y * PhObj.cellWidth];
  context.beginPath();
  context.rect(x, y, PhObj.cellWidth, PhObj.cellWidth);
  context.fillStyle = 'green';
  context.fill();
  context.closePath();
};

const drawSpikes = (context, x, y) => {
  [x, y] = [x * PhObj.cellWidth, y * PhObj.cellWidth];
  context.beginPath();
  context.rect(x, y, PhObj.cellWidth, PhObj.cellWidth);
  context.fillStyle = 'red';
  context.fill();
  context.closePath();
}

const drawSprings = (context, x, y) => {
  [x, y] = [x * PhObj.cellWidth, y * PhObj.cellWidth];
  context.beginPath();
  context.rect(x, y, PhObj.cellWidth, PhObj.cellWidth);
  context.fillStyle = 'black';
  context.fill();
  context.closePath();
}