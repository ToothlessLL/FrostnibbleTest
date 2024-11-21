// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
// const { sequelize } = require('../dbObjects.js');
// const { QueryTypes } = require('sequelize');
// const general = require(`../functions/general.js`);

import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder } from 'discord.js';
import { sequelize } from '../dbObjects.js';
import { QueryTypes } from 'sequelize';
import general from '../functions/general.js';

export default {
    guildID: ['396178885261262848'],
	data: new SlashCommandBuilder()
		.setName('learnersignup')
		.setDescription('Prints the "please select a ticket type you want to submit" module')
		.addSubcommand(subcommand =>
			subcommand.setName('dropdown')
			.setDescription('Shows the embed with the bosses dropdown selection')
		)
		.addSubcommandGroup(subcommand =>
			subcommand.setName('boss')
			.setDescription('Update boss information')
			.addSubcommand(subcommand =>
				subcommand.setName('add')
				.setDescription('Add a new boss')
				.addStringOption(option =>
					option.setName('name')
					.setDescription('The boss name')
					.setRequired(true)
				)
				.addStringOption(option =>
					option.setName('emoji')
					.setDescription('The boss to manage the preset for')
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('advanced')
					.setDescription('The boss to manage the preset for')
					.setRequired(true)
					.addChoices(
						{name: 'No Advanced option', value: 0}
						, {name: 'Has Advanced option', value: 1}
					)
				)
			)
			.addSubcommand(subcommand =>
				subcommand.setName('delete')
				.setDescription('Delete currect default preset for selected boss')
				.addIntegerOption(option =>
					option.setName('boss')
					.setDescription('The boss to manage the preset for')
					.setAutocomplete(true)
					.setRequired(true)
				)
			)
			.addSubcommand(subcommand =>
				subcommand.setName('update')
				.setDescription('Update boss information')
				.addIntegerOption(option =>
					option.setName('boss')
					.setDescription('The boss to manage the preset for')
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addStringOption(option =>
					option.setName('name')
					.setDescription('The boss name')
				)
				.addStringOption(option =>
					option.setName('emoji')
					.setDescription('The boss to manage the preset for')
				)
				.addIntegerOption(option =>
					option.setName('advanced')
					.setDescription('The boss to manage the preset for')
					.addChoices(
						{name: 'No Advanced option', value: 0}
						, {name: 'Has Advanced option', value: 1}
					)
				)
			)
		)
		.addSubcommandGroup(subcommand =>
			subcommand.setName('preset')
			.setDescription('Manage boss presets')
			.addSubcommand(subcommand =>
				subcommand.setName('add')
				.setDescription('Add a new preset')
				.addIntegerOption(option =>
					option.setName('boss')
					.setDescription('The boss to manage the preset for')
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('style')
					.setDescription('The combat style uploaded')
					.setRequired(true)
					.setAutocomplete(true)
				)
				.addStringOption(option =>
					option.setName('link')
					.setDescription('The link to the preset')
					.setRequired(true)
				)
			)
			.addSubcommand(subcommand =>
				subcommand.setName('update')
				.setDescription('Update existing preset')
				.addIntegerOption(option =>
					option.setName('preset')
					.setDescription('The boss to manage the preset for')
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('boss')
					.setDescription('The boss to manage the preset for')
					.setAutocomplete(true)
				)
				.addIntegerOption(option =>
					option.setName('style')
					.setDescription('The combat style uploaded')
					.setAutocomplete(true)
				)
				.addStringOption(option =>
					option.setName('link')
					.setDescription('The link to the preset')
				)
			)
			.addSubcommand(subcommand =>
				subcommand.setName('delete')
				.setDescription('Delete a preset')
				.addIntegerOption(option =>
					option.setName('preset')
					.setDescription('The preset to delete')
					.setAutocomplete(true)
					.setRequired(true)
				)
			)
		),
    async execute(interaction) {
		await interaction.deferReply({ephemeral: true});
		const boss = interaction.options.getInteger('boss');
		const advanced = interaction.options.getInteger('advanced');
		const bossName = interaction.options.getString('name');
		const emoji = interaction.options.getString('emoji');
		const preset = interaction.options.getString('link');
		const selectedPreset = interaction.options.getInteger('preset');
		const combatStyle = interaction.options.getInteger('style');
		var bossInfo = await sequelize.query(`select id, boss, emoji, advanced from LearnerSignup`, {type: QueryTypes.SELECT});
		var bossPresets = await sequelize.query(`select id, bossID, combatStyleID, preset from LearnerSignupPresets`, {type: QueryTypes.SELECT});
		const combatStyles = general.combatStyles;
		if (interaction.options.getSubcommand() == 'dropdown') {
			const bossOptions = [];
			bossInfo.sort((a, b) => (a.boss > b.boss) ? 1 : ((b.boss > a.boss) ? -1 : 0));
			bossInfo.forEach(element => {
				bossOptions.push({
					label: element.boss
					, description: `Select this to learn ${element.boss}`
					, value: element.id.toString()
					, emoji: element.emoji
				});
			});
			const bosses = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('bosses')
					.setPlaceholder('Nothing selected')
					.addOptions(bossOptions)
			);
			embed = new EmbedBuilder ()
			.setColor('#0099ff')
			.setTitle('Pick a boss:')
			.setDescription('Select a boss you want to sign up for');
			await interaction.channel.send({
				embeds: [embed]
				, components: [bosses]
				, content: "You need to be a clan member in order to sign up for a learner session!"
			});
			await interaction.editReply({content: 'posted module'});
			return;
		}
		switch (interaction.options.getSubcommandGroup()) {
			case 'boss':
				switch (interaction.options.getSubcommand()) {
					case 'dropdown':
					case 'add':
						if (bossInfo.length == 25) {
							await interaction.editReply({
								content: `There are already 25 bosses added! Please delete one before adding a new one.`
							});
							return;
						}
						await sequelize.query(`insert into LearnerSignup (boss, emoji, advanced) values (?, ?, ?)`, {replacements: [bossName, emoji, advanced], type: QueryTypes.INSERT});
						var results = bossInfo.filter(option => option.id === boss);
						var output = `${bossName} added!`;
						await interaction.editReply({content: output});
						return;
					case 'delete':
						await sequelize.query(`delete from LearnerSignup where id = ?`, {replacements: [boss], type: QueryTypes.DELETE});
						var results = bossInfo.filter(option => option.id === boss);
						await interaction.editReply({ content: `${results[0].boss} deleted!`});
						return;
					case 'update':
						await sequelize.query(`update LearnerSignup set boss = coalesce(?, boss), emoji = coalesce(?, emoji), advanced = coalesce(?, advanced) where id = ?`, {type: QueryTypes.UPDATE, omitNull: true, replacements: [bossName, emoji, advanced, boss]});
						var results = bossInfo.filter(option => option.id === boss);
						var output = `${results[0].boss} updated!`;
						await interaction.editReply({ content: output});
						return;
				}
				break;
			case 'preset':
				var parsedLink = preset ? (preset.includes("https://") ? preset : `https://${preset}`) : null;
				var results = bossInfo.filter(option => option.id === boss);
				switch (interaction.options.getSubcommand()) {
				case 'add':
					if (results[0].advanced == 0 && (general.combatStyles.filter(filter => filter.learnerAdvanced == 'advanced' && filter.id == combatStyle)).length > 0) {
						await interaction.editReply({
							content: `You can't pick a hybrid preset for this option!`
						});
						return;
					}
					var presetExists = await sequelize.query(`select id from LearnerSignupPresets where bossID = ? and combatStyleID = ?`, {type: QueryTypes.SELECT, replacements: [boss, combatStyle]});
					if (presetExists.length > 0) {
						let selectedPreset = general.combatStyles.filter(filter => filter.id == combatStyle);
						await interaction.editReply({
							content: `There's already a ${selectedPreset[0].style} preset for ${results[0].boss}!`
						});
						return;
					}
					await sequelize.query(`insert into LearnerSignupPresets values (null, ?, ?, ?)`, {replacements: [boss, combatStyle, parsedLink], type: QueryTypes.INSERT});
					var output = `[${results[0].boss}](<${parsedLink}>) added!`;
					await interaction.editReply({content: output});
					return;
				case 'update':
					if (!boss && !combatStyle && !preset) {
						await interaction.editReply({
							content: `You must pick something to update!`
						});
						return;
					}
					var filteredPresets = bossPresets.filter(filter => filter.id === selectedPreset);
					var currentCombatStyle = combatStyle ? combatStyle : filteredPresets[0].combatStyleID
					var filteredCombatStyle = combatStyles.filter(filter => filter.id === currentCombatStyle);
					var selectedBoss = boss ? boss : filteredPresets[0].bossID;
					var results = bossInfo.filter(option => option.id === selectedBoss);
					parsedLink = parsedLink ? parsedLink : filteredPresets[0].preset;
					if (combatStyle || boss) {
						let currentFilter = bossPresets.filter(filter => filter.bossID === selectedBoss && filter.combatStyleID === currentCombatStyle);
						if (currentFilter.length > 0) {
							let selectedCombatStyle = combatStyles.filter(filter => filter.id == combatStyle);
							await interaction.editReply({
								content: `There's already a ${results[0].boss} preset with ${selectedCombatStyle[0].style}!`
							});
							return;
						}
					}
					await sequelize.query(`update LearnerSignupPresets set bossID = coalesce(?, bossID), combatStyleID = coalesce(?, combatStyleID), preset = coalesce(?, preset) where id = ?`, {type: QueryTypes.UPDATE, replacements: [selectedBoss, combatStyle, parsedLink, selectedPreset]});
					await interaction.editReply({
						content: `Updated ${results[0].boss} [${filteredCombatStyle[0].style} preset](<${parsedLink}>)`
					});
					break;
				case 'delete':
					var filteredPresets = bossPresets.filter(filter => filter.id === selectedPreset);
					var results = bossInfo.filter(option => option.id === filteredPresets[0].bossID);
					var filteredCombatStyle = combatStyles.filter(filter => filter.id === filteredPresets[0].combatStyleID);
					await sequelize.query(`delete from LearnerSignupPresets where id = ?`, {replacements: [selectedPreset], type: QueryTypes.DELETE});
					var results = bossInfo.filter(option => option.id === filteredPresets[0].bossID);
					await interaction.editReply({content: `${results[0].boss} ${filteredCombatStyle[0].style} preset deleted!`});
					break;
			}
		}
    },
	async autocomplete(interaction) {
		var existingBosses = await sequelize.query(`select id, boss, advanced from LearnerSignup`, {type: QueryTypes.SELECT});
		var existingPresets = await sequelize.query(`select id, bossID, combatStyleID from LearnerSignupPresets`, {type: QueryTypes.SELECT});
		existingBosses.sort((a, b) => (a.boss > b.boss) ? 1 : ((b.boss > a.boss) ? -1 : 0));
		var combatStyles = general.combatStyles;
		var itemsList = [];
		// if (['delete', 'display', 'update'].includes(interaction.options.getSubcommand())) {
			const focusedValue = interaction.options.getFocused(true);
			switch (focusedValue.name) {
				case 'preset':
					existingPresets.forEach((value, key) => {
						let filteredBoss = existingBosses.filter(filter => filter.id == value.bossID);
						let filteredStyle = combatStyles.filter(filter => filter.id == value.combatStyleID);
						// console.log(filteredStyle);
						itemsList.push({
							id: value.id
							, boss: `${filteredBoss[0].boss} - ${filteredStyle[0].style}`
						});
					});
					break;
				case 'boss':
					itemsList = existingBosses;
					break;
				case 'style':
					var selectedBoss = interaction.options.getInteger('boss');
					if (!selectedBoss) {
						selectedBoss = interaction.options.getInteger('preset');
						let filteredPreset = existingPresets.filter(filter => filter.id == selectedBoss);
						let filteredBoss = existingBosses.filter(filter => filter.id == filteredPreset[0].bossID);
						if (filteredBoss[0].boss == 'Croesus') combatStyles = combatStyles.filter(filter => filter.type == 'skilling')
						else if (filteredBoss[0].advanced == 0) combatStyles = combatStyles.filter(filter => filter.learnerAdvanced == 'learner' && filter.type == 'combat');
						else combatStyles = combatStyles.filter(filter => filter.learnerAdvanced == 'advanced');
					} else {
						let filteredBoss = existingBosses.filter(filter => filter.id == selectedBoss);
						if (filteredBoss[0].boss == 'Croesus') combatStyles = combatStyles.filter(filter => filter.type == 'skilling')
						else if (filteredBoss[0].advanced == 0) combatStyles = combatStyles.filter(filter => filter.learnerAdvanced == 'learner' && filter.type == 'combat');
						else combatStyles = combatStyles.filter(filter => filter.learnerAdvanced == 'advanced');
					}
					combatStyles.forEach((value, key) => {
						itemsList.push({
							id: value.id
							, boss: value.style
						});
					});
					break;
			}
			// for (const preset of existingPresets) {
			//     itemsList.push({id: preset.id, boss: preset.boss});
			// }
			var filtered = await itemsList.filter(choice => choice.boss.toLowerCase().includes(focusedValue.value.toLowerCase()));
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.boss, value: choice.id}))
			);
		
	}
};