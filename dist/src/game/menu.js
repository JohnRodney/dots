'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuItem = function () {
  function MenuItem(x, y, w, h, text) {
    _classCallCheck(this, MenuItem);

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
  }

  _createClass(MenuItem, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillText('' + this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
  }, {
    key: 'collide',
    value: function collide(x, y) {
      console.log(x, y, this.x, this.y);
      return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    }
  }]);

  return MenuItem;
}();

var Menu = function () {
  function Menu(parent) {
    var _this = this;

    _classCallCheck(this, Menu);

    this.parent = parent;
    this.menuItems = [];

    ['Survival', 'High Scores', 'Story Mode', 'Store'].forEach(function (item, index) {
      _this.menuItems.push(new MenuItem(document.body.clientWidth / 2, 300 + 200 * index, document.body.clientWidth, 200, item));
    });

    document.body.addEventListener("click", function (e) {
      return _this.handleClick(e);
    });
  }

  _createClass(Menu, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var x = e.x,
          y = e.y;

      var item = this.menuItems.filter(function (item) {
        return item.collide(x * 2, y * 2);
      }).pop();
      if (item && item.text === 'Survival') {
        this.parent.state = 'survival';
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(100, 100, document.body.clientWidth * 2 - 200, document.body.clientHeight * 2 - 200);
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = "100px Indie Flower, cursive";
      this.menuItems.forEach(function (item) {
        return item.draw(ctx);
      });

      ctx.closePath();
    }
  }]);

  return Menu;
}();

exports.default = Menu;