export default class MenuItem {
  constructor(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
  }

  draw(ctx) {
    const { text, x, y, width, height } = this;
    ctx.fillText(`${text}`, x + width / 2, y + height / 2);
  }

  collide(checkX, checkY) {
    const { x, y, width, height } = this;
    return (
      checkX > x &&
      checkX < x + width &&
      checkY > y &&
      checkY < y + height
    );
  }
}
