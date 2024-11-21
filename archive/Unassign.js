const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require(`discord.js`);
const { sequelize } = require('../dbObjects.js');
const { QueryTypes } = require('sequelize');
const bingo = require(`../functions/bingo/bingo.js`);

module.exports = {
    guildID: ['902646067466747934'],
    data: new ContextMenuCommandBuilder()
        .setName('Unassign Team')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const teamNumber = 2;
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
        if (!bingo.bingoPlayers.has(interaction.targetMessage.interaction.user.id)) {
            await interaction.reply({
                content: `<@${interaction.targetMessage.interaction.user.id}> is not assigned to a team!`
                , ephemeral: true
            });
            return;
        }
        var team = bingo.bingoPlayers.get(interaction.targetMessage.interaction.user.id);
        var teamName = bingo.bingoTeams.get(team);
        await sequelize.query(`update bingoPlayers set team = ? where id = ?`, {replacements: [null, interaction.targetMessage.interaction.user.id], type: QueryTypes.UPDATE});
        bingo.bingoPlayers.delete(interaction.targetMessage.interaction.user.id);
        var content = `<@${interaction.targetMessage.interaction.user.id}> is unassigned from Team **${teamName.name}**!`;
        await interaction.reply({
            content: content
        });
    }
} 