import Dot from './dot';
import Player from './player';
import Menu from './menu';
import InputManager from './utilities/input-manager';
import Survival from './survival';
import AnimationManager from './utilities/animation-manager';
import InventoryManager from './utilities/inventory-manager';
import { getCookie } from './utilities/utility-functions';
const inventoryTextures = {
  hydrogen: { path: '/images/hydrogen.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  helium: { path: '/images/helium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  beryllium: { path: '/images/beryllium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  lithium: { path: '/images/lithium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  coin: { path: '/images/coin.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
}

export default class Game {
  constructor() {
    this.delta = 0;
    this.lastRender = new Date().getTime();
    this.username = getCookie('username');
    this._id = getCookie('_id');
    this.animationManager = new AnimationManager();
    this.inventoryManager = new InventoryManager();
    this.inputManger = new InputManager(this);
    this.menu = new Menu(this);
    this.state = 'main-menu';
    this.player = new Player();
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = document.getElementById('game');
    this.canvas.width = document.body.clientWidth * 2;
    this.canvas.height = document.body.clientHeight * 2;
    this.canvas.style.width = `${document.body.clientWidth}px`;
    this.canvas.style.height = `${document.body.clientHeight}px`;
    this.ctx = this.canvas.getContext('2d')
  }

  gameMenu() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.menu.draw(this.ctx);
    this.player.draw(this.ctx, 5);
  }

  renderHighScores() {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const startY = 200;
    const scoreHeight = 100;
    const top10 = this.scores.filter((scores, i) => i < 10);

    top10.forEach((score, i) => {
      ctx.strokeStyle = 'white';
      ctx.fillStyle = 'rgba(150, 201, 230, .5)';
      ctx.beginPath()
      ctx.rect(this.canvas.width / 2 - 300, startY + scoreHeight * i, 600, scoreHeight - 10);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.font = "50px Indie Flower, cursive";
      ctx.fillText(`${i+1}.   ${score.username}:   ${score.score}`, this.canvas.width / 2, 60 + startY + scoreHeight * i);
      ctx.closePath();
    });
    this.player.draw(this.ctx, 5);
  }

  render() {
    const currentTime = new Date().getTime();
    this.delta = (currentTime - this.lastRender) / 1000;
    this.lastRender = currentTime;
    const { ctx } = this;
    if (this.state === 'main-menu') {
      this.gameMenu();
    } else if (this.state === 'start-survival') {
      this.survival = new Survival(this.player, this);
      this.state = 'survival';
    } else if (this.state === 'high-scores') {
      this.renderHighScores();
    } else if (this.state === 'store') {
      this.renderStore();
    } else if (this.state === 'survival') {
      this.survival.play();
    } else if (this.state === 'gameover') {
      this.run();
      return false;
    }

    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.font = "30px Indie Flower, cursive";
    ctx.fillText(`Player: ${this.username}`, this.canvas.width / 2, 30);
    ctx.closePath();

    requestAnimationFrame(this.render.bind(this));
  }

  renderStore() {
    const { ctx, canvas, inventoryManager } = this;
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

    this.player.draw(this.ctx, 3);
  }

  run() {
    this.player = new Player();
    this.state = 'main-menu';
    this.render();
  }
}
