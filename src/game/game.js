import Dot from './dot';
import Player from './player';
import Menu from './menu';
import InputManager from './utilities/input-manager';
import Survival from './survival';
import AnimationManager from './utilities/animation-manager';
import InventoryManager from './utilities/inventory-manager';

export default class Game {
  constructor() {
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

  render() {
    if (this.state === 'main-menu') {
      this.gameMenu();
    } else if (this.state === 'start-survival') {
      this.survival = new Survival(this.player, this);
      this.state = 'survival';
    } else if (this.state === 'survival') {
      this.survival.play();
    } else if (this.state === 'gameover') {
      this.run();
      return false;
    }
    requestAnimationFrame(this.render.bind(this));
  }

  run() {
    this.player = new Player();
    this.state = 'main-menu';
    this.render();
  }
}
