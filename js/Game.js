class Game {
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    NewPlayer.draw(ctx);
    levelCreator.draw(ctx);
    currentLevel.draw(ctx);
    pause.draw(ctx);

    if(!pause.isClicked) {
      requestAnimationFrame(newGame.draw);
    } else {
      pause.drawPausedScreen(ctx);
      pause.handlePaused();
    }
  };
}

const newGame = new Game();
newGame.draw();