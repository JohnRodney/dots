export default class Store {
  constructor(game) {
    this.game = game;
  }

  render() {
    const { ctx, canvas, inventoryManager } = this.game;
    const { playerInventory, coins } = inventoryManager;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'rgba(100, 255, 255, .3)';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
    ctx.rect(20, 80, String(coins).length * 10 + 400, 130);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    const texture = inventoryTextures.coin;
    const image = document.createElement('img');
    image.src = `${window.location.origin}${texture.path}`

    ctx.drawImage(
      image,
      40,
      100,
      90,
      90,
    );

    ctx.fillStyle = 'yellow';
    ctx.textBaseline="middle";
    ctx.font = "70px Indie Flower, cursive";
    ctx.fillText(`${coins}`, 300, 150);
    ctx.closePath();

    playerInventory.forEach((item, i) => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(100, 255, 255, .3)';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
      ctx.rect(20, 280 * i + 300, 350, 260);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      const texture = inventoryTextures[item.name];
      if (texture) {
        const image = document.createElement('img');
        image.src = `${window.location.origin}${texture.path}`

        ctx.drawImage(
          image,
          30,
          280 * i + 300,
          180,
          180,
        );
      }

      ctx.textAlign = 'left';
      ctx.fillStyle = 'white';
      ctx.textBaseline="top";
      ctx.font = "50px Indie Flower, cursive";
      ctx.fillText(`${item.name}`, 60, 280 * i + 480);
      ctx.fillText(`${item.quantity}`, 250, 280 * i + 350);
      ctx.closePath();
      ctx.textAlign = 'center';
    });

    this.game.player.draw(this.ctx, 3);
  }
}
