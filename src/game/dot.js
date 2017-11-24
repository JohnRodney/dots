import Colors from './colors.js';
import shadeColor2 from './utilities/shade-color';
import playerSkins from './utilities/player-skins';

export default class Dot {
  constructor(x, y, radius, startAngle, endAngle) {
    const { floor, random } = Math;
    this.scale = 1;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.colors = new Colors();
    this.color = this.colors.random();
    this.direction = this.randomDirection();
    this.element = this.randomElement();
    this.texture = playerSkins[floor(random() * playerSkins.length)];
    this.image = document.createElement('img');
    this.image.src = `${window.location.origin}${this.texture.path}`
  }

  move(delta) {
    const { random, floor } = Math;
    const dir = floor(random() * 100) === 9;
    if (dir) { this.direction.y *= -1; }
    this.x += this.direction.x * delta;
    this.y += this.direction.y * delta;
  }

  randomElement() {
    const elements = ['hydrogen', 'helium', 'lithium', 'beryllium'];
    const { floor, random } = Math;
    return elements[floor(random() *elements.length)];
  }

  randomDirection() {
    const maxSpeed = 300;
    const { floor, random } = Math;
    let xDir = floor(random() * (maxSpeed * 2)) - maxSpeed;
    let yDir = floor(random() * (maxSpeed * 2)) - maxSpeed;
    if (xDir === 0) { xDir = maxSpeed; }
    if (yDir === 0) { yDir = maxSpeed; }
    if (xDir > 0) {
      this.x = 0;
    } else {
      this.x = document.body.clientWidth * 2 - 10;
    }
    return { x: xDir, y: yDir };
  }

  draw(ctx, scale) {
    const { floor, random } = Math;
    const { x, y, radius, startAngle, endAngle, color } = this;
    const { texture, image } = this;
    if (scale !== this.scale) { this.scale = scale; }
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius * scale, startAngle, endAngle);
    ctx.stroke();
    ctx.fill();

    ctx.shadowColor = '#343434';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.stroke();
    ctx.fill();
    ctx.drawImage(
      image,
      x - (radius * texture.xOffSet) * scale,
      y - (radius * texture.yOffSet) * scale,
      (radius * texture.wOffSet) * scale,
      (radius * 2 * texture.hOffSet) * scale
    );
    ctx.closePath();
    // this.shade(ctx, 3, scale);
  }

  shade(ctx, times, scale) {
    const { x, y, radius, startAngle, endAngle } = this;
    let newRadius = radius * scale * .7;
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


