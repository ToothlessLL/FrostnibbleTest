// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
//const client = require ("../index");

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    guildID: ['396178885261262848'],
	data: new SlashCommandBuilder()
		.setName('discordtags')
		.setDescription('Sends out the discord tags button!'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nonexptags')
					.setLabel('All Other Roles')
					.setEmoji('📩')
					.setStyle(ButtonStyle.Secondary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('exptags')
					.setLabel('Exp Tags')
					.setEmoji('📩')
					.setStyle(ButtonStyle.Secondary),
			);
        embed = new EmbedBuilder ()
		.setColor('#0099ff')
		.setTitle('Discord Tag Application')
		.setDescription('Apply for any role in the server');
        await interaction.channel.send({embeds: [embed], components: [row]});
		await interaction.reply({
			content: 'sent'
			, ephemeral: true
		});
	},
};
