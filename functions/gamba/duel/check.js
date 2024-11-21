const { InteractionCollector } = require('discord.js');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../../dbObjects.js');
const userItemMap = require(`../userItems`);

module.exports = {
    async checkDuels(interaction) {
        var challengesSent = '**Challenges Sent:**\n';
        var challengesReceived = '**Challenges Received:**\n';
        var combined;
        var challenges = await sequelize.query(`select a.id id, a.challengerID challengerID, a.receiverID receiverID from Challenges a where a.guildID = ? and (a.challengerID = ? or a.receiverID = ?)`, {replacements: [interaction.guildId, interaction.user.id, interaction.user.id], type: QueryTypes.SELECT});
        console.log(challenges);
        if (challenges.length == 0) {
			await interaction.editReply({
				content: 'You do not have any pending duels.'
			});
        }
        for (const challenge of challenges) {
            var challengeItems = await sequelize.query(`select b.quantity quantity, case when b.itemID = 0 then 'TGP' else c.itemName end itemName, case when b.itemID = 0 then '1076622756180922510' else c.emojiID end emojiID from StakedItems b left outer join Shops c on c.id = b.itemID where b.challengeID = ?`, {replacements: [challenge.id], type: QueryTypes.SELECT});
            console.log(challengeItems);
            if (challenge.challengerID == interaction.user.id) {
                challengesSent += `Challenge sent to <@${challenge.receiverID}> for:\n`;
                for (const items of challengeItems) {
                    challengesSent += `   ${interaction.client.emojis.cache.get(items.emojiID).toString()}${items.itemName} x${items.quantity}\n`;
                }
            } else {
                challengesReceived += `Challenge received from <@${challenge.challengerID}> for:\n`;
                for (const items of challengeItems) {
                    challengesReceived += `   ${interaction.client.emojis.cache.get(items.emojiID).toString()}${items.itemName} x${items.quantity}\n`;
                }
            }
        }
        combined = `${challengesSent}\n${challengesReceived}`;
        await interaction.editReply({
            content: combined
        });
    }
}

// let challengesSent = '**Challenges Sent:**\n';
// 		let challengesReceived = '**Challenges Received:**\n';
// 		let combinedMessage = '';
// 		let lastID = '';
// 		let sent = false;
// 		let received = false;
// 		let challenges = await Challenges.findAll({where: {[Op.or]:[{[Op.and]:{challengerID: interaction.user.id, guildID: interaction.guildId}}, {[Op.and]:{receiverID: interaction.user.id, guildID: interaction.guildId}}]}});
// 		let shop = await Shop.findAll();
// 		if (challenges.length > 0) {
// 			for (i = 0; i < challenges.length; i++) {
// 				if (challenges[i].dataValues.challengerID == interaction.user.id) {
// 					sent = true;
// 					if (lastID != challenges[i].dataValues.receiverID) {
// 						challengesSent += '\nChallenge sent to <@' + challenges[i].dataValues.receiverID + '> for:\n';
// 						lastID = challenges[i].dataValues.receiverID;
// 					}
// 					if (challenges[i].dataValues.itemID == 0) {
// 						challengesSent += '   GP x' + numberWithCommas(challenges[i].dataValues.amount) + '\n';
// 					} else {
// 						challengesSent += '   ' + shop[challenges[i].dataValues.itemID - 1].dataValues.itemName + ' x' + numberWithCommas(challenges[i].dataValues.amount) + '\n';
// 					}
// 				} else {
// 					received = true;
// 					if (lastID != challenges[i].dataValues.challengerID) {
// 						challengesReceived += '\nChallenge received from <@' + challenges[i].dataValues.challengerID + '> for:\n';
// 						lastID = challenges[i].dataValues.challengerID;
// 					}
// 					if (challenges[i].dataValues.itemID == 0) {
// 						challengesReceived += '   GP x' + numberWithCommas(challenges[i].dataValues.amount) + '\n';
// 					} else {
// 						challengesReceived += '   ' + shop[challenges[i].dataValues.itemID - 1].dataValues.itemName + ' x' + numberWithCommas(challenges[i].dataValues.amount) + '\n';
// 					}
// 				}
// 			}
// 			if (sent) {
// 				combinedMessage += challengesSent;
// 			}
// 			if (received) {
// 				if (sent) {
// 					combinedMessage += '\n'
// 				}
// 				combinedMessage += challengesReceived;
// 			}
// 			return interaction.reply({
// 				content: combinedMessage
// 				, ephemeral: true
// 			});
// 		} else {
// 			return interaction.reply({
// 				content: 'You do not have any pending duels.'
// 				, ephemeral: true
// 			});
// 		}