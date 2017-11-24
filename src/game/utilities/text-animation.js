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
    const { text, x, y, end } = this;
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.font = "30px Arial";
    ctx.fillText(text , x, y);
    ctx.closePath();
    this.y -= 5;
    if (end < new Date().getTime()) {
      this.destroy = true;
    }
  }
}
