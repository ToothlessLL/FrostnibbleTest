const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require(`discord.js`);
const { sequelize } = require('../dbObjects.js');
const { QueryTypes } = require('sequelize');
const bingo = require(`../functions/bingo/bingo.js`);

module.exports = {
    guildID: ['902646067466747934'],
    data: new ContextMenuCommandBuilder()
        .setName('Team 1')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const teamNumber = 1;
        if (!bingo.bingoAdmins.some(id => id == interaction.user.id)) {
            await interaction.reply({
                content: `Sorry you're not an admin, you can't use this button!`
                , ephemeral: true
            });
            return;
        }
        if (!interaction.targetMessage.interaction) {
            await interaction.reply({
                content: `This is not a signup form!`
            });
            return;
        }
        if (interaction.targetMessage.interaction.commandName != 'bingo signup') {
            await interaction.reply({
                content: `This is not a signup form!`
                , ephemeral: true
            });
            return;
        }
        if (bingo.bingoPlayers.has(interaction.targetMessage.interaction.user.id)) {
            await interaction.reply({
                content: `<@${interaction.targetMessage.interaction.user.id}> has already been assigned to Team ${bingo.bingoTeams.get(teamNumber)}!`
                , ephemeral: true
            });
            return;
        }
        var team = bingo.bingoTeams.get(teamNumber);
        await sequelize.query(`update bingoPlayers set team = ? where id = ?`, {replacements: [teamNumber, interaction.targetMessage.interaction.user.id], type: QueryTypes.UPDATE});
        var content = `<@${interaction.targetMessage.interaction.user.id}> is assigned to Team **${team.name}**!`;
        bingo.bingoPlayers.set(interaction.targetMessage.interaction.user.id, teamNumber);
        await interaction.reply({
            content: content
        });
    }
} 