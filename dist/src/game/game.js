'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dot = require('./dot');

var _dot2 = _interopRequireDefault(_dot);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _inputManager = require('./utilities/input-manager');

var _inputManager2 = _interopRequireDefault(_inputManager);

var _survival = require('./survival');

var _survival2 = _interopRequireDefault(_survival);

var _animationManager = require('./utilities/animation-manager');

var _animationManager2 = _interopRequireDefault(_animationManager);

var _inventoryManager = require('./utilities/inventory-manager');

var _inventoryManager2 = _interopRequireDefault(_inventoryManager);

var _utilityFunctions = require('./utilities/utility-functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inventoryTextures = {
  hydrogen: { path: '/images/hydrogen.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  helium: { path: '/images/helium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  beryllium: { path: '/images/beryllium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  lithium: { path: '/images/lithium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  coin: { path: '/images/coin.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 }
};

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.delta = 0;
    this.lastRender = new Date().getTime();
    this.username = (0, _utilityFunctions.getCookie)('username');
    this._id = (0, _utilityFunctions.getCookie)('_id');
    this.animationManager = new _animationManager2.default();
    this.inventoryManager = new _inventoryManager2.default(this);
    this.inputManger = new _inputManager2.default(this);
    this.menu = new _menu2.default(this);
    this.state = 'main-menu';
    this.player = new _player2.default();
    this.setupCanvas();
  }

  _createClass(Game, [{
    key: 'setupCanvas',
    value: function setupCanvas() {
      this.canvas = document.getElementById('game');
      this.canvas.width = document.body.clientWidth * 2;
      this.canvas.height = document.body.clientHeight * 2;
      this.canvas.style.width = document.body.clientWidth + 'px';
      this.canvas.style.height = document.body.clientHeight + 'px';
      this.ctx = this.canvas.getContext('2d');
    }
  }, {
    key: 'gameMenu',
    value: function gameMenu() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.menu.draw(this.ctx);
      this.player.draw(this.ctx, 5);
    }
  }, {
    key: 'renderHighScores',
    value: function renderHighScores() {
      var _this = this;

      var ctx = this.ctx;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var startY = 200;
      var scoreHeight = 100;
      var top10 = this.scores.filter(function (scores, i) {
        return i < 10;
      });

      top10.forEach(function (score, i) {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'rgba(150, 201, 230, .5)';
        ctx.beginPath();
        ctx.rect(_this.canvas.width / 2 - 300, startY + scoreHeight * i, 600, scoreHeight - 10);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'alphabetic';
        ctx.font = "50px Indie Flower, cursive";
        ctx.fillText(i + 1 + '.   ' + score.username + ':   ' + score.score, _this.canvas.width / 2, 60 + startY + scoreHeight * i);
        ctx.closePath();
      });
      this.player.draw(this.ctx, 5);
    }
  }, {
    key: 'render',
    value: function render() {
      var currentTime = new Date().getTime();
      this.delta = (currentTime - this.lastRender) / 1000;
      this.lastRender = currentTime;
      var ctx = this.ctx;

      if (this.state === 'main-menu') {
        this.gameMenu();
      } else if (this.state === 'start-survival') {
        this.survival = new _survival2.default(this.player, this);
        this.state = 'survival';
      } else if (this.state === 'high-scores') {
        this.renderHighScores();
      } else if (this.state === 'store') {
        this.renderStore();
      } else if (this.state === 'survival') {
        this.survival.play();
      } else if (this.state === 'gameover') {
        this.run();
        return false;
      }

      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.font = "30px Indie Flower, cursive";
      ctx.fillText('Player: ' + this.username, this.canvas.width / 2, 30);
      ctx.closePath();

      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: 'renderStore',
    value: function renderStore() {
      var ctx = this.ctx,
          canvas = this.canvas,
          inventoryManager = this.inventoryManager;
      var playerInventory = inventoryManager.playerInventory,
          coins = inventoryManager.coins;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.fillStyle = 'rgba(100, 255, 255, .3)';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
      ctx.rect(20, 80, String(coins).length * 10 + 400, 130);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      var texture = inventoryTextures.coin;
      var image = document.createElement('img');
      image.src = '' + window.location.origin + texture.path;

      ctx.drawImage(image, 40, 100, 90, 90);

      ctx.fillStyle = 'yellow';
      ctx.textBaseline = "middle";
      ctx.font = "70px Indie Flower, cursive";
      ctx.fillText('' + coins, 300, 150);
      ctx.closePath();

      playerInventory.forEach(function (item, i) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(100, 255, 255, .3)';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
        ctx.rect(20, 280 * i + 300, 350, 260);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        var texture = inventoryTextures[item.name];
        if (texture) {
          var _image = document.createElement('img');
          _image.src = '' + window.location.origin + texture.path;

          ctx.drawImage(_image, 30, 280 * i + 300, 180, 180);
        }

        ctx.textAlign = 'left';
        ctx.fillStyle = 'white';
        ctx.textBaseline = "top";
        ctx.font = "50px Indie Flower, cursive";
        ctx.fillText('' + item.name, 60, 280 * i + 480);
        ctx.fillText('' + item.quantity, 250, 280 * i + 350);
        ctx.closePath();
        ctx.textAlign = 'center';
      });

      this.player.draw(this.ctx, 3);
    }
  }, {
    key: 'run',
    value: function run() {
      this.player = new _player2.default();
      this.state = 'main-menu';
      this.render();
    }
  }]);

  return Game;
}();

exports.default = Game;