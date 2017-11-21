import Dot from './dot';
import Player from './player';
import Menu from './menu';
import TextAnimation from './utilities/text-animation';
import InputManager from './utilities/input-manager';
import { offscreen } from './utilities/utility-functions';

class Survival {
  constructor(game) {
    this.game = game;
  }

}
export default class Game {
  constructor() {
    this.level = 1;
    this.scale = 1;
    this.animations = [];
    this.playerInventory = [];
    this.coins = 0;
    this.currentCombo = 0;
    this.inputManger = new InputManager(this);
    this.state = 'constructed';
    this.menu = new Menu(this);
    this.canvas = document.getElementById('game');
    this.canvas.width = document.body.clientWidth * 2;
    this.canvas.height = document.body.clientHeight * 2;
    this.canvas.style.width = `${document.body.clientWidth}px`;
    this.canvas.style.height = `${document.body.clientHeight}px`;
    this.ctx = this.canvas.getContext('2d')
  }

  randomRadius() {
    const { player } = this;
    const { floor, random } = Math;
    const maxSize = player ? player.radius * 2 : 50;
    return floor(random() * maxSize);
  }

  randomY() {
    const { floor, random } = Math;
    const { height } = this.canvas;
    return floor(random() * height);
  }

  randomX() {
    const { floor, random } = Math;
    const { width } = this.canvas;
    return floor(random() * width);
  }

  distance(dot) {
    const { player } = this;
    const { sqrt } = Math;
    const a = player.x - dot.x;
    const b = player.y - dot.y;

    return sqrt(a * a + b * b);
  }

  physics() {
    const { player } = this;
    this.dots.forEach(dot => {
      if (this.distance(dot) <= player.radius * this.scale + dot.radius * this.scale) {
        if (player.radius > dot.radius) {
          player.radius += 1;
          this.playerInventory.push(dot.element);
          if (this.animations.length > 0) {
            this.currentCombo += 1;
            this.coins += this.currentCombo;
            this.animations.push(new TextAnimation(1000, player.x, player.y, `Combo: +${this.currentCombo} ${dot.element}`))
          } else {
            this.currentCombo = 1;
            this.coins += 1;
            this.animations.push(new TextAnimation(1000, player.x, player.y, `+1 ${dot.element}`))
          }
          dot.destroy = true;
        } else {
          this.state = 'gameover';
        }
      }
      if (offscreen(dot)) {
        dot.destroy = true;
      }
    });
    this.dots = this.dots.filter(dot => !dot.destroy)
    if (this.dots.length < this.maxDots) {
      this.dots.push(new Dot(this.randomX(), this.randomY(), this.randomRadius(), 0, 2*Math.PI))
    }
    this.dots.forEach(dot => dot.move());
  }

  playSurvivalGameLoop() {
    this.canvas.cursor = 'none';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.dots.forEach(dot => dot.draw(this.ctx, this.scale));
    this.animations.forEach(animation => animation.draw(this.ctx));
    this.animations = this.animations.filter(animation => !animation.destroy);
    this.player.draw(this.ctx, this.scale);
    this.ctx.fillStyle = 'yellow';
    this.ctx.font = "30px Arial";
    this.ctx.fillText(`Score: ${this.player.radius}`, 100, 50);
    this.ctx.fillText(`Coins: ${this.coins}`, 100, 80);
    this.ctx.font = "100px Indie Flower, cursive";
    this.ctx.fillText(`Level: ${this.level}`, document.body.clientWidth, document.body.clientHeight * 2 - 100);
    this.physics();
    if (this.level * 10 + 10 < this.player.radius * this.scale) {
      this.scale /= 2;
      this.level++;
    }
  }

  gameMenu() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.menu.draw(this.ctx);
    this.player.draw(this.ctx, this.scale);
  }

  render() {
    if (this.state === 'constructed') {
      this.gameMenu();
    } else if (this.state === 'survival') {
      this.playSurvivalGameLoop();
    } else if (this.state === 'gameover') {
      this.run();
      return false;
    }
    requestAnimationFrame(this.render.bind(this));
  }

  run() {
    /* survival game mode stuff*/
    this.scale = 1;
    this.level = 1;
    this.maxDots = 100;
    this.player = new Player();
    this.dots = [];
    for(let i = 0; i < this.maxDots; i++) {
      this.dots.push(new Dot(this.randomX(), this.randomY(), this.randomRadius(), 0, 2*Math.PI))
    }

    /* Game engine / canvas stuff */
    this.animations = [];
    this.state = 'constructed';
    this.render();
  }
}
