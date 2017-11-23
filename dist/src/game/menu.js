"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataStub = [{ "_id": "5a14d3365069fea02442183f", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "75" }, { "_id": "5a15b44fe094b7a08d1d3171", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "31" }, { "_id": "5a14d3615069fea024421840", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "30" }, { "_id": "5a14d2e45069fea02442183d", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "28" }, { "_id": "5a15b280e094b7a08d1d316d", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "24" }, { "_id": "5a14d2f45069fea02442183e", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "21" }, { "_id": "5a15b351e094b7a08d1d316e", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "174" }, { "_id": "5a15b436e094b7a08d1d3170", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "168" }, { "_id": "5a15b265e094b7a08d1d316b", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "15" }, { "_id": "5a15b26ce094b7a08d1d316c", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "12" }, { "_id": "5a15b25de094b7a08d1d316a", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "11" }, { "_id": "5a15b38fe094b7a08d1d316f", "username": "John", "playerId": "5a14b46c411b829a380620be", "score": "10" }];

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
      ctx.fillText("" + this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
  }, {
    key: "collide",
    value: function collide(x, y) {
      return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    }
  }]);

  return MenuItem;
}();

var Menu = function () {
  function Menu(parent) {
    var _this = this;

    _classCallCheck(this, Menu);

    this.parent = parent;
    this.menuItems = [];

    ['Survival', 'High Scores', 'Story Mode', "Store"].forEach(function (item, index) {
      _this.menuItems.push(new MenuItem(document.body.clientWidth / 2, 300 + 200 * index, document.body.clientWidth, 200, item));
    });

    document.body.addEventListener("click", function (e) {
      return _this.handleClick(e);
    });
  }

  _createClass(Menu, [{
    key: "handleClick",
    value: function handleClick(e) {
      var _this2 = this;

      var x = e.x,
          y = e.y;

      var item = this.menuItems.filter(function (item) {
        return item.collide(x * 2, y * 2);
      }).pop();
      if (this.parent.state === 'high-scores') {
        this.parent.state = "main-menu";
      } else if (item && item.text === 'Survival') {
        this.parent.state = 'start-survival';
      } else if (item.text === 'High Scores') {

        $.get(window.location.origin + "/dots/highscores", function (data) {
          _this2.parent.state = 'high-scores';
          _this2.parent.scores = data;
        });
        /* devmode
        this.parent.state = 'high-scores';
        this.parent.scores = dataStub;
        */
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(100, 100, document.body.clientWidth * 2 - 200, document.body.clientHeight * 2 - 200);
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = "100px Indie Flower, cursive";
      this.menuItems.forEach(function (item) {
        return item.draw(ctx);
      });

      ctx.closePath();
    }
  }]);

  return Menu;
}();

exports.default = Menu;