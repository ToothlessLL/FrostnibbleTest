const { SlashCommandBuilder } = require('@discordjs/builders');
const { UserItems, Shop, Users } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Choose item to buy')
        .addNumberOption(option =>
            option
                .setName('quantity')
                .setDescription('Quantity you want to buy')
                .setRequired(true))
		.addStringOption(option => 
            option
                .setName('rare')
                .setDescription('Choose item to buy')
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
        .addStringOption(option => 
            option
                .setName('non-rare')
                .setDescription('Choose item to buy')
                .addChoices([
                    [ 'Easter Egg', '17' ],
                    [ "Orlando's Smith Hat", '18' ],
                    [ 'Blood dye', '19' ],
                    [ 'Third Age dye', '20' ],
                    [ 'Ice dye', '21' ],
                    [ 'Shadow dye', '22' ],
                    [ 'Barrows dye', '23' ],
                    [ "Tavia's Fishing Rod", '24' ],
                    [ "Guildmaster Tony's Mattock", '25' ],
                    [ "Hazelmere's signet ring", '26' ],
                    [ 'Luck of the Dwarves', '27' ],
                    [ 'EOF Kit', '28' ],
                    [ "Dee's nuts", '29' ]
                ])),
	async execute(interaction) {
        let total;
        let totalCost;
        let value;
		const value1 = interaction.options.getString('rare');
		const value2 = interaction.options.getString('non-rare');
        if (value1 && value2) {
            return await interaction.reply({
                content: "You can only buy one item at a time!"
                , ephemeral: true
            });
        }
        if (value1) {
            value = value1;
        } else {
            value = value2;
        }
        const quantity = interaction.options.getNumber('quantity');
        const userData = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
        const shopItem = await Shop.findOne({where: {id: value}});
        const item = await UserItems.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: value}});
        totalCost = shopItem.dataValues.price * quantity;
        if (quantity <= 0) {
            await interaction.reply({
                content: "You have to buy at least 1 item!"
                , ephemeral: true
            });
        } else if (!Number.isInteger(quantity)) {
            await interaction.reply({
                content: "Inputted number must be whole number only!"
                , ephemeral: true
            });
        } else if (userData.dataValues.balance >= totalCost) {
            if (item) {
                let affectedRows = await UserItems.increment({quantity: quantity}, {where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: value}});
                total = item.dataValues.quantity + quantity
            } else {
                let affectedRows = await UserItems.create({userID: interaction.user.id, guildID: interaction.guildId, itemID: value, quantity: quantity})
                total = quantity;
            }
            let affectedRow2 = await Users.increment({balance: (totalCost * -1)}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
            interaction.reply({
                content:'You bought ' + quantity + ' ' + shopItem.dataValues.itemName + '. You now have ' + total + ' ' + shopItem.dataValues.itemName
                , ephemeral: true
            });
        } else {
            interaction.reply({
                content: 'You don\'t have enough money.'
                , ephemeral: true
            });
        }
	},
};