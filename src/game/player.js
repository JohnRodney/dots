export default class Player {
  constructor() {
    this.x = document.body.clientWidth / 2;
    this.y = document.body.clientHeight / 2;
    this.radius = 10;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    document.body.addEventListener("mousemove", (e) => this.mouseMove(e));
  }

  mouseMove(e) {
    const { clientX, clientY } = e;
    this.x = clientX * 2;
    this.y = clientY * 2;
  }

  draw(ctx, scale) {
    const { x, y, radius, startAngle, endAngle } = this;
    ctx.beginPath();
    ctx.fillStyle = '#afafaf'
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius * scale, startAngle, endAngle);
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}


