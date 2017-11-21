import Dot from './dot';
import Player from './player';
import TextAnimation from './utilities/text-animation';

export default class Game {
  constructor() {
    this.animations = [];
    this.coins = 0;
    this.currentCombo = 0;
    window.addEventListener('keydown', this.keypress.bind(this));
    this.state = 'constructed';
  }

  keypress(e) {
    switch(e.keyCode) {
      case 80: this.state !== 'paused' ? this.state = 'paused' : this.state = 'play';
    }
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
      if (this.distance(dot) <= player.radius + dot.radius) {
        if (player.radius > dot.radius) {
          player.radius += 1;
          if (this.animations.length > 0) {
            this.currentCombo += 1;
            this.coins += this.currentCombo;
            this.animations.push(new TextAnimation(1000, player.x, player.y, `Combo: +${this.currentCombo}`))
          } else {
            this.currentCombo = 1;
            this.coins += 1;
            this.animations.push(new TextAnimation(1000, player.x, player.y, "+1"))
          }
          dot.destroy = true;
        } else {
          this.gameover = true;
          this.animations.push(new TextAnimation(1000, player.x, player.y, "You DIED!"))
        }
      }
      if (this.offscreen(dot)) {
        dot.destroy = true;
      }
    })
    this.dots = this.dots.filter(dot => !dot.destroy)
    if (this.dots.length < this.maxDots) {
      this.dots.push(new Dot(this.randomX(), this.randomY(), this.randomRadius(), 0, 2*Math.PI))
    }
    this.dots.forEach(dot => dot.move());
  }

  render() {
    if (this.state === 'paused') {
      requestAnimationFrame(this.render.bind(this));
      return false;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.dots.forEach(dot => dot.draw(this.ctx));
    this.animations.forEach(animation => animation.draw(this.ctx));
    this.animations = this.animations.filter(animation => !animation.destroy);
    this.player.draw(this.ctx);
    this.ctx.fillStyle = 'yellow';
    this.ctx.font = "30px Arial";
    this.ctx.fillText(`Score: ${this.player.radius}`, 10, 50);
    this.ctx.fillText(`Coins: ${this.coins}`, 10, 80);
    this.physics();
    if (this.gameover) {
      this.run();
    } else {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  restart() {
    this.player = new Player();
    this.dots = [];
    for(let i = 0; i < 10; i++) {
      this.dots.push(new Dot(this.randomX(), this.randomY(), this.randomRadius(), 0, 2*Math.PI))
    }
  }

  offscreen(dot) {
    return (dot.x + dot.radius < 0 || dot.y + dot.radius < 0 ||
      dot.x - dot.radius > document.body.clientWidth * 2 ||
      dot.y - dot.radius > document.body.clientHeight * 2);
  }

  run() {
    this.maxDots = 100;
    this.gameover = false;
    this.canvas = document.getElementById('game');
    this.canvas.width = document.body.clientWidth * 2;
    this.canvas.height = document.body.clientHeight * 2;
    this.canvas.style.width = `${document.body.clientWidth}px`;
    this.canvas.style.height = `${document.body.clientHeight}px`;
    this.ctx = this.canvas.getContext('2d')
    this.player = new Player();
    this.dots = [];
    for(let i = 0; i < this.maxDots; i++) {
      this.dots.push(new Dot(this.randomX(), this.randomY(), this.randomRadius(), 0, 2*Math.PI))
    }
    this.render();
  }
}
