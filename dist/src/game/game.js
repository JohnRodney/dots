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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.animationManager = new _animationManager2.default();
    this.inventoryManager = new _inventoryManager2.default();
    this.inputManger = new _inputManager2.default(this);
    this.menu = new _menu2.default(this);
    this.state = 'constructed';
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
    key: 'render',
    value: function render() {
      if (this.state === 'constructed') {
        this.gameMenu();
      } else if (this.state === 'start-survival') {
        this.survival = new _survival2.default(this.player, this);
        this.state = 'survival';
      } else if (this.state === 'survival') {
        this.survival.play();
      } else if (this.state === 'gameover') {
        this.run();
        return false;
      }
      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: 'run',
    value: function run() {
      /* Game engine / canvas stuff */
      this.player = new _player2.default();
      this.state = 'constructed';
      this.render();
    }
  }]);

  return Game;
}();

exports.default = Game;