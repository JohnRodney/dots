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