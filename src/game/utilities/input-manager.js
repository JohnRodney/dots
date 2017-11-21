export default class InputManager {
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', this.keypress.bind(this));
  }

  keypress(e) {
    switch(e.keyCode) {
      case 80: this.game.state !== 'paused' ? this.game.state = 'paused' : this.game.state = 'survival';
    }
  }
}
