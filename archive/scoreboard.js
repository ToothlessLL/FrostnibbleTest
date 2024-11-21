const { SlashCommandBuilder } = require('@discordjs/builders');
const { WinLoss } = require('../dbObjects.js');
const sequelize = require('sequelize');
//const client = require('../index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scoreboard')
		.setDescription('Get the current scoreboard'),
    async execute(interaction) {
        await interaction.deferReply();
        const totalWins = await WinLoss.findAll({
            attributes: [
                'winnerID',
                [sequelize.fn('count', sequelize.col('winnerID')), 'total_count'],
              ],
            group: ['winnerID'],
            where: {guildID: interaction.guildId}
        });
        const totalLoss = await WinLoss.findAll({
            attributes: [
                'loserID',
                [sequelize.fn('count', sequelize.col('loserID')), 'total_count'],
              ],
            group: ['loserID'],
            where: {guildID: interaction.guildId}
        });
        let winLoss = [];
        if (totalWins) {
            for (i = 0; i < totalWins.length; i++) {
                await interaction.guild.members.fetch(totalWins[i].dataValues.winnerID)
                .then((user) => {
                    let username;
                    if (user.nickname) {
                        username = user.nickname;
                    } else {
                        username = user.user.username;
                    }
                    winLoss.push({userID: totalWins[i].dataValues.winnerID, name: username, wins: totalWins[i].dataValues.total_count, losses: 0, ratio: 0});
                })
                .catch(() => {});
            }
            for (i = 0; i < totalLoss.length; i++) {
                let found = false;
                for (j = 0; j < winLoss.length; j++) {
                    if (winLoss[j].userID == totalLoss[i].dataValues.loserID) {
                        winLoss[j].losses = totalLoss[i].dataValues.total_count;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    await interaction.guild.members.fetch(totalLoss[i].dataValues.loserID)
                    .then((user) => {
                        let username;
                        if (user.nickname) {
                            username = user.nickname;
                        } else {
                            username = user.user.username;
                        }
                        winLoss.push({userID: totalLoss[i].dataValues.loserID, name: username, wins: 0, losses: totalLoss[i].dataValues.total_count, ratio: 0});
                    })
                    .catch(() => {});
                }
            }
        }
        for (i = 0; i < winLoss.length; i++) {
            if (winLoss[i].losses == 0) {
                winLoss[i].ratio = winLoss[i].wins;
            } else {
                winLoss[i].ratio = (winLoss[i].wins / winLoss[i].losses).toFixed(2);
            }
        }
        winLoss.sort(function(a, b){return b.ratio - a.ratio});
        let displayMessage;
        if (winLoss) {
            displayMessage = '```\n';
            for (i = 0; i < winLoss.length; i++) {
                displayMessage += winLoss[i].name + ' | ' + winLoss[i].wins + 'W-' + winLoss[i].losses + 'L | ' + winLoss[i].ratio + ' KDA\n';
            }
            displayMessage += '```';
            await interaction.editReply({
                content: displayMessage
            });
        } else {
            await interaction.editReply({
                content: 'No scoreboards found! :('
                , ephemeral: true
            });
        }
    },
};
    
