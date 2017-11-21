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