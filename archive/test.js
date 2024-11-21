const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const general = require(`../functions/general`);

module.exports = {
    guildID: ['396178885261262848'],
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Please select a ticket type you want to submit'
    ),
    async execute(interaction) {
        interaction.client.user.setAvatar('./images/Frostnibble.gif')
        .then(user => console.log(`New avatar set!`))
        .catch(console.error);
        await interaction.reply({
            content: `test`
            , ephemeral: true
        });  //https://discord.com/api/v10/channels/424345150248976384/messages?limit=20&cache=false&after=1291223324743176293
  },
};