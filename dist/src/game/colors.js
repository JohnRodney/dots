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