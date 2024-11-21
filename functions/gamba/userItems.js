const { sequelize } = require('../../dbObjects.js');
const { QueryTypes } = require('sequelize');

module.exports = {
    async getUserItems(userID, guildID) {
        const userItems = await sequelize.query(`select a.itemID itemID, a.quantity quantity, b.itemName itemName, b.emojiID emoji from UserItems a left outer join Shops b on a.itemID = b.id where a.userID = ? and a.guildID = ?`, {replacements: [userID, guildID], type: QueryTypes.SELECT});
        const itemsMap = new Map();
        for (const item of userItems) {
            itemsMap.set(item.itemID.toString(), {itemName: item.itemName, quantity: item.quantity, emoji: item.emoji});
        }
        return itemsMap;
    }
}