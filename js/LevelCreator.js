const levels = [];

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

    return levels[levels.length - 1];
  }
}

class Level {
  constructor() {
    this.layout = [];
    for(let i = 0; i * PhObj.cellWidth < canvas.height; i ++) {
      this.layout.push([])
      for(let j = 0; j * PhObj.cellWidth < canvas.width; j ++){
        this.layout[i].push((i + 1) * PhObj.cellWidth >= canvas.height || i === 0 || j === 0 || (j + 1) * PhObj.cellWidth >= canvas.width ? '#' : ' ');
      }
    }
  }

  draw(context) {
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
levelCreator.createLevel();
levels[0].layout = level1;