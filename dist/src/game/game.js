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

var _textAnimation = require('./utilities/text-animation');

var _textAnimation2 = _interopRequireDefault(_textAnimation);

var _inputManager = require('./utilities/input-manager');

var _inputManager2 = _interopRequireDefault(_inputManager);

var _utilityFunctions = require('./utilities/utility-functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Survival = function Survival(game) {
  _classCallCheck(this, Survival);

  this.game = game;
};

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.level = 1;
    this.scale = 1;
    this.animations = [];
    this.playerInventory = [];
    this.coins = 0;
    this.currentCombo = 0;
    this.inputManger = new _inputManager2.default(this);
    this.state = 'constructed';
    this.menu = new _menu2.default(this);
    this.canvas = document.getElementById('game');
    this.canvas.width = document.body.clientWidth * 2;
    this.canvas.height = document.body.clientHeight * 2;
    this.canvas.style.width = document.body.clientWidth + 'px';
    this.canvas.style.height = document.body.clientHeight + 'px';
    this.ctx = this.canvas.getContext('2d');
  }

  _createClass(Game, [{
    key: 'randomRadius',
    value: function randomRadius() {
      var player = this.player;
      var floor = Math.floor,
          random = Math.random;

      var maxSize = player ? player.radius * 2 : 50;
      return floor(random() * maxSize);
    }
  }, {
    key: 'randomY',
    value: function randomY() {
      var floor = Math.floor,
          random = Math.random;
      var height = this.canvas.height;

      return floor(random() * height);
    }
  }, {
    key: 'randomX',
    value: function randomX() {
      var floor = Math.floor,
          random = Math.random;
      var width = this.canvas.width;

      return floor(random() * width);
    }
  }, {
    key: 'distance',
    value: function distance(dot) {
      var player = this.player;
      var sqrt = Math.sqrt;

      var a = player.x - dot.x;
      var b = player.y - dot.y;

      return sqrt(a * a + b * b);
    }
  }, {
    key: 'physics',
    value: function physics() {
      var _this = this;

      var player = this.player;

      this.dots.forEach(function (dot) {
        if (_this.distance(dot) <= player.radius * _this.scale + dot.radius * _this.scale) {
          if (player.radius > dot.radius) {
            player.radius += 1;
            _this.playerInventory.push(dot.element);
            if (_this.animations.length > 0) {
              _this.currentCombo += 1;
              _this.coins += _this.currentCombo;
              _this.animations.push(new _textAnimation2.default(1000, player.x, player.y, 'Combo: +' + _this.currentCombo + ' ' + dot.element));
            } else {
              _this.currentCombo = 1;
              _this.coins += 1;
              _this.animations.push(new _textAnimation2.default(1000, player.x, player.y, '+1 ' + dot.element));
            }
            dot.destroy = true;
          } else {
            _this.state = 'gameover';
          }
        }
        if ((0, _utilityFunctions.offscreen)(dot)) {
          dot.destroy = true;
        }
      });
      this.dots = this.dots.filter(function (dot) {
        return !dot.destroy;
      });
      if (this.dots.length < this.maxDots) {
        this.dots.push(new _dot2.default(this.randomX(), this.randomY(), this.randomRadius(), 0, 2 * Math.PI));
      }
      this.dots.forEach(function (dot) {
        return dot.move();
      });
    }
  }, {
    key: 'playSurvivalGameLoop',
    value: function playSurvivalGameLoop() {
      var _this2 = this;

      this.canvas.cursor = 'none';
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dots.forEach(function (dot) {
        return dot.draw(_this2.ctx, _this2.scale);
      });
      this.animations.forEach(function (animation) {
        return animation.draw(_this2.ctx);
      });
      this.animations = this.animations.filter(function (animation) {
        return !animation.destroy;
      });
      this.player.draw(this.ctx, this.scale);
      this.ctx.fillStyle = 'yellow';
      this.ctx.font = "30px Arial";
      this.ctx.fillText('Score: ' + this.player.radius, 100, 50);
      this.ctx.fillText('Coins: ' + this.coins, 100, 80);
      this.ctx.font = "100px Indie Flower, cursive";
      this.ctx.fillText('Level: ' + this.level, document.body.clientWidth, document.body.clientHeight * 2 - 100);
      this.physics();
      if (this.level * 10 + 10 < this.player.radius * this.scale) {
        this.scale /= 2;
        this.level++;
      }
    }
  }, {
    key: 'gameMenu',
    value: function gameMenu() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.menu.draw(this.ctx);
      this.player.draw(this.ctx, this.scale);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state === 'constructed') {
        this.gameMenu();
      } else if (this.state === 'survival') {
        this.playSurvivalGameLoop();
      } else if (this.state === 'gameover') {
        this.run();
        return false;
      }
      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: 'run',
    value: function run() {
      /* survival game mode stuff*/
      this.scale = 1;
      this.level = 1;
      this.maxDots = 100;
      this.player = new _player2.default();
      this.dots = [];
      for (var i = 0; i < this.maxDots; i++) {
        this.dots.push(new _dot2.default(this.randomX(), this.randomY(), this.randomRadius(), 0, 2 * Math.PI));
      }

      /* Game engine / canvas stuff */
      this.animations = [];
      this.state = 'constructed';
      this.render();
    }
  }]);

  return Game;
}();

exports.default = Game;