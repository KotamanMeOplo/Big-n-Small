class Player {
  constructor() {
    this.x = 100;
    this.y = 50;
    this.vspeed = 0;
    this.hspeed = 0;
    this.speed = PhObj.cellWidth / 32 * 10
    this.jspeed = this.speed * 2;
    this.size = PhObj.cellWidth;
    this.left = false;
    this.right = false;
    this.up = false;
    this.space = false;
  }

  manageCollisions() {
    //Springs
    const springCollisions = PhObj.brickCollisions(this.x, this.y, this.size, '=');
    if(Object.keys(springCollisions).some(a => springCollisions[a])) {
      this.vspeed = - 1.1 * this.jspeed;
    }

    //Spikes
    const spikeCollisions = PhObj.brickCollisions(this.x, this.y, this.size, '.');
    if(Object.keys(spikeCollisions).some(a => spikeCollisions[a])) {
      NewPlayer = new Player();
    }

    // Bricks
    const horizontalBrickCollisions = PhObj.brickCollisions(this.x + this.hspeed, this.y, this.size, '#');
    if(horizontalBrickCollisions.right) {
      while(!PhObj.brickCollisions(this.x, this.y, this.size, '#').right) {
        this.x ++;
      }
      this.x = Math.floor(this.x);
      this.hspeed = 0;
    }else if(horizontalBrickCollisions.left) {
      while(!PhObj.brickCollisions(this.x, this.y, this.size, '#').left) {
        this.x --;
      }
      this.x = Math.floor(this.x);
      this.hspeed = 0;
    }

    const verticalBrickCollisions = PhObj.brickCollisions(this.x, this.y + this.vspeed, this.size, '#');
    if(verticalBrickCollisions.down) {
      while(!PhObj.brickCollisions(this.x, this.y, this.size, '#').down) {
        this.y ++;
        
      }
      this.y = Math.floor(this.y);
      this.vspeed = 0;
    }else if(verticalBrickCollisions.up) {
      while(!PhObj.brickCollisions(this.x, this.y, this.size, '#').up) {
        this.y --;
      }
      this.y = Math.floor(this.y);
      this.vspeed = this.vspeed > 0 ? this.vspeed : 0;
    }
  }

  moveWhenGrow() {
    const getNumOfCollisions = () => {
      const collisions = PhObj.brickCollisions(this.x + 1, this.y + 1, this.size - 2, '#');
      const numOfCollisions = Object.keys(collisions).reduce((pr, cur) => collisions[cur] ? pr + 1 : pr, 0);

      return numOfCollisions;
    }
    const minNumOfCollisionsIfStuck = 3;
    console.log(getNumOfCollisions());

    if(getNumOfCollisions() >= 0) {
      const initX = this.x;
      const initY = this.y;
      const xDirToMove = [-1, 1, 0, 0, -1, -1, 1, 1];
      const yDirToMove = [0, 0, -1, 1, -1, 1, -1, 1];
      const distToMove = PhObj.cellWidth / 2;
      let i = 0;

      while(i < xDirToMove.length && getNumOfCollisions() !== 0) {
        this.x = initX + xDirToMove[i] * distToMove;
        this.y = initY + yDirToMove[i] * distToMove;
        i ++;
        console.log(getNumOfCollisions(), i);
      }

      if(getNumOfCollisions() !== 0) {
        this.x = initX;
        this.y = initY;
        this.changeSize();
      }
    }
  }

  changeSize() {
    if(this.size === PhObj.cellWidth){
      this.size *= 2;
      this.x -= PhObj.cellWidth / 2;
      this.y -= PhObj.cellWidth / 2;
      this.speed /= 2;
      this.jspeed /= 2;
      this.hspeed /= 2;
      this.vspeed /= 2;
      this.moveWhenGrow();
    } else {
      this.size /= 2;
      this.x += PhObj.cellWidth / 2;
      this.y += PhObj.cellWidth / 2;
      this.speed *= 2;
      this.jspeed *= 2;
      this.hspeed *= 2;
      this.vspeed *= 2;
    }
    this.space = false;
  }

  stepEvent() {
    this.hspeed = this.right * this.speed - this.left * this.speed;
    this.vspeed += PhObj.gravity;

    if(this.up && PhObj.brickCollisions(this.x, this.y, this.size, '#').down) {
      this.vspeed = -this.jspeed;
    }

    this.manageCollisions();

    if(this.space) {
      this.changeSize();
    }

    this.x += this.hspeed;
    this.y += this.vspeed;
  }
  
  draw (context) {
    this.stepEvent();
    context.beginPath();
    context.rect(this.x, this.y, this.size, this.size);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
  }
};

let NewPlayer = new Player();

document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowLeft':
      NewPlayer.left = true;
      break;
    case 'ArrowRight':
      NewPlayer.right = true;
      break;
    case 'ArrowUp':
      NewPlayer.up = true;
      break;
    case ' ':
      NewPlayer.space = true;
  }
});
document.addEventListener('keyup', e => {
  switch(e.key) {
    case 'ArrowLeft':
      NewPlayer.left = false;
      break;
    case 'ArrowRight':
      NewPlayer.right = false;
      break;
    case 'ArrowUp':
      NewPlayer.up = false;
  }
});