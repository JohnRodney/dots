class MenuItem {
  constructor(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
  }

  draw(ctx) {
    ctx.fillText(`${this.text}`, this.x + this.width / 2, this.y + this.height / 2);
  }

  collide(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}

export default class Menu {
  constructor(parent) {
    this.parent = parent;
    this.menuItems = [];

    ['Survival','High Scores','Story Mode', `Store`].forEach((item, index) => {
      this.menuItems.push(new MenuItem(
        document.body.clientWidth / 2,
        300 + (200 * index),
        document.body.clientWidth,
        200,
        item,
      ));
    });

    document.body.addEventListener("click", (e) => this.handleClick(e));
  }

  handleClick(e) {
    const { x, y } = e;
    const item = this.menuItems.filter(item => item.collide(x * 2, y * 2)).pop();
    if (item && item.text === 'Survival') {
      this.parent.state = 'start-survival';
    } else if(item.text === 'High Scores') {
      console.log('render highscore');
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(100, 100, document.body.clientWidth * 2 - 200, document.body.clientHeight * 2 - 200);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = "100px Indie Flower, cursive";
    this.menuItems.forEach(item => item.draw(ctx));

    ctx.closePath();
  }
}
