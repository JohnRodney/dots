import Colors from './colors.js';
import shadeColor2 from './utilities/shade-color';

export default class Dot {
  constructor(x, y, radius, startAngle, endAngle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.colors = new Colors();
    this.color = this.colors.random();
    this.direction = this.randomDirection();
  }

  move() {
    this.x += this.direction.x;
    this.y += this.direction.y;
  }

  randomDirection() {
    const maxSpeed = 6;
    const { floor, random } = Math;
    let xDir = floor(random() * (maxSpeed * 2)) - maxSpeed;
    let yDir = floor(random() * (maxSpeed * 2)) - maxSpeed;
    if (xDir === 0) { xDir = maxSpeed; }
    if (yDir === 0) { yDir = maxSpeed; }
    if (xDir > 0) {
      this.x = 0;
    } else {
      this.x = document.body.clientWidth * 2 - this.radius;
    }
    return { x: xDir, y: yDir };
  }

  draw(ctx) {
    const { x, y, radius, startAngle, endAngle } = this;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.shadowColor = '#343434';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    this.shade(ctx, 3);
  }
  shade(ctx, times) {
    const { x, y, radius, startAngle, endAngle } = this;
    let newRadius = radius * .7;
    let newColor = this.color;
    for (let i = 0; i < times; i++) {
      ctx.beginPath();
      newColor = shadeColor2(newColor, .1);
      ctx.strokeStyle = newColor;
      ctx.fillStyle = newColor;
      ctx.moveTo(x, y);
      ctx.arc(x, y, newRadius, startAngle, endAngle);
      ctx.shadowColor = '#343434';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      newRadius = newRadius * .7;
    }
  }
}


