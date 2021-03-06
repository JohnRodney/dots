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

var _inventoryTextures = require('./utilities/inventory-textures');

var _inventoryTextures2 = _interopRequireDefault(_inventoryTextures);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.store = new _store2.default(this);
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
    this.survival = new _survival2.default(this.player, this);
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
    key: 'setDelta',
    value: function setDelta() {
      var currentTime = new Date().getTime();
      this.delta = (currentTime - this.lastRender) / 1000;
      this.lastRender = currentTime;
    }
  }, {
    key: 'stateFunctionHash',
    value: function stateFunctionHash() {
      return {
        'main-menu': this.gameMenu,
        'start-survival': this.startSurvival,
        'high-scores': this.renderHighScores,
        'store': this.renderStore,
        'survival': this.runSurvival
      };
    }
  }, {
    key: 'runSurvival',
    value: function runSurvival() {
      this.survival.play();
    }
  }, {
    key: 'startSurvival',
    value: function startSurvival() {
      this.survival = new _survival2.default(this.player, this);
      this.state = 'survival';
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state === 'gameover') {
        this.run();
        return false;
      }

      this.setDelta();
      this.stateFunctionHash()[this.state].call(this);
      this.renderPlayerText();
      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: 'renderPlayerText',
    value: function renderPlayerText() {
      var ctx = this.ctx;

      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.font = "30px Indie Flower, cursive";
      ctx.fillText('Player: ' + this.username, this.canvas.width / 2, 30);
      ctx.closePath();
    }
  }, {
    key: 'renderStore',
    value: function renderStore() {
      this.store.render();
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