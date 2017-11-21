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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dot = function () {
  function Dot(x, y, radius, startAngle, endAngle) {
    _classCallCheck(this, Dot);

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
  }

  _createClass(Dot, [{
    key: 'move',
    value: function move() {
      this.x += this.direction.x;
      this.y += this.direction.y;
    }
  }, {
    key: 'randomElement',
    value: function randomElement() {
      var elements = ['hydrogen', 'helium'];
      var floor = Math.floor,
          random = Math.random;

      return elements[floor(random() * elements.length)];
    }
  }, {
    key: 'randomDirection',
    value: function randomDirection() {
      var maxSpeed = 6;
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
      var x = this.x,
          y = this.y,
          radius = this.radius,
          startAngle = this.startAngle,
          endAngle = this.endAngle;

      if (scale !== this.scale) {
        this.scale = scale;
      }
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius * scale, startAngle, endAngle);
      ctx.shadowColor = '#343434';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      this.shade(ctx, 3, scale);
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
},{"./colors.js":1,"./utilities/shade-color":10}],3:[function(require,module,exports){
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
},{"./dot":2,"./menu":4,"./player":5,"./survival":6,"./utilities/animation-manager":7,"./utilities/input-manager":8,"./utilities/inventory-manager":9}],4:[function(require,module,exports){
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
        this.parent.state = 'start-survival';
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
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    var _this = this;

    _classCallCheck(this, Player);

    this.x = document.body.clientWidth / 2;
    this.y = document.body.clientHeight / 2;
    this.radius = 10;
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
      ctx.arc(x, y, radius * scale, startAngle, endAngle);
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Player;
}();

exports.default = Player;
},{}],6:[function(require,module,exports){
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
    this.maxDots = 100;
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
      ctx.fillText('Coins: ' + this.coins, 100, 80);
      ctx.font = "100px Indie Flower, cursive";
      ctx.fillText('Level: ' + this.level, document.body.clientWidth, document.body.clientHeight * 2 - 100);
      this.physics();
      if (this.level * 10 + 10 < this.player.radius * this.scale) {
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
            // this.playerInventory.push(dot.element);
            if (true) {
              _this.currentCombo += 1;
              _this.coins += _this.currentCombo;
              _this.game.animationManager.push(new _textAnimation2.default(1000, player.x, player.y, 'Combo: +' + _this.currentCombo + ' ' + dot.element));
            } else {
              _this.currentCombo = 1;
              _this.coins += 1;
              _this.game.animationManager.push(new _textAnimation2.default(1000, player.x, player.y, '+1 ' + dot.element));
            }
            dot.destroy = true;
          } else {
            _this.game.state = 'gameover';
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
  }]);

  return Survival;
}();

exports.default = Survival;
},{"./dot":2,"./utilities/text-animation":11,"./utilities/utility-functions":12}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryManager = function InventoryManager() {
  _classCallCheck(this, InventoryManager);

  this.playerInventory = [];
  this.coins = 0;
};

exports.default = InventoryManager;
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.font = "30px Arial";
      ctx.fillText(this.text, this.x, this.y);
      ctx.closePath();
      this.y -= 5;
      if (this.end < new Date().getTime()) {
        this.destroy = true;
      }
    }
  }]);

  return TextAnimation;
}();

exports.default = TextAnimation;
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offscreen = offscreen;
function offscreen(dot) {
  return dot.x + dot.radius < 0 || dot.y + dot.radius < 0 || dot.x - dot.radius > document.body.clientWidth * 2 || dot.y - dot.radius > document.body.clientHeight * 2;
}
},{}],13:[function(require,module,exports){
'use strict';

var _game = require('./game/game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  return new _game2.default().run();
};
},{"./game/game":3}]},{},[13]);
