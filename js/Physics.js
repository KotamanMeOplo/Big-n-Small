class Physics {
  constructor() {
    this.cellWidth = Math.floor(Math.min(canvas.width / 48, canvas.height / 23));
    this.gravity = this.cellWidth / 32 * .7;
  }

  round(a){
    return this.coordinateToIndex(a) * this.cellWidth;
  }

  coordinateToIndex(a) {
    return Math.floor(a / this.cellWidth);
  }

  brickCollisions(x, y, size, brick) {
    const hasCollision = (x, y, brick) => currentLevel.layout[this.coordinateToIndex(y)][this.coordinateToIndex(x)] === brick;
    const collisions = {
      right: false,
      left: false,
      up: false,
      down: false
    };
    
    for(let i = y; i <= y + size; i += this.cellWidth - 1) {
      const nextBrick = {x: x + size, y: i};
      const prevBrick = {x: x - 1, y: nextBrick.y};

      if(hasCollision(nextBrick.x, nextBrick.y, brick))
        collisions.right = true;
      if(hasCollision(prevBrick.x, prevBrick.y, brick))
        collisions.left = true;
    }

    for(let i = x; i <= x + size; i += PhObj.cellWidth - 1) {
      const nextBrick = {x: i, y: y + size};
      const prevBrick = {x: nextBrick.x, y: y - 1};

      if(hasCollision(nextBrick.x, nextBrick.y, brick))
        collisions.down = true;
      if(hasCollision(prevBrick.x, prevBrick.y, brick))
        collisions.up = true;
    }

    return collisions;
  }
}

const PhObj = new Physics();