export default class TextAnimation {
  constructor(life, x, y, message) {
    this.start = new Date().getTime();
    this.end = this.start + life;
    this.destroy = false;
    this.text = message;
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.font = "30px Arial";
    ctx.fillText(this.text , this.x, this.y);
    ctx.closePath();
    this.y -= 5;
    if (this.end < new Date().getTime()) {
      this.destroy = true;
    }
  }
}
