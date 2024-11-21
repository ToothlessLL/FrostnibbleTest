const { Users, UserItems, Shop } = require('../../dbObjects.js');
const generalFunctions = require(`../general`);

module.exports = {
    async gambaRanking(interaction) {
        const users = await Users.findAll({where: {guildID: interaction.guildId}});
        const shop = await Shop.findAll();
        const shopItems = new Map();
        for (const item of shop) {
            shopItems.set(item.dataValues.id.toString(), {itemName: item.dataValues.itemName, price: item.dataValues.price});
        }
        var userCash = [];
        var items;
        if (users) {
            for (const user of users) {
                await interaction.guild.members.fetch(user.dataValues.userID)
                    .then(async function(thisUser) {
                        userCash.push({name: thisUser.nickname ? thisUser.nickname : thisUser.user.username, gp: user.dataValues.balance, id: thisUser.user.id});
                        items = await UserItems.findAll({where: {userID: thisUser.user.id, guildID: interaction.guildId}});
                        for (const item of items) {
                            userCash[userCash.length-1].gp += shopItems.get(item.dataValues.itemID).price * item.dataValues.quantity;
                        }
                    userCash[userCash.length - 1].coinsLength = `${generalFunctions.numberWithCommas(userCash[userCash.length - 1].gp)} gp`.length;
                    })
                    .catch(() => {});
            }
            userCash.sort(function(a, b){return b.gp - a.gp});
            return userCash;
        } else {
            return null;
        }
    }
}