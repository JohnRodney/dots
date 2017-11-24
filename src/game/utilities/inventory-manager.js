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
const playerStub = {
  username: 'John',
  password: 'Rodney',
  _id: 'a;lkjasdf',
  inventory: []
}

const inventoryStub = [
  { name: "hydrogen", quantity: 1 },
  { name: "lithium", quantity: 1 },
  { name: "helium", quantity: 1 },
  { name: "beryllium", quantity: 1 },
];

class InventoryItem {
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

export default class InventoryManager {
  constructor(parent) {
    this.game = parent;
    const isDev = window.deployment === 'development';
    this.playerInventory = isDev ? inventoryStub : [];
    this.coins = 0;
    const self = this;
    if (!isDev) {
      const { username, _id } = this.game;
      $.post(`${window.location.origin}/dots/get-player`, { username, _id }, (data) => {
        if (data.length === 0) { return false; }
        self.coins = parseInt(data[0].coins);
        self.playerInventory = data[0].playerInventory.map(item => {
          const { name, quantity } = item;
          console.log({ name, quantity: parseInt(quantity) })
          return { name, quantity: parseInt(quantity) };
        });
      });
    }
  }

  updateItem(item) {
    let { playerInventory } = this;
    this.playerInventory = playerInventory.map(ownedItem => {
      return item.name === ownedItem.name ?
        new InventoryItem(item.name, ownedItem.quantity + item.quantity):
        ownedItem
    });
  }

  addCoins(quantity) {
    this.coins += quantity;
  }

  push(item) {
    const { playerInventory } = this;
    const hasItem = playerInventory.filter(ownedItem => ownedItem.name === item.name).length > 0;

    if (hasItem) {
      this.updateItem(item);
    } else {
      playerInventory.push(new InventoryItem(item.name, item.quantity));
    }
  }
}
