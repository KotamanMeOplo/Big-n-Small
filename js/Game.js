class Game {
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    NewPlayer.draw(ctx);
    levelCreator.draw(ctx);
    levels.forEach(a => a.draw(ctx));

    requestAnimationFrame(newGame.draw);
  };
}

const newGame = new Game();
newGame.draw();