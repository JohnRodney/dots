import dataStub from './utilities/stub-data';
import MenuItem from './utilities/menu-item';

export default class Menu {
  constructor(parent) {
    this.parent = parent;
    this.menuItems = [];
    this.font = "100px Indie Flower, cursive";
    this.menuLabels = ['Survival','High Scores','Story Mode', `Store`];
    this.buildMenu();
  }

  buildMenu() {
    const { menuLabels, menuItems } = this;
    const { clientWidth } = document.body;
    menuLabels.forEach((item, index) => {
      const menuItem = new MenuItem(clientWidth / 2, 300 + (200 * index), clientWidth, 200, item)
      menuItems.push(menuItem);
    });

    this.registerEvents();
  }

  registerEvents() {
    document.body.addEventListener("click", (e) => this.handleClick(e));
  }

  handleClick(e) {
    const { x, y } = e;
    const { menuItems, parent } = this;
    const item = menuItems.filter(item => item.collide(x * 2, y * 2)).pop();

    if (parent.state !== 'high-scores' && parent.state !== 'main-menu' && parent.state !== 'store') {
      return false;
    } if (parent.state === 'high-scores') {
      parent.state = "main-menu"
    } else if (parent.state === 'store') {
      parent.state = "main-menu"
    } else if (item && item.text === 'Survival') {
      parent.state = 'start-survival';
    } else if(item.text === 'Store') {
      parent.state = 'store';
    } else if(item.text === 'High Scores') {
      if (window.deployment === 'development') {
        parent.state = 'high-scores';
        parent.scores = dataStub;
      } else {
        $.get(`${window.location.origin}/dots/highscores`, (data) => {
          parent.state = 'high-scores';
          parent.scores = data;
        });
      }
    }
  }

  drawBackground(ctx) {
    const { clientWidth, clientHeight } = document.body;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(100, 100, clientWidth * 2 - 200, clientHeight * 2 - 200);
    ctx.closePath();
  }

  drawMenuItems(ctx) {
    const { menuItems, font } = this;

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = font;
    menuItems.forEach(item => item.draw(ctx));
    ctx.closePath();
  }

  draw(ctx) {
    this.drawBackground(ctx);
    this.drawMenuItems(ctx);
  }
}
