// const { SlashCommandBuilder } = require('@discordjs/builders');
// const {google} = require('googleapis');
// const general = require('../functions/general');
// const { sequelize } = require('../dbObjects');
// const { QueryTypes } = require('sequelize');
// const {GlobalFonts} = require('@napi-rs/canvas');
// const Canvas = require('@napi-rs/canvas');
// const { AttachmentBuilder} = require('discord.js');

import { AttachmentBuilder, SlashCommandBuilder } from 'discord.js';
import general from '../functions/general.js';
import {sequelize} from '../dbObjects.js';
import {QueryTypes} from 'sequelize';
import Canvas, { GlobalFonts } from '@napi-rs/canvas';
import {Cron} from 'croner';

export default {
    guildID: ['0']
	, itemPrices: null
	, data: new SlashCommandBuilder()
		.setName('clues')
		.setDescription('add to clue spreadsheet')
		.addSubcommand(option =>
			option.setName('print')
			.setDescription('Output drops in text format')
		)
		.addSubcommandGroup(option =>
			option.setName('add')
			.setDescription('add drop to clue spreadsheet')
			.addSubcommand(option =>
				option.setName('hard')
				.setDescription('add a clue drop')
				.addStringOption(option =>
					option.setName('item')
					.setDescription(`The item you're submitting`)
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('totalcluecount')
					.setDescription('the total clue count you have (not total caskets you are opening this time)')
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('casketsleft')
					.setDescription('number of caskets left to open')
					.setRequired(true)
				)
				.addStringOption(option => 
					option.setName('date')
					.setDescription('Date received use MM/DD/YYYY format - default to today if left blank')
				)
				.addIntegerOption(option =>
					option.setName('price')
					.setDescription('Price of the item - defaults to GE mid if left blank')
				)
				.addAttachmentOption(option =>
					option.setName('image')
					.setDescription('Screenshot of your drop')
				)
				.addStringOption(option =>
					option.setName('screenshoturl')
					.setDescription('Use this if you have the screenshot URL')
				)
			)
			.addSubcommand(option =>
				option.setName('elite')
				.setDescription('add a elites clue drop')
				.addStringOption(option =>
					option.setName('item')
					.setDescription(`The item you're submitting`)	
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('totalcluecount')
					.setDescription('the total clue count you have (not total caskets you are opening this time)')
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('casketsleft')
					.setDescription('number of caskets left to open')
					.setRequired(true)
				)
				.addStringOption(option => 
					option.setName('date')
					.setDescription('Date received use MM/DD/YYYY format - default to today if left blank')
				)
				.addIntegerOption(option =>
					option.setName('price')
					.setDescription('Price of the item - defaults to GE mid if left blank')
				)
				.addAttachmentOption(option =>
					option.setName('image')
					.setDescription('Screenshot of your drop')
				)
				.addStringOption(option =>
					option.setName('screenshoturl')
					.setDescription('Use this if you have the screenshot URL')
				)
			)
			.addSubcommand(option =>
				option.setName('master')
				.setDescription('add a masters clue drop')
				.addStringOption(option =>
					option.setName('item')
					.setDescription(`The item you're submitting`)	
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('totalcluecount')
					.setDescription('the total clue count you have (not total caskets you are opening this time)')
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('casketsleft')
					.setDescription('number of caskets left to open')
					.setRequired(true)
				)
				.addStringOption(option => 
					option.setName('date')
					.setDescription('Date received use MM/DD/YYYY format - default to today if left blank')
				)
				.addIntegerOption(option =>
					option.setName('price')
					.setDescription('Price of the item - defaults to GE mid if left blank')
				)
				.addAttachmentOption(option =>
					option.setName('image')
					.setDescription('Screenshot of your drop')
				)
				.addStringOption(option =>
					option.setName('screenshoturl')
					.setDescription('Use this if you have the screenshot URL')
				)
			)
		)
		.addSubcommandGroup(option =>
			option.setName('update')
			.setDescription('update a drop on the clue spreadsheet')
			.addSubcommand(option =>
				option.setName('hard')
				.setDescription('update a hards clue drop')
				.addIntegerOption(option =>
					option.setName('broadcast')
					.setDescription(`The item you're updating`)
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('newitem')
					.setDescription('the new item of the broadcast')
					.setAutocomplete(true)
				)
				.addIntegerOption(option =>
					option.setName('casketnumber')
					.setDescription('the casket number of the broadcast')
				)
				.addStringOption(option => 
					option.setName('date')
					.setDescription('Date received use MM/DD/YYYY format - default to today if left blank')
				)
				.addIntegerOption(option =>
					option.setName('price')
					.setDescription('Price of the item - defaults to GE mid if left blank')
				)
				.addAttachmentOption(option =>
					option.setName('image')
					.setDescription('Screenshot of your drop')
				)
				.addStringOption(option =>
					option.setName('screenshoturl')
					.setDescription('Use this if you have the screenshot URL')
				)
			)
			.addSubcommand(option =>
				option.setName('elite')
				.setDescription('update a elite clue drop')
				.addIntegerOption(option =>
					option.setName('broadcast')
					.setDescription(`The item you're submitting`)
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('newitem')
					.setDescription('the new item of the broadcast')
					.setAutocomplete(true)
				)
				.addIntegerOption(option =>
					option.setName('casketnumber')
					.setDescription('the casket number of the broadcast')
				)
				.addStringOption(option => 
					option.setName('date')
					.setDescription('Date received use MM/DD/YYYY format - default to today if left blank')
				)
				.addIntegerOption(option =>
					option.setName('price')
					.setDescription('Price of the item - defaults to GE mid if left blank')
				)
				.addAttachmentOption(option =>
					option.setName('image')
					.setDescription('Screenshot of your drop')
				)
				.addStringOption(option =>
					option.setName('screenshoturl')
					.setDescription('Use this if you have the screenshot URL')
				)
			)
			.addSubcommand(option =>
				option.setName('master')
				.setDescription('update a master clue drop')
				.addIntegerOption(option =>
					option.setName('broadcast')
					.setDescription(`The broadcast you're updating`)
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('newitem')
					.setDescription('the new item of the broadcast')
					.setAutocomplete(true)
				)
				.addIntegerOption(option =>
					option.setName('casketnumber')
					.setDescription('the casket number of the broadcast')
				)
				.addStringOption(option => 
					option.setName('date')
					.setDescription('Date received use MM/DD/YYYY format - default to today if left blank')
				)
				.addIntegerOption(option =>
					option.setName('price')
					.setDescription('Price of the item - defaults to GE mid if left blank')
				)
				.addAttachmentOption(option =>
					option.setName('image')
					.setDescription('Screenshot of your drop')
				)
				.addStringOption(option =>
					option.setName('screenshoturl')
					.setDescription('Use this if you have the screenshot URL')
				)
			)
			.addSubcommand(option =>
				option.setName('count')
				.setDescription('Update clue count')
				.addIntegerOption(option =>
					option.setName('tier')
					.setDescription('The tier to display')
					.addChoices(
						{name: 'Hard', value: 1}
						, {name: 'Elite', value: 2}
						, {name: 'Master', value: 3}
					)
					.setRequired(true)
				)
				.addIntegerOption(option => 
					option.setName('count')
					.setDescription('Clue count to update to')
					.setRequired(true)
				)
			)
		)
		.addSubcommandGroup(option => 
			option.setName('display')
			.setDescription('Display your stats for all or specific tier')
			.addSubcommand(option =>
				option.setName('breakdown')
				.setDescription('Displays clue breakdown')
				.addIntegerOption(option =>
					option.setName('tier')
					.setDescription('The tier to display')
					.addChoices(
						{name: 'Hard', value: 1}
						, {name: 'Elite', value: 2}
						, {name: 'Master', value: 3}
					)
				)
				.addUserOption(option =>
					option.setName('gamer')
					.setDescription(`The user's clue stats to display`)
				)
			)
			.addSubcommand(option =>
				option.setName('screenshot')
				.setDescription('Display screenshot')
				.addIntegerOption(option =>
					option.setName('broadcast')
					.setDescription('The screenshot to display')
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
		)
		.addSubcommand(option =>
			option.setName('snoop')
			.setDescription('Snoop broadcast image')
			.addUserOption(option =>
				option.setName('gamer')
				.setDescription(`The user's broadcast screenshot`)
				.setRequired(true)
			)
			.addIntegerOption(option =>
				option.setName('broadcast')
				.setDescription('The image to display')
				.setRequired(true)
				.setAutocomplete(true)
			)
		)
		.addSubcommand(option =>
			option.setName('delete')
			.setDescription('delete broadcast')
			.addIntegerOption(option =>
				option.setName('broadcast')
				.setDescription('Select broadcast to delete')
				.setRequired(true)
				.setAutocomplete(true)
			)
		),
    async execute(interaction) {
		const item = interaction.options.getString('item');
		const uploadedAttachment = interaction.options.getAttachment('image');
		const imageURL = interaction.options.getString('screenshoturl');
		const totalClueCount = interaction.options.getInteger('totalcluecount');
		const casketsLeft = interaction.options.getInteger('casketsleft');
		const option = interaction.options.getSubcommandGroup();
		const subcommand = interaction.options.getSubcommand();
		const imageDirectory = `.\\images`;
		const selectedTier = interaction.options.getInteger('tier');
		const selectedUser = interaction.options.getUser('gamer');
		const date = interaction.options.getString('date');
		const priceInput = interaction.options.getInteger('price');
		const casketNumber = interaction.options.getInteger('casketNumber');
		const broadcast = interaction.options.getInteger('broadcast');
		const clueCount = interaction.options.getInteger('count');
		const newSelectedItem = interaction.options.getInteger('newitem');
		var outputImagePath = null;
		var saveImagePath = null;
		var saveImagePath;
		var price;
		var tier;
		var currentTime;
		let selectedOption;
		if (option) selectedOption = option;
		else selectedOption = subcommand;
		var currentTimeFileName;

		switch (selectedOption) {
			case 'add':
				if (uploadedAttachment && imageURL) {
					await interaction.reply({content: 'Pick one only!', ephemeral: true});
					break;
				}
				if (priceInput < 0) {
					await interaction.reply({content: `Price cannot be negative!`, ephemeral: true});
					break;
				}
				currentTimeFileName = new Date().getTime();
				if (date) currentTime = new Date(date).getTime();
				else currentTime = new Date().getTime();
				if (isNaN(currentTime)) {
					await interaction.reply({
						content: `Invalid date!`
						, ephemeral: true
					});
					break;
				}
				if (totalClueCount - casketsLeft < 0) {
					await interaction.reply({
						content: `Your final casket count must be greater than 0!`
						, ephemeral: true
					});
					break;
				}
				await interaction.deferReply();
				var searchColumn;
				if (priceInput) {
					price = priceInput;
				} else {
					price = this.itemPrices[item].price;
				}
				if (uploadedAttachment) {
					saveImagePath = `${imageDirectory}\\${currentTimeFileName}.png`;
					await general.downloadImage(uploadedAttachment.url, saveImagePath);
					outputImagePath = uploadedAttachment.url;
				}
				if (imageURL) {
					saveImagePath = imageURL;
					outputImagePath = imageURL;
				}
				if (subcommand == 'hard') {
					searchColumn = 'hardClueCount';
					tier = 1;
				} else if (subcommand == 'elite') {
					searchColumn = 'eliteClueCount';
					tier = 2;
				} else {
					searchColumn = 'masterClueCount';
					tier = 3;
				}
				if (price == null) price = -1;
				var clueItem = await sequelize.query(`select name from ClueItems where clueItemID = ?`, {type: QueryTypes.SELECT, replacements: [item]});
				await sequelize.query(`insert into ClueDrops values (null, ?, ?, ?, ?, ?, ?, ?)`, {type: QueryTypes.INSERT, replacements: [item, tier, totalClueCount - casketsLeft, currentTime, interaction.user.id, price ? price : -1, saveImagePath]});
				var userStats = await sequelize.query(`select ${searchColumn} from ClueUsers where clueUserID = ?`, {type: QueryTypes.SELECT, replacements: [interaction.user.id]});
				if (userStats.length == 0) await sequelize.query(`insert into ClueUsers (clueUserID, ${searchColumn}) values (?, ?)`, {type: QueryTypes.INSERT, replacements: [interaction.user.id, totalClueCount]});
				else await sequelize.query(`update ClueUsers set ${searchColumn} = ? where clueUserID = ?`, {type: QueryTypes.UPDATE, replacements: [totalClueCount, interaction.user.id]});
				let message;
				if (outputImagePath) message = await interaction.editReply({content: clueItem[0].name, files: [outputImagePath]});
				else message = await interaction.editReply({content: `Added ${clueItem[0].name}`});
				break;
			case 'display':
				await interaction.deferReply();
				var userID = selectedUser ? selectedUser.id : interaction.user.id;
				const output = await sequelize.query(`
					select b.name name
						, cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID || 'id' || a.tier order by a.date, a.clueDropID) as text) || ' (' || cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID order by a.date, a.clueDropID) as text) || ')' rownumber
						, cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID || 'id' || a.tier order by a.date, a.clueDropID) as text) currentTierCount
						, cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID order by a.date, a.clueDropID) as text) allTierCount
						, a.casketCount casketCount
						, a.date date
						, a.tier tier
						, a.price price
						, a.imagePath
						, a.clueDropID clueDropID
					from ClueDrops a
						left outer join ClueItems b on a.clueItemID = b.clueItemID
					where userID = ?
					order by date, clueDropID`
				, {type: QueryTypes.SELECT, replacements: [userID]});
				if (subcommand == 'screenshot') {
					const imageFilter = output.filter(filter => filter.clueDropID === broadcast);
					const attachment = new AttachmentBuilder(imageFilter[0].imagePath, { name: 'output.png' })
					await interaction.editReply({
						content: `${imageFilter[0].name} ${imageFilter[0].rownumber}`
						, files: [attachment]
					});
					break;
				}
				const userInfo = await sequelize.query(`select hardClueCount, eliteClueCount, masterClueCount from clueUsers where clueUserID = ?`, {type: QueryTypes.SELECT, replacements: [userID]});
				var filteredOutput = output.filter(filter => filter.tier === selectedTier);
				// var username = await general.getUsernameByID(userID, interaction);
				let username = interaction.member?.nickname;
				if (!username) username = interaction.user.globalName;
				if (!username) username = interaction.user.username;
				if (userInfo.length == 0) {
					await interaction.editReply({
						content: `${username} haven't submitted any data!`
					});
					return;
				}

				const breakdownList = new Map();
				breakdownList.set(1, {maxWidth: 2100, borderPath: `./images/Clues/Hard_Clues_Border.png`, userClueCount: userInfo[0].hardClueCount, tier: 'hard', dropRate: 453, coefficientText: `Barrows/shadow dyes + 3a + barrel`,
					filterClues: filter => filter.filter(filter => filter.name.includes('Third age') || ['Barrows dye', 'Shadow dye', 'Explosive barrel'].includes(filter.name))
					, items: [
						{name: 'Barrows dye', searchString: 'Barrows dye', dropRate: 1205, color: '#b6d7a8'}
						, {name: 'Shadow dye', searchString: 'Shadow dye', dropRate: 2169, color: '#d5a6bd'}
						, {name: 'Backstab cape', searchString: 'Backstab cape', dropRate: 3254, color: '#e6b8af'}
						, {name: 'Sack of effigies', searchString: 'Sack of effigies', dropRate: 6508, color: '#efefef'}
						, {name: 'Third age piece', searchString: 'Third age', dropRate: 2386, color: '#ffe599'}
						, {name: 'Explosive barrel', searchString: 'Explosive barrel', dropRate: 26930, color: '#dd7e6b'}
					], images: [
						{name: `Explosive barrel`, filename: `explosive_barrel`}
						, {name: `Sack of effigies`, filename: `sack_of_effigies`}
						, {name: `Backstab cape`, filename: `backstab_cape`}
						, {name: `Barrows dye`, filename: `barrows_dye`}
						, {name: `Shadow dye`, filename: `shadow_dye`}
						, {name: `Third age ranger coif`, filename: `3a_coif`}
						, {name: `Third age ranger body`, filename: `3a_range_top`}
						, {name: `Third age ranger chaps`, filename: `3a_range_legs`}
						, {name: `Third age vambraces`, filename: `3a_range_vambraces`}
						, {name: `Third age robe top`, filename: `3a_mage_top`}
						, {name: `Third age robe`, filename: `3a_mage_legs`}
						, {name: `Third age mage hat`, filename: `3a_mage_hat`}
						, {name: `Third age amulet`, filename: `3a_amulet`}
						, {name: `Third age platelegs`, filename: `3a_melee_legs`}
						, {name: `Third age platebody`, filename: `3a_melee_top`}
						, {name: `Third age full helmet`, filename: `3a_melee_helm`}
						, {name: `Third age kiteshield`, filename: `3a_kiteshield`}
					]
					, border: {
						solveStats: {
							width: 90
							, height: 240
						}, breakdown: {
							width: 540
							, height: 275
						}, coefficient: {
							width: 72.5
							, height: 425
						}, image: {
							width: 1495
							, height: 190
						}, drops: {
							height: 650
						}
					}, frostNibble: {
						left: {
							width: 65
						}
						, right: {
							width: 1565
						}
					}
					, titles: {
						solveStats: {
							x: 185
							, y: 193
						}
						, breakdown: {
							x: 850
							, y: 193
						}
						, spoonageCoefficient: {
							x: 140
							, y: 375
						}
					}
				});
				breakdownList.set(2, {maxWidth: 2000, borderPath: `.\\images\\Clues\\Elite_Clues_Border.png`, userClueCount: userInfo[0].eliteClueCount, tier: 'elite', dropRate: 330, coefficientText: `Ice, 3a and Blood dyes & druidic`
					, filterClues: filter => filter.filter(filter => filter.name.includes('Third age druidic') || ['Ice dye', 'Third age dye', 'Blood dye'].includes(filter.name))
					, items: [
						{name: 'Barrows dye', searchString: 'Barrows dye', dropRate: 1329, color: '#b6d7a8'}
						, {name: 'Shadow dye', searchString: 'Shadow dye', dropRate: 2180, color: '#d5a6bd'}
						, {name: 'Ice dye', searchString: 'Ice dye', dropRate: 1661, color: '#c9daf8'}
						, {name: 'Third age dye', searchString: 'Third age dye', dropRate: 6937, color: '#cccccc'}
						, {name: 'Blood dye', searchString: 'Blood dye', dropRate: 6937, color: '#ea9999'}
						, {name: 'Backstab cape', searchString: 'Backstab cape', dropRate: 2062, color: '#e6b8af'}
						, {name: 'Sack of effigies', searchString: 'Sack of effigies', dropRate: 4022, color: '#efefef'}
						, {name: 'Third age druidic piece', searchString: 'Third age druidic', dropRate: 5054, color: '#ffe599'}
					], images: [
						{name: `Sack of effigies`, filename: `sack_of_effigies`}
						, {name: `Backstab cape`, filename: `backstab_cape`}
						, {name: `Barrows dye`, filename: `barrows_dye`}
						, {name: `Shadow dye`, filename: `shadow_dye`}
						, {name: `Ice dye`, filename: `ice_dye`}
						, {name: `Third age dye`, filename: `third_age_dye`}
						, {name: `Blood dye`, filename: `blood_dye`}
						, {name: `Third age druidic staff`, filename: `druidic_staff`}
						, {name: `Third age druidic cloak`, filename: `druidic_cloak`}
						, {name: `Third age druidic wreath`, filename: `druidic_wreath`}
						, {name: `Third age druidic robe top`, filename: `druidic_top`}
						, {name: `Third age druidic robe bottom`, filename: `druidic_bottom`}
					]
					, border: {
						solveStats: {
							width: 100
							, height: 235
						}, breakdown: {
							width: 517
							, height: 240
						}, coefficient: {
							width: 90
							, height: 405
						}, image: {
							width: 1505
							, height: 234
						}, drops: {
							height: 630
						}
					}, frostNibble: {
						left: {
							width: 10
						}
						, right: {
							width: 1510
						}
					}
					, titles: {
						solveStats: {
							x: 185
							, y: 185
						}
						, breakdown: {
							x: 850
							, y: 185
						}
						, spoonageCoefficient: {
							x: 140
							, y: 358
						}
					}
				});
				breakdownList.set(3, {maxWidth: 2200, borderPath: `./images/Clues/Master_Clues_Border.png`, userClueCount: userInfo[0].masterClueCount, tier: 'master', dropRate: 281, coefficientText: `Ice/3a/Blood dyes & 2nd age & OSH`
					, filterClues: filter => filter.filter(filter => filter.name.includes('Second-Age') || ['Ice dye', 'Third age dye', 'Blood dye', `Orlando Smith's hat`].includes(filter.name))
					, items: [
						{name: 'Barrows dye', searchString: 'Barrows dye', dropRate: 1072, color: '#b6d7a8'}
						, {name: 'Shadow dye', searchString: 'Shadow dye', dropRate: 1958, color: '#d5a6bd'}
						, {name: 'Ice dye', searchString: 'Ice dye', dropRate: 1378, color: '#c9daf8'}
						, {name: 'Third age dye', searchString: 'Third age dye', dropRate: 5945, color: '#cccccc'}
						, {name: 'Blood dye', searchString: 'Blood dye', dropRate: 6294, color: '#ea9999'}
						, {name: 'Backstab cape', searchString: 'Backstab cape', dropRate: 2159, color: '#e6b8af'}
						, {name: 'Sack of effigies', searchString: 'Sack of effigies', dropRate: 4246, color: '#efefef'}
						, {name: 'Second-Age piece', searchString: 'Second-Age', dropRate: 3497, color: '#ffe599'}
						, {name: `Orlando Smith's hat`, searchString: `Orlando Smith's hat`, dropRate: 12588, color: '#dd7e6b'}
					], images: [
						{name: `Sack of effigies`, filename: `sack_of_effigies`}
						, {name: `Backstab cape`, filename: `backstab_cape`}
						, {name: `Barrows dye`, filename: `barrows_dye`}
						, {name: `Shadow dye`, filename: `shadow_dye`}
						, {name: `Ice dye`, filename: `ice_dye`}
						, {name: `Third age dye`, filename: `third_age_dye`}
						, {name: `Blood dye`, filename: `blood_dye`}
						, {name: `Second-Age full helm`, filename: `2a_melee_helm`}
						, {name: `Second-Age platebody`, filename: `2a_melee_body`}
						, {name: `Second-Age platelegs`, filename: `2a_melee_legs`}
						, {name: `Second-Age sword`, filename: `2a_melee_sword`}
						, {name: `Second-Age mage mask`, filename: `2a_mage_helm`}
						, {name: `Second-Age robe top`, filename: `2a_mage_body`}
						, {name: `Second-Age robe bottom`, filename: `2a_mage_legs`}
						, {name: `Second-Age staff`, filename: `2a_mage_staff`}
						, {name: `Second-Age range coif`, filename: `2a_range_coif`}
						, {name: `Second-Age range top`, filename: `2a_range_body`}
						, {name: `Second-Age range legs`, filename: `2a_range_legs`}
						, {name: `Second-Age bow`, filename: `2a_range_bow`}
						, {name: `Orlando Smith's hat`, filename: `orlando_smith_hat`}
					]
					, border: {
						solveStats: {
							width: 85
							, height: 255
						}, breakdown: {
							width: 545
							, height: 260
						}, coefficient: {
							width: 68
							, height: 455
						}, image: {
							width: 1570
							, height: 210
						}, drops: {
							height: 685
						}
					}, frostNibble: {
						left: {
							width: 80
						}
						, right: {
							width: 1630
						}
					}
					, titles: {
						solveStats: {
							x: 185
							, y: 203
						}
						, breakdown: {
							x: 850
							, y: 203
						}
						, spoonageCoefficient: {
							x: 140
							, y: 395
						}
					}
				});


				// breakdownList.set(1, {maxWidth: 2100, borderPath: `./images/Clues/Hard_Clues_Border.png`, userClueCount: userInfo[0].hardClueCount, tier: 'hard', dropRate: 453, coefficientText: `Barrows/shadow dyes + 3a + barrel`,
				// 	filterClues: filterClues = filter => filter.filter(filter => filter.name.includes('Third age') || ['Barrows dye', 'Shadow dye', 'Explosive barrel'].includes(filter.name))
				// 	, items: [
				// 		{name: 'Barrows dye', searchString: 'Barrows dye', dropRate: 1138, color: '#b6d7a8'}
				// 		, {name: 'Shadow dye', searchString: 'Shadow dye', dropRate: 2048, color: '#d5a6bd'}
				// 		, {name: 'Backstab cape', searchString: 'Backstab cape', dropRate: 3073, color: '#e6b8af'}
				// 		, {name: 'Sack of effigies', searchString: 'Sack of effigies', dropRate: 6145, color: '#efefef'}
				// 		, {name: 'Third age piece', searchString: 'Third age', dropRate: 2253, color: '#ffe599'}
				// 		, {name: 'Explosive barrel', searchString: 'Explosive barrel', dropRate: 25248, color: '#dd7e6b'}
				// 	], images: [
				// 		{name: `Explosive barrel`, filename: `explosive_barrel`}
				// 		, {name: `Sack of effigies`, filename: `sack_of_effigies`}
				// 		, {name: `Backstab cape`, filename: `backstab_cape`}
				// 		, {name: `Barrows dye`, filename: `barrows_dye`}
				// 		, {name: `Shadow dye`, filename: `shadow_dye`}
				// 		, {name: `Third age ranger coif`, filename: `3a_coif`}
				// 		, {name: `Third age ranger body`, filename: `3a_range_top`}
				// 		, {name: `Third age ranger chaps`, filename: `3a_range_legs`}
				// 		, {name: `Third age vambraces`, filename: `3a_range_vambraces`}
				// 		, {name: `Third age robe top`, filename: `3a_mage_top`}
				// 		, {name: `Third age robe`, filename: `3a_mage_legs`}
				// 		, {name: `Third age mage hat`, filename: `3a_mage_hat`}
				// 		, {name: `Third age amulet`, filename: `3a_amulet`}
				// 		, {name: `Third age platelegs`, filename: `3a_melee_legs`}
				// 		, {name: `Third age platebody`, filename: `3a_melee_top`}
				// 		, {name: `Third age full helmet`, filename: `3a_melee_helm`}
				// 		, {name: `Third age kiteshield`, filename: `3a_kiteshield`}
				// 	]
				// 	, border: {
				// 		solveStats: {
				// 			width: 90
				// 			, height: 240
				// 		}, breakdown: {
				// 			width: 540
				// 			, height: 275
				// 		}, coefficient: {
				// 			width: 72.5
				// 			, height: 425
				// 		}, image: {
				// 			width: 1495
				// 			, height: 190
				// 		}, drops: {
				// 			height: 650
				// 		}
				// 	}, frostNibble: {
				// 		left: {
				// 			width: 65
				// 		}
				// 		, right: {
				// 			width: 1565
				// 		}
				// 	}
				// 	, titles: {
				// 		solveStats: {
				// 			x: 185
				// 			, y: 193
				// 		}
				// 		, breakdown: {
				// 			x: 850
				// 			, y: 193
				// 		}
				// 		, spoonageCoefficient: {
				// 			x: 140
				// 			, y: 375
				// 		}
				// 	}
				// });
				// breakdownList.set(2, {maxWidth: 2000, borderPath: `.\\images\\Clues\\Elite_Clues_Border.png`, userClueCount: userInfo[0].eliteClueCount, tier: 'elite', dropRate: 330, coefficientText: `Ice, 3a and Blood dyes & druidic`
				// 	, filterClues: filterClues = filter => filter.filter(filter => filter.name.includes('Third age druidic') || ['Ice dye', 'Third age dye', 'Blood dye'].includes(filter.name))
				// 	, items: [
				// 		{name: 'Barrows dye', searchString: 'Barrows dye', dropRate: 1301, color: '#b6d7a8'}
				// 		, {name: 'Shadow dye', searchString: 'Shadow dye', dropRate: 2134, color: '#d5a6bd'}
				// 		, {name: 'Ice dye', searchString: 'Ice dye', dropRate: 1626, color: '#c9daf8'}
				// 		, {name: 'Third age dye', searchString: 'Third age dye', dropRate: 6791, color: '#cccccc'}
				// 		, {name: 'Blood dye', searchString: 'Blood dye', dropRate: 6791, color: '#ea9999'}
				// 		, {name: 'Backstab cape', searchString: 'Backstab cape', dropRate: 2019, color: '#e6b8af'}
				// 		, {name: 'Sack of effigies', searchString: 'Sack of effigies', dropRate: 3937, color: '#efefef'}
				// 		, {name: 'Third age druidic piece', searchString: 'Third age druidic', dropRate: 4948, color: '#ffe599'}
				// 	], images: [
				// 		{name: `Sack of effigies`, filename: `sack_of_effigies`}
				// 		, {name: `Backstab cape`, filename: `backstab_cape`}
				// 		, {name: `Barrows dye`, filename: `barrows_dye`}
				// 		, {name: `Shadow dye`, filename: `shadow_dye`}
				// 		, {name: `Ice dye`, filename: `ice_dye`}
				// 		, {name: `Third age dye`, filename: `third_age_dye`}
				// 		, {name: `Blood dye`, filename: `blood_dye`}
				// 		, {name: `Third age druidic staff`, filename: `druidic_staff`}
				// 		, {name: `Third age druidic cloak`, filename: `druidic_cloak`}
				// 		, {name: `Third age druidic wreath`, filename: `druidic_wreath`}
				// 		, {name: `Third age druidic robe top`, filename: `druidic_top`}
				// 		, {name: `Third age druidic robe bottom`, filename: `druidic_bottom`}
				// 	]
				// 	, border: {
				// 		solveStats: {
				// 			width: 100
				// 			, height: 235
				// 		}, breakdown: {
				// 			width: 517
				// 			, height: 240
				// 		}, coefficient: {
				// 			width: 90
				// 			, height: 405
				// 		}, image: {
				// 			width: 1505
				// 			, height: 234
				// 		}, drops: {
				// 			height: 630
				// 		}
				// 	}, frostNibble: {
				// 		left: {
				// 			width: 10
				// 		}
				// 		, right: {
				// 			width: 1510
				// 		}
				// 	}
				// 	, titles: {
				// 		solveStats: {
				// 			x: 185
				// 			, y: 185
				// 		}
				// 		, breakdown: {
				// 			x: 850
				// 			, y: 185
				// 		}
				// 		, spoonageCoefficient: {
				// 			x: 140
				// 			, y: 358
				// 		}
				// 	}
				// });
				// breakdownList.set(3, {maxWidth: 2200, borderPath: `./images/Clues/Master_Clues_Border.png`, userClueCount: userInfo[0].masterClueCount, tier: 'master', dropRate: 281, coefficientText: `Ice/3a/Blood dyes & 2nd age & OSH`
				// 	, filterClues: filterClues = filter => filter.filter(filter => filter.name.includes('Second-Age') || ['Ice dye', 'Third age dye', 'Blood dye', `Orlando Smith's hat`].includes(filter.name))
				// 	, items: [
				// 		{name: 'Barrows dye', searchString: 'Barrows dye', dropRate: 1072, color: '#b6d7a8'}
				// 		, {name: 'Shadow dye', searchString: 'Shadow dye', dropRate: 1958, color: '#d5a6bd'}
				// 		, {name: 'Ice dye', searchString: 'Ice dye', dropRate: 1378, color: '#c9daf8'}
				// 		, {name: 'Third age dye', searchString: 'Third age dye', dropRate: 5945, color: '#cccccc'}
				// 		, {name: 'Blood dye', searchString: 'Blood dye', dropRate: 6294, color: '#ea9999'}
				// 		, {name: 'Backstab cape', searchString: 'Backstab cape', dropRate: 2159, color: '#e6b8af'}
				// 		, {name: 'Sack of effigies', searchString: 'Sack of effigies', dropRate: 4246, color: '#efefef'}
				// 		, {name: 'Second-Age piece', searchString: 'Second-Age', dropRate: 3497, color: '#ffe599'}
				// 		, {name: `Orlando Smith's hat`, searchString: `Orlando Smith's hat`, dropRate: 12588, color: '#dd7e6b'}
				// 	], images: [
				// 		{name: `Sack of effigies`, filename: `sack_of_effigies`}
				// 		, {name: `Backstab cape`, filename: `backstab_cape`}
				// 		, {name: `Barrows dye`, filename: `barrows_dye`}
				// 		, {name: `Shadow dye`, filename: `shadow_dye`}
				// 		, {name: `Ice dye`, filename: `ice_dye`}
				// 		, {name: `Third age dye`, filename: `third_age_dye`}
				// 		, {name: `Blood dye`, filename: `blood_dye`}
				// 		, {name: `Second-Age full helm`, filename: `2a_melee_helm`}
				// 		, {name: `Second-Age platebody`, filename: `2a_melee_body`}
				// 		, {name: `Second-Age platelegs`, filename: `2a_melee_legs`}
				// 		, {name: `Second-Age sword`, filename: `2a_melee_sword`}
				// 		, {name: `Second-Age mage mask`, filename: `2a_mage_helm`}
				// 		, {name: `Second-Age robe top`, filename: `2a_mage_body`}
				// 		, {name: `Second-Age robe bottom`, filename: `2a_mage_legs`}
				// 		, {name: `Second-Age staff`, filename: `2a_mage_staff`}
				// 		, {name: `Second-Age range coif`, filename: `2a_range_coif`}
				// 		, {name: `Second-Age range top`, filename: `2a_range_body`}
				// 		, {name: `Second-Age range legs`, filename: `2a_range_legs`}
				// 		, {name: `Second-Age bow`, filename: `2a_range_bow`}
				// 		, {name: `Orlando Smith's hat`, filename: `orlando_smith_hat`}
				// 	]
				// 	, border: {
				// 		solveStats: {
				// 			width: 85
				// 			, height: 255
				// 		}, breakdown: {
				// 			width: 545
				// 			, height: 260
				// 		}, coefficient: {
				// 			width: 68
				// 			, height: 455
				// 		}, image: {
				// 			width: 1570
				// 			, height: 210
				// 		}, drops: {
				// 			height: 685
				// 		}
				// 	}, frostNibble: {
				// 		left: {
				// 			width: 80
				// 		}
				// 		, right: {
				// 			width: 1630
				// 		}
				// 	}
				// 	, titles: {
				// 		solveStats: {
				// 			x: 185
				// 			, y: 203
				// 		}
				// 		, breakdown: {
				// 			x: 850
				// 			, y: 203
				// 		}
				// 		, spoonageCoefficient: {
				// 			x: 140
				// 			, y: 395
				// 		}
				// 	}
				// });

				//breakdown const values
				const padding = 15;
				const lineWidth = 5;
				const highlightPadding = 0.35;
				const breakdownHeaderTextSize = 25;
				const breakdownTextSize = 23;
				const expectedBreakdownTextSize = 20;
				const white = '#ffffff';
				const black = '#000000';
				const lightPurple = '#e0a8f9';
				const ivory = "#fcf7e4";
				const imageWidth = 92;
				const imageHeight = 84;

				//loading custom fonts
				GlobalFonts.registerFromPath(`.\\Fonts\\Nunito\\Nunito-VariableFont_wght.ttf`, 'Nunito');
				GlobalFonts.registerFromPath(`.\\Fonts\\DM_Sans\\DMSans-VariableFont_opsz,wght.ttf`, 'DM');
				GlobalFonts.registerFromPath(`.\\Fonts\\Karla\\Karla-VariableFont_wght.ttf`, 'Karla');
				GlobalFonts.registerFromPath(`.\\Fonts\\Ephesis\\Ephesis-Regular.ttf`, 'Ephesis');
				GlobalFonts.registerFromPath(`.\\Fonts\\Bungee\\Bungee-Regular.ttf`, 'Bungee');
				GlobalFonts.registerFromPath(`.\\Fonts\\Amatic_SC\\AmaticSC-Regular.ttf`, 'AmaticSC');
				GlobalFonts.registerFromPath(`.\\Fonts\\Monoton\\Monoton-Regular.ttf`, 'Monoton');
				GlobalFonts.registerFromPath(`.\\Fonts\\Satisfy\\Satisfy-Regular.ttf`, 'Satisfy');
				GlobalFonts.registerFromPath(`.\\Fonts\\Aladin\\Aladin-Regular.ttf`, 'Aladin');
				GlobalFonts.registerFromPath(`.\\Fonts\\Grand_Hotel\\GrandHotel-Regular.ttf`, 'GrandHotel');
				GlobalFonts.registerFromPath(`.\\Fonts\\Monofett\\Monofett-Regular.ttf`, 'Monofett');
				GlobalFonts.registerFromPath(`.\\Fonts\\runescape_uf\\runescape_uf.ttf`, 'runescape');
				GlobalFonts.registerFromPath(`.\\Fonts\\Nabla\\static\\Nabla-Regular.ttf`, 'Nabla');
				GlobalFonts.registerFromPath(`.\\Fonts\\Concert_One\\ConcertOne-Regular.ttf`, 'Concert_One');
				GlobalFonts.registerFromPath(`.\\Fonts\\Cinzel\\Cinzel-VariableFont_wght.ttf`, 'Cinzel');
				GlobalFonts.registerFromPath(`.\\Fonts\\Macondo\\Macondo-Regular.ttf`, 'Macondo');
				GlobalFonts.registerFromPath(`.\\Fonts\\Oswald\\Oswald-VariableFont_wght.ttf`, 'Oswald');
				GlobalFonts.registerFromPath(`.\\Fonts\\Rowdies\\Rowdies-Regular.ttf`, 'Rowdies');
				
				if (selectedTier) {
					if (selectedTier == 1 && userInfo[0].hardClueCount == null) {
						await interaction.editReply({
							content: `${username} has not submitted any hard clue data!`
						});
						break;
					}
					if (selectedTier == 2 && userInfo[0].eliteClueCount == null) {
						await interaction.editReply({
							content: `${username} has not submitted any elite clue data!`
						});
						break;
					}
					if (selectedTier == 3 && userInfo[0].masterClueCount == null) {
						await interaction.editReply({
							content: `${username} has not submitted any master clue data!`
						});
						break;
					}
					const imageArray = [];
					imageArray.push(Canvas.loadImage(`.\\images\\Clues\\Background.jpg`));
					imageArray.push(Canvas.loadImage(breakdownList.get(selectedTier).borderPath));
					let dyeArray = ['Barrows_Dye', 'Shadow_Dye', 'Ice_Dye', '3a_Dye', 'Blood_Dye', 'Aurora_Dye', 'Soul_Dye'];
					let randomDye = general.getRandomInt(0, dyeArray.length);
					let randomDye2 = general.getRandomInt(0, dyeArray.length);
					imageArray.push(Canvas.loadImage(`./images/Clues/Mune_${dyeArray[randomDye2]}_left.png`));
					imageArray.push(Canvas.loadImage(`./images/Clues/Mune_${dyeArray[randomDye]}_right.png`));
					for (let i = 0; i < breakdownList.get(selectedTier).images.length; i++) {
						let text = output.filter(text => text.name == breakdownList.get(selectedTier).images[i%breakdownList.get(selectedTier).images.length].name).length.toString();
						let litUnlit = text == '0' ? 'unlit' : 'lit';
						imageArray.push(Canvas.loadImage(`.\\images\\Clues\\${breakdownList.get(selectedTier).images[i%breakdownList.get(selectedTier).images.length].filename}_${litUnlit}.png`));
					}
					var canvas = Canvas.createCanvas(500, 500);
					var context = canvas.getContext('2d');
					// const mainHeaderFont = 'Monofett';
					const mainHeaderFont = 'Cinzel';
					const headerFont = 'Nunito';
					const bodyFont = 'Karla';
					// var rightPadding = -100;

					//new width height math
					//title
					// let currentFont = `${headerTextSize}px ${mainHeaderFont}`
					let currentFont = `69px ${mainHeaderFont}`
					context.font = currentFont;
					let text = `${username}'s ${breakdownList.get(selectedTier).tier} clues`;
					var canvasTitle = {
						max: {
							height: context.measureText(text).actualBoundingBoxAscent
							, width: context.measureText(text).width
						}
						, text: {
							text: text
							, font: currentFont
							, color: ivory
							, height: context.measureText(text).actualBoundingBoxAscent
							, width: context.measureText(text).width
						}
					};
					canvasTitle.max.width += padding * 2;
					canvasTitle.max.height += padding * 2;

					//solve stats
					//solve stats section
					filteredOutput = output.filter(filter => filter.tier == selectedTier);
					currentFont = `${breakdownTextSize}px ${bodyFont}`;
					context.font = currentFont;
					text = `Opened: ${breakdownList.get(selectedTier).userClueCount ? general.numberWithCommas(breakdownList.get(selectedTier).userClueCount) : 0}`;
					let solvedTextDimensions = context.measureText(text);
					let solveStatsSection = {
						max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}
						, output: [{max: {width: solvedTextDimensions.width, height: solvedTextDimensions.actualBoundingBoxAscent}, text: [
							{text: `Opened: `, color: white, font: currentFont, width: context.measureText(`Opened: `).width, height: context.measureText(`Opened: `).actualBoundingBoxAscent}
							, {text: breakdownList.get(selectedTier).userClueCount ? general.numberWithCommas(breakdownList.get(selectedTier).userClueCount) : `0`, color: lightPurple, font: currentFont, width: context.measureText(breakdownList.get(selectedTier).userClueCount ? general.numberWithCommas(breakdownList.get(selectedTier).userClueCount) : `0`).width, height: context.measureText(breakdownList.get(selectedTier).userClueCount ? general.numberWithCommas(breakdownList.get(selectedTier).userClueCount) : `0`).actualBoundingBoxAscent}
						]}]
					};
					solveStatsSection.max.width = Math.max(solvedTextDimensions.width, solveStatsSection.max.width);
					solveStatsSection.max.height += solvedTextDimensions.actualBoundingBoxAscent + padding;
					text = `Current Droprate: 1/${output.filter(drops => drops.tier == selectedTier).length == 0 ? 0 : general.numberWithCommas(Math.ceil(breakdownList.get(selectedTier).userClueCount/output.filter(drops => drops.tier == selectedTier).length))}`;
					let currentDropRateDimensions = context.measureText(text);
					solveStatsSection.output.push(
						{max: {width: currentDropRateDimensions.width, height: currentDropRateDimensions.actualBoundingBoxAscent}, text: [
							{text: `Current Droprate: `, color: white, font: currentFont, width: context.measureText(`Current Droprate: `).width, height: context.measureText(`Current Droprate: `).actualBoundingBoxAscent}
							, {text: `${output.filter(drops => drops.tier == selectedTier).length == 0 ? `0` : `1`}/${output.filter(drops => drops.tier == selectedTier).length == 0 ? `0` : general.numberWithCommas(Math.ceil(breakdownList.get(selectedTier).userClueCount/output.filter(drops => drops.tier == selectedTier).length))}`, color: getColorScale(Math.round(breakdownList.get(selectedTier).userClueCount), output.filter(drops => drops.tier == selectedTier).length, breakdownList.get(selectedTier).dropRate), font: currentFont, width: context.measureText(`1/${output.filter(drops => drops.tier == selectedTier).length == 0 ? `0` : general.numberWithCommas(Math.ceil(breakdownList.get(selectedTier).userClueCount/output.filter(drops => drops.tier == selectedTier).length))}`).width, height: context.measureText(`1/${output.filter(drops => drops.tier == selectedTier).length == 0 ? `0` : general.numberWithCommas(Math.ceil(breakdownList.get(selectedTier).userClueCount/output.filter(drops => drops.tier == selectedTier).length))}`).actualBoundingBoxAscent}
						]});
					solveStatsSection.max.width = Math.max(currentDropRateDimensions.width, solveStatsSection.max.width);
					solveStatsSection.max.height += currentDropRateDimensions.actualBoundingBoxAscent + padding;
					text = `Expected Rates: 1/${breakdownList.get(selectedTier).dropRate.toString()}`;
					let expectedRatesDimensions = context.measureText(text);
					solveStatsSection.output.push(
						{max: {width: expectedRatesDimensions.width, height: expectedRatesDimensions.actualBoundingBoxAscent}, text: [
							{text: `Expected Rates: `, color: white, font: currentFont, width: context.measureText(`Expected Rates: `).width, height: context.measureText(`Expected Rates: `).actualBoundingBoxAscent}
							, {text: `1/${breakdownList.get(selectedTier).dropRate.toString()}`, color: lightPurple, font: currentFont, width: context.measureText(`1/${breakdownList.get(selectedTier).dropRate.toString()}`).width, height: context.measureText(`1/${breakdownList.get(selectedTier).dropRate.toString()}`).actualBoundingBoxAscent}
						]});
					solveStatsSection.max.width = Math.max(expectedRatesDimensions.width, solveStatsSection.max.width);
					solveStatsSection.max.height += expectedRatesDimensions.actualBoundingBoxAscent + padding;
					solveStatsSection.max.width += padding * 2;
					solveStatsSection.max.height += padding * 3;

					currentFont = `${breakdownHeaderTextSize}px ${headerFont}`
					context.font = currentFont;
					text = `Item`;
					let breakdownSection = {
						max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}
						, output: []
					};
					breakdownSection.itemColumn = {max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}};
					text = `# Received`;
					breakdownSection.receivedColumn = {max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}};
					text = `# Expected`;
					breakdownSection.expectedColumn = {max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}};
					text = `Current Droprate`;
					breakdownSection.currentDroprateColumn = {max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}};
					text = `Expected Droprate`;
					breakdownSection.expectedDroprateColumn = {max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}};
					breakdownSection.output.push({height: Math.max(context.measureText(`# Received`).actualBoundingBoxAscent, context.measureText(`# Expected`).actualBoundingBoxAscent, context.measureText(`Current Droprate`).actualBoundingBoxAscent, context.measureText(`Expected Droprate`).actualBoundingBoxAscent, context.measureText(`Item`).actualBoundingBoxAscent), text: [
						{text: `Item`, width: context.measureText(`Item`).width, height: context.measureText(`Item`).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: `# Received`, width: context.measureText(`# Received`).width, height: context.measureText(`# Received`).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: `# Expected`, width: context.measureText(`# Expected`).width, height: context.measureText(`# Expected`).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: `Current Droprate`, width: context.measureText(`Current Droprate`).width, height: context.measureText(`Current Droprate`).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: `Expected Droprate`, width: context.measureText(`Expected Droprate`).width, height: context.measureText(`Expected Droprate`).actualBoundingBoxAscent, font: currentFont, color: white}
					]});
					breakdownSection.max.height += padding + Math.max(context.measureText(`# Received`).actualBoundingBoxAscent, context.measureText(`# Expected`).actualBoundingBoxAscent, context.measureText(`Current Droprate`).actualBoundingBoxAscent, context.measureText(`Expected Droprate`).actualBoundingBoxAscent, context.measureText(`Item`).actualBoundingBoxAscent);
					
					currentFont = `${breakdownTextSize}px ${bodyFont}`
					context.font = currentFont;
					breakdownList.get(selectedTier).items.forEach((value, key) => {
						let itemName = value.name;
						let itemNameMeasure = context.measureText(itemName);
						let filteredResults = filteredOutput.filter(filter => filter.name.includes(value.searchString));
						let received = filteredResults.length;
						let receivedMeasure = context.measureText(received.toString());
						let expected = (breakdownList.get(selectedTier).userClueCount/value.dropRate).toFixed(2);
						let expectedMeasure = context.measureText(expected);
						let currentDroprate = `${filteredResults.length == 0 ? `0` : `1`}:${filteredResults.length == 0 ? general.numberWithCommas(value.dropRate) : general.numberWithCommas(Math.round(breakdownList.get(selectedTier).userClueCount/received))}`;
						let currentDroprateMeasure = context.measureText(currentDroprate);
						var expectedDroprate = `(1:${general.numberWithCommas(value.dropRate)})`;
						let expectedDroprateMeasure = context.measureText(expectedDroprate);
						let backgroundColor = getColorScale(breakdownList.get(selectedTier).userClueCount, filteredResults.length, value.dropRate);
						breakdownSection.output.push({backgroundColor: backgroundColor, height: Math.max(itemNameMeasure.actualBoundingBoxAscent, receivedMeasure.actualBoundingBoxAscent, expectedMeasure.actualBoundingBoxAscent, currentDroprateMeasure.actualBoundingBoxAscent, expectedDroprateMeasure.actualBoundingBoxAscent), text: [
							{text: itemName, color: black, font: currentFont, width: itemNameMeasure.width, height: itemNameMeasure.actualBoundingBoxAscent}
							, {text: received.toString(), color: black, font: currentFont, width: receivedMeasure.width, height: receivedMeasure.actualBoundingBoxAscent}
							, {text: expected, color: black, font: currentFont, width: expectedMeasure.width, height: expectedMeasure.actualBoundingBoxAscent}
							, {text: currentDroprate, color: black, font: currentFont, width: currentDroprateMeasure.width, height: currentDroprateMeasure.actualBoundingBoxAscent}
							, {text: expectedDroprate, color: white, font: currentFont, width: expectedDroprateMeasure.width, height: expectedDroprateMeasure.actualBoundingBoxAscent}
						]});
						breakdownSection.itemColumn.max.width = Math.max(itemNameMeasure.width, breakdownSection.itemColumn.max.width)
						breakdownSection.receivedColumn.max.width = Math.max(receivedMeasure.width, breakdownSection.receivedColumn.max.width)
						breakdownSection.expectedColumn.max.width = Math.max(expectedMeasure.width, breakdownSection.expectedColumn.max.width)
						breakdownSection.currentDroprateColumn.max.width = Math.max(currentDroprateMeasure.width, breakdownSection.currentDroprateColumn.max.width)
						breakdownSection.expectedDroprateColumn.max.width = Math.max(expectedDroprateMeasure.width, breakdownSection.expectedDroprateColumn.max.width)
						breakdownSection.max.height += padding + Math.max(itemNameMeasure.actualBoundingBoxAscent, receivedMeasure.actualBoundingBoxAscent, expectedMeasure.actualBoundingBoxAscent, currentDroprateMeasure.actualBoundingBoxAscent, expectedDroprateMeasure.actualBoundingBoxAscent);
					});

					//breakdown total row
					currentFont = `${breakdownTextSize}px ${bodyFont}`
					context.font = currentFont;
					let itemText = `Total`;
					let receivedText = filteredOutput.length;
					let expectedText = breakdownList.get(selectedTier).userClueCount/breakdownList.get(selectedTier).dropRate;
					let currentDropRate = `${filteredOutput.length == 0 ? 0: 1}:${Math.round(filteredOutput.length == 0 ? breakdownList.get(selectedTier).userClueCount ? breakdownList.get(selectedTier).userClueCount : 0 : breakdownList.get(selectedTier).userClueCount/filteredOutput.length)}`;
					let expectedDropRate = `1:${breakdownList.get(selectedTier).dropRate}`;
					breakdownSection.output.push({height: Math.max(context.measureText(receivedText.toString()).actualBoundingBoxAscent, context.measureText(expectedText.toFixed(2)).actualBoundingBoxAscent, context.measureText(currentDropRate).actualBoundingBoxAscent, context.measureText(`Expected Droprate`).actualBoundingBoxAscent, context.measureText(itemText).actualBoundingBoxAscent), text: [
						{text: itemText, width: context.measureText(itemText).width, height: context.measureText(itemText).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: receivedText.toString(), width: context.measureText(receivedText.toString()).width, height: context.measureText(receivedText.toString()).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: expectedText.toFixed(2), width: context.measureText(expectedText.toFixed(2)).width, height: context.measureText(expectedText.toFixed(2)).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: currentDropRate, width: context.measureText(currentDropRate).width, height: context.measureText(currentDropRate).actualBoundingBoxAscent, font: currentFont, color: white}
						, {text: expectedDropRate, width: context.measureText(expectedDropRate).width, height: context.measureText(expectedDropRate).actualBoundingBoxAscent, font: currentFont, color: white}
					]});
					breakdownSection.itemColumn.max.width = Math.max(context.measureText(itemText).width, breakdownSection.itemColumn.max.width)
					breakdownSection.receivedColumn.max.width = Math.max(context.measureText(receivedText.toString()).width, breakdownSection.receivedColumn.max.width)
					breakdownSection.expectedColumn.max.width = Math.max(context.measureText(expectedText.toFixed(2)).width, breakdownSection.expectedColumn.max.width)
					breakdownSection.currentDroprateColumn.max.width = Math.max(context.measureText(currentDropRate).width, breakdownSection.currentDroprateColumn.max.width)
					breakdownSection.expectedDroprateColumn.max.width = Math.max(context.measureText(expectedDropRate).width, breakdownSection.expectedDroprateColumn.max.width)
					breakdownSection.max.height += padding + Math.max(context.measureText(receivedText.toString()).actualBoundingBoxAscent, context.measureText(expectedText.toFixed(2)).actualBoundingBoxAscent, context.measureText(currentDropRate).actualBoundingBoxAscent, context.measureText(expectedDropRate).actualBoundingBoxAscent, context.measureText(itemText).actualBoundingBoxAscent);

					breakdownSection.max.width = padding + breakdownSection.itemColumn.max.width + padding + breakdownSection.receivedColumn.max.width + padding + breakdownSection.expectedColumn.max.width + padding + breakdownSection.currentDroprateColumn.max.width + padding + breakdownSection.expectedDroprateColumn.max.width + padding;
					breakdownSection.max.height += padding * 3;

					// 	//spoonage display text
					context.font = `${breakdownTextSize}px ${bodyFont}`;
					text = breakdownList.get(selectedTier).coefficientText;
					let spoonageCoefficient = {
						max: {width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}
						, output: [{width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent, text: [{text: text, font: `${breakdownHeaderTextSize}px ${headerFont}`, color: white, width: context.measureText(text).width, height: context.measureText(text).actualBoundingBoxAscent}]}]
					};
					spoonageCoefficient.max.width = Math.max(spoonageCoefficient.max.width, context.measureText(text).width);
					spoonageCoefficient.max.height += context.measureText(text).actualBoundingBoxAscent + padding;

					//solve stats math
					let onLog = breakdownList.get(selectedTier).filterClues(filteredOutput); 
					var expectedItems = breakdownList.get(selectedTier).filterClues(breakdownList.get(selectedTier).items);
					var expectedCount = 0;
					expectedItems.forEach(item => {
						expectedCount += (1/item.dropRate);
					});
					var expectedCountPerItem = 1/expectedCount;
					expectedCount = (breakdownList.get(selectedTier).userClueCount/expectedCountPerItem).toFixed(2);

					//# on log
					text = `# on log: ${onLog.length}`;
					let textPart1 = `# on log: `;
					let textPart2 = onLog.length.toString();
					spoonageCoefficient.output.push({
						width: context.measureText(text).width
						, height: context.measureText(text).actualBoundingBoxAscent
						, text: [
							{text: textPart1, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: white, width: context.measureText(textPart1).width, height: context.measureText(textPart1).actualBoundingBoxAscent}
							, {text: textPart2, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: lightPurple, width: context.measureText(textPart2).width, height: context.measureText(textPart2).actualBoundingBoxAscent}
						]
					});
					spoonageCoefficient.max.width = Math.max(spoonageCoefficient.max.width, context.measureText(text).width);
					spoonageCoefficient.max.height += context.measureText(text).actualBoundingBoxAscent + padding;

					//# expected
					text = `# expected: ${general.numberWithCommas(expectedCount)}`;
					textPart1 = `# expected: `;
					textPart2 = general.numberWithCommas(expectedCount);
					spoonageCoefficient.output.push({
						width: context.measureText(text).width
						, height: context.measureText(text).actualBoundingBoxAscent
						, text: [
							{text: textPart1, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: white, width: context.measureText(textPart1).width, height: context.measureText(textPart1).actualBoundingBoxAscent}
							, {text: textPart2, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: lightPurple, width: context.measureText(textPart2).width, height: context.measureText(textPart2).actualBoundingBoxAscent}
						]
					});
					spoonageCoefficient.max.width = Math.max(spoonageCoefficient.max.width, context.measureText(text).width);
					spoonageCoefficient.max.height += context.measureText(text).actualBoundingBoxAscent + padding;
						
					//# difference
					text = `# difference: ${general.numberWithCommas((onLog.length - expectedCount).toFixed(2))}`;
					textPart1 = `# difference: `;
					textPart2 = general.numberWithCommas((onLog.length - expectedCount).toFixed(2));
					spoonageCoefficient.output.push({
						width: context.measureText(text).width
						, height: context.measureText(text).actualBoundingBoxAscent
						, text: [
							{text: textPart1, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: white, width: context.measureText(textPart1).width, height: context.measureText(textPart1).actualBoundingBoxAscent}
							, {text: textPart2, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: getColorScale(0, (onLog.length - expectedCount).toFixed(2), 1), width: context.measureText(textPart2).width, height: context.measureText(textPart2).actualBoundingBoxAscent}
						]
					});
					spoonageCoefficient.max.width = Math.max(spoonageCoefficient.max.width, context.measureText(text).width);
					spoonageCoefficient.max.height += context.measureText(text).actualBoundingBoxAscent + padding;
						
					//# until next
					var cluesUntilNext = Math.round((onLog.length + 1) * expectedCountPerItem) - breakdownList.get(selectedTier).userClueCount;
					text = `# until next drop: ${general.numberWithCommas(cluesUntilNext)}`;
					textPart1 = `# until next drop: `;
					textPart2 = general.numberWithCommas(cluesUntilNext);
					spoonageCoefficient.output.push({
						width: context.measureText(text).width
						, height: context.measureText(text).actualBoundingBoxAscent
						, text: [
							{text: textPart1, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: white, width: context.measureText(textPart1).width, height: context.measureText(textPart1).actualBoundingBoxAscent}
							, {text: textPart2, font: `${expectedBreakdownTextSize}px ${bodyFont}`, color: lightPurple, width: context.measureText(textPart2).width, height: context.measureText(textPart2).actualBoundingBoxAscent}
						]
					});
					spoonageCoefficient.max.width = Math.max(spoonageCoefficient.max.width, context.measureText(text).width);
					spoonageCoefficient.max.height += context.measureText(text).actualBoundingBoxAscent + padding;
					spoonageCoefficient.max.width += padding * 2;
					spoonageCoefficient.max.height += padding * 3;
					spoonageCoefficient.max.width = Math.max(spoonageCoefficient.max.width, solveStatsSection.max.width);
					solveStatsSection.max.width = Math.max(spoonageCoefficient.max.width, solveStatsSection.max.width);

					let imageNumberOfRows = selectedTier == 2 ? 4 : 5;
					let imageMaxHeight = Math.max(solveStatsSection.max.height + spoonageCoefficient.max.height + lineWidth, breakdownSection.max.height);
					let imageArea = {
						width: imageWidth
						, height: imageHeight
						, maxWidth: imageWidth * 5 + padding * 2
						, maxHeight: imageHeight * 4 + padding * 2
						, numberOfRows: imageNumberOfRows
					};

					//drops section
					currentFont = `23px ${headerFont}`
					context.font = currentFont;
					let itemName = `Item`;
					let currentTier = `# from current tier`;
					let allTiers = `# from all tiers`;
					let casketNumber = `Casket #`;
					let price = `Price`;
					let date = `Date`;
					let drystreak = `Drystreak`;
					let drops = {output: [{
						height: Math.max(context.measureText(itemName).actualBoundingBoxAscent, context.measureText(currentTier).actualBoundingBoxAscent, context.measureText(allTiers).actualBoundingBoxAscent, context.measureText(casketNumber).actualBoundingBoxAscent, context.measureText(price).actualBoundingBoxAscent, context.measureText(date).actualBoundingBoxAscent, context.measureText(drystreak).actualBoundingBoxAscent)
						, text: [
							{text: itemName, width: context.measureText(itemName).width, height: context.measureText(itemName).actualBoundingBoxAscent, font: currentFont, color: white}
							, {text: currentTier, width: context.measureText(currentTier).width, height: context.measureText(currentTier).actualBoundingBoxAscent, font: currentFont, color: white}
							, {text: allTiers, width: context.measureText(allTiers).width, height: context.measureText(allTiers).actualBoundingBoxAscent, font: currentFont, color: white}
							, {text: casketNumber, width: context.measureText(casketNumber).width, height: context.measureText(casketNumber).actualBoundingBoxAscent, font: currentFont, color: white}
							, {text: price, width: context.measureText(price).width, height: context.measureText(price).actualBoundingBoxAscent, font: currentFont, color: white}
							, {text: date, width: context.measureText(date).width, height: context.measureText(date).actualBoundingBoxAscent, font: currentFont, color: white}
							, {text: drystreak, width: context.measureText(drystreak).width, height: context.measureText(drystreak).actualBoundingBoxAscent, font: currentFont, color: white}
						]
					}]};
					drops.itemColumn = {max: {width: context.measureText(itemName).width, height: context.measureText(itemName).actualBoundingBoxAscent}};
					drops.currentTier = {max: {width: context.measureText(currentTier).width, height: context.measureText(currentTier).actualBoundingBoxAscent}};
					drops.allTiers = {max: {width: context.measureText(allTiers).width, height: context.measureText(allTiers).actualBoundingBoxAscent}};
					drops.casketNumber = {max: {width: context.measureText(casketNumber).width, height: context.measureText(casketNumber).actualBoundingBoxAscent}};
					drops.price = {max: {width: context.measureText(price).width, height: context.measureText(price).actualBoundingBoxAscent}};
					drops.date = {max: {width: context.measureText(date).width, height: context.measureText(date).actualBoundingBoxAscent}};
					drops.drystreak = {max: {width: context.measureText(drystreak).width, height: context.measureText(drystreak).actualBoundingBoxAscent}};
					drops.max = {
						height: Math.max(drops.itemColumn.max.height, drops.currentTier.max.height, drops.allTiers.max.height, drops.casketNumber.max.height, drops.price.max.height, drops.date.max.height, drops.drystreak.max.height)
					}

					currentFont = `20px ${bodyFont}`
					context.font = currentFont;
					let lastCasketCount = 0;
					for (let i of filteredOutput) {
						let fillStyle = (breakdownList.get(selectedTier).items.filter(filter => i.name.includes(filter.searchString)))[0].color;
						itemName = i.name;
						let currentTier = i.currentTierCount.toString();
						let allTiers = i.allTierCount.toString();
						let casketNumber = i.casketCount;
						let price = general.numberWithCommas(i.price);
						let date = formatDate(new Date(i.date));
						drystreak = general.numberWithCommas(casketNumber - lastCasketCount);
						let drystreakColor = getColorScale(casketNumber - lastCasketCount, 1, breakdownList.get(selectedTier).dropRate);
						lastCasketCount = casketNumber;
						drops.output.push({
							height: Math.max(context.measureText(itemName).actualBoundingBoxAscent, context.measureText(currentTier).actualBoundingBoxAscent, context.measureText(allTiers).actualBoundingBoxAscent, context.measureText(general.numberWithCommas(casketNumber)).actualBoundingBoxAscent, context.measureText(price).actualBoundingBoxAscent, context.measureText(date).actualBoundingBoxAscent, context.measureText(drystreak).actualBoundingBoxAscent)
							, backgroundColor: fillStyle
							, text: [
								{text: itemName, width: context.measureText(itemName).width, height: context.measureText(itemName).actualBoundingBoxAscent, font: currentFont, color: black}
								, {text: currentTier, width: context.measureText(currentTier).width, height: context.measureText(currentTier).actualBoundingBoxAscent, font: currentFont, color: black}
								, {text: allTiers, width: context.measureText(allTiers).width, height: context.measureText(allTiers).actualBoundingBoxAscent, font: currentFont, color: black}
								, {text: general.numberWithCommas(casketNumber), width: context.measureText(general.numberWithCommas(casketNumber)).width, height: context.measureText(general.numberWithCommas(casketNumber)).actualBoundingBoxAscent, font: currentFont, color: black}
								, {text: price, width: context.measureText(price).width, height: context.measureText(price).actualBoundingBoxAscent, font: currentFont, color: black}
								, {text: date, width: context.measureText(date).width, height: context.measureText(date).actualBoundingBoxAscent, font: currentFont, color: black}
								, {text: drystreak, width: context.measureText(drystreak).width, height: context.measureText(drystreak).actualBoundingBoxAscent, font: currentFont, color: drystreakColor}
							]
						});
						drops.itemColumn.max.width = Math.max(drops.itemColumn.max.width, context.measureText(itemName).width);
						drops.itemColumn.max.height = Math.max(drops.itemColumn.max.height, context.measureText(itemName).actualBoundingBoxAscent);
						drops.currentTier.max.width = Math.max(drops.currentTier.max.width, context.measureText(currentTier).width);
						drops.currentTier.max.height = Math.max(drops.currentTier.max.height, context.measureText(currentTier).actualBoundingBoxAscent);
						drops.allTiers.max.width = Math.max(drops.allTiers.max.width, context.measureText(allTiers).width);
						drops.allTiers.max.height = Math.max(drops.allTiers.max.height, context.measureText(allTiers).actualBoundingBoxAscent);
						drops.casketNumber.max.width = Math.max(drops.casketNumber.max.width, context.measureText(general.numberWithCommas(casketNumber)).width);
						drops.casketNumber.max.height = Math.max(drops.casketNumber.max.height, context.measureText(general.numberWithCommas(casketNumber)).actualBoundingBoxAscent);
						drops.price.max.width = Math.max(drops.price.max.width, context.measureText(price).width);
						drops.price.max.height = Math.max(drops.price.max.height, context.measureText(price).actualBoundingBoxAscent);
						drops.date.max.width = Math.max(drops.date.max.width, context.measureText(date).width);
						drops.date.max.height = Math.max(drops.date.max.height, context.measureText(date).actualBoundingBoxAscent);
						drops.drystreak.max.width = Math.max(drops.drystreak.max.width, context.measureText(drystreak).width);
						drops.drystreak.max.height = Math.max(drops.drystreak.max.height, context.measureText(drystreak).actualBoundingBoxAscent);
						drops.max.height += Math.max(context.measureText(itemName).actualBoundingBoxAscent, context.measureText(currentTier).actualBoundingBoxAscent, context.measureText(allTiers).actualBoundingBoxAscent, context.measureText(general.numberWithCommas(casketNumber)).actualBoundingBoxAscent, context.measureText(price).actualBoundingBoxAscent, context.measureText(date).actualBoundingBoxAscent, context.measureText(drystreak).actualBoundingBoxAscent) + padding;
					}
					drops.max.width = drops.itemColumn.max.width + padding + drops.currentTier.max.width + padding + drops.allTiers.max.width + padding + drops.casketNumber.max.width + padding + drops.price.max.width + padding + drops.date.max.width + padding + drops.drystreak.max.width;
					drops.max.width += padding * 2;
					drops.max.height += padding * 2;

					let canvasWidth = Math.max(Math.max(Math.max(solveStatsSection.max.width, spoonageCoefficient.max.width) + breakdownSection.max.width, canvasTitle.max.width) + lineWidth + lineWidth + imageArea.maxWidth, drops.max.width);
					let canvasHeight = canvasTitle.max.height + lineWidth + Math.max(solveStatsSection.max.height + spoonageCoefficient.max.height + lineWidth, breakdownSection.max.height, imageArea.maxHeight) + lineWidth + drops.max.height;
					canvasHeight = Math.max(1250, drops.max.height + breakdownList.get(selectedTier).border.drops.height);
					var canvas = Canvas.createCanvas(breakdownList.get(selectedTier).maxWidth, canvasHeight);
					context = canvas.getContext('2d');
					// context.fillStyle = gray;
					// context.fillRect(0,0,canvas.width,canvas.height);

					// let borderImage = await Canvas.loadImage(breakdownList.get(selectedTier).borderPath);
					// context.drawImage(borderImage, 0, 0, canvas.width, borderImage.height * (canvas.width/borderImage.width));
					Promise.all(imageArray)
					.then(result => {
						context.drawImage(result[0], 0, 0, canvas.width, canvas.height);
						context.drawImage(result[1], 0, 0, canvas.width, result[1].height * (canvas.width/result[1].width));
	
						//header
						context.fillStyle = canvasTitle.text.color;
						context.font = canvasTitle.text.font;
						let currentHeight = 72;
						context.fillText(canvasTitle.text.text, canvas.width/2 - canvasTitle.text.width/2, currentHeight);
	
						let startingHeight = breakdownList.get(selectedTier).border.solveStats.height;
						var breakdownLine = startingHeight + Math.max(solveStatsSection.max.height) + lineWidth;
						var spoonageCoefficientLine = breakdownLine + Math.max(breakdownSection.max.height) + lineWidth;
						var logImagesLine = spoonageCoefficientLine + Math.max(spoonageCoefficient.max.height) + lineWidth;
	
						//solve stats section
						currentFont = `30px ${headerFont}`
						context.font = currentFont;
						context.fillStyle = ivory;
						context.fillText(`${general.capitalizeFirstLetter(breakdownList.get(selectedTier).tier)} Solve Stats`, breakdownList.get(selectedTier).titles.solveStats.x, breakdownList.get(selectedTier).titles.solveStats.y);
						currentHeight = breakdownList.get(selectedTier).border.solveStats.height;
						let currentWidth = breakdownList.get(selectedTier).border.solveStats.width;
						solveStatsSection.output.forEach((solveStatValue, solveStatKey) => {
							let currentLineWidth = 0;
							solveStatValue.text.forEach((value, key) => {
								context.font = value.font;
								context.fillStyle = value.color;
								context.fillText(value.text, currentWidth + currentLineWidth + solveStatsSection.max.width/2 - solveStatValue.max.width/2, currentHeight);
								currentLineWidth += value.width;
							});
							currentHeight += solveStatValue.max.height + padding;
						});
	
						
						currentFont = `30px ${headerFont}`
						context.font = currentFont;
						context.fillStyle = ivory;
						context.fillText(`${general.capitalizeFirstLetter(breakdownList.get(selectedTier).tier)} Clues Breakdown`, breakdownList.get(selectedTier).titles.breakdown.x, breakdownList.get(selectedTier).titles.breakdown.y);
						currentHeight = breakdownList.get(selectedTier).border.breakdown.height;
						currentWidth = breakdownList.get(selectedTier).border.breakdown.width;
						breakdownSection.output.forEach((breakdownValue, breakdownKey) => {
							let currentColumnWidth = padding;
							if (breakdownKey > 0 && breakdownSection.output.length - 1 != breakdownKey) {
								let breakdownColoringXStart = currentWidth + currentColumnWidth - breakdownValue.height * highlightPadding;
								let breakdownColoringYStart = currentHeight - breakdownValue.height - breakdownValue.height * highlightPadding;
								let breakdownColoringXDistance = (breakdownValue.height * highlightPadding * 2) + padding * 3 + breakdownSection.itemColumn.max.width + breakdownSection.receivedColumn.max.width + breakdownSection.expectedColumn.max.width + breakdownSection.currentDroprateColumn.max.width;
								let breakdownColoringYDistance = (breakdownValue.height * highlightPadding * 2) + breakdownValue.height;
								context.fillStyle = breakdownValue.backgroundColor;
								context.fillRect(breakdownColoringXStart, breakdownColoringYStart, breakdownColoringXDistance, breakdownColoringYDistance);
							}
							for (let i = 0; i < breakdownValue.text.length; i++) {
								if (breakdownValue.text.length == 1) {
									context.font = breakdownValue.text[0].font;
									context.fillStyle = breakdownValue.text[0].color;
									context.fillText(breakdownValue.text[0].text, currentWidth + breakdownSection.max.width/2 - breakdownValue.text[0].width/2, currentHeight);
								} else {
									let currentColumn;
									if (i == 0) currentColumn = `itemColumn`;
									else if (i == 1) currentColumn = `receivedColumn`;
									else if (i == 2) currentColumn = `expectedColumn`;
									else if (i == 3) currentColumn = `currentDroprateColumn`;
									else currentColumn = `expectedDroprateColumn`;
									context.font = breakdownValue.text[i].font;
									context.fillStyle = breakdownValue.text[i].color;
									context.fillText(breakdownValue.text[i].text, currentWidth + currentColumnWidth + breakdownSection[currentColumn].max.width/2 - breakdownValue.text[i].width/2, currentHeight);
									currentColumnWidth += breakdownSection[currentColumn].max.width + padding;
								}
							}
							currentHeight += breakdownValue.height + padding;
						});
	
						currentFont = `30px ${headerFont}`
						context.font = currentFont;
						context.fillStyle = ivory;
						context.fillText(`Spoonage Coefficient`, breakdownList.get(selectedTier).titles.spoonageCoefficient.x, breakdownList.get(selectedTier).titles.spoonageCoefficient.y);
						currentHeight = breakdownList.get(selectedTier).border.coefficient.height;
						currentWidth = breakdownList.get(selectedTier).border.coefficient.width;
						spoonageCoefficient.output.forEach((spoonageCoefficientValue, spoonageCoefficientKey) => {
							let currentLineWidth = 0;
							spoonageCoefficientValue.text.forEach((value, key) => {
								context.font = value.font;
								context.fillStyle = value.color;
								context.fillText(value.text, currentWidth + currentLineWidth + spoonageCoefficient.max.width/2 - spoonageCoefficientValue.width/2, currentHeight);
								currentLineWidth += value.width;
							});
							currentHeight += spoonageCoefficientValue.height + padding;
						});
	
						let imageStartY = breakdownList.get(selectedTier).border.image.height;
						let imageStartX = breakdownList.get(selectedTier).border.image.width;
						var textSizeScale = .20;
						var textPositionScaleY = .08;
						var textPositionScaleX = 1/7;
	
						context.font = `1px runescape`
						context.fillStyle = `#FFFF00`;
						let numberPerRow = imageArea.numberOfRows;
						let totalItems;
						if (selectedTier == 1) totalItems = 17;
						else if (selectedTier == 2) totalItems = 12;
						else totalItems = 20;
						var imageWidthScaled = imageArea.width
						var imageHeightScaled = imageArea.height
						for (let i = 0; i < breakdownList.get(selectedTier).images.length; i++) {
							text = output.filter(text => text.name == breakdownList.get(selectedTier).images[i%breakdownList.get(selectedTier).images.length].name).length.toString();
							// let litUnlit = text == '0' ? 'unlit' : 'lit';
							// let logImage = await Canvas.loadImage(`.\\images\\Clues\\${breakdownList.get(selectedTier).images[i%breakdownList.get(selectedTier).images.length].filename}_${litUnlit}.png`);
							for (let j = 0; context.measureText(text).actualBoundingBoxAscent < imageHeightScaled * textSizeScale; j++) {
								context.font = `${j}px runescape`;
							}
							context.drawImage(result[i + 4], imageStartX + imageWidthScaled * (i%numberPerRow), imageStartY + imageHeightScaled * Math.floor(i/numberPerRow), imageWidthScaled, imageHeightScaled);
							
							let textPositionX = (imageStartX + imageWidthScaled * (i%numberPerRow)) + (imageWidthScaled * textPositionScaleX);
							let textPositionY = (imageStartY + imageHeightScaled * Math.floor(i/numberPerRow)) + (imageHeightScaled * textPositionScaleY) + context.measureText(text).actualBoundingBoxAscent;
							!(text == '0' || text == '1') ? context.fillText(text, textPositionX, textPositionY) : null;
						}
	
						// let borderImage = await Canvas.loadImage(breakdownList.get(selectedTier).borderPath);
						// context.drawImage(borderImage, 0, 0, canvas.width, borderImage.height * (canvas.width/borderImage.width));
	
						//drops section
						const constantShift = 20;
						currentHeight = breakdownList.get(selectedTier).border.drops.height + padding;
						currentWidth = canvas.width/2 - drops.max.width/2 + constantShift;
						drops.output.forEach((breakdownValue, breakdownKey) => {
							let currentColumnWidth = padding;
							if (breakdownKey > 0) {
								let breakdownColoringXStart = currentWidth + currentColumnWidth - breakdownValue.height * highlightPadding;
								let breakdownColoringYStart = currentHeight - breakdownValue.height - breakdownValue.height * highlightPadding;
								let breakdownColoringXDistance = (breakdownValue.height * highlightPadding * 2) + padding * 5 + drops.itemColumn.max.width + drops.currentTier.max.width + drops.allTiers.max.width + drops.casketNumber.max.width + drops.price.max.width + drops.date.max.width;
								let breakdownColoringYDistance = (breakdownValue.height * highlightPadding * 2) + breakdownValue.height;
								context.fillStyle = breakdownValue.backgroundColor;
								context.fillRect(breakdownColoringXStart, breakdownColoringYStart, breakdownColoringXDistance, breakdownColoringYDistance);
							}
							for (let i = 0; i < breakdownValue.text.length; i++) {
								let currentColumn;
								if (i == 0) currentColumn = `itemColumn`;
								else if (i == 1) currentColumn = `currentTier`;
								else if (i == 2) currentColumn = `allTiers`;
								else if (i == 3) currentColumn = `casketNumber`;
								else if (i == 4) currentColumn = `price`;
								else if (i == 5) currentColumn = `date`;
								else currentColumn = `drystreak`;
								context.font = breakdownValue.text[i].font;
								context.fillStyle = breakdownValue.text[i].color;
								context.fillText(breakdownValue.text[i].text, currentWidth + currentColumnWidth + drops[currentColumn].max.width/2 - breakdownValue.text[i].width/2, currentHeight);
								currentColumnWidth += drops[currentColumn].max.width + padding;
							}
							if (breakdownKey != drops.output.length - 1) currentHeight += breakdownValue.height + padding;
						});
						
						// const dyeArray = ['Barrows_Dye', 'Shadow_Dye', 'Ice_Dye', '3a_Dye', 'Blood_Dye', 'Aurora_Dye', 'Soul_Dye'];
						// let randomDye = general.getRandomInt(0, dyeArray.length);
						// let randomDye2 = general.getRandomInt(0, dyeArray.length);
	
						// let frostNibble = await Canvas.loadImage(`./images/Clues/Mune_${dyeArray[randomDye]}_right.png`);
						// let frostNibble2 = await Canvas.loadImage(`./images/Clues/Mune_${dyeArray[randomDye2]}_left.png`);
						context.drawImage(result[2], breakdownList.get(selectedTier).frostNibble.left.width, Math.max(canvas.height - 450, currentHeight-410), 460, 460);
						context.drawImage(result[3], breakdownList.get(selectedTier).frostNibble.right.width + constantShift, Math.max(canvas.height - 450, currentHeight-410), 460, 460);
						return canvas.encode('png');
					})
					.then(result => {
						let outputAttachment = new AttachmentBuilder(result, {name: `${canvasTitle.text.text}.png`});
						interaction.editReply({
							files: [outputAttachment]
						});
					})
					.catch(err => {
						console.log(err);
						interaction.editReply({
							content: `Something went wrong!`
						});
					});

					// var outputAttachment = new AttachmentBuilder(await canvas.encode('png'), {name: `${canvasTitle.text.text}.png`});
					// await interaction.editReply({
					// 	files: [outputAttachment]
					// });
				} else {
					const imageArray = [];
					const imageMap = new Map();
					imageArray.push(Canvas.loadImage(`.\\images\\Clues\\Background.jpg`));
					imageArray.push(Canvas.loadImage(`.\\images\\Clues\\2024_Border_Art_Overview_2.png`));
					let dyeArray = ['Barrows_Dye', 'Shadow_Dye', 'Ice_Dye', '3a_Dye', 'Blood_Dye', 'Aurora_Dye', 'Soul_Dye'];
					let randomDye = general.getRandomInt(0, dyeArray.length);
					let randomDye2 = general.getRandomInt(0, dyeArray.length);
					imageArray.push(Canvas.loadImage(`./images/Clues/Mune_${dyeArray[randomDye2]}_left.png`));
					imageArray.push(Canvas.loadImage(`./images/Clues/Mune_${dyeArray[randomDye]}_right.png`));
					for (let j = 1; j < 4; j++) {
						for (let i = 0; i < breakdownList.get(j).images.length; i++) {
							if (!imageMap.has(breakdownList.get(j).images[i%breakdownList.get(j).images.length].name)) {
								let text = output.filter(text => text.name == breakdownList.get(j).images[i%breakdownList.get(j).images.length].name).length.toString();
								let litUnlit = text == '0' ? 'unlit' : 'lit';
								imageMap.set(breakdownList.get(j).images[i%breakdownList.get(j).images.length].name, imageArray.push(Canvas.loadImage(`.\\images\\Clues\\${breakdownList.get(j).images[i%breakdownList.get(j).images.length].filename}_${litUnlit}.png`)) - 1);
							}
						}
					}
					var canvas = Canvas.createCanvas(1500, 1000);
					context = canvas.getContext('2d');
					const mainHeaderFont = 'Cinzel';
					const headerFont = 'Nunito';
					const bodyFont = 'Karla';
					const imageScaling = 1.095238095238095;
					let textOutput;
					let highlightList = [];
					const eliteSolveStatsCenter = 1265;
					const masterSolveStatsCenter = 2060;

					const hards = {
						solveStats: {
							center: 425
						}, breakdown: {
							item: {
								center: 157
							}, received: {
								center: 287
								, right: 305
							}, expected: {
								center: 405
								, right: 427
							}, currentDroprate: {
								center: 549
							}, expectedDropRate: {
								center: 726
							}
						}
					};

					const tiers = {
						canvas: {
							center: 2543/2
						},
						realityCheck: {
							item: {
								center: 1056
							}, onLog: {
								center: 1226
							}, expected: {
								center: 1376
							}, difference: {
								center: 1526
							}, highlight: {
								xPosition: 944
								, xDistance: 655
								, yDistance: 25
							}
						},
						hards: {
							solveStats: {
								center: 425
							}, breakdown: {
								item: {
									center: 164
								}, received: {
									center: 297
									, right: 312
								}, expected: {
									center: 405
									, right: 427
								}, currentDroprate: {
									center: 549
								}, expectedDropRate: {
									center: 726
								}, highlight: {
									xPosition: 87
									, yPosition: 478
									, xDistance: 545
									, yDistance: 25
								}
							}, spoonageCoefficient: {
								center: 275
							}
						},
						elites: {
							solveStats: {
								center: 1265
							}, breakdown: {
								item: {
									center: 970
								}, received: {
									center: 1123
									, right: 1135
								}, expected: {
									center: 1238
									, right: 1258
								}, currentDroprate: {
									center: 1380
								}, expectedDropRate: {
									center: 1558
								}, highlight: {
									xPosition: 860
									, yPosition: 450
									, xDistance: 605
									, yDistance: 25
								}
							}, spoonageCoefficient: {
								center: 1020
							}
						},
						masters: {
							solveStats: {
								center: 2060
							}, breakdown: {
								item: {
									center: 1790
								}, received: {
									center: 1930
									, right: 1940
								}, expected: {
									center: 2035
									, right: 2055
								}, currentDroprate: {
									center: 2166
								}, expectedDropRate: {
									center: 2360
								}, highlight: {
									xPosition: 1695
									, yPosition: 440
									, xDistance: 565
									, yDistance: 25
								}
							}, spoonageCoefficient: {
								center: 1860
							}
						}
					};

					var header = `${username}'s clue breakdown`;
					
					//Reality Check
					var realityCheck = [
						{name: 'Barrows dye', onLog: 0, expected: 0},
						{name: 'Shadow dye', onLog: 0, expected: 0},
						{name: 'Ice dye', onLog: 0, expected: 0},
						{name: 'Third age dye', onLog: 0, expected: 0},
						{name: 'Blood dye', onLog: 0, expected: 0},
						{name: 'Backstab cape', onLog: 0, expected: 0},
						{name: 'Sack of effigies', onLog: 0, expected: 0},
						{name: 'Third age', onLog: 0, expected: 0},
						{name: 'Third age druidic', onLog: 0, expected: 0},
						{name: 'Second-Age', onLog: 0, expected: 0},
						{name: 'Explosive barrel', onLog: 0, expected: 0},
						{name: "Orlando Smith's hat", onLog: 0, expected: 0}
					];

					//new width+height math
					context.font = `69px ${mainHeaderFont}`
					var textMeasure = context.measureText(`${username}'s clue breakdown`);
					textOutput = [{
						text: `${username}'s clue breakdown`
						, font: `69px ${mainHeaderFont}`
						, color: white
						, xPosition: tiers.canvas.center - textMeasure.width/2
						, yPosition: 84
					}];
					context.font = `30px ${headerFont}`
					textOutput.push({
						text: `Hard Solve Stats`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: hards.solveStats.center - context.measureText(`Hard Solve Stats`).width/2
						, yPosition: 232
					});
					textOutput.push({
						text: `Elite Solve Stats`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: eliteSolveStatsCenter - context.measureText(`Elite Solve Stats`).width/2
						, yPosition: 232
					});
					textOutput.push({
						text: `Master Solve Stats`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: masterSolveStatsCenter - context.measureText(`Master Solve Stats`).width/2
						, yPosition: 232
					});
					textOutput.push({
						text: `Spoonage Coefficient`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: hards.solveStats.center - context.measureText(`Spoonage Coefficient`).width/2
						, yPosition: 737
					});
					textOutput.push({
						text: `Spoonage Coefficient`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: eliteSolveStatsCenter - context.measureText(`Spoonage Coefficient`).width/2
						, yPosition: 737
					});
					textOutput.push({
						text: `Spoonage Coefficient`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: masterSolveStatsCenter - context.measureText(`Spoonage Coefficient`).width/2
						, yPosition: 737
					});

					context.font = `${breakdownTextSize}px ${bodyFont}`;
					let text = `Opened: ${breakdownList.get(1).userClueCount ? general.numberWithCommas(breakdownList.get(1).userClueCount) : 0}`;
					textOutput.push({
						text: `Opened: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: hards.solveStats.center - context.measureText(text).width/2
						, yPosition: 278
					});
					textOutput.push({
						text: breakdownList.get(1).userClueCount ? general.numberWithCommas(breakdownList.get(1).userClueCount) : `0`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: lightPurple
						, xPosition: hards.solveStats.center - context.measureText(text).width/2 + context.measureText(`Opened: `).width
						, yPosition: 278
					});
					text = `Opened: ${breakdownList.get(2).userClueCount ? general.numberWithCommas(breakdownList.get(2).userClueCount) : 0}`;
					textOutput.push({
						text: `Opened: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: eliteSolveStatsCenter - context.measureText(text).width/2
						, yPosition: 278
					});
					textOutput.push({
						text: breakdownList.get(2).userClueCount ? general.numberWithCommas(breakdownList.get(2).userClueCount) : `0`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: lightPurple
						, xPosition: eliteSolveStatsCenter - context.measureText(text).width/2 + context.measureText(`Opened: `).width
						, yPosition: 278
					});
					text = `Opened: ${breakdownList.get(3).userClueCount ? general.numberWithCommas(breakdownList.get(3).userClueCount) : 0}`;
					textOutput.push({
						text: `Opened: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: masterSolveStatsCenter - context.measureText(text).width/2
						, yPosition: 278
					});
					textOutput.push({
						text: breakdownList.get(3).userClueCount ? general.numberWithCommas(breakdownList.get(3).userClueCount) : `0`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: lightPurple
						, xPosition: masterSolveStatsCenter - context.measureText(text).width/2 + context.measureText(`Opened: `).width
						, yPosition: 278
					});

					text = `Current Droprate: 1/${output.filter(drops => drops.tier == 1).length == 0 ? 0 : general.numberWithCommas(Math.ceil(breakdownList.get(1).userClueCount/output.filter(drops => drops.tier == 1).length))}`;
					textOutput.push({
						text: `Current Droprate: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: hards.solveStats.center - context.measureText(text).width/2
						, yPosition: 306
					});
					textOutput.push({
						text: `1/${output.filter(drops => drops.tier == 1).length == 0 ? 0 : general.numberWithCommas(Math.ceil(breakdownList.get(1).userClueCount/output.filter(drops => drops.tier == 1).length))}`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: getColorScale(Math.round(breakdownList.get(1).userClueCount), output.filter(drops => drops.tier == 3).length, breakdownList.get(1).dropRate)
						, xPosition: hards.solveStats.center - context.measureText(text).width/2 + context.measureText(`Current Droprate: `).width
						, yPosition: 306
					});
					text = `Current Droprate: 1/${output.filter(drops => drops.tier == 2).length == 0 ? 0 : general.numberWithCommas(Math.ceil(breakdownList.get(2).userClueCount/output.filter(drops => drops.tier == 2).length))}`;
					textOutput.push({
						text: `Current Droprate: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: eliteSolveStatsCenter - context.measureText(text).width/2
						, yPosition: 306
					});
					textOutput.push({
						text: `1/${output.filter(drops => drops.tier == 2).length == 0 ? 0 : general.numberWithCommas(Math.ceil(breakdownList.get(2).userClueCount/output.filter(drops => drops.tier == 2).length))}`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: getColorScale(Math.round(breakdownList.get(2).userClueCount), output.filter(drops => drops.tier == 2).length, breakdownList.get(2).dropRate)
						, xPosition: eliteSolveStatsCenter - context.measureText(text).width/2 + context.measureText(`Current Droprate: `).width
						, yPosition: 306
					});
					text = `Current Droprate: 1/${output.filter(drops => drops.tier == 3).length == 0 ? 0 : general.numberWithCommas(Math.ceil(breakdownList.get(3).userClueCount/output.filter(drops => drops.tier == 3).length))}`;
					textOutput.push({
						text: `Current Droprate: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: masterSolveStatsCenter - context.measureText(text).width/2
						, yPosition: 306
					});
					textOutput.push({
						text: `1/${output.filter(drops => drops.tier == 3).length == 0 ? 0 : general.numberWithCommas(Math.ceil(breakdownList.get(3).userClueCount/output.filter(drops => drops.tier == 3).length))}`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: getColorScale(Math.round(breakdownList.get(3).userClueCount), output.filter(drops => drops.tier == 3).length, breakdownList.get(3).dropRate)
						, xPosition: masterSolveStatsCenter - context.measureText(text).width/2 + context.measureText(`Current Droprate: `).width
						, yPosition: 306
					});

					text = `Expected Rates: 1/${breakdownList.get(1).dropRate.toString()}`;
					textOutput.push({
						text: `Expected Rates: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: hards.solveStats.center - context.measureText(text).width/2
						, yPosition: 335
					});
					textOutput.push({
						text: `1/${breakdownList.get(1).dropRate.toString()}`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: lightPurple
						, xPosition: hards.solveStats.center - context.measureText(text).width/2 + context.measureText(`Expected Rates: `).width
						, yPosition: 335
					});
					text = `Expected Rates: 1/${breakdownList.get(2).dropRate.toString()}`;
					textOutput.push({
						text: `Expected Rates: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: eliteSolveStatsCenter - context.measureText(text).width/2
						, yPosition: 335
					});
					textOutput.push({
						text: `1/${breakdownList.get(2).dropRate.toString()}`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: lightPurple
						, xPosition: eliteSolveStatsCenter - context.measureText(text).width/2 + context.measureText(`Expected Rates: `).width
						, yPosition: 335
					});
					text = `Expected Rates: 1/${breakdownList.get(3).dropRate.toString()}`;
					textOutput.push({
						text: `Expected Rates: `
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: white
						, xPosition: masterSolveStatsCenter - context.measureText(text).width/2
						, yPosition: 335
					});
					textOutput.push({
						text: `1/${breakdownList.get(3).dropRate.toString()}`
						, font: `${breakdownTextSize}px ${bodyFont}`
						, color: lightPurple
						, xPosition: masterSolveStatsCenter - context.measureText(text).width/2 + context.measureText(`Expected Rates: `).width
						, yPosition: 335
					});
					
					context.font = `30px ${headerFont}`
					textOutput.push({
						text: `Hard Clues Breakdown`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: hards.solveStats.center - context.measureText(`Hard Clues Breakdown`).width/2
						, yPosition: 389
					});
					textOutput.push({
						text: `Elite Clues Breakdown`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: eliteSolveStatsCenter - context.measureText(`Elite Clues Breakdown`).width/2
						, yPosition: 389
					});
					textOutput.push({
						text: `Master Clues Breakdown`
						, font: `30px ${headerFont}`
						, color: white
						, xPosition: masterSolveStatsCenter - context.measureText(`Master Clues Breakdown`).width/2
						, yPosition: 389
					});

					context.font = `${breakdownHeaderTextSize}px ${headerFont}`;
					text = `Reality Check`;
					textOutput.push({
						text: text
						, font: `${breakdownHeaderTextSize}px ${headerFont}`
						, color: white
						, xPosition: 2543/2 - context.measureText(text).width/2
						, yPosition: 1040
					});
					let currentFont = `${breakdownHeaderTextSize}px ${headerFont}`
					context.font = currentFont;
					text = `Item`;
					textOutput.push({
						text: text
						, font: currentFont
						, color: white
						, xPosition: tiers.realityCheck.item.center - context.measureText(text).width/2
						, yPosition: 1070
					});
					text = `# on log`;
					textOutput.push({
						text: text
						, font: currentFont
						, color: white
						, xPosition: tiers.realityCheck.onLog.center - context.measureText(text).width/2
						, yPosition: 1070
					});
					text = `# expected`;
					textOutput.push({
						text: text
						, font: currentFont
						, color: white
						, xPosition: tiers.realityCheck.expected.center - context.measureText(text).width/2
						, yPosition: 1070
					});
					text = `# difference`;
					textOutput.push({
						text: text
						, font: currentFont
						, color: white
						, xPosition: tiers.realityCheck.difference.center - context.measureText(text).width/2
						, yPosition: 1070
					});

					currentFont = `${breakdownTextSize}px ${bodyFont}`
					context.font = currentFont
					realityCheck.forEach((realityCheckValue, key) => {
						textOutput.push({
							text: realityCheckValue.name
							, font: currentFont
							, color: black
							, xPosition: tiers.realityCheck.item.center - context.measureText(realityCheckValue.name).width/2
							, yPosition: 1100 + 12 *key + key*18
						});
						let numberOnLog;
						if (realityCheckValue.name == 'Third age') {
							numberOnLog = output.filter(item => item.name.includes(`Third age`)).length;
							numberOnLog -= output.filter(thisItem => thisItem.name.match(/(Third age dye|Third age druidic)/gi)) ? output.filter(thisItem => thisItem.name.match(/(Third age dye|Third age druidic)/gi)).length : 0;
						}
						else numberOnLog = output.filter(item => item.name.includes(realityCheckValue.name)).length;
						textOutput.push({
							text: numberOnLog.toString()
							, font: currentFont
							, color: black
							, xPosition: tiers.realityCheck.onLog.center - context.measureText(numberOnLog.toString()).width + 15
							, yPosition: 1100 + 12 *key + key*18
						});
						let numberExpected = getExpectedCount(realityCheckValue.name, userInfo, breakdownList);
						textOutput.push({
							text: numberExpected.toFixed(2)
							, font: currentFont
							, color: black
							, xPosition: tiers.realityCheck.expected.center - context.measureText(numberExpected.toFixed(2)).width + 25
							, yPosition: 1100 + 12 *key + key*18
						});
						let numberDifference = numberOnLog - numberExpected;
						textOutput.push({
							text: numberDifference.toFixed(2)
							, font: currentFont
							, color: black
							, xPosition: tiers.realityCheck.difference.center - context.measureText(numberDifference.toFixed(2)).width + 25
							, yPosition: 1100 + 12 *key + key*18
						});
						let numberDifferenceMeasure = context.measureText(numberDifference.toFixed(2));
						let backgroundColor = getSimpleColorScale(numberOnLog, numberExpected);

						highlightList.push({
							color: backgroundColor
							, xPosition: tiers.realityCheck.highlight.xPosition
							, yPosition: 1100 + 12 *key + key*18 - 18 - 3
							, xDistance: tiers.realityCheck.highlight.xDistance
							, yDistance: tiers.realityCheck.highlight.yDistance
						})
					});
					
					breakdownList.forEach((outerValue, outerKey) => {
						var currentTier;
						let filteredOutput = output.filter(filter => filter.tier == outerKey);
						if (outerKey == 1) currentTier = 'hards';
						else if (outerKey == 2) currentTier = 'elites';
						else currentTier = 'masters';
						context.font = `20px ${headerFont}`;
						textOutput.push({
							text: `Item`
							, font: `20px ${headerFont}`
							, color: white
							, xPosition: tiers[currentTier].breakdown.item.center - context.measureText(`Item`).width/2
							, yPosition: tiers[currentTier].breakdown.highlight.yPosition - 10
						});
						textOutput.push({
							text: `# Received`
							, font: `20px ${headerFont}`
							, color: white
							, xPosition: tiers[currentTier].breakdown.received.center - context.measureText(`# Received`).width/2
							, yPosition: tiers[currentTier].breakdown.highlight.yPosition - 10
						});
						textOutput.push({
							text: `# Expected`
							, font: `20px ${headerFont}`
							, color: white
							, xPosition: tiers[currentTier].breakdown.expected.center - context.measureText(`# Expected`).width/2
							, yPosition: tiers[currentTier].breakdown.highlight.yPosition - 10
						});
						textOutput.push({
							text: `Current Droprate`
							, font: `20px ${headerFont}`
							, color: white
							, xPosition: tiers[currentTier].breakdown.currentDroprate.center - context.measureText(`Current Droprate`).width/2
							, yPosition: tiers[currentTier].breakdown.highlight.yPosition - 10
						});
						textOutput.push({
							text: `Expected Droprate`
							, font: `20px ${headerFont}`
							, color: white
							, xPosition: tiers[currentTier].breakdown.expectedDropRate.center - context.measureText(`Expected Droprate`).width/2
							, yPosition: tiers[currentTier].breakdown.highlight.yPosition - 10
						});
						outerValue.items.forEach((value, innerKey) => {
							context.font = `20px ${bodyFont}`
							let filteredResults = filteredOutput.filter(filter => filter.name.includes(value.searchString));
							let backgroundColor = getColorScale(outerValue.userClueCount, filteredResults.length, value.dropRate);
							textOutput.push({
								text: value.name
								, font: `20px ${bodyFont}`
								, color: black
								, xPosition: tiers[currentTier].breakdown.item.center - context.measureText(value.name).width/2
								, yPosition: tiers[currentTier].breakdown.highlight.yPosition + 19 + (innerKey * 28)
							});
							textOutput.push({
								text: filteredResults.length.toString()
								, font: `20px ${bodyFont}`
								, color: black
								, xPosition: tiers[currentTier].breakdown.received.right - context.measureText(filteredResults.length.toString()).width
								, yPosition: tiers[currentTier].breakdown.highlight.yPosition + 19 + (innerKey * 28)
							});
							let expected = outerValue.userClueCount/value.dropRate;
							textOutput.push({
								text: expected.toFixed(2)
								, font: `20px ${bodyFont}`
								, color: black
								, xPosition: tiers[currentTier].breakdown.expected.right - context.measureText(expected.toFixed(2)).width
								, yPosition: tiers[currentTier].breakdown.highlight.yPosition + 19 + (innerKey * 28)
							});
							let text = `${filteredResults.length == 0 ? `0` : `1`}:${filteredResults.length == 0 ? general.numberWithCommas(value.dropRate) : general.numberWithCommas(Math.round(outerValue.userClueCount/filteredResults.length))}`;
							textOutput.push({
								text: text
								, font: `20px ${bodyFont}`
								, color: black
								, xPosition: tiers[currentTier].breakdown.currentDroprate.center - context.measureText(text).width/2
								, yPosition: tiers[currentTier].breakdown.highlight.yPosition + 19 + (innerKey * 28)
							});
							text = `(1:${general.numberWithCommas(value.dropRate)})`;
							textOutput.push({
								text: text
								, font: `20px ${bodyFont}`
								, color: white
								, xPosition: tiers[currentTier].breakdown.expectedDropRate.center - context.measureText(text).width/2
								, yPosition: tiers[currentTier].breakdown.highlight.yPosition + 19 + (innerKey * 28)
							});
							highlightList.push({
								color: backgroundColor
								, xPosition: tiers[currentTier].breakdown.highlight.xPosition
								, yPosition: tiers[currentTier].breakdown.highlight.yPosition + (innerKey * 28)
								, xDistance: tiers[currentTier].breakdown.highlight.xDistance
								, yDistance: tiers[currentTier].breakdown.highlight.yDistance
							});
						});
						context.font = `${expectedBreakdownTextSize}px ${bodyFont}`;
						let text = outerValue.coefficientText;
						textOutput.push({
							text: text
							, font: `20px ${bodyFont}`
							, color: white
							, xPosition: tiers[currentTier].spoonageCoefficient.center - context.measureText(text).width/2
							, yPosition: 790
						});
						let onLog = outerValue.filterClues(filteredOutput);
						text = `# on log: ${onLog.length}`;
						let textPart1 = `# on log: `;
						let textPart2 = onLog.length.toString();
						textOutput.push({
							text: textPart1
							, font: `20px ${bodyFont}`
							, color: white
							, xPosition: tiers[currentTier].spoonageCoefficient.center - context.measureText(text).width/2
							, yPosition: 830
						});
						textOutput.push({
							text: textPart2
							, font: `20px ${bodyFont}`
							, color: lightPurple
							, xPosition: tiers[currentTier].spoonageCoefficient.center + context.measureText(textPart1).width - context.measureText(text).width/2
							, yPosition: 830
						});
						var expectedItems = outerValue.filterClues(outerValue.items);
						var expectedCount = 0;
						expectedItems.forEach(item => {
							expectedCount += (1/item.dropRate);
						});
						var expectedCountPerItem = 1/expectedCount;
						expectedCount = outerValue.userClueCount/expectedCountPerItem;
						text = `# expected: ${general.numberWithCommas(expectedCount.toFixed(2))}`;
						textPart1 = `# expected: `;
						textPart2 = expectedCount.toFixed(2);
						textOutput.push({
							text: textPart1
							, font: `20px ${bodyFont}`
							, color: white
							, xPosition: tiers[currentTier].spoonageCoefficient.center - context.measureText(text).width/2
							, yPosition: 855
						});
						textOutput.push({
							text: textPart2
							, font: `20px ${bodyFont}`
							, color: lightPurple
							, xPosition: tiers[currentTier].spoonageCoefficient.center + context.measureText(textPart1).width - context.measureText(text).width/2
							, yPosition: 855
						});
						text = `# difference: ${general.numberWithCommas((onLog.length - expectedCount).toFixed(2))}`;
						textPart1 = `# difference: `;
						textPart2 = general.numberWithCommas((onLog.length - expectedCount).toFixed(2));
						textOutput.push({
							text: textPart1
							, font: `20px ${bodyFont}`
							, color: white
							, xPosition: tiers[currentTier].spoonageCoefficient.center - context.measureText(text).width/2
							, yPosition: 880
						});
						textOutput.push({
							text: textPart2
							, font: `20px ${bodyFont}`
							, color: getColorScale(0, onLog.length - expectedCount, 1)
							, xPosition: tiers[currentTier].spoonageCoefficient.center + context.measureText(textPart1).width - context.measureText(text).width/2
							, yPosition: 880
						});
						let cluesUntilNext = Math.round((onLog.length + 1) * expectedCountPerItem) - outerValue.userClueCount;
						text = `# until next drop: ${general.numberWithCommas(cluesUntilNext)}`;
						textPart1 = `# until next drop: `;
						textPart2 = general.numberWithCommas(cluesUntilNext);
						textOutput.push({
							text: textPart1
							, font: `20px ${bodyFont}`
							, color: white
							, xPosition: tiers[currentTier].spoonageCoefficient.center - context.measureText(text).width/2
							, yPosition: 905
						});
						textOutput.push({
							text: textPart2
							, font: `20px ${bodyFont}`
							, color: getColorScale(0, onLog.length - expectedCount, 1)
							, xPosition: tiers[currentTier].spoonageCoefficient.center + context.measureText(textPart1).width - context.measureText(text).width/2
							, yPosition: 905
						});
					});

					Promise.all(imageArray).then(result => {
						var canvas = Canvas.createCanvas(2543, 1480);
						context = canvas.getContext('2d');
						// let backgroundImage = await Canvas.loadImage(`.\\images\\Clues\\Background.jpg`);
						context.drawImage(result[0], 0, 0, canvas.width, canvas.height);
						// let borderImage = await Canvas.loadImage(`.\\images\\Clues\\2024_Border_Art_Overview_2.png`);
						context.drawImage(result[1], 0, 0, canvas.width, canvas.height);
	
						const broadcasts = [
							{item: 'barrows_dye'},
							{item: 'shadow_dye'},
							{item: 'ice_dye'},
							{item: 'third_age_dye'},
							{item: 'blood_dye'},
							{item: '3a_melee_helm'},
							{item: '3a_melee_top'},
							{item: '3a_melee_legs'},
							{item: '3a_kiteshield'},
							{item: 'backstab_cape'},
							{item: '3a_mage_hat'},
							{item: '3a_mage_top'},
							{item: '3a_mage_legs'},
							{item: '3a_amulet'},
							{item: 'sack_of_effigies'},
							{item: '3a_coif'},
							{item: '3a_range_top'},
							{item: '3a_range_legs'},
							{item: '3a_range_vambraces'},
							{item: 'explosive_barrel'},
							{item: 'druidic_wreath'},
							{item: 'druidic_top'},
							{item: 'druidic_bottom'},
							{item: 'druidic_staff'},
							{item: 'druidic_cloak'},
							{item: '2a_melee_helm'},
							{item: '2a_melee_body'},
							{item: '2a_melee_legs'},
							{item: '2a_melee_sword'},
							{item: 'orlando_smith_hat'},
							{item: '2a_mage_helm'},
							{item: '2a_mage_body'},
							{item: '2a_mage_legs'},
							{item: '2a_mage_staff'},
							{item: '2a_range_coif'},
							{item: '2a_range_body'},
							{item: '2a_range_legs'},
							{item: '2a_range_bow'},
						]
	
						const logImages = [
							{
								yImageScale: 48
								, xImageScale: 48 * (92/84)
								, numRows: 6
								, xPosition: 507
								, yPosition: 775
								, fontSize: 15
								, yTextShift: 15
								, xTextShift: 7
							}, {
								yImageScale: 70/(92/84)
								, xImageScale: 70
								, numRows: 6
								, xPosition: 1225
								, yPosition: 777
								, fontSize: 20
								, yTextShift: 20
								, xTextShift: 9
							}, {
								yImageScale: 48
								, xImageScale: 48 * (92/84)
								, numRows: 7
								, xPosition: 2068
								, yPosition: 765
								, fontSize: 15
								, yTextShift: 15
								, xTextShift: 7
							}
						]
	
						for (let j = 1; j < 4; j++) {
							for (let i = 0; i < breakdownList.get(j).images.length; i++) {
								let itemCount = output.filter(text => text.name == breakdownList.get(j).images[i].name).length.toString();
								// let filteredBroadcast = broadcasts.findIndex(item => item.item == breakdownList.get(j).images[i].filename);
								// if (!broadcasts[filteredBroadcast].image) {
								// 	let litUnlit = itemCount == '0' ? 'unlit' : 'lit';
								// 	broadcasts[filteredBroadcast].image = await Canvas.loadImage(`.\\images\\Clues\\${broadcasts[filteredBroadcast].item}_${litUnlit}.png`);
								// }
								context.drawImage(result[imageMap.get(breakdownList.get(j).images[i].name)], logImages[j-1].xPosition + (i%logImages[j-1].numRows * logImages[j-1].xImageScale), logImages[j-1].yPosition + (Math.floor(i/logImages[j-1].numRows) * logImages[j-1].yImageScale), logImages[j-1].xImageScale, logImages[j-1].yImageScale);
								if (itemCount != 0 && itemCount != 1) {
									textOutput.push({
										color: `#FFFF00`
										, font: `${logImages[j-1].fontSize}px runescape`
										, text: itemCount.toString()
										, xPosition: logImages[j-1].xPosition + (i%logImages[j-1].numRows * logImages[j-1].xImageScale) + logImages[j-1].xTextShift
										, yPosition: logImages[j-1].yPosition + (Math.floor(i/logImages[j-1].numRows) * logImages[j-1].yImageScale) + logImages[j-1].yTextShift
									});
								}
							}
						}
	
						highlightList.forEach((value, key) => {
							context.fillStyle = value.color;
							context.fillRect(value.xPosition, value.yPosition, value.xDistance, value.yDistance);
						});
	
						textOutput.forEach((value, key) => {
							context.fillStyle = value.color;
							context.font = value.font;
							context.fillText(value.text, value.xPosition, value.yPosition);
						});
	
						context.drawImage(result[2], tiers.realityCheck.highlight.xPosition - 500, canvas.height - 480, 460, 460);
						context.drawImage(result[3], tiers.realityCheck.highlight.xPosition + tiers.realityCheck.highlight.xDistance + 40, canvas.height - 480, 460, 460);
	
						return canvas.encode('png');
					})
					.then(result => {
						var outputAttachment = new AttachmentBuilder(result, {name: `${header}.png`});
						interaction.editReply({
							files: [outputAttachment]
						});
					})
					.catch(err => {
						console.log(err);
						interaction.editReply({
							content: 'Something went wrong!'
						});
					});
				}
				break;
			case 'update':
				var newPrice;
				let tierName;
				if (subcommand == 'count') {
					if (clueCount < 0) {
						await interaction.reply({
							content: `You must input a number greater than 0!`
							, ephemeral: true
						});
						break;
					}

					if (selectedTier == 1) {
						searchColumn = 'hardClueCount';
						tierName = 'hard';
					} else if (selectedTier == 2) {
						searchColumn = 'eliteClueCount';
						tierName = 'elite';
					} else {
						searchColumn = 'masterClueCount';
						tierName = 'master'
					}

					let userStats = await sequelize.query(`select * from ClueUsers where clueUserID = ?`, {type: QueryTypes.SELECT, replacements: [interaction.user.id]});
					if (userStats.length == 0) await sequelize.query(`insert into ClueUsers (${searchColumn}, clueUserID) values (?, ?)`, {type: QueryTypes.INSERT, replacements: [clueCount, interaction.user.id]})
					else await sequelize.query(`update ClueUsers set ${searchColumn} = ? where clueUserID = ?`, {type: QueryTypes.UPDATE, replacements: [clueCount, interaction.user.id]});
					await interaction.reply({
						content: `Updated ${tierName} clue count to ${general.numberWithCommas(clueCount)}`
					});
					break;
				}
				if (!newSelectedItem && !imageURL && !uploadedAttachment && !casketNumber && !date && !priceInput && !clueCount) {
					await interaction.reply({
						content: `You must choose something to update!`
						, ephemeral: true
					});
					break;
				}
				if (casketNumber < 0) {
					await interaction.reply({
						content: `You must choose a casket number greater than 0!`
						, ephemeral: true
					});
					break;
				}
				if (priceInput < 0) {
					await interaction.reply({
						content: `You must choose a casket number greater than 0!`
						, ephemeral: true
					});
					break;
				}
				currentTimeFileName = new Date().getTime();
				if (date) currentTime = new Date(date).getTime();
				else currentTime = null;
				if (isNaN(currentTime)) {
					await interaction.reply({
						content: `Invalid date!`
						, ephemeral: true
					});
					break;
				}
				await interaction.deferReply();
				var updateOutput = await sequelize.query(`
					select b.name name
						, cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID || 'id' || a.tier order by a.date, a.clueDropID) as text) || ' (' || cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID order by a.date, a.clueDropID) as text) || ')' rownumber
						, a.casketCount casketCount
						, a.date date
						, a.tier tier
						, a.price price
						, a.imagePath
						, a.clueDropID clueDropID
					from ClueDrops a
						left outer join ClueItems b on a.clueItemID = b.clueItemID
					where userID = ?
					order by date, clueDropID`
				, {type: QueryTypes.SELECT, replacements: [interaction.user.id]});
				if (uploadedAttachment) {
					saveImagePath = `${imageDirectory}\\${currentTimeFileName}.png`;
					await general.downloadImage(uploadedAttachment.url, saveImagePath);
					outputImagePath = uploadedAttachment.url;
				}
				if (imageURL) {
					saveImagePath = imageURL;
					outputImagePath = imageURL;
				}
				if (newSelectedItem) {
					if (!priceInput) {
						newPrice = this.itemPrices[newSelectedItem].price;
						// var url = `https://api.weirdgloop.org/exchange/history/rs/latest?id=${newSelectedItem}`;
						// var response = await (await fetch(url)).json();
						// Object.entries(response).forEach((entry) => {
						// 	newPrice = entry[1].price;
						// });
					} else newPrice = priceInput;
				} else {
					newPrice = priceInput;
				}
				await sequelize.query(`update ClueDrops set clueItemID = coalesce(?, clueItemID), casketCount = coalesce(?, casketCount), date = coalesce(?, date), price = coalesce(?, price), imagePath = coalesce(?, imagePath) where clueDropID = ?`, {type: QueryTypes.UPDATE, replacements: [newSelectedItem, casketNumber, currentTime, newPrice, saveImagePath, broadcast]})
				let updateOutputList = await updateOutput.filter(filter => filter.clueDropID == broadcast);
				await interaction.editReply({
					content: `Updated ${updateOutputList[0].name} ${updateOutputList[0].rownumber}!`
				})
				break;
			case 'snoop':
				var userID = selectedUser.id;
				var snoopOutput = await sequelize.query(`
					select b.name name
						, cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID || 'id' || a.tier order by a.date, a.clueDropID) as text) || ' (' || cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID order by a.date, a.clueDropID) as text) || ')' rownumber
						, a.casketCount casketCount
						, a.date date
						, a.tier tier
						, a.price price
						, a.imagePath
						, a.clueDropID clueDropID
					from ClueDrops a
						left outer join ClueItems b on a.clueItemID = b.clueItemID
					where userID = ?
					order by date, clueDropID`
				, {type: QueryTypes.SELECT, replacements: [userID]});
				if (snoopOutput.length == 0) {
					await interaction.reply({
						content: `There's no such image to display!`
						, ephemeral: true
					})
				}
				const imageFilter = snoopOutput.filter(filter => filter.clueDropID === broadcast);
				const attachment = new AttachmentBuilder(imageFilter[0].imagePath, { name: 'output.png' })
				await interaction.reply({
					files: [attachment]
				});
				break;
			case 'delete':
				var deleteOutput = await sequelize.query(`
					select b.name name
						, cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID || 'id' || a.tier order by a.date, a.clueDropID) as text) || ' (' || cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID order by a.date, a.clueDropID) as text) || ')' rownumber
						, a.casketCount casketCount
						, a.date date
						, a.tier tier
						, a.price price
						, a.imagePath
						, a.clueDropID clueDropID
					from ClueDrops a
						left outer join ClueItems b on a.clueItemID = b.clueItemID
					where userID = ?
					order by date, clueDropID`
				, {type: QueryTypes.SELECT, replacements: [interaction.user.id, broadcast]});
				filteredOutput = deleteOutput.filter(filter => filter.clueDropID == broadcast);
				await sequelize.query(`delete from clueDrops where clueDropID = ?`, {type: QueryTypes.SELECT, replacements: [broadcast]});
				await interaction.reply({
					content: `Deleted ${filteredOutput[0].name} ${filteredOutput[0].rownumber}!`
				});
				break;
			case 'print':
				const queryOutput = await sequelize.query(`
					select b.name name
						, cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID || 'id' || a.tier order by a.date, a.clueDropID) as text) || ' (' || cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID order by a.date, a.clueDropID) as text) || ')' rownumber
						, a.casketCount casketCount
						, a.date date
						, case when a.tier = 1 then 'Hard'
							when a.tier = 2 then 'Elite'
							else 'Master'
							end tier
						, a.clueDropID clueDropID
					from ClueDrops a
						left outer join ClueItems b on a.clueItemID = b.clueItemID
					where userID = ?
					order by date, clueDropID`
				, {type: QueryTypes.SELECT, replacements: [interaction.user.id]});
				let printOutput = '';
				queryOutput.forEach(broadcast => {
					let d = new Date(broadcast.date);
					printOutput += `${broadcast.name}\t${broadcast.rownumber}\t${broadcast.casketCount}\t${formatDate(d)}\t${broadcast.tier}\n`;
				});
				const attachmentOutput = new AttachmentBuilder(Buffer.from(printOutput)).setName('test.txt');
				interaction.reply({
					files: [attachmentOutput]
					, ephemeral: true
				})
				break;
		}
    },
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		if (focusedOption.name == 'item' || focusedOption.name == 'newitem') {
			var columnText;
			if (interaction.options.getSubcommand() == 'hard') columnText = 'hardDropRate';
			if (interaction.options.getSubcommand() == 'elite') columnText = 'eliteDropRate';
			if (interaction.options.getSubcommand() == 'master') columnText = 'masterDropRate';
			let items = await sequelize.query(`select name name, cast(clueItemID as TEXT) value from ClueItems where ${columnText} is not null`, {type: QueryTypes.SELECT});
			var filtered = [];
			filtered = items.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.value}))
			);
		}
		if (focusedOption.name == 'broadcast') {
			var tier;
			if (interaction.options.getSubcommand() == 'hard') tier = 1;
			if (interaction.options.getSubcommand() == 'elite') tier = 2;
			if (interaction.options.getSubcommand() == 'master') tier = 3;
			let selectedUser;
			try {
				selectedUser = interaction.options.get('gamer').value;
			} catch {
				selectedUser = interaction.user.id;
			}
			const output = await sequelize.query(`
				select b.name || ' ' || cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID || 'id' || a.tier order by a.date, a.clueDropID) as text) || ' (' || cast(ROW_NUMBER() OVER(PARTITION BY a.clueItemID order by a.date, a.clueDropID) as text) || ')' name
					, a.imagePath imagePath
					, a.clueDropID value
					, a.tier tier
				from ClueDrops a
					left outer join ClueItems b on a.clueItemID = b.clueItemID
				where userID = ?
				order by date, clueDropID`
			, {type: QueryTypes.SELECT, replacements: [selectedUser]});
			var imageOutput;
			if (interaction.options.getSubcommand() == 'snoop' || interaction.options.getSubcommand() == 'screenshot') imageOutput = output.filter(choice => choice.imagePath != null);
			else if (['hard', 'elite', 'master'].includes(interaction.options.getSubcommand())) imageOutput = output.filter(choice => choice.tier == tier);
			else imageOutput = output;
			var filtered = [];
			filtered = imageOutput.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.value}))
			);
		}
	}
	, async fetchPrices() {
		const clueItems = await sequelize.query(`select clueItemID, name from ClueItems`, {type: QueryTypes.SELECT})
		const url = `https://api.weirdgloop.org/exchange/history/rs/latest?id=${clueItems.map(item => item.clueItemID).join('|')}`;
		const job = new Cron('00 00 */12 * * *', async () => {
			fetch(url, {headers: {"User-Agent": "Clue Broadcast Tracker - Discord username @toothlessll"}})
			// fetch(url)
			.then(result => result.json())
			.then(result => {
				this.itemPrices = result;
			})
			.catch(err => console.log(err));
		});
		job.trigger();
		// var response = await (await fetch(url)).json();
		// Object.entries(response).forEach((entry) => {
		// 	newPrice = entry[1].price;
		// });
	}
};

function formatDate(date) {
	return [
	  padTo2Digits(date.getMonth() + 1),
	  padTo2Digits(date.getDate()),
	  date.getFullYear(),
	].join('/');
}

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

function getColorScale(currentTotal, currentCount, dropRate) {
	const green = '#9aff82';
	const yellowgreen = '#c4f140';
	const yellow = '#ffff00';
	const orange = '#f6b26b';
	const red = '#e06666';

	const rate = currentCount - currentTotal/dropRate;
	// console.log(currentCount, currentTotal, dropRate, rate);
	if (rate <= -1) return red;
	else if (rate < -0.5) return orange;
	else if (rate < 0.5) return yellow;
	else if (rate < 1) return yellowgreen;
	else return green;
}

function getSimpleColorScale(currentTotal, expected) {
	const green = '#9aff82';
	const yellowgreen = '#c4f140';
	const yellow = '#ffff00';
	const orange = '#f6b26b';
	const red = '#e06666';

	const rate = currentTotal - expected;
	// console.log(currentCount, currentTotal, dropRate, rate);
	if (rate <= -1) return red;
	else if (rate < -0.5) return orange;
	else if (rate < 0.5) return yellow;
	else if (rate < 1) return yellowgreen;
	else return green;
}

function getExpectedCount (item, userInfo, broadcastList) {
	var hardExpectedRates = 0;
	var eliteExpectedRates = 0;
	var masterExpectedRates = 0;
	var hardItemFilter = broadcastList.get(1).items.filter(filter => filter.searchString == item);
	var eliteItemFilter = broadcastList.get(2).items.filter(filter => filter.searchString == item);
	var masterItemFilter = broadcastList.get(3).items.filter(filter => filter.searchString == item);
	// console.log(hardItemFilter);
	if (hardItemFilter.length > 0) {
		hardExpectedRates = userInfo[0].hardClueCount/hardItemFilter[0].dropRate;
		// console.log(userInfo[0].hardClueCount, hardItemFilter[0].dropRate, userInfo[0].hardClueCount/hardItemFilter[0].dropRate, hardExpectedRates);
	}
	if (eliteItemFilter.length > 0) eliteExpectedRates = userInfo[0].eliteClueCount/eliteItemFilter[0].dropRate;
	if (masterItemFilter.length > 0) masterExpectedRates = userInfo[0].masterClueCount/masterItemFilter[0].dropRate;
	return hardExpectedRates + eliteExpectedRates + masterExpectedRates;
}