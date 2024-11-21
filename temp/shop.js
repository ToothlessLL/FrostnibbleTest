const { SlashCommandBuilder } = require('@discordjs/builders');
const { Shop } = require('../dbObjects.js');
const { Formatters } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Get the list of shop items'),
	async execute(interaction) {
        const shopList = await Shop.findAll();
        if (shopList) {
            await interaction.reply({
                content: Formatters.codeBlock(shopList.map(i => `${i.itemName}: ${numberWithCommas(i.price)}💰`).join('\n'))
                , ephemeral: true
            });
        } else {
            await interaction.reply({
                content: 'No shop stock found! :('
                , ephemeral: true
            });
        }
	},
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}