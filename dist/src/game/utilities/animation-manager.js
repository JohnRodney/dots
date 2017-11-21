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