const { EmbedBuilder } = require('discord.js');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../../dbObjects.js');
const userItemMap = require(`../userItems`);
const generalFunctions = require(`../../general`);
const gambaKing = require(`../gambaKing`);

module.exports = {
	async acceptDuel(interaction) {
        let challenger = interaction.options.getMember("player");
        var challenge = await sequelize.query(`select a.challengeID challengeID, a.itemID itemID, case when c.emojiID is null then '1076622756180922510' else c.emojiID end emojiID, case when c.itemName is null then 'TGP' else c.itemName end itemName, a.quantity quantity from StakedItems a left outer join Challenges b on a.challengeID = b.id left outer join Shops c on a.itemID = c.id where b.challengerID = ? and b.receiverID = ? and b.guildID = ?`, {replacements: [challenger.id, interaction.user.id, interaction.guildId], type: QueryTypes.SELECT});
        if (challenge.length == 0) {
            await interaction.editReply({
                content: `You don't have a pending challenge with <@${challenger.id}>!`
            });
            return;
        }
        var userItems = await userItemMap.getUserItems(interaction.user.id, interaction.guildId);
        for (const item of challenge) {
            if (item.itemID == 0) {
                    var userCash = await sequelize.query(`select balance from Users where userID = ? and guildID = ?`, {replacements: [interaction.user.id, interaction.guildId], type: QueryTypes.SELECT});
                    if (userCash[0].balance < item.quantity) {
                    await interaction.editReply({
                        content: `You don't have enough ${interaction.client.emojis.cache.get(item.emojiID).toString()}${item.itemName} to accept this duel!`
                    });
                    return;
                }
                continue;
            }
            if (userItems.size == 0) {
                await interaction.editReply({
                    content: `You don't have any items`
                });
                return;
            }
            if (!userItems.get(item.itemID.toString())) {
                await interaction.editReply({
                    content: `You don't have enough ${interaction.client.emojis.cache.get(item.emojiID).toString()}${item.itemName} to accept this duel!`
                });
                return;
            }
            if (item.quantity > userItems.get(item.itemID.toString()).quantity) {
                await interaction.editReply({
                    content: `You don't have enough ${interaction.client.emojis.cache.get(item.emojiID).toString()}${item.itemName} to accept this duel!`
                });
                return;
            }
        }
        await sequelize.query(`delete from Challenges where id = ?`, {replacements: [challenge[0].challengeID], type: QueryTypes.DELETE});
        await sequelize.query(`delete from StakedItems where challengeID = ?`, {replacements: [challenge[0].challengeID], type: QueryTypes.DELETE});
        var player1 = {hp: 9900};
        var player2 = {hp: 9900};
        player1.name = challenger.nickname == null ? challenger.user.username : challenger.nickname;
        player2.name = interaction.member.nickname == null ? interaction.user.username : interaction.member.nickname;
        var i = 0;
        var winner;
        var pid;
        var title = '\u200B';
        do {
            player1.hit = generalFunctions.getRandomInt(0, 1426);
            player2.hit = generalFunctions.getRandomInt(0, 1426);
            player1.hit = player1.hit > player2.hp ? player2.hp : player1.hit;
            player2.hit = player2.hit > player1.hp ? player1.hp : player2.hit;
            player1.hp -= player2.hit;
            player2.hp -= player1.hit;
            if (i == 0) {
                player1.displayMessage = player1.name + ' hit ' + player2.name + ' for ' + player1.hit.toString();
                player2.displayMessage = player2.name + ' hit ' + player1.name + ' for ' + player2.hit.toString();
            } else {
                player1.displayMessage = player1.displayMessage + '\n' + player1.name + ' hit ' + player2.name + ' for ' + player1.hit.toString();
                player2.displayMessage = player2.displayMessage + '\n' + player2.name + ' hit ' + player1.name + ' for ' + player2.hit.toString();
            }
            if (player1.hit == 69 && player2.hit == 69) {
                pid = generalFunctions.getRandomInt(1, 3);
                if (pid == 1) {
                    title = `${player2.name} wins! ${player1.name} got 69ed.`;
                    winner = player2;
                } else {
                    title = `${player1.name} wins! ${player2.name} got 69ed.`;
                    winner = player1;
                }
            } else if (player1.hit == 69) {
                title = `${player2.name} wins! ${player1.name} got 69ed.`;
                winner = player2;
            } else if (player2.hit == 69) {
                title = `${player1.name} wins! ${player2.name} got 69ed.`;
                winner = player1;
            } else if (player1.hp == 0 && player2.hp == 0) {
                pid = generalFunctions.getRandomInt(1, 3);
                if (pid == 1) {
                    title = `${player2.name} wins!`;
                    winner = player2;
                } else {
                    title = `${player1.name} wins!`;
                    winner = player1;
                }
            } else if (player1.hp == 0) {
                title = `${player2.name} wins!`;
                winner = player2;
            } else if (player2.hp == 0) {
                title = `${player1.name} wins!`;
                winner = player1;
            }            
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setColor(0x3b5cac)
                    .setTitle(title)
                    .setAuthor({name: player1.name + ' vs ' + player2.name})
                    .setDescription(challenge.map(item => `${interaction.client.emojis.cache.get(item.emojiID).toString()}${item.itemName} x${generalFunctions.numberWithCommas(item.quantity)}`).join('\n'))
                    .addFields(
                        { name: '\u200B', value: player1.name + '\n(' + [player1.hp].toString() + ' HP left)\n' + '\n\n' + player2.name + '\n(' + player2.hp.toString() + ' HP left)\n', inline: true },
                        { name: '\u200B', value: player1.displayMessage, inline: true},
                        { name: '\u200B', value: player2.displayMessage, inline: true}
                    )
                    .setTimestamp()]
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
            i++;
        } while (player1.hp > 0 && player2.hp > 0 && player2.hit != 69 && player1.hit != 69);
        if (winner == player1) {
            var challengerItems = await userItemMap.getUserItems(challenger.id, interaction.guildId);
            for (const items of challenge) {
                if (items.itemID == 0) {
                    await sequelize.query(`update Users set balance = balance + ? where userID = ? and guildID = ?`, {replacements: [items.quantity * 2, challenger.id, interaction.guild.id], type: QueryTypes.UPDATE});
                    await sequelize.query(`update Users set balance = balance - ? where userID = ? and guildID = ?`, {replacements: [items.quantity, interaction.user.id, interaction.guild.id], type: QueryTypes.UPDATE});
                } else {
                    if (challengerItems.size == 0) {
                        await sequelize.query(`insert into UserItems (userID, itemID, guildID, quantity) values (?, ?, ?, ?)`, {replacements: [challenger.id, items.itemID, interaction.guild.id, items.quantity * 2], type: QueryTypes.INSERT});
                    } else {
                        if (!challengerItems.get(items.itemID.toString())) {
                            await sequelize.query(`insert into UserItems (userID, itemID, guildID, quantity) values (?, ?, ?, ?)`, {replacements: [challenger.id, items.itemID, interaction.guild.id, items.quantity * 2], type: QueryTypes.INSERT});
                        } else {
                            await sequelize.query(`update UserItems set quantity = quantity + ? where userID = ? and guildID = ? and itemID = ?`, {replacements: [items.quantity * 2, challenger.id, interaction.guild.id, items.itemID], type: QueryTypes.UPDATE});
                        }
                    }
                    if (userItems.get(items.itemID.toString()).quantity == items.quantity) {
                        await sequelize.query(`delete from UserItems where userID = ? and guildID = ? and itemID = ?`, {replacements: [interaction.user.id, interaction.guildId, items.itemID], type: QueryTypes.DELETE});
                    } else {
                        await sequelize.query(`update UserItems set quantity = quantity - ? where userID = ? and guildID = ? and itemID = ?`, {replacements: [items.quantity, interaction.user.id, interaction.guildId, items.itemID], type: QueryTypes.UPDATE});
                    }
                }
            }
            await sequelize.query(`insert into WinLosses (winnerID, loserID, guildID) values (?, ?, ?)`, {replacements: [challenger.id, interaction.user.id, interaction.guildId], type: QueryTypes.INSERT});
        } else {
            for (const items of challenge) {
                if (items.itemID == 0) {
                    await sequelize.query(`update Users set balance = balance + ? where userID = ? and guildID = ?`, {replacements: [items.quantity, interaction.user.id, interaction.guild.id], type: QueryTypes.UPDATE});
                } else {
                    if (userItems.get(items.itemID.toString())) {
                        await sequelize.query(`update UserItems set quantity = quantity + ? where userID = ? and guildID = ? and itemID = ?`, {replacements: [items.quantity, interaction.user.id, interaction.guildId, items.itemID], type: QueryTypes.UPDATE});
                    } else {
                        await sequelize.query(`insert into UserItems (userID, itemID, guildID, quantity) values (?, ?, ?, ?)`, {replacements: [interaction.user.id, items.itemID, interaction.guild.id, items.quantity], type: QueryTypes.INSERT});
                    }
                }
            }
            await sequelize.query(`insert into WinLosses (winnerID, loserID, guildID) values (?, ?, ?)`, {replacements: [interaction.user.id, challenger.id, interaction.guildId], type: QueryTypes.INSERT});
        }
        await gambaKing.gambaKing(interaction);
	},
};