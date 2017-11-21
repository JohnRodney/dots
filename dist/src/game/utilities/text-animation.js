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