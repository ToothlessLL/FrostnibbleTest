const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, AttachmentBuilder  } = require('discord.js');
const { sequelize } = require('../dbObjects.js');
const { QueryTypes } = require('sequelize');
const Canvas = require('@napi-rs/canvas');
const general = require(`../functions/general.js`);
const bingo = require(`../functions/bingo/bingo.js`);

module.exports = {
	guildID: ['902646067466747934']
	, data: new SlashCommandBuilder()
		.setName('bingoadmin')
		.setDescription('cutie bingo related commands!')
		.addSubcommandGroup(option =>
			option.setName(`bingo`)
			.setDescription(`Bingo settings`)
			.addSubcommand(option =>
				option.setName(`boardviewtime`)
				.setDescription(`The time to make board viewable by public`)
				.addStringOption(option =>
					option.setName(`time`)
					.setDescription(`Use MM/DD/YYYY hh:mi am format`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`submitstarttime`)
				.setDescription(`The time to allow bingo submissions`)
				.addStringOption(option =>
					option.setName(`time`)
					.setDescription(`Use MM/DD/YYYY hh:mi am format`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`submitendtime`)
				.setDescription(`The time to end bingo submissions`)
				.addStringOption(option =>
					option.setName(`time`)
					.setDescription(`Use MM/DD/YYYY hh:mi am format`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`addadmin`)
				.setDescription(`Add a new bingo admin`)
				.addUserOption(option =>
					option.setName(`admin`)
					.setDescription(`Add a new admin to bingo`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`removeadmin`)
				.setDescription(`Removes a bingo admin`)
				.addUserOption(option =>
					option.setName(`admin`)
					.setDescription(`Add a new admin to bingo`)
					.setRequired(true)
				)
			)
		)
		.addSubcommandGroup(option =>
			option.setName('board')
			.setDescription('board settings')
			.addSubcommand(option =>
				option.setName(`display`)
				.setDescription(`Display current board`)
			)
			.addSubcommand(option =>
				option.setName(`clear`)
				.setDescription(`Clear the whole board`)
			)
			.addSubcommand(option =>
				option.setName(`setdimensions`)
				.setDescription(`Set board width and height`)
				.addIntegerOption(option =>
					option.setName(`width`)
					.setDescription(`Number of tiles horizontally`)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName(`height`)
					.setDescription(`Number of tiles vertically`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`addtile`)
				.setDescription(`Add new tiles to the bingo`)
				.addStringOption(option =>
					option.setName(`newname`)
					.setDescription(`Name of the tile (to be shown when submitting drops)`)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName(`count`)
					.setDescription(`Number of drops (per item) to complete`)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName(`x`)
					.setDescription(`#th tile horizontally in the x axis`)
					.setRequired(true)
					.setAutocomplete(true)
				)
				.addIntegerOption(option =>
					option.setName(`y`)
					.setDescription(`#th tile vertically in the y axis`)
					.setRequired(true)
					.setAutocomplete(true)
				)
				.addIntegerOption(option =>
					option.setName(`completiontype`)
					.setDescription(`Requires all for completion for set for completion?`)
					.setRequired(true)
					.addChoices(
						{name: `All`, value: 1}
						, {name: `Specific`, value: 2}
					)
				)
				.addIntegerOption(option =>
					option.setName(`casketcheck`)
					.setDescription(`Set casket required type for this tile`)
					.setAutocomplete(true)
				)
				.addAttachmentOption(option =>
					option.setName(`attachment`)
					.setDescription(`image of the tile`)
				)
				.addStringOption(option =>
					option.setName(`url`)
					.setDescription(`url of the image`)
				)
			)
			.addSubcommand(option =>
				option.setName(`modifytile`)
				.setDescription(`Modify current tile on the bingo`)
				.addIntegerOption(option =>
					option.setName(`name`)
					.setDescription(`Name of the tile (to be shown when submitting drops)`)
					.setAutocomplete(true)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName(`x`)
					.setDescription(`#th tile horizontally in the x axis`)
					.setRequired(true)
					.setAutocomplete(true)
				)
				.addIntegerOption(option =>
					option.setName(`y`)
					.setDescription(`#th tile vertically in the y axis`)
					.setRequired(true)
					.setAutocomplete(true)
				)
				.addStringOption(option =>
					option.setName(`newname`)
					.setDescription(`New name of the tile`)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName(`count`)
					.setDescription(`Number of drops (per item) to complete`)
					.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName(`completiontype`)
					.setDescription(`Requires all for completion for set for completion?`)
					.setRequired(true)
					.addChoices(
						{name: `All`, value: 1}
						, {name: `Specific`, value: 2}
					)
				)
				.addIntegerOption(option =>
					option.setName(`casketcheck`)
					.setDescription(`Set casket required type for this tile`)
					.setAutocomplete(true)
				)
				.addAttachmentOption(option =>
					option.setName(`attachment`)
					.setDescription(`image of the tile`)
				)
				.addStringOption(option =>
					option.setName(`url`)
					.setDescription(`url of the image`)
				)
			)
			.addSubcommand(option =>
				option.setName(`deletetile`)
				.setDescription(`Delete current tile on the bingo`)
				.addIntegerOption(option =>
					option.setName(`name`)
					.setDescription(`Name of the tile`)
					.setAutocomplete(true)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`addtiledrop`)
				.setDescription(`Add a drop associated to the tile`)
				.addIntegerOption(option =>
					option.setName(`name`)
					.setDescription(`The tile to assign drop to`)
					.setRequired(true)
					.setAutocomplete(true)
				)
				.addStringOption(option =>
					option.setName(`newname`)
					.setDescription(`Sets an item name (This name will show up in bingo submit)`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`modifytiledrop`)
				.setDescription(`Modify a drop associated to the tile`)
				.addIntegerOption(option =>
					option.setName(`name`)
					.setDescription(`The tile to assign drop to`)
					.setRequired(true)
					.setAutocomplete(true)
				)
				.addStringOption(option =>
					option.setName(`newname`)
					.setDescription(`Update an item name (This name will show up in bingo submit)`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`deletetiledrop`)
				.setDescription(`Delete a drop associated to the tile`)
				.addIntegerOption(option =>
					option.setName(`name`)
					.setDescription(`The tile to assign drop to`)
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`addchestchecktype`)
				.setDescription(`Add a new chest check requirement`)
				.addStringOption(option =>
					option.setName(`newname`)
					.setDescription(`Chest check type`)
					.setRequired(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`deletechestchecktype`)
				.setDescription(`Delete existing chest check requirement`)
				.addIntegerOption(option =>
					option.setName(`name`)
					.setDescription(`Chest check type`)
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
		),
    async execute(interaction) {
		const imageURL = interaction.options.getString('url');
		const attachmentOption = interaction.options.getAttachment('attachment');
		const width = interaction.options.getInteger('width');
		const height = interaction.options.getInteger('height');
		const x = interaction.options.getInteger('x');
		const y = interaction.options.getInteger('y');
		const name = interaction.options.getString('newname');
		const nameid = interaction.options.getInteger('name');
		const count = interaction.options.getInteger(`count`);
		const completiontype = interaction.options.getInteger(`completiontype`);
		const admin = interaction.options.getUser(`admin`);
		const time = interaction.options.getString(`time`);
		const imageDirectory = "C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\bingo";
		const casket = interaction.options.getInteger(`casketcheck`);
		// const imageDirectory = "C:\\Users\\administrator\\Desktop\\ToothlessBot\\images\\bingo";

		switch (interaction.options.getSubcommand()) {
			case 'boardviewtime':
				var parsedTime = Date.parse(time);
				if(isNaN(parsedTime)) {
					await interaction.reply({content: `Please verify the date time format for board view time!`});
				} else {
					await sequelize.query(`update bingo set view_start_time = ?`, {replacements: [parsedTime], type: QueryTypes.UPDATE});
					bingo.boardViewTime = parsedTime;
					await interaction.reply({content: new Date(parsedTime).toString()});
				}
				break;
			case 'submitendtime':
				var parsedTime = Date.parse(time);
				if(isNaN(parsedTime)) {
					await interaction.reply({content: `Please verify the date time format for board view time!`});
				} else {
					await sequelize.query(`update bingo set submit_end_time = ?`, {replacements: [parsedTime], type: QueryTypes.UPDATE});
					bingo.submitEndTime = parsedTime;
					await interaction.reply({content: new Date(parsedTime).toString()});
				}
				break;
			case 'submitstarttime':
				var parsedTime = Date.parse(time);
				if(isNaN(parsedTime)) {
					await interaction.reply({content: `Please verify the date time format for board view time!`});
				} else {
					await sequelize.query(`update bingo set submit_start_time = ?`, {replacements: [parsedTime], type: QueryTypes.UPDATE});
					bingo.submitStartTime = parsedTime;
					await interaction.reply({content: new Date(parsedTime).toString()});
				}
				break;
			case 'addadmin':
				if (bingo.bingoAdmins.some(bingoAdmin => bingoAdmin == interaction.user.id)) {
					var username;
					await interaction.guild.members.fetch(admin.id)
					.then((data) => {
						if (data.nickname) {
							username = data.nickname;
						} else {
							username = data.user.username;
						}
					});
					if (bingo.bingoAdmins.some(bingoAdmin => bingoAdmin == admin.id)) {
						await interaction.reply({content: `${username} has already been added!`});
					} else {
						await sequelize.query(`insert into bingoAdmins values (?, 1)`, {replacements: [admin.id], type: QueryTypes.INSERT});
						bingo.bingoAdmins.push(admin.id);
						await interaction.reply({content: `Added ${username}`});
					}
				} else {await interaction.reply({content: `You don't have access to use this command!`})}
				break;
			case 'removeadmin':
				if (bingo.bingoAdmins.some(bingoAdmin => bingoAdmin == interaction.user.id)) {
					var username;
					await interaction.guild.members.fetch(admin.id)
					.then((data) => {
						if (data.nickname) {
							username = data.nickname;
						} else {
							username = data.user.username;
						}
					});
					if (bingo.bingoAdmins.some(bingoAdmin => bingoAdmin == admin.id)) {
						await sequelize.query(`delete from bingoAdmins where id = ? and bingoID = 1`, {replacements: [admin.id], type: QueryTypes.DELETE});
						bingo.bingoAdmins.splice(bingo.bingoAdmins.indexOf(admin.id), 1);
						await interaction.reply({content: `${username} removed from bingo admin!`});
					} else {
						await interaction.reply({content: `${username} is not an admin!`});
					}
				} else {await interaction.reply({content: `You don't have access to use this command!`})}
				break;
			case 'setdimensions':
				bingo.setDimensions(width, height);
				await interaction.reply({
					content: `Dimensions set to ${width}x${height}`
				});
				break;
            case 'addtile':
				var attachmentURL;
				if (attachmentOption && imageURL) {
					await interaction.reply({content: 'Pick one only!', ephemeral: true});
					return;
				}
				if (!attachmentOption && !imageURL) {
					await interaction.reply({content: 'You must upload an image!', ephemeral: true});
					return;
				}
				var tileID = await bingo.xytoid(x, y);
				if (bingo.bingoTiles.has(tileID)) {
					await interaction.reply({content: `Tile already taken or name already exists!`});
					return; 
				}
				if (attachmentOption) {
					attachmentURL = attachmentOption.url;
				}
				if (imageURL) {
					attachmentURL = imageURL;
				}
				var message = await interaction.reply({content: `${name}`, files: [attachmentURL], fetchReply: true});
				var persistentImageURL = message.attachments.map(attachment => attachment.url);
				await general.downloadImage(persistentImageURL[0], `${imageDirectory}\\${tileID}.png`);
				bingo.bingoTiles.set(tileID, {name: name, completionType: completiontype, count: count, casketCheckType: casket, tiles: new Map()});
				await sequelize.query(`insert into bingoTiles values (?, ?, ?, ?, ?, ?)`, {replacements: [tileID,   name, `${imageDirectory}\\${tileID}.png`, count, completiontype, casket], type: QueryTypes.INSERT});
				await bingo.addTile(x, y, `${imageDirectory}\\${tileID}.png`);

				break;
			case 'modifytile':
				var attachmentURL;
				if (attachmentOption && imageURL) {
					await interaction.reply({content: 'Pick one only!', ephemeral: true});
					return;
				}
				if (!attachmentOption && !imageURL) {
					await interaction.reply({content: 'You must upload an image!', ephemeral: true});
					return;
				}
				var tileID = await bingo.xytoid(x, y);
				if (bingo.bingoTiles.has(tileID)) {
					interaction.reply({
						content: `Tile already taken!`
					});
					return;
				}
				for (let [key, value] of bingo.bingoTiles) {
					if (value.name == name && key != nameid) {
						interaction.reply({
							content: `Name already exists!`
						});
						return;
					}
				}
				if (attachmentOption) {
					attachmentURL = attachmentOption.url;
				}
				if (imageURL) {
					attachmentURL = imageURL;
				}
				var message = await interaction.reply({content: `${name}`, files: [attachmentOption.url], fetchReply: true});
				var persistentImageURL = message.attachments.map(attachment => attachment.url);
				await general.downloadImage(persistentImageURL[0], `${imageDirectory}\\${tileID}.png`);
				bingo.bingoTiles.delete(nameid);
				bingo.bingoTiles.set(tileID, {name: name, completionType: completiontype, count: count, casketCheckType: casket, tiles: new Map()});
				bingo.bingoTileDrops.forEach((value, key) => {
					if (value.bingoTileID == nameid) {
						value.bingoTileID = tileID;
					}
				})
				await sequelize.query(`update bingoTiles set id = ?, name = ?, path = ?, count = ?, completionType = ?, casketCheckTypeID = ? where id = ?`, {replacements: [tileID, name, `${imageDirectory}\\${tileID}.png`, count, completiontype, casket, nameid], type: QueryTypes.UPDATE});
				await sequelize.query(`update bingoTileDrops set bingoTileID = ? where bingoTileID = ?`, {replacements: [tileID, nameid], type: QueryTypes.UPDATE});
				if (tileID != nameid) {
					bingo.modifyTile(nameid, tileID, `${imageDirectory}\\${tileID}.png`)
				}
				break;
			case 'deletetile':
				// var tile = await sequelize.query(`select name from bingoTiles where id = ?`, {replacements: [nameid], type: QueryTypes.SELECT});
				tile = bingo.bingoTiles.get(nameid);
				var message = await interaction.reply({content: `${tile.name} deleted!`});
				await sequelize.query(`delete from bingoTiles where id = ?`, {replacements: [nameid], type: QueryTypes.DELETE});
				await sequelize.query(`delete from bingoTileDrops where bingoTileID = ?`, {replacements: [nameid], type: QueryTypes.DELETE});
				bingo.bingoTiles.delete(nameid);
				bingo.bingoTileDrops.forEach((value, key) => {
					if (value.bingoTileID == nameid) {
						bingo.bingoTileDrops.delete(key);
					}
				});
				bingo.deleteAndSaveTile(nameid);
				break;
			case 'display':
				const canvas = Canvas.createCanvas(bingo.canvasWidth, bingo.canvasHeight);
				const context = canvas.getContext('2d');
				
				const background = await Canvas.loadImage(`${imageDirectory}\\bingo-board-base.png`);
				context.drawImage(background,0,0);

				// load images
				const tileImage = await Canvas.loadImage(bingo.boardTilePath);
				context.drawImage(tileImage, 0, 0);
				const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'bingo-board.png' });
		
				const exampleEmbed = new EmbedBuilder()
				.setTitle('BINGOOOOOOOOOOOOOOOOO')
				.setImage('attachment://bingo-board.png');
		
				await interaction.reply({ embeds: [exampleEmbed], files: [attachment] });
				break;
			case 'clear':
				await sequelize.query(`delete from bingoTiles`, {type: QueryTypes.DELETE});
				await sequelize.query(`delete from bingoTileDrops`, {type: QueryTypes.DELETE});
				await bingo.createTileBoard();
				await interaction.reply({
					content: `Bingo board cleared!`
				});
				break;
			case 'addtiledrop':
				for (let [key, value] of bingo.bingoTileDrops) {
					if (value.name == name) {
						interaction.reply({
							content: `${name} already exists!`
						});
						return;
					}
				}
				let id = await sequelize.query(`insert into bingoTileDrops (bingoTileID, name) values (?, ?)`, {replacements: [nameid, name], type: QueryTypes.INSERT});
				bingo.bingoTileDrops.set(id[0], {name: name, bingoTileID: nameid});
				bingo.bingoTiles.get(nameid).tiles.set(id[0], new Map());
				bingo.bingoTeams.forEach((values, key) => {
					bingo.bingoTiles.get(nameid).tiles.get(id[0]).set(key, new Map());
					bingo.dropSpecificsText(key);
				});
				await interaction.reply({
					content: `${name} is now added!`
				})
				break;
			case 'modifytiledrop':
				for (let [key, value] of bingo.bingoTileDrops) {
					if (value.name == name) {
						interaction.reply({
							content: `${name} already exists!`
						});
						return;
					}
				}
				await sequelize.query(`update bingoTileDrops set name = ? where id = ?`, {replacements: [name, nameid], type: QueryTypes.UPDATE});
				bingo.bingoTileDrops.get(nameid).name = name;
				await interaction.reply({
					content: `${name} is now updated!`
				});
				break;
			case 'deletetiledrop':
				await sequelize.query(`delete from bingoTileDrops where id = ?`, {replacements: [nameid], type: QueryTypes.DELETE});
				bingo.bingoTileDrops.delete(nameid);
				await interaction.reply({
					content: `Bingo tile drop deleted!`
				});
				break;
			case 'addchestchecktype':
				for (let [key, value] of bingo.casketCheckTypes) {
					if (value.name == name) {
						interaction.reply({
							content: `${name} already exists!`
							, ephemeral: true
						});
					return;
					}
				}
				let casketCheckTypeID = await sequelize.query(`insert into bingoCasketCheckType (name) values (?)`, {replacements: [name], type: QueryTypes.INSERT});
				bingo.casketCheckTypes.set(casketCheckTypeID[0], {name: name, playerID: []});
				await interaction.reply({
					content: `Added ${name} to casket check!`
				});
				break;
			case 'deletechestchecktype':
				await sequelize.query(`delete from bingoCasketCheckType where id = ?`, {replacements: [name], type: QueryTypes.DELETE});
				await sequelize.query(`update bingoTiles set casketCheckTypeID = null where casketCheckTypeID = ?`, {replacements: [nameid], type: QueryTypes.UPDATE});
				let casketType = bingo.casketCheckTypes.get(nameid);
				bingo.casketCheckTypes.delete(nameid);
				await interaction.reply({
					content: `Deleted ${casketType.name} from casket check!`
				});
				break;
			default:
				await interaction.reply({
					content: `There's an error!`
				});
		}
    },
	async autocomplete(interaction) {
		if (interaction.options.getSubcommand() === 'addtile') {
			const focusedOption = interaction.options.getFocused(true);
			var filtered = [];
			switch (focusedOption.name) {
				case 'x':
					for (i = 1; i <= bingo.width; i++) {
						filtered.push({id: i, name: i});
					}
					break;
				case 'y':
					for (i = 1; i <= bingo.height; i++) {
						filtered.push({id: i, name: i});
					}
					break;
				case 'casketcheck':
					bingo.casketCheckTypes.forEach((value, key) => {
						filtered.push({id: key, name: value.name});
					});
					filtered = await filtered.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
					break;
				default:
					break;
			}
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.id}))
			);
		}
		if (['modifytile', 'deletetile', 'addtiledrop'].includes(interaction.options.getSubcommand())) {
			const focusedOption = interaction.options.getFocused(true);
			var filtered = [];
			switch (focusedOption.name) {
				case 'x':
					for (i = 1; i <= bingo.width; i++) {
						filtered.push({name: i, id: i});
					}
					break;
				case 'y':
					for (i = 1; i <= bingo.height; i++) {
						filtered.push({name: i, id: i});
					}
					break;
				case 'name':
					var tileNames = await sequelize.query(`select id, name from bingoTiles`, {type: QueryTypes.SELECT});
					filtered = await tileNames.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
					break;
				case 'casketcheck':
					bingo.casketCheckTypes.forEach((value, key) => {
						filtered.push({id: key, name: value.name});
					});
					break;
				default:
					break;
			}
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.id}))
			);
		}
		if (['modifytiledrop', 'deletetiledrop'].includes(interaction.options.getSubcommand())) {
			const focusedOption = interaction.options.getFocused(true);
			var filtered = [];
			var tileNames = await sequelize.query(`select id, name from bingoTileDrops`, {type: QueryTypes.SELECT});
			filtered = await tileNames.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.id}))
			);
		}
		if (interaction.options.getSubcommand() === 'deletechestchecktype') {
			const focusedOption = interaction.options.getFocused(true);
			var filtered = [];
			bingo.casketCheckTypes.forEach((value, key) => {
				filtered.push({id: key, name: value.name});
			});
			filtered = await filtered.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.id}))
			);
		}
	}
};