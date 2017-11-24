'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stubInventory = require('./stub-inventory');

var _stubInventory2 = _interopRequireDefault(_stubInventory);

var _inventoryItem = require('./inventory-item');

var _inventoryItem2 = _interopRequireDefault(_inventoryItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryManager = function () {
  function InventoryManager(parent) {
    _classCallCheck(this, InventoryManager);

    var isDev = window.deployment === 'development';
    this.game = parent;
    this.playerInventory = isDev ? _stubInventory2.default : [];
    this.coins = 0;
    if (!isDev) {
      this.getInventoryFromDB();
    }
  }

  _createClass(InventoryManager, [{
    key: 'getInventoryFromDB',
    value: function getInventoryFromDB() {
      var self = this;
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

          return { name: name, quantity: parseInt(quantity) };
        });
      });
    }
  }, {
    key: 'updateItem',
    value: function updateItem(item) {
      var playerInventory = this.playerInventory;

      this.playerInventory = playerInventory.map(function (ownedItem) {
        return item.name === ownedItem.name ? new _inventoryItem2.default(item.name, ownedItem.quantity + item.quantity) : ownedItem;
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
        playerInventory.push(new _inventoryItem2.default(item.name, item.quantity));
      }
    }
  }]);

  return InventoryManager;
}();

exports.default = InventoryManager;