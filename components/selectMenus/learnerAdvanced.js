// const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require('discord.js');
// const { sequelize } = require('../../dbObjects.js');
// const { QueryTypes } = require('sequelize');
// const general = require(`../../functions/general.js`)

import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import {sequelize} from '../../dbObjects.js';
import {QueryTypes} from 'sequelize';
import general from '../../functions/general.js';

export default {
    data: {
        name: `learnerAdvanced`
    },
    async execute(interaction) {
		await interaction.update({components: []});
		var bossID = /(\d+)-(learner|advanced|solo)/.exec(interaction.values[0]);
		var bossInfo = await sequelize.query(`select boss, emoji, advanced from LearnerSignup where id = ?`, {type: QueryTypes.SELECT, replacements: [bossID[1]]});
		var combatStyleSelectMenu;
		var combatStyleSelectMenuOptions = [];
		if (interaction.values[0].includes('advanced')) {
			let filteredStyles = general.combatStyles.filter(filter => filter.type == 'combat');
			// if (bossInfo[0].boss == 'Zamorak: Lord of Chaos') filteredStyles = filteredStyles.filter(filter => filter.learnerAdvanced == 'learner');
			filteredStyles.forEach((value, key) => {
				combatStyleSelectMenuOptions.push({
					label: value.style
					, description: `Select this if you want to use ${value.style} at ${bossInfo[0].boss}`
					, value: `${interaction.values[0]}-${value.id}`
				})
			});
			combatStyleSelectMenu = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
				.setCustomId('combatStyle')
				.setPlaceholder('Nothing selected')
				.addOptions(combatStyleSelectMenuOptions),
			);
		} else {
			// let filteredStyles = general.combatStyles.filter(filter => filter.type == 'combat' && filter.learnerAdvanced == 'learner');
			let filteredStyles = general.combatStyles.filter(filter => filter.type == 'combat');
			// if (bossInfo[0].boss == 'Zamorak: Lord of Chaos') filteredStyles = filteredStyles.filter(filter => filter.learnerAdvanced == 'learner');
			filteredStyles.forEach((value, key) => {
				combatStyleSelectMenuOptions.push({
					label: value.style
					, description: `Select this if you want to use ${value.style} at ${bossInfo[0].boss}`
					, value: `${interaction.values[0]}-${value.id}`
				})
			});
			combatStyleSelectMenu = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
				.setCustomId('combatStyle')
				.setPlaceholder('Nothing selected')
				.addOptions(combatStyleSelectMenuOptions),
			);
		}
		let specificEmbed = new EmbedBuilder ()
		.setColor('#0099ff')
		.setTitle(`Which combat style would you like to use?`);
		await interaction.followUp({embeds: [specificEmbed], components: [combatStyleSelectMenu], ephemeral: true});
	}
}