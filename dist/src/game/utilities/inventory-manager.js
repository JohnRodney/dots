"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryManager = function InventoryManager() {
  _classCallCheck(this, InventoryManager);

  this.playerInventory = [];
  this.coins = 0;
};

exports.default = InventoryManager;