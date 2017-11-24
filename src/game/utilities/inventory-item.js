export default class InventoryItem {
  constructor(name, quantity) {
    this.quantity = quantity;
    this.name = name;
  }

  addTo(quantity) {
    this.quanitity += quantity;
  }

  getAsItemSchema() {
    const { quantity, name } = this;
    return { quantity, name };
  }

  saveToPlayer(player) {
    player.inventory.push(this.getAsItemSchema());
  }
}
