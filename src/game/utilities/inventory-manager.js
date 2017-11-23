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

class InventoryItem {
  constructor(name, quantity) {
    this.quanitity = qauntity;
    this.nam = name;
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
  constructor() {
    this.playerInventory = [];
    this.coins = 0;
  }

  updateItem(item) {
    let { playerInventory } = this;
    this.playerInventory = playerInventory.map(ownedItem => {
      return item.name === ownedItem.name ?
        { name: item.name, quantity: ownedItem.quantity + item.quantity } :
        ownedItem
    });
  }

  push(item) {
    const { playerInventory } = this;
    const hasItem = playerInventory.filter(ownedItem => ownedItem.name === item.name).length > 0;
    if (hasItem) {
      this.updateItem(item);
    } else {
      playerInventory.push(item);
    }
  }
}
