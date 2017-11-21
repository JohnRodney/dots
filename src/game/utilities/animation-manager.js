export default class AnimationManager {
  constructor() {
    this.animations = [];
  }

  push(animation) {
    this.animations.push(animation);
  }

  draw(ctx) {
    this.animations.forEach(animation => animation.draw(ctx));
    this.animations = this.animations.filter(animation => !animation.destroy);
  }
}
