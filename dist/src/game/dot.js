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