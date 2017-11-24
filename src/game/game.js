import Dot from './dot';
import Player from './player';
import Menu from './menu';
import InputManager from './utilities/input-manager';
import Survival from './survival';
import AnimationManager from './utilities/animation-manager';
import InventoryManager from './utilities/inventory-manager';
import { getCookie } from './utilities/utility-functions';
import inventoryTextures from './utilities/inventory-textures';
import Store from './store';

export default class Game {
  constructor() {
    this.store = new Store(this);
    this.delta = 0;
    this.lastRender = new Date().getTime();
    this.username = getCookie('username');
    this._id = getCookie('_id');
    this.animationManager = new AnimationManager();
    this.inventoryManager = new InventoryManager(this);
    this.inputManger = new InputManager(this);
    this.menu = new Menu(this);
    this.state = 'main-menu';
    this.player = new Player();
    this.setupCanvas();
    this.survival = new Survival(this.player, this);
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
      ctx.textBaseline = 'alphabetic';
      ctx.font = "50px Indie Flower, cursive";
      ctx.fillText(`${i+1}.   ${score.username}:   ${score.score}`, this.canvas.width / 2, 60 + startY + scoreHeight * i);
      ctx.closePath();
    });
    this.player.draw(this.ctx, 5);
  }

  setDelta() {
    const currentTime = new Date().getTime();
    this.delta = (currentTime - this.lastRender) / 1000;
    this.lastRender = currentTime;
  }

  stateFunctionHash() {
    return {
      'main-menu': this.gameMenu,
      'start-survival': this.startSurvival,
      'high-scores': this.renderHighScores,
      'store': this.renderStore,
      'survival': this.runSurvival,
    }
  }

  runSurvival() {
    this.survival.play();
  }

  startSurvival() {
    this.survival = new Survival(this.player, this);
    this.state = 'survival';
  }

  render() {
    if (this.state === 'gameover') {
      this.run();
      return false;
    }

    this.setDelta();
    this.stateFunctionHash()[this.state].call(this);
    this.renderPlayerText();
    requestAnimationFrame(this.render.bind(this));
  }

  renderPlayerText() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.font = "30px Indie Flower, cursive";
    ctx.fillText(`Player: ${this.username}`, this.canvas.width / 2, 30);
    ctx.closePath();
  }

  renderStore() {
    this.store.render();
  }

  run() {
    this.player = new Player();
    this.state = 'main-menu';
    this.render();
  }
}
