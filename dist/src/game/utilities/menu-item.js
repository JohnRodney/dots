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