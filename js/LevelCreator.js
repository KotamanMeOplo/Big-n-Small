const levels = [];
let currentLevel;

class LevelCreator {
  constructor() {
    this.mouse = false;
    this.brush = '#';
  }

  draw (context) {
    context.beginPath();
    for(let i = 0; i * PhObj.cellWidth < canvas.width; i ++)
      for(let j = 0; j * PhObj.cellWidth < canvas.height; j++)
        context.rect(i * PhObj.cellWidth, j * PhObj.cellWidth, PhObj.cellWidth, PhObj.cellWidth);
    context.strokeStyle = 'grey';
    context.stroke();
    context.closePath();
  }

  createLevel () {
    levels.push(new Level());
    
    for(let i = 0; i < 23; i ++) {
      levels[levels.length - 1].layout.push([])
      for(let j = 0; j < 48; j ++){
        levels[levels.length - 1].layout[i].push(i === 22 || i === 0 || j === 0 || j === 47 ? '#' : ' ');
      }
    }

    document.addEventListener('mousedown', e => {
      this.mouse = true;
      levels[levels.length - 1].layout[PhObj.coordinateToIndex(e.y)][PhObj.coordinateToIndex(e.x)] = this.brush;
    });

    document.addEventListener('mousemove', e => {
      if(this.mouse) {
        levels[levels.length - 1].layout[PhObj.coordinateToIndex(e.y)][PhObj.coordinateToIndex(e.x)] = this.brush;
      }
    });

    document.addEventListener('mouseup', e => this.mouse = false);

    document.addEventListener('keydown', e => this.brush = e.key);

    levels[levels.length - 1].centerLevel();
    currentLevel = levels[levels.length - 1];
  }
}

class Level {
  constructor() {
    this.layout = [];
  }

  centerLevel() {
    const levelOffsets = {
      height: Math.ceil(canvas.height / PhObj.cellWidth) - 23,
      width: Math.ceil(canvas.width / PhObj.cellWidth) - 48
    };

    for(let i = 0; i < Math.floor(levelOffsets.height / 2); i ++) {
      this.layout.unshift(this.layout[0 + i]);
    }

    for(let i = 0; i < levelOffsets.height - Math.floor(levelOffsets.height / 2); i ++) {
      this.layout.push(this.layout[0]);
    }

    this.layout = this.layout.map(a => {
      for(let i = 0; i < Math.floor(levelOffsets.width / 2); i ++) {
        a.unshift('#');
      }
  
      for(let i = 0; i < levelOffsets.width - Math.floor(levelOffsets.width / 2); i ++) {
        a.push('#');
      }

      return a;
    })
  }

  draw(ctx) {
    for(let i = 0; i < this.layout.length; i ++) {
      for(let j = 0; j < this.layout[i].length; j ++) {
        switch(this.layout[i][j]) {
          case '#':
            drawBrick(ctx, j, i);
            break;
          case '.':
            drawSpikes(ctx, j, i);
            break;
          case '=':
            drawSprings(ctx, j, i);
            break;
        }
      }
    }
  }
}

const levelCreator = new LevelCreator();
levels.push(new Level());
levels[0].layout = level2;
levels[0].centerLevel();

currentLevel = levels[0];