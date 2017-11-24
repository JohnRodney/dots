(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Colors = function () {
  function Colors() {
    _classCallCheck(this, Colors);

    this.allowed = ['#FF5722', '#FFC107', '#00BCD4', '#7CB342', '#78909C', '#f44336', '#303F9F', '#303F9F', '#29B6F6', '#e57373', '#FFA726', '#66BB6A', '#03A9F4'];
  }

  _createClass(Colors, [{
    key: 'random',
    value: function random() {
      var random = Math.random,
          floor = Math.floor;

      var randomIndex = floor(random() * this.allowed.length);
      return this.allowed[randomIndex];
    }
  }]);

  return Colors;
}();

exports.default = Colors;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('./colors.js');

var _colors2 = _interopRequireDefault(_colors);

var _shadeColor = require('./utilities/shade-color');

var _shadeColor2 = _interopRequireDefault(_shadeColor);

var _playerSkins = require('./utilities/player-skins');

var _playerSkins2 = _interopRequireDefault(_playerSkins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dot = function () {
  function Dot(x, y, radius, startAngle, endAngle) {
    _classCallCheck(this, Dot);

    var floor = Math.floor,
        random = Math.random;

    this.scale = 1;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.colors = new _colors2.default();
    this.color = this.colors.random();
    this.direction = this.randomDirection();
    this.element = this.randomElement();
    this.texture = _playerSkins2.default[floor(random() * _playerSkins2.default.length)];
    this.image = document.createElement('img');
    this.image.src = '' + window.location.origin + this.texture.path;
  }

  _createClass(Dot, [{
    key: 'move',
    value: function move(delta) {
      var random = Math.random,
          floor = Math.floor;

      var dir = floor(random() * 100) === 9;
      if (dir) {
        this.direction.y *= -1;
      }
      this.x += this.direction.x * delta;
      this.y += this.direction.y * delta;
    }
  }, {
    key: 'randomElement',
    value: function randomElement() {
      var elements = ['hydrogen', 'helium', 'lithium', 'beryllium'];
      var floor = Math.floor,
          random = Math.random;

      return elements[floor(random() * elements.length)];
    }
  }, {
    key: 'randomDirection',
    value: function randomDirection() {
      var maxSpeed = 300;
      var floor = Math.floor,
          random = Math.random;

      var xDir = floor(random() * (maxSpeed * 2)) - maxSpeed;
      var yDir = floor(random() * (maxSpeed * 2)) - maxSpeed;
      if (xDir === 0) {
        xDir = maxSpeed;
      }
      if (yDir === 0) {
        yDir = maxSpeed;
      }
      if (xDir > 0) {
        this.x = 0;
      } else {
        this.x = document.body.clientWidth * 2 - 10;
      }
      return { x: xDir, y: yDir };
    }
  }, {
    key: 'draw',
    value: function draw(ctx, scale) {
      var floor = Math.floor,
          random = Math.random;
      var x = this.x,
          y = this.y,
          radius = this.radius,
          startAngle = this.startAngle,
          endAngle = this.endAngle,
          color = this.color;
      var texture = this.texture,
          image = this.image;

      if (scale !== this.scale) {
        this.scale = scale;
      }
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius * scale, startAngle, endAngle);
      ctx.stroke();
      ctx.fill();

      ctx.shadowColor = '#343434';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.stroke();
      ctx.fill();
      ctx.drawImage(image, x - radius * texture.xOffSet * scale, y - radius * texture.yOffSet * scale, radius * texture.wOffSet * scale, radius * 2 * texture.hOffSet * scale);
      ctx.closePath();
      // this.shade(ctx, 3, scale);
    }
  }, {
    key: 'shade',
    value: function shade(ctx, times, scale) {
      var x = this.x,
          y = this.y,
          radius = this.radius,
          startAngle = this.startAngle,
          endAngle = this.endAngle;

      var newRadius = radius * scale * .7;
      var newColor = this.color;
      for (var i = 0; i < times; i++) {
        ctx.beginPath();
        newColor = (0, _shadeColor2.default)(newColor, .1);
        ctx.strokeStyle = newColor;
        ctx.fillStyle = newColor;
        ctx.moveTo(x, y);
        ctx.arc(x, y, newRadius, startAngle, endAngle);
        ctx.shadowColor = '#343434';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        newRadius = newRadius * .7;
      }
    }
  }]);

  return Dot;
}();

exports.default = Dot;
},{"./colors.js":1,"./utilities/player-skins":14,"./utilities/shade-color":15}],3:[function(require,module,exports){
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
},{"./dot":2,"./menu":4,"./player":5,"./store":6,"./survival":7,"./utilities/animation-manager":8,"./utilities/input-manager":9,"./utilities/inventory-manager":11,"./utilities/inventory-textures":12,"./utilities/utility-functions":19}],4:[function(require,module,exports){
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
},{"./utilities/menu-item":13,"./utilities/stub-data":16}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playerSkins = require('./utilities/player-skins');

var _playerSkins2 = _interopRequireDefault(_playerSkins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    var _this = this;

    _classCallCheck(this, Player);

    this.x = document.body.clientWidth / 2;
    this.y = document.body.clientHeight / 2;
    this.radius = 30;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    document.body.addEventListener("mousemove", function (e) {
      return _this.mouseMove(e);
    });
  }

  _createClass(Player, [{
    key: 'mouseMove',
    value: function mouseMove(e) {
      var clientX = e.clientX,
          clientY = e.clientY;

      this.x = clientX * 2;
      this.y = clientY * 2;
    }
  }, {
    key: 'draw',
    value: function draw(ctx, scale) {
      var x = this.x,
          y = this.y,
          radius = this.radius,
          startAngle = this.startAngle,
          endAngle = this.endAngle;

      ctx.beginPath();
      ctx.fillStyle = '#afafaf';
      ctx.moveTo(x, y);
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      var texture = _playerSkins2.default[2];
      var image = document.createElement('img');
      image.src = '' + window.location.origin + texture.path;
      ctx.arc(x, y, radius * scale, startAngle, endAngle);
      ctx.stroke();
      ctx.fill();
      ctx.drawImage(image, this.x - this.radius * texture.xOffSet * scale, this.y - this.radius * texture.yOffSet * scale, this.radius * texture.wOffSet * scale, this.radius * 2 * texture.hOffSet * scale);
      ctx.closePath();
    }
  }]);

  return Player;
}();

exports.default = Player;
},{"./utilities/player-skins":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store(game) {
    _classCallCheck(this, Store);

    this.game = game;
  }

  _createClass(Store, [{
    key: 'render',
    value: function render() {
      var _game = this.game,
          ctx = _game.ctx,
          canvas = _game.canvas,
          inventoryManager = _game.inventoryManager;
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

      this.game.player.draw(this.ctx, 3);
    }
  }]);

  return Store;
}();

exports.default = Store;
},{}],7:[function(require,module,exports){
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
},{"./dot":2,"./utilities/text-animation":18,"./utilities/utility-functions":19}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimationManager = function () {
  function AnimationManager() {
    _classCallCheck(this, AnimationManager);

    this.animations = [];
  }

  _createClass(AnimationManager, [{
    key: "push",
    value: function push(animation) {
      this.animations.push(animation);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.animations.forEach(function (animation) {
        return animation.draw(ctx);
      });
      this.animations = this.animations.filter(function (animation) {
        return !animation.destroy;
      });
    }
  }]);

  return AnimationManager;
}();

exports.default = AnimationManager;
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputManager = function () {
  function InputManager(game) {
    _classCallCheck(this, InputManager);

    this.game = game;
    window.addEventListener('keydown', this.keypress.bind(this));
  }

  _createClass(InputManager, [{
    key: 'keypress',
    value: function keypress(e) {
      switch (e.keyCode) {
        case 80:
          this.game.state !== 'paused' ? this.game.state = 'paused' : this.game.state = 'survival';
      }
    }
  }]);

  return InputManager;
}();

exports.default = InputManager;
},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryItem = function () {
  function InventoryItem(name, quantity) {
    _classCallCheck(this, InventoryItem);

    this.quantity = quantity;
    this.name = name;
  }

  _createClass(InventoryItem, [{
    key: "addTo",
    value: function addTo(quantity) {
      this.quanitity += quantity;
    }
  }, {
    key: "getAsItemSchema",
    value: function getAsItemSchema() {
      var quantity = this.quantity,
          name = this.name;

      return { quantity: quantity, name: name };
    }
  }, {
    key: "saveToPlayer",
    value: function saveToPlayer(player) {
      player.inventory.push(this.getAsItemSchema());
    }
  }]);

  return InventoryItem;
}();

exports.default = InventoryItem;
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stubInventory = require('./stub-inventory');

var _stubInventory2 = _interopRequireDefault(_stubInventory);

var _inventoryItem = require('./inventory-item');

var _inventoryItem2 = _interopRequireDefault(_inventoryItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryManager = function () {
  function InventoryManager(parent) {
    _classCallCheck(this, InventoryManager);

    var isDev = window.deployment === 'development';
    this.game = parent;
    this.playerInventory = isDev ? _stubInventory2.default : [];
    this.coins = 0;
    if (!isDev) {
      this.getInventoryFromDB();
    }
  }

  _createClass(InventoryManager, [{
    key: 'getInventoryFromDB',
    value: function getInventoryFromDB() {
      var self = this;
      var _game = this.game,
          username = _game.username,
          _id = _game._id;


      $.post(window.location.origin + '/dots/get-player', { username: username, _id: _id }, function (data) {
        if (data.length === 0) {
          return false;
        }
        self.coins = parseInt(data[0].coins);

        self.playerInventory = data[0].playerInventory.map(function (item) {
          var name = item.name,
              quantity = item.quantity;

          return { name: name, quantity: parseInt(quantity) };
        });
      });
    }
  }, {
    key: 'updateItem',
    value: function updateItem(item) {
      var playerInventory = this.playerInventory;

      this.playerInventory = playerInventory.map(function (ownedItem) {
        return item.name === ownedItem.name ? new _inventoryItem2.default(item.name, ownedItem.quantity + item.quantity) : ownedItem;
      });
    }
  }, {
    key: 'addCoins',
    value: function addCoins(quantity) {
      this.coins += quantity;
    }
  }, {
    key: 'push',
    value: function push(item) {
      var playerInventory = this.playerInventory;

      var hasItem = playerInventory.filter(function (ownedItem) {
        return ownedItem.name === item.name;
      }).length > 0;

      if (hasItem) {
        this.updateItem(item);
      } else {
        playerInventory.push(new _inventoryItem2.default(item.name, item.quantity));
      }
    }
  }]);

  return InventoryManager;
}();

exports.default = InventoryManager;
},{"./inventory-item":10,"./stub-inventory":17}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  hydrogen: { path: '/images/hydrogen.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  helium: { path: '/images/helium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  beryllium: { path: '/images/beryllium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  lithium: { path: '/images/lithium.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 },
  coin: { path: '/images/coin.png', xOffSet: 1, yOffSet: 1, wOffSet: 1, hOffSet: 1 }
};
},{}],13:[function(require,module,exports){
"use strict";

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
    key: "draw",
    value: function draw(ctx) {
      var text = this.text,
          x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;

      ctx.fillText("" + text, x + width / 2, y + height / 2);
    }
  }, {
    key: "collide",
    value: function collide(checkX, checkY) {
      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;

      return checkX > x && checkX < x + width && checkY > y && checkY < y + height;
    }
  }]);

  return MenuItem;
}();

exports.default = MenuItem;
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{ path: '/images/red-devil-skin.png', xOffSet: 1.3, yOffSet: 2, wOffSet: 2.7, hOffSet: 2 }, { path: '/images/green-goat.png', xOffSet: 1, yOffSet: 1, wOffSet: 2, hOffSet: 1 }, { path: '/images/blueface.png', xOffSet: 1, yOffSet: 1, wOffSet: 2, hOffSet: 1 }];
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = shadeColor2;
function shadeColor2(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}
},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* a sample high score data response from the server */
exports.default = [{ "_id": "5a14d3365069fea02442183f", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "75" }, { "_id": "5a15b44fe094b7a08d1d3171", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "31" }, { "_id": "5a14d3615069fea024421840", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "30" }, { "_id": "5a14d2e45069fea02442183d", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "28" }, { "_id": "5a15b280e094b7a08d1d316d", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "24" }, { "_id": "5a14d2f45069fea02442183e", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "21" }, { "_id": "5a15b351e094b7a08d1d316e", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "174" }, { "_id": "5a15b436e094b7a08d1d3170", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "168" }, { "_id": "5a15b265e094b7a08d1d316b", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "15" }, { "_id": "5a15b26ce094b7a08d1d316c", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "12" }, { "_id": "5a15b25de094b7a08d1d316a", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "11" }, { "_id": "5a15b38fe094b7a08d1d316f", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "10" }];
},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{ name: "hydrogen", quantity: 1 }, { name: "lithium", quantity: 1 }, { name: "helium", quantity: 1 }, { name: "beryllium", quantity: 1 }];
},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextAnimation = function () {
  function TextAnimation(life, x, y, message) {
    _classCallCheck(this, TextAnimation);

    this.start = new Date().getTime();
    this.end = this.start + life;
    this.destroy = false;
    this.text = message;
    this.x = x;
    this.y = y;
  }

  _createClass(TextAnimation, [{
    key: "draw",
    value: function draw(ctx) {
      var text = this.text,
          x = this.x,
          y = this.y,
          end = this.end;

      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.font = "30px Arial";
      ctx.fillText(text, x, y);
      ctx.closePath();
      this.y -= 5;
      if (end < new Date().getTime()) {
        this.destroy = true;
      }
    }
  }]);

  return TextAnimation;
}();

exports.default = TextAnimation;
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offscreen = offscreen;
exports.getCookie = getCookie;
function offscreen(dot) {
  return dot.x + dot.radius < 0 || dot.y + dot.radius < 0 || dot.x - dot.radius > document.body.clientWidth * 2 || dot.y - dot.radius > document.body.clientHeight * 2;
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
},{}],20:[function(require,module,exports){
'use strict';

var _game = require('./game/game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  return new _game2.default().run();
};
},{"./game/game":3}]},{},[20]);
