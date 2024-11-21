const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../dbObjects.js');
const generalFunctions = require(`../general`);

module.exports = {
    async gambaSeason(interaction) {
        var seasonWinners = await sequelize.query(`select userID, count(userID) count from gambaSeason where guildID = ? group by userID`, {replacements: [interaction.guildId], type: QueryTypes.SELECT});
        var returnMessage = '```';
        var winnerList = [];
        var winnerName;
        var nameLength = 0;
        var wins;
        var winsLength = 0;
        if (seasonWinners.length > 0) {
            for (const user of seasonWinners) {
                await interaction.guild.members.fetch(user.userID)
                    .then(async function(thisUser) {
                        winnerName = thisUser.nickname ? thisUser.nickname : thisUser.user.username;
                        wins = generalFunctions.numberWithCommas(user.count);
                        winnerList.push({name: winnerName, wins: user.count});
                        winsLength = winsLength > generalFunctions.numberWithCommas(wins).length ? winsLength : generalFunctions.numberWithCommas(wins).length;
                        nameLength = nameLength > winnerName.length ? nameLength : winnerName.length;
                    })
                    .catch(() => {});
            }
            winnerList.sort(function(a, b){return b.wins - a.wins});
            for (const player of winnerList) {
                returnMessage += `${player.name.padEnd(nameLength)} | ${generalFunctions.numberWithCommas(player.wins).padStart(winsLength)}\n`;
            }
            returnMessage += '```';
            await interaction.editReply({
                content: returnMessage
            });
        } else {
            await interaction.editReply({
                content: `No Gamba Season to display`
            });
        }
    }
}