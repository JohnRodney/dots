export default class Colors {
  constructor() {
    this.allowed = [
      '#FF5722', '#FFC107', '#00BCD4', '#7CB342', '#78909C',
      '#f44336', '#303F9F', '#303F9F', '#29B6F6', '#e57373', '#FFA726', '#66BB6A', '#03A9F4'
    ];
  }

  random() {
    const { random, floor } = Math;
    const randomIndex = floor(random() * this.allowed.length);
    return this.allowed[randomIndex];
  }
}
