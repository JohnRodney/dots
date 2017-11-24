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

var inventoryStub = [{ name: "hydrogen", quantity: 1 }, { name: "lithium", quantity: 1 }, { name: "helium", quantity: 1 }, { name: "beryllium", quantity: 1 }];

var InventoryItem = function () {
  function InventoryItem(name, quantity) {
    _classCallCheck(this, InventoryItem);

    this.quantity = quantity;
    this.name = name;
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
  function InventoryManager(parent) {
    _classCallCheck(this, InventoryManager);

    this.game = parent;
    var isDev = window.deployment === 'development';
    this.playerInventory = isDev ? inventoryStub : [];
    this.coins = 0;
    var self = this;
    if (!isDev) {
      var _game = this.game,
          username = _game.username,
          _id = _game._id;

      $.post(window.location.origin + '/dots/get-player', { username: username, _id: _id }, function (data) {
        if (data.length === 0) {
          return false;
        }
        self.coins = parseInt(data[0].coins);
        self.playerInventory = data[0].playerInventory.map(function (item) {
          var name = item.name,
              quantity = item.quantity;

          console.log({ name: name, quantity: parseInt(quantity) });
          return { name: name, quantity: parseInt(quantity) };
        });
      });
    }
  }

  _createClass(InventoryManager, [{
    key: 'updateItem',
    value: function updateItem(item) {
      var playerInventory = this.playerInventory;

      this.playerInventory = playerInventory.map(function (ownedItem) {
        return item.name === ownedItem.name ? new InventoryItem(item.name, ownedItem.quantity + item.quantity) : ownedItem;
      });
    }
  }, {
    key: 'addCoins',
    value: function addCoins(quantity) {
      this.coins += quantity;
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
        playerInventory.push(new InventoryItem(item.name, item.quantity));
      }
    }
  }]);

  return InventoryManager;
}();

exports.default = InventoryManager;