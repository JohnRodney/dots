'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dot = require('./dot');

var _dot2 = _interopRequireDefault(_dot);

var _utilityFunctions = require('./utilities/utility-functions');

var _textAnimation = require('./utilities/text-animation');

var _textAnimation2 = _interopRequireDefault(_textAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Survival = function () {
  /* initiate all defaults for a survival mode */
  function Survival(player, game) {
    _classCallCheck(this, Survival);

    this.player = player;
    this.game = game;
    this.level = 1;
    this.scale = 1;
    this.currentCombo = 0;
    /* survival game mode stuff*/
    this.maxDots = 50;
    this.dots = [];
    for (var i = 0; i < this.maxDots; i++) {
      this.dots.push(new _dot2.default(this.randomX(), this.randomY(), this.randomRadius(), 0, 2 * Math.PI));
    }
  }

  /* generate a radius from 0 to twice player's radius */


  _createClass(Survival, [{
    key: 'randomRadius',
    value: function randomRadius() {
      var player = this.player;
      var floor = Math.floor,
          random = Math.random;

      var maxSize = player ? player.radius * 2 : 50;
      return floor(random() * maxSize);
    }

    /* generate Y coordinate from 0 to canvas height */

  }, {
    key: 'randomY',
    value: function randomY() {
      var floor = Math.floor,
          random = Math.random;
      var height = this.game.canvas.height;

      return floor(random() * height);
    }

    /* generate X coordinate from 0 to canvas width */

  }, {
    key: 'randomX',
    value: function randomX() {
      var floor = Math.floor,
          random = Math.random;
      var width = this.game.canvas.width;

      return floor(random() * width);
    }
  }, {
    key: 'play',
    value: function play() {
      console.log(this);
      var _game = this.game,
          ctx = _game.ctx,
          canvas = _game.canvas;
      var dots = this.dots,
          scale = this.scale,
          player = this.player;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(function (dot) {
        return dot.draw(ctx, scale);
      });
      this.game.animationManager.draw(ctx);
      player.draw(ctx, scale);
      ctx.fillStyle = 'yellow';
      ctx.font = "30px Arial";
      ctx.fillText('Score: ' + player.radius, 100, 50);
      ctx.fillText('Coins: ' + this.game.inventoryManager.coins, 100, 80);
      ctx.font = "100px Indie Flower, cursive";
      ctx.fillText('Level: ' + this.level, document.body.clientWidth, document.body.clientHeight * 2 - 100);
      this.physics();
      if (this.level * 30 + 30 < this.player.radius * this.scale) {
        this.scale /= 2;
        this.level++;
      }
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
            _this.game.inventoryManager.push({ name: dot.element, quantity: 1 });
            if (_this.game.animationManager.animations.length > 0) {
              _this.currentCombo += 1;
              _this.game.inventoryManager.addCoins(1 * _this.currentCombo);
              _this.game.animationManager.push(new _textAnimation2.default(1000, player.x, player.y, 'Combo: +' + _this.currentCombo + ' Coins and ' + dot.element));
            } else {
              _this.currentCombo = 1;
              _this.game.inventoryManager.addCoins(1);
              _this.game.animationManager.push(new _textAnimation2.default(1000, player.x, player.y, '+1 Coins and ' + dot.element));
            }
            dot.destroy = true;
          } else {
            _this.game.state = 'gameover';
            if (_this.game.username && _this.game._id) {
              $.post(window.location.origin + '/dots/highscore', { username: _this.game.username, playerId: _this.game._id, score: _this.player.radius }, function (data) {
                console.log(data, 'posted high score');
              });
              var _game2 = _this.game,
                  username = _game2.username,
                  _id = _game2._id;
              var _game$inventoryManage = _this.game.inventoryManager,
                  coins = _game$inventoryManage.coins,
                  playerInventory = _game$inventoryManage.playerInventory;

              $.post(window.location.origin + '/dots/player', { username: username, _id: _id, coins: coins, playerInventory: playerInventory }, function (data) {
                console.log(data, 'player inventory');
              });
            }
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
        return dot.move(_this.game.delta);
      });
    }
  }]);

  return Survival;
}();

exports.default = Survival;