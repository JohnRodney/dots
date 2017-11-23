'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stubData = require('./utilities/stub-data');

var _stubData2 = _interopRequireDefault(_stubData);

var _menuItem = require('./utilities/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
  function Menu(parent) {
    _classCallCheck(this, Menu);

    this.parent = parent;
    this.menuItems = [];
    this.font = "100px Indie Flower, cursive";
    this.menuLabels = ['Survival', 'High Scores', 'Story Mode', 'Store'];
    this.buildMenu();
  }

  _createClass(Menu, [{
    key: 'buildMenu',
    value: function buildMenu() {
      var menuLabels = this.menuLabels,
          menuItems = this.menuItems;
      var clientWidth = document.body.clientWidth;

      menuLabels.forEach(function (item, index) {
        var menuItem = new _menuItem2.default(clientWidth / 2, 300 + 200 * index, clientWidth, 200, item);
        menuItems.push(menuItem);
      });

      this.registerEvents();
    }
  }, {
    key: 'registerEvents',
    value: function registerEvents() {
      var _this = this;

      document.body.addEventListener("click", function (e) {
        return _this.handleClick(e);
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var x = e.x,
          y = e.y;
      var menuItems = this.menuItems,
          parent = this.parent;

      var item = menuItems.filter(function (item) {
        return item.collide(x * 2, y * 2);
      }).pop();

      if (parent.state !== 'high-scores' && parent.state !== 'main-menu' && parent.state !== 'store') {
        return false;
      }if (parent.state === 'high-scores') {
        parent.state = "main-menu";
      } else if (parent.state === 'store') {
        parent.state = "main-menu";
      } else if (item && item.text === 'Survival') {
        parent.state = 'start-survival';
      } else if (item.text === 'Store') {
        parent.state = 'store';
      } else if (item.text === 'High Scores') {
        if (window.deployment === 'development') {
          parent.state = 'high-scores';
          parent.scores = _stubData2.default;
        } else {
          $.get(window.location.origin + '/dots/highscores', function (data) {
            parent.state = 'high-scores';
            parent.scores = data;
          });
        }
      }
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(ctx) {
      var _document$body = document.body,
          clientWidth = _document$body.clientWidth,
          clientHeight = _document$body.clientHeight;

      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(100, 100, clientWidth * 2 - 200, clientHeight * 2 - 200);
      ctx.closePath();
    }
  }, {
    key: 'drawMenuItems',
    value: function drawMenuItems(ctx) {
      var menuItems = this.menuItems,
          font = this.font;


      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = font;
      menuItems.forEach(function (item) {
        return item.draw(ctx);
      });
      ctx.closePath();
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      this.drawBackground(ctx);
      this.drawMenuItems(ctx);
    }
  }]);

  return Menu;
}();

exports.default = Menu;