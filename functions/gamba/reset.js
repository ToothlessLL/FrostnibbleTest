const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../dbObjects.js');
const gambaRanking = require (`./gambaRanking`);

module.exports = {
    async reset(interaction) {
        var gamba = await gambaRanking.gambaRanking(interaction);
        if (gamba.length > 0) {
            await sequelize.query(`insert into gambaSeason (userID, guildID) values (?, ?)`, {replacements: [gamba[0].id, interaction.guildId], type: QueryTypes.INSERT});
            await sequelize.query(`delete from Users where guildID = ?`, {replacements: [interaction.guildId], type: QueryTypes.DELETE});
            await sequelize.query(`delete from UserItems where guildID = ?`, {replacements: [interaction.guildId], type: QueryTypes.DELETE});
            await sequelize.query(`delete from Challenges where guildID = ?`, {replacements: [interaction.guildId], type: QueryTypes.DELETE});
            await sequelize.query(`delete from WinLosses where guildID = ?`, {replacements: [interaction.guildId], type: QueryTypes.DELETE});
            await interaction.editReply({
                content: `<@${gamba[0].id}> is the gamba king this season! New season has started! Alan will surely be the gamba king this season.`
            });
        } else {
            await interaction.editReply({
                content: `Nothing to reset!`
            });
        }
    }
}