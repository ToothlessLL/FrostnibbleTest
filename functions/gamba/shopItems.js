const { Shop } = require('../../dbObjects.js');

module.exports = {
    async getShopItems() {
        const shop = await Shop.findAll();
        const shopItems = new Map();
        for (const item of shop) {
            shopItems.set(item.dataValues.id.toString(), {itemName: item.dataValues.itemName, price: item.dataValues.price, emoji: item.dataValues.emojiID});
        }
        return shopItems;
    }
}