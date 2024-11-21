const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { UserItems, Users, Shop, WinLoss } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Displays your profile')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The person\'s profile you want to view')),
	async execute(interaction) {
        let itemMessage = '';
        let otherUser = interaction.options.getMember("user");;
        let id;
        let nickname;
        let displayName;
        let imageUrl;
        let itemList = [];
        if (otherUser) {
            id = otherUser.id;
            if (otherUser.nickname == null) {
                nickname = otherUser.user.username;
            } else {
                nickname = otherUser.nickname;
            }
            displayName = nickname + '\'s';
            imageUrl = otherUser.user.avatarURL()
        } else {
            id = interaction.user.id;
            if (interaction.member.nickname == null) {
                nickname = interaction.user.username;
            } else {
                nickname = interaction.member.nickname;
            }
            imageUrl = interaction.user.avatarURL();
            displayName = 'Your';
        }
        let user = await Users.findOne({where: {userID: id, guildID: interaction.guildId}});
        if (user.dataValues.itemID) {
            let userEmoji = await Shop.findOne({where: {id: user.dataValues.itemID}});
            let emoji = interaction.client.emojis.cache.get(userEmoji.dataValues.emojiID);
            nickname += ' ' + emoji.toString();
        }
        let items = await UserItems.findAll({where: {userID: id, guildID: interaction.guildId}});
        let shop = await Shop.findAll();
        let embed = new MessageEmbed();
        if (user) {
            let wins = await WinLoss.count({where: {winnerID: id, guildID: interaction.guildId}});
            let losses = await WinLoss.count({where: {loserID: id, guildID: interaction.guildId}});
            let emoji = interaction.client.emojis.cache.get('912177609343905893');
            itemMessage += emoji.toString() + " GP x" + numberWithCommas(user.dataValues.balance) + '\n\n';
            for (i = 0; i < items.length; i++) {
                itemList.push({id: items[i].dataValues.itemID, name: shop[items[i].dataValues.itemID - 1].dataValues.itemName, quantity: numberWithCommas(items[i].dataValues.quantity), emojiID: shop[items[i].dataValues.itemID - 1].dataValues.emojiID, price: shop[items[i].dataValues.itemID - 1].dataValues.price});
            }
            itemList.sort(function(a, b){return b.price - a.price});
            for (i = 0; i < itemList.length; i++) {
                if (itemList[i].emojiID != '0') {
                    let emoji = interaction.client.emojis.cache.get(itemList[i].emojiID);
                    itemMessage += emoji.toString() + ' ';
                }
                itemMessage += itemList[i].name + ' x' + itemList[i].quantity + '\n';
            }
            /*if (itemExist) {
                embed.addField('Your Inventory:', itemMessage);
            }*/
            embed
                .setTitle(nickname)
                .setAuthor('Toothless Duels', imageUrl)
                .addField('Record: ' + wins + 'W-' + losses + 'L.', '\u200B')
                .addField(displayName + ' Inventory:', itemMessage)
                .setColor('#0099ff')
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });
        } else {
            interaction.reply({
                content: 'This profile doesn\'t exist.'
                , ephemeral: true
            });
        }
	},
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}