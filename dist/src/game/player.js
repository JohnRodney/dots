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
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      var image = document.createElement('img');
      image.src = window.location.origin + '/red-devil-skin.png';
      // ctx.arc(x, y, radius * scale, startAngle, endAngle);
      ctx.stroke();
      ctx.fill();
      ctx.drawImage(image, this.x - this.radius * 1.3 * scale, this.y - this.radius * 2 * scale, this.radius * 2.7 * scale, this.radius * 2 * 2 * scale);
      ctx.closePath();
    }
  }]);

  return Player;
}();

exports.default = Player;