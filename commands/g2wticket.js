// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder  } = require('discord.js');

import { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } from '@discordjs/builders';

export default {
    guildID: ['396178885261262848'],
	data: new SlashCommandBuilder()
		.setName('g2wticket')
		.setDescription('Please select a ticket type you want to submit'),
    async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('g2wticket')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'Waitlist Application',
							description: 'Select this to join the clan waitlist!',
							value: 'waitlist',
							emoji: '⏰'
						},
						{
							label: 'Discord Tag Submission',
							description: 'Select this to apply for a specific role in the discord!',
							value: 'discord tags',
							emoji: '🗒️'
						},
						{
							label: 'Bossing Teacher Application',
							description: 'Select this to apply to become a bossing teacher!',
							value: 'bossing teacher',
							emoji: '🧑‍🏫'
						},
						{
							label: 'Gem Scores Submission',
							description: 'Select this to apply for a gem score tag!',
							value: 'gem scores',
							emoji: '1021683118941409310'
						},
						{
							label: 'Suggestion Box',
							description: 'Select this to put in a suggestion (any suggestions really)',
							value: 'suggestion',
							emoji: '💬'
						},
						{
							label: 'General Inquiries',
							description: 'If you have any inquiries, you may ask here!',
							value: 'general inquiries',
							emoji: '❓'
						},
						{
							label: 'Report an issue to overseer+',
							description: 'Report an issue or concern to the overseers+',
							value: 'overseer',
							emoji: '❗'
						},
					),
			);
        embed = new EmbedBuilder ()
        .setColor('#0099ff')
        .setTitle('Create ticket here:')
        .setDescription('Select a reason to create a ticket');
        await interaction.channel.send({embeds: [embed], components: [row] });
        await interaction.reply({ content: 'message sent', ephemeral: true });
    },
};