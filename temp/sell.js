const { SlashCommandBuilder } = require('@discordjs/builders');
const { UserItems, Shop, Users } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sell')
		.setDescription('Choose item to sell')
		.addStringOption(option => 
            option
                .setName('item')
                .setDescription('Choose item to sell')
                .setRequired(true)
                .addChoices([['Christmas Cracker', '1'],
                    [ 'Blue Partyhat', '2'],
                    [ 'White Partyhat', '3'],
                    [ 'Red Partyhat', '4'],
                    [ 'Purple Partyhat', '5'],
                    [ 'Green Partyhat', '6' ],
                    [ 'Yellow Partyhat', '7' ],
                    [ 'Black Santa Hat', '8' ],
                    [ 'Half Jug of Wine', '9' ],
                    [ 'Red Santa Hat', '10' ],
                    [ "Red H'ween Mask", '11' ],
                    [ "Blue H'ween Mask", '12' ],
                    [ "Green H'ween Mask", '13' ],
                    [ 'Disk of Returning', '14' ],
                    [ 'Pumpkin', '15' ],
                    [ 'Easter Egg', '16' ]
                ]))
        .addNumberOption(option =>
            option
                .setName('quantity')
                .setDescription('Quantity you want to sell')
                .setRequired(true)),
	async execute(interaction) {
        let totalCost;
		const value = interaction.options.getString('item');
        const quantity = interaction.options.getNumber('quantity');
        const shopItem = await Shop.findOne({where: {id: value}});
        const item = await UserItems.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: value}});
        if (item) {
            if (item.dataValues.quantity < quantity) {
                interaction.reply({
                    content: "You don\'t have enough " + shopItem.dataValues.itemName + " to sell!"
                    , ephemeral: true
                });
            } else if (quantity <= 0) {
                interaction.reply({
                    content: "You can\'t sell zero or negative items!"
                    , ephemeral: true
                });
            } else if (!Number.isInteger(quantity)) {
                await interaction.reply({
                    content: "Inputted number must be whole number only!"
                    , ephemeral: true
                });
            } else {
                totalCost = shopItem.dataValues.price * quantity
                if (item.dataValues.quantity == quantity) {
                    await UserItems.destroy({where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: value}});
                } else {
                    await UserItems.increment({quantity: (quantity * -1)}, {where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: value}});
                }
                await Users.increment({balance: totalCost}, {where: {userID: interaction.user.id, guildID: interaction.guildId}})
                interaction.reply({
                    content: "You have sold " + quantity + ' ' + shopItem.dataValues.itemName + '.'
                    , ephemeral: true
                });
            }
        } else {
            interaction.reply({
                content: "You don\'t own any " + shopItem.dataValues.itemName + "!"
                , ephemeral: true
            });
        }
	},
};