const dataStub = [{"_id":"5a14d3365069fea02442183f","username":"John","playerId":"5a14b46c411b829a380620be","score":"75"},{"_id":"5a15b44fe094b7a08d1d3171","username":"John","playerId":"5a14b46c411b829a380620be","score":"31"},{"_id":"5a14d3615069fea024421840","username":"John","playerId":"5a14b46c411b829a380620be","score":"30"},{"_id":"5a14d2e45069fea02442183d","username":"John","playerId":"5a14b46c411b829a380620be","score":"28"},{"_id":"5a15b280e094b7a08d1d316d","username":"John","playerId":"5a14b46c411b829a380620be","score":"24"},{"_id":"5a14d2f45069fea02442183e","username":"John","playerId":"5a14b46c411b829a380620be","score":"21"},{"_id":"5a15b351e094b7a08d1d316e","username":"John","playerId":"5a14b46c411b829a380620be","score":"174"},{"_id":"5a15b436e094b7a08d1d3170","username":"John","playerId":"5a14b46c411b829a380620be","score":"168"},{"_id":"5a15b265e094b7a08d1d316b","username":"John","playerId":"5a14b46c411b829a380620be","score":"15"},{"_id":"5a15b26ce094b7a08d1d316c","username":"John","playerId":"5a14b46c411b829a380620be","score":"12"},{"_id":"5a15b25de094b7a08d1d316a","username":"John","playerId":"5a14b46c411b829a380620be","score":"11"},{"_id":"5a15b38fe094b7a08d1d316f","username":"John","playerId":"5a14b46c411b829a380620be","score":"10"}]

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
    if (this.parent.state === 'high-scores') {
      this.parent.state = "main-menu"
    } else if (item && item.text === 'Survival') {
      this.parent.state = 'start-survival';
    } else if(item.text === 'High Scores') {

      $.get(`${window.location.origin}/dots/highscores`, (data) => {
        this.parent.state = 'high-scores';
        this.parent.scores = data;
      });
      /* devmode
      this.parent.state = 'high-scores';
      this.parent.scores = dataStub;
      */
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
