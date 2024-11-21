const { SlashCommandBuilder } = require('@discordjs/builders');
const { Shop, UserItems, Users, Challenges } = require('../dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('duel')
		.setDescription('Sends a stake to someone')
        .addUserOption(option =>
            option
                .setName('player')
                .setDescription('Choose who you want stake')
                .setRequired(true)
        )
		.addStringOption(option => 
            option
                .setName('stakeitem1')
                .setDescription('Choose item (or gp) you want to stake')
                .setRequired(true)
                .addChoices([['GP', '0'],
                    ['Christmas Cracker', '1'],
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
                ])
        )
        .addNumberOption(option =>
            option 
                .setName('quantity1')
                .setDescription('How many/much you want to stake')
                .setRequired(true)
        )
		.addStringOption(option => 
            option
                .setName('stakeitem2')
                .setDescription('Choose item (or gp) you want to stake')
                .setRequired(false)
                .addChoices([['GP', '0'],
                    ['Christmas Cracker', '1'],
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
                ])
        )
        .addNumberOption(option =>
            option 
                .setName('quantity2')
                .setDescription('How many/much you want to stake')
                .setRequired(false)
        )
		.addStringOption(option => 
            option
                .setName('stakeitem3')
                .setDescription('Choose item (or gp) you want to stake')
                .setRequired(false)
                .addChoices([['GP', '0'],
                    ['Christmas Cracker', '1'],
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
                ])
        )
        .addNumberOption(option =>
            option 
                .setName('quantity3')
                .setDescription('How many/much you want to stake')
                .setRequired(false)
        )
		.addStringOption(option => 
            option
                .setName('stakeitem4')
                .setDescription('Choose item (or gp) you want to stake')
                .setRequired(false)
                .addChoices([['GP', '0'],
                    ['Christmas Cracker', '1'],
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
                ])
        )
        .addNumberOption(option =>
            option 
                .setName('quantity4')
                .setDescription('How many/much you want to stake')
                .setRequired(false)
        )
		.addStringOption(option => 
            option
                .setName('stakeitem5')
                .setDescription('Choose item (or gp) you want to stake')
                .setRequired(false)
                .addChoices([['GP', '0'],
                    ['Christmas Cracker', '1'],
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
                ])
        )
        .addNumberOption(option =>
            option 
                .setName('quantity5')
                .setDescription('How many/much you want to stake')
                .setRequired(false)
        ),
	async execute(interaction) {
        const receiver = interaction.options.getMember('player');
		const item1 = interaction.options.getString('stakeitem1');
        const quantity1 = interaction.options.getNumber('quantity1');
		const item2 = interaction.options.getString('stakeitem2');
        const quantity2 = interaction.options.getNumber('quantity2');
		const item3 = interaction.options.getString('stakeitem3');
        const quantity3 = interaction.options.getNumber('quantity3');
		const item4 = interaction.options.getString('stakeitem4');
        const quantity4 = interaction.options.getNumber('quantity4');
		const item5 = interaction.options.getString('stakeitem5');
        const quantity5 = interaction.options.getNumber('quantity5');
        let items = [];
        let item;
        let quantity = [];
        let itemID = [];
        let userQuantity = [];
        let emojiID = [];
        let pendingChallenges = await Challenges.findAll({where: {[Op.or]:[{[Op.and]:{challengerID: interaction.user.id, receiverID: receiver.id, guildID: interaction.guildId}}, {[Op.and]:{challengerID: receiver.id, receiverID: interaction.user.id, guildID: interaction.guildId}}]}});
        if (pendingChallenges.length > 0) {
            interaction.reply({
                content: "You already have a pending challenge with <@" + receiver.id + ">"
                , ephemeral: true
            })
        } else if (interaction.user.id == receiver.id) {
            interaction.reply({
                content: "You cannot stake yourself!"
                , ephemeral: true
            });
        } else {
            if (item1 == '0') {
                items.push('GP');
                quantity.push(quantity1);
                itemID.push('0');
            } else {
                item = await Shop.findOne({where: {id: item1}});
                if (item) {
                    items.push(item.dataValues.itemName);
                    quantity.push(quantity1);
                    itemID.push(item1);
                } else {
                    interaction.reply({
                        content: "Error finding item1 " + item1
                        , ephemeral: true
                    });
                }
            }
            if (item2 != null && item2.trim() != '' && quantity2 != null) {
                let found = false;
                if (itemID[0] == item2) {
                    found = true;
                    quantity[0] += quantity2;
                } 
                if (!found) {
                    if (item2 == '0') {
                        items.push('GP');
                        quantity.push(quantity2);
                        itemID.push('0');
                    } else {
                        item = await Shop.findOne({where: {id: item2}});
                        if (item) {
                            items.push(item.dataValues.itemName);
                            quantity.push(quantity2);
                            itemID.push(item2);
                        } else {
                            interaction.reply({
                                content: "Error finding item2 " + item2
                                , ephemeral: true
                            });
                        }
                    }
                }
            }
            if (item3 != null && item3.trim() != '' && quantity3 != null) {
                let found = false;
                for (i = 0; i < itemID.length; i++) {
                    if (itemID[i] == item3) {
                        found = true;
                        quantity[i] += quantity3;
                        break;
                    }
                }
                if (!found) {
                    if (item3 == '0') {
                        items.push("GP");
                        quantity.push(quantity3);
                        itemID.push(item)
                    } else {
                        item = await Shop.findOne({where: {id: item3}});
                        if (item) {
                            items.push(item.dataValues.itemName);
                            quantity.push(quantity3);
                            itemID.push(item3);
                        } else {
                            interaction.reply({
                                content: "Error finding item3 " + item3
                                , ephemeral: true
                            });
                        }
                    }
                }
            } 
            if (item4 != null && item4.trim() != '' && quantity4 != null) {
                let found = false;
                for (i = 0; i < itemID.length; i++) {
                    if (itemID[i] == item4) {
                        found = true;
                        quantity[i] += quantity4;
                        break;
                    }
                }
                if (!found) {
                    if (item4 == '0') {
                        items.push("GP");
                        quantity.push(quantity4);
                        itemID.push(item)
                    } else {
                        item = await Shop.findOne({where: {id: item4}});
                        if (item) {
                            items.push(item.dataValues.itemName);
                            quantity.push(quantity4);
                            itemID.push(item4);
                        } else {
                            interaction.reply({
                                content: "Error finding item4 " + item4
                                , ephemeral: true
                            });
                        }
                    }
                }
            } 
            if (item5 != null && item5.trim() != '' && quantity5 != null) {
                let found = false;
                for (i = 0; i < itemID.length; i++) {
                    if (itemID[i] == item5) {
                        found = true;
                        quantity[i] += quantity5;
                        break;
                    }
                }
                if (!found) {
                    if (item5 == '0') {
                        items.push("GP");
                        quantity.push(quantity5);
                        itemID.push(item)
                    } else {
                        item = await Shop.findOne({where: {id: item5}});
                        if (item) {
                            items.push(item.dataValues.itemName);
                            quantity.push(quantity5);
                            itemID.push(item5);
                        } else {
                            interaction.reply({
                                content: "Error finding item5 " + item5
                                , ephemeral: true
                            });
                        }
                    }
                }
            }
            //check if user has enough items
            let checked = true;
            let message = '';
            for (index = 0; index < itemID.length; index++) {
                if (itemID[index] == '0') {
                    const user = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
                    if (user) {
                        if (user.dataValues.balance < quantity[index]){
                            message += 'You do not have enough gold to make this stake.\n';
                            checked = false;
                        } else if (quantity[index] <= 0) {
                            message += 'You can\'t stake negative or zero items\n';
                            checked = false;
                        } else if (!Number.isInteger(quantity[index])) {
                            message += 'You can\'t stake non-whole items\n';
                            checked = false;
                        } else {
                            userQuantity.push(user.dataValues.balance);
                        }
                    }
                } else {
                    const userItems = await UserItems.findOne({where:{userId: interaction.user.id, guildID: interaction.guildId, itemID: itemID[index]}});
                    if (userItems) {
                            if (userItems.dataValues.quantity < quantity[index]) {
                            checked = false;
                            message += 'You do not have enough ' + items[index] + ' to make this stake.\n';
                        } else if (quantity[index] <= 0) {
                            message += 'You can\'t stake negative or zero items\n';
                            checked = false;
                        } else if (!Number.isInteger(quantity[index])) {
                            message += 'You can\'t stake non-whole items\n';
                            checked = false;
                        } else {
                            userQuantity.push(userItems.dataValues.quantity);
                        }
                    } else {
                        checked = false;
                        message += 'You do not have enough ' + items[index] + ' to make this stake.\n';
                    }
                }
            }
            if (checked) {
                message = 'Duelling <@' + receiver.id + '> for: \n\n'
                let userGP;
                let userStuff;
                for (i = 0; i < itemID.length; i++) {
                    let chal = await Challenges.create({challengerID: interaction.user.id, receiverID: receiver.id, guildID: interaction.guildId, itemID: itemID[i], amount: quantity[i]});
                    if (itemID[i] == '0') {
                        userGP = await Users.increment({balance: (quantity[i] * -1)}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
                    } else {
                        if (userQuantity[i] == quantity[i]) {
                            userStuff = await UserItems.destroy({where: {userID: interaction.user.id, itemID: itemID[i], guildID: interaction.guildId}});
                        } else {
                            userStuff = await UserItems.increment({quantity: (quantity[i] * -1)}, {where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: itemID[i]}});
                        }
                    }
                    message += items[i] + ' x' + numberWithCommas(quantity[i]) + '\n';
                }
                message += '\nUse **/accept** to accept the stake or **/decline** to decline.'
                interaction.reply({
                    content: message
                })
            } else {
                interaction.reply({
                    content: message
                    , ephemeral: true
                });
            }
        }
	},
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}