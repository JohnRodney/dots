'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store(game) {
    _classCallCheck(this, Store);

    this.game = game;
  }

  _createClass(Store, [{
    key: 'render',
    value: function render() {
      var _game = this.game,
          ctx = _game.ctx,
          canvas = _game.canvas,
          inventoryManager = _game.inventoryManager;
      var playerInventory = inventoryManager.playerInventory,
          coins = inventoryManager.coins;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.fillStyle = 'rgba(100, 255, 255, .3)';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
      ctx.rect(20, 80, String(coins).length * 10 + 400, 130);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      var texture = inventoryTextures.coin;
      var image = document.createElement('img');
      image.src = '' + window.location.origin + texture.path;

      ctx.drawImage(image, 40, 100, 90, 90);

      ctx.fillStyle = 'yellow';
      ctx.textBaseline = "middle";
      ctx.font = "70px Indie Flower, cursive";
      ctx.fillText('' + coins, 300, 150);
      ctx.closePath();

      playerInventory.forEach(function (item, i) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(100, 255, 255, .3)';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
        ctx.rect(20, 280 * i + 300, 350, 260);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        var texture = inventoryTextures[item.name];
        if (texture) {
          var _image = document.createElement('img');
          _image.src = '' + window.location.origin + texture.path;

          ctx.drawImage(_image, 30, 280 * i + 300, 180, 180);
        }

        ctx.textAlign = 'left';
        ctx.fillStyle = 'white';
        ctx.textBaseline = "top";
        ctx.font = "50px Indie Flower, cursive";
        ctx.fillText('' + item.name, 60, 280 * i + 480);
        ctx.fillText('' + item.quantity, 250, 280 * i + 350);
        ctx.closePath();
        ctx.textAlign = 'center';
      });

      this.game.player.draw(this.ctx, 3);
    }
  }]);

  return Store;
}();

exports.default = Store;