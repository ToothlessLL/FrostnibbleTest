// const { SlashCommandBuilder } = require('@discordjs/builders');
// const {google} = require('googleapis');
// const general = require('../functions/general');
// const { sequelize } = require('../dbObjects');
// const { QueryTypes } = require('sequelize');
// const {GlobalFonts} = require('@napi-rs/canvas');
// const Canvas = require('@napi-rs/canvas');
// const { AttachmentBuilder} = require('discord.js');

import { SlashCommandBuilder } from 'discord.js';
import { sequelize } from '../dbObjects.js';
import {QueryTypes} from 'sequelize';


export default {
    guildID: ['660641640339472405'],
	data: new SlashCommandBuilder()
		.setName('joinping')
		.setDescription('Update toxic cunt pings')
		.addSubcommand(option =>
			option.setName('add')
			.setDescription('add to ping list')
			.addUserOption(option =>
				option.setName('user')
				.setDescription(`The user to add`)
				.setRequired(true)
			)
		)
		.addSubcommand(option =>
			option.setName('remove')
			.setDescription('remove from ping list')
			.addUserOption(option =>
				option.setName('user')
				.setDescription(`The user to remove`)
				.setRequired(true)
			)
		),
    async execute(interaction) {
		await interaction.deferReply({
			ephemeral: true
		});
		const user = interaction.options.getUser('user');
		switch (interaction.options.getSubcommand()) {
			case 'add':
				try {
					await sequelize.query(`insert into ToxicCuntPings values (?)`, {type: QueryTypes.INSERT, replacements: [user.id]});
					await interaction.editReply({
						content: `Added <@${user.id}> to toxic cunt vc ping list`
					});
				} catch (err) {
					await interaction.editReply({
						content: `<@${user.id}> is already on the list!`
					});
				}
				break;
			case 'remove':
				await sequelize.query(`delete from ToxicCuntPings where id = ?`, {type: QueryTypes.DELETE, replacements: [user.id]});
				await interaction.editReply({
					content: `Deleted <@${user.id}> to toxic cunt vc ping list`
				});
				break;
		}
    },
};