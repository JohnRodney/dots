'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dot = require('./dot');

var _dot2 = _interopRequireDefault(_dot);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _textAnimation = require('./utilities/text-animation');

var _textAnimation2 = _interopRequireDefault(_textAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.animations = [];
    this.coins = 0;
    this.currentCombo = 0;
    window.addEventListener('keydown', this.keypress.bind(this));
    this.state = 'constructed';
  }

  _createClass(Game, [{
    key: 'keypress',
    value: function keypress(e) {
      switch (e.keyCode) {
        case 80:
          this.state !== 'paused' ? this.state = 'paused' : this.state = 'play';
      }
    }
  }, {
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
        if (_this.distance(dot) <= player.radius + dot.radius) {
          if (player.radius > dot.radius) {
            player.radius += 1;
            if (_this.animations.length > 0) {
              _this.currentCombo += 1;
              _this.coins += _this.currentCombo;
              _this.animations.push(new _textAnimation2.default(1000, player.x, player.y, 'Combo: +' + _this.currentCombo));
            } else {
              _this.currentCombo = 1;
              _this.coins += 1;
              _this.animations.push(new _textAnimation2.default(1000, player.x, player.y, "+1"));
            }
            dot.destroy = true;
          } else {
            _this.gameover = true;
            _this.animations.push(new _textAnimation2.default(1000, player.x, player.y, "You DIED!"));
          }
        }
        if (_this.offscreen(dot)) {
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state === 'paused') {
        requestAnimationFrame(this.render.bind(this));
        return false;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dots.forEach(function (dot) {
        return dot.draw(_this2.ctx);
      });
      this.animations.forEach(function (animation) {
        return animation.draw(_this2.ctx);
      });
      this.animations = this.animations.filter(function (animation) {
        return !animation.destroy;
      });
      this.player.draw(this.ctx);
      this.ctx.fillStyle = 'yellow';
      this.ctx.font = "30px Arial";
      this.ctx.fillText('Score: ' + this.player.radius, 10, 50);
      this.ctx.fillText('Coins: ' + this.coins, 10, 80);
      this.physics();
      if (this.gameover) {
        this.run();
      } else {
        requestAnimationFrame(this.render.bind(this));
      }
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.player = new _player2.default();
      this.dots = [];
      for (var i = 0; i < 10; i++) {
        this.dots.push(new _dot2.default(this.randomX(), this.randomY(), this.randomRadius(), 0, 2 * Math.PI));
      }
    }
  }, {
    key: 'offscreen',
    value: function offscreen(dot) {
      return dot.x + dot.radius < 0 || dot.y + dot.radius < 0 || dot.x - dot.radius > document.body.clientWidth * 2 || dot.y - dot.radius > document.body.clientHeight * 2;
    }
  }, {
    key: 'run',
    value: function run() {
      this.maxDots = 100;
      this.gameover = false;
      this.canvas = document.getElementById('game');
      this.canvas.width = document.body.clientWidth * 2;
      this.canvas.height = document.body.clientHeight * 2;
      this.canvas.style.width = document.body.clientWidth + 'px';
      this.canvas.style.height = document.body.clientHeight + 'px';
      this.ctx = this.canvas.getContext('2d');
      this.player = new _player2.default();
      this.dots = [];
      for (var i = 0; i < this.maxDots; i++) {
        this.dots.push(new _dot2.default(this.randomX(), this.randomY(), this.randomRadius(), 0, 2 * Math.PI));
      }
      this.render();
    }
  }]);

  return Game;
}();

exports.default = Game;