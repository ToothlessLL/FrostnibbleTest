
const { ModalBuilder
    , ActionRowBuilder
    , TextInputBuilder
    , TextInputStyle 
} = require('discord.js');
const bingo = require(`../functions/bingo/bingo.js`);

module.exports = {
    data: {
        name: `rejectInput`
    },
    async execute(interaction) {
        if (bingo.bingoAdmins.some(id => id == interaction.user.id)) {
            const modal = new ModalBuilder()
                .setCustomId('rejectReason')
                .setTitle('Reason?');
            
            const textInput = new TextInputBuilder()
                .setCustomId('rejectReasonInput')
                .setLabel('What is the reason for rejection?')
                .setRequired(true)
                .setPlaceholder('Reason for rejecting this submission')
                .setStyle(TextInputStyle.Short);

            modal.addComponents(new ActionRowBuilder().addComponents(textInput));
            await interaction.showModal(modal);
        } else {
            await interaction.reply({
                content: `Sorry you're not an admin, you can't use this button!`
                , ephemeral: true
            });
            return;
        }
    }
}