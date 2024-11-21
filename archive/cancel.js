
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: `cancel`
    },
    async execute(interaction) {
        if (interaction.message.interaction.user.id === interaction.user.id) {
            await interaction.update({
                content: `**This raid is cancelled!**`
                , components: []
            });
        } else {
            await interaction.reply({
                content: `Only the host can cancel raids!`
                , ephemeral: true
            });
        }
    }
}