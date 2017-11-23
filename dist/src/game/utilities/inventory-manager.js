'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* inventory
 *   Player {
 *     username,
 *     password,
 *     _id,
 *     inventory: [
 *       <InventoryItem>
 *     ]
 *   }
 *   InventoryItem {
 *     name,
 *     qauntity,
 *   }
 *
 * */
var playerStub = {
  username: 'John',
  password: 'Rodney',
  _id: 'a;lkjasdf',
  inventory: []
};

var InventoryItem = function () {
  function InventoryItem(name, quantity) {
    _classCallCheck(this, InventoryItem);

    this.quanitity = qauntity;
    this.nam = name;
  }

  _createClass(InventoryItem, [{
    key: 'addTo',
    value: function addTo(quantity) {
      this.quanitity += quantity;
    }
  }, {
    key: 'getAsItemSchema',
    value: function getAsItemSchema() {
      var quantity = this.quantity,
          name = this.name;

      return { quantity: quantity, name: name };
    }
  }, {
    key: 'saveToPlayer',
    value: function saveToPlayer(player) {
      player.inventory.push(this.getAsItemSchema());
    }
  }]);

  return InventoryItem;
}();

var InventoryManager = function () {
  function InventoryManager() {
    _classCallCheck(this, InventoryManager);

    this.playerInventory = [];
    this.coins = 0;
  }

  _createClass(InventoryManager, [{
    key: 'updateItem',
    value: function updateItem(item) {
      var playerInventory = this.playerInventory;

      this.playerInventory = playerInventory.map(function (ownedItem) {
        return item.name === ownedItem.name ? { name: item.name, quantity: ownedItem.quantity + item.quantity } : ownedItem;
      });
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
        playerInventory.push(item);
      }
    }
  }]);

  return InventoryManager;
}();

exports.default = InventoryManager;