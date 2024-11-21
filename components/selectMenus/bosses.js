// const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require('discord.js');
// const { sequelize } = require('../../dbObjects.js');
// const { QueryTypes } = require('sequelize');
// const general = require(`../../functions/general.js`);

import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { sequelize } from '../../dbObjects.js';
import {QueryTypes} from 'sequelize';
import general from '../../functions/general.js';

export default {
    data: {
        name: `bosses`
    },
    async execute(interaction, client) {
		await interaction.update({});
		var bossInfo = await sequelize.query(`select boss, emoji, advanced from LearnerSignup where id = ?`, {type: QueryTypes.SELECT, replacements: [interaction.values[0]]});
			const clannieRoles = [
				'396184274769805313' //owner
				, '396184742439026699' //dep owner
				, '396185096463581186' //overseer
				, '396186049820360735' //coordinator
				, '396186811522744330' //organiser
				, '396187133003563009' //admin
				, '396187310191935488' //general
				, '396187446724919298' //captain
				, '396188250793836546' //lieutenant
				, '396188752407691275' //sergeant
				, '396189206348562432' //corporal
				, '396189325337034753' //recruit
			];
			if (interaction.member._roles.some(r => clannieRoles.includes(r)) || interaction.guild.id === '902646067466747934') {
				if (bossInfo[0].advanced === 1) {
					var selectMenuOptions;
					if (bossInfo[0].boss == 'Zamorak: Lord of Chaos') {
						selectMenuOptions = [{
							label: 'Learner',
							description: 'Select this if you want to learn the basics',
							value: `${interaction.values[0]}-learner`,
						},
						{
							label: 'Advanced',
							description: 'Select this if you know the boss, but want to improve even further',
							value: `${interaction.values[0]}-advanced`,
						},
						{
							label: 'Solo',
							description: 'Select this if you know the boss, but want to improve even further',
							value: `${interaction.values[0]}-solo`,
						}];
					} else {
						selectMenuOptions = [{
							label: 'Learner',
							description: 'Select this if you want to learn the basics',
							value: `${interaction.values[0]}-learner`,
							emoji: '👶'
						},
						{
							label: 'Advanced',
							description: 'Select this if you know the boss, but want to improve even further',
							value: `${interaction.values[0]}-advanced`,
							emoji: '🧑‍🎓'
						}];
					}
					const learnerAdvancedSelectMenu = new ActionRowBuilder()
					.addComponents(
						new StringSelectMenuBuilder()
						.setCustomId('learnerAdvanced')
						.setPlaceholder('Nothing selected')
						.addOptions(selectMenuOptions)
					);
					let specificEmbed = new EmbedBuilder()
					.setColor('#0099ff')
					.setTitle(`Select whether you want a learner hour or advanced learner hour for ${bossInfo[0].boss}.`);
					await interaction.followUp({embeds: [specificEmbed], components: [learnerAdvancedSelectMenu], ephemeral: true});
				} else {
					// var combatStyleSelectMenuOptions = [];
					// var filteredOutput = general.combatStyles.filter(filter => filter.learnerAdvanced == 'learner');
					// if (bossInfo[0].boss == 'Croesus') filteredOutput = filteredOutput.filter(filter => filter.type == 'skilling')
					// else filteredOutput = filteredOutput.filter(filter => filter.type == 'combat');
					// filteredOutput.forEach((value, key) => {
					// 	combatStyleSelectMenuOptions.push({
					// 		label: value.style
					// 		, description: `Select this if you want to use ${value.style} at ${bossInfo[0].boss}`
					// 		, value: `${interaction.values[0]}-learner-${value.id}`
					// 	});
					// });
					// const combatStyleSelectMenu = new ActionRowBuilder()
					// .addComponents(
					// 	new StringSelectMenuBuilder()
					// 	.setCustomId('combatStyle')
					// 	.setPlaceholder('Nothing selected')
					// 	.addOptions(combatStyleSelectMenuOptions),
					// );
					// let specificEmbed = new EmbedBuilder ()
					// .setColor('#0099ff')
					// .setTitle(`Which ${bossInfo[0].boss == 'Croesus' ? 'node' : 'combat style'} would you like to ${bossInfo[0].boss == 'Croesus' ? 'do' : 'use'}?`);
					// await interaction.followUp({embeds: [specificEmbed], components: [combatStyleSelectMenu], ephemeral: true});
					
					// var combatStyleSelectMenuOptions = [];
					// bossInfo[0].styles.split(':').forEach((value, key) => {
					// 	let filteredStyle = general.combatStyles.filter(filter => filter.id == value);
					// 	combatStyleSelectMenuOptions.push({
					// 		label: filteredStyle[0].style
					// 		, description: `Select this if you want to use ${filteredStyle[0].style} at ${bossInfo[0].boss}`
					// 		, value: `${interaction.values[0]}-learner-${value}`
					// 	});
					// });
					var combatStyleSelectMenuOptions = [];
					general.combatStyles.forEach((value, key) => {
						combatStyleSelectMenuOptions.push({
							label: value.style
							, description: `Select this if you want to use ${value.style} at ${bossInfo[0].boss}`
							, value: `${interaction.values[0]}-learner-${value.id}`
						});
					});
					const combatStyleSelectMenu = new ActionRowBuilder()
					.addComponents(
						new StringSelectMenuBuilder()
						.setCustomId('combatStyle')
						.setPlaceholder('Nothing selected')
						.addOptions(combatStyleSelectMenuOptions),
					);
					let specificEmbed = new EmbedBuilder ()
					.setColor('#0099ff')
					.setTitle(`Which ${bossInfo[0].boss == 'Croesus' ? 'node' : 'combat style'} would you like to ${bossInfo[0].boss == 'Croesus' ? 'do' : 'use'} at ${bossInfo[0].boss}?`);
					await interaction.followUp({embeds: [specificEmbed], components: [combatStyleSelectMenu], ephemeral: true});
				}
			} else {
				await interaction.followUp({
					content: "You need to be a clan member in order to sign up for a learner session!"
					, ephemeral: true
				});
			}
    }
}