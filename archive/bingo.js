const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, AttachmentBuilder, SlashCommandBuilder  } = require('discord.js');
const { sequelize } = require('../dbObjects.js');
const { QueryTypes } = require('sequelize');
const Canvas = require('@napi-rs/canvas');
const bingo = require(`../functions/bingo/bingo.js`);
const general = require(`../functions/general.js`);

module.exports = {
	guildID: ['902646067466747934']
	, data: new SlashCommandBuilder()
		.setName('bingo')
		.setDescription('cutie bingo related commands!')
		.addSubcommand(option =>
			option.setName('signup')
			.setDescription('signup for bingo!')
			.addStringOption(option =>
				option.setName('rsn')
				.setDescription(`Your rsn`)
				.setRequired(true)
			)
		)
		.addSubcommand(option =>
			option.setName('submit')
			.setDescription('submit a bingo drop')
			.addIntegerOption(option =>
				option.setName('tile')
				.setDescription(`The tile you're submitting for`)
				.setAutocomplete(true)
				.setRequired(true)
			)
			.addUserOption(option =>
				option.setName(`name`)
				.setDescription(`The player you're submitting on behalf of`)
			)
			.addAttachmentOption(option =>
				option.setName('attachment')
				.setDescription('The image to upload')
			)
			.addStringOption(option =>
				option.setName('url')
				.setDescription('The URL of the image')
			)
		)
		.addSubcommandGroup(option =>
			option.setName('board')
			.setDescription('Display current board')
			.addSubcommand(option =>
				option.setName(`display`)
				.setDescription(`Display current board`)
				.addIntegerOption(option =>
					option.setName('team')
					.setDescription(`The team's board to view`)
					.setAutocomplete(true)
				)
			)
			.addSubcommand(option =>
				option.setName(`drops`)
				.setDescription(`View the current drops`)
				.addIntegerOption(option =>
					option.setName('team')
					.setDescription(`The team's board to view`)
					.setAutocomplete(true)
				)
			)
		)
		.addSubcommand(option =>
			option.setName('casketcheck')
			.setDescription('submit a casket check')
			.addIntegerOption(option =>
				option.setName(`casket`)
				.setDescription(`The casket check to submit`)
				.setRequired(true)
				.setAutocomplete(true)
			)
			.addAttachmentOption(option =>
				option.setName('attachment')
				.setDescription('The image to upload')
			)
			.addStringOption(option =>
				option.setName('url')
				.setDescription('The URL of the image')
			)
		)
		.addSubcommand(option =>
			option.setName(`leaderboards`)
			.setDescription(`Display current leaderboards`)
		)
		.addSubcommand(option =>
			option.setName(`playerleaderboards`)
			.setDescription(`Display current player leaderboards`)
		),
    async execute(interaction) {
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('acceptInput')
				.setLabel('Accept')
				.setEmoji('✅')
				.setStyle(ButtonStyle.Success),
		)
		.addComponents(
			new ButtonBuilder()
				.setCustomId('rejectInput')
				.setLabel('Reject')
				.setEmoji('❌')
				.setStyle(ButtonStyle.Danger),
		);
		const casketButtons = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('acceptCasket')
				.setLabel('Accept')
				.setEmoji('✅')
				.setStyle(ButtonStyle.Success),
		)
		.addComponents(
			new ButtonBuilder()
				.setCustomId('rejectInput')
				.setLabel('Reject')
				.setEmoji('❌')
				.setStyle(ButtonStyle.Danger),
		)
		const item = interaction.options.getInteger('tile')
		const casket = interaction.options.getInteger('casket')
		const attachment = interaction.options.getAttachment('attachment');
		const imageURL = interaction.options.getString('url');
		const team = interaction.options.getInteger('team');
		const name = interaction.options.getUser('name');

        switch (interaction.options.getSubcommand()) {
            case 'signup':
				if (bingo.bingoPlayers.has(interaction.user.id)) {
					await interaction.reply({
						content: `You have already signed up!`
						, ephemeral: true
					});
					return;
				}
				await sequelize.query(`insert into bingoPlayers (id) values (?)`, {replacements: [interaction.user.id], type: QueryTypes.INSERT});
				await interaction.reply({
					content: `signed up!`
				});
				break;
			case 'submit':
				let username;
				let userid = interaction.user.id;
				if (name) {
					userid = name.id;
					checkIfExist = await sequelize.query(`select a.id from bingoPlayers a inner join bingoPlayers b on a.team = b.team where a.id = ? and b.id = ?`, {replacements: [interaction.user.id, name.id], type: QueryTypes.SELECT});
					if (checkIfExist.length == 0) {
						await interaction.reply({content: `Sorry, the player you selected is not on the same team as you!`, ephemeral: true});
						return;
					}
					userid = name.id;
					await interaction.guild.members.fetch(name.id)
					.then((data) => {
						if (data.nickname) {
							username = ` | ${name.id} | Submitted on behalf of ${data.nickname}`;
						} else {
							username = ` | ${name.id} | Submitted on behalf of ${data.user.username}`;
						}
					});
				} else {
					if (!bingo.bingoPlayers.has(userid)) {
						await interaction.reply({
							content: `Sorry, you can't submit because you're not in the bingo!`
							, ephemeral: true
						});
						return;
					}
					username = '';
				}
				if (await bingo.checkDrop(bingo.bingoPlayers.get(userid).team, item)) {
					await interaction.reply({
						content: `This tile is complete already!`
						, ephemeral: true
					});
					return;
				}
				if (bingo.bingoTiles.get(bingo.bingoTileDrops.get(item).bingoTileID).casketCheckType) {
					if (!bingo.casketCheckTypes.get(bingo.bingoTiles.get(bingo.bingoTileDrops.get(item).bingoTileID).casketCheckType).playerID.some(id => id == userid)) {
						await interaction.reply({
							content: `You have not submitted your bingo chest check!`
							, ephemeral: true
						});
						return;
					}
				}
				if (attachment && imageURL) {
					await interaction.reply({content: 'Pick one only!', ephemeral: true});
					return;
				}
				if (!attachment && !imageURL) {
					await interaction.reply({content: 'You must upload an image!', ephemeral: true});
					return;
				}
				let id = await sequelize.query(`insert into bingoDrops (bingoPlayerID, bingoTileDropID) values (?, ?)`, {replacements: [userid, item], type: QueryTypes.INSERT});
				let userTileDrop = bingo.bingoTileDrops.get(item);
				// let userTile = bingo.bingoTiles.get(userTileDrop.bingoTileID);
				var submissionEmbed = new EmbedBuilder()
					.setTitle(userTileDrop.name)
					.setTimestamp()
					.setFooter({text: `${id[0].toString()} | ${item}${username}`});
		
				if (attachment) {
					submissionEmbed.setImage(attachment.url);
					await interaction.reply({embeds: [submissionEmbed], components: [row]});
					return;
				}
				if (imageURL) {
					submissionEmbed.setImage(imageURL);
					await interaction.reply({embeds: [submissionEmbed], components: [row]});
					return;
				}
				break;
			case 'display':
				await interaction.deferReply();
				let groupedEmbed = [];
				let groupedAttachments = [];
				let teamList = [];
				if (team) {
					teamList.push(team);
				} else {
					if (bingo.bingoPlayers.has(interaction.user.id)) {
						teamList.push(bingo.bingoPlayers.get(interaction.user.id).team);
					} else {
						bingo.bingoTeams.forEach((value, key) => {
							teamList.push(key);
						});
					}
				}
				for (const team of teamList) {
					let teamName = bingo.bingoTeams.get(team);
					groupedAttachments.push(await bingo.displayTeamBoard(teamName.name));
					const embed = new EmbedBuilder()
					.setTitle(teamName.name)
					.setImage(`attachment://${teamName.name}.png`)
					.setTimestamp();

					groupedEmbed.push(embed);
				}
				await interaction.editReply({ embeds: groupedEmbed, files: groupedAttachments });
				break;
			case `leaderboards`:
				let leaderboardText = '';
				bingo.bingoTeams.forEach((value, key) => {
					leaderboardText += `${value.name} - ${value.points.toFixed(2)}\n`;
				})
				let leaderboardEmbed = new EmbedBuilder()
					.setTitle(`Leaderboards!`)
					.setDescription(leaderboardText);

				await interaction.reply({
					embeds: [leaderboardEmbed]
				});
				break;
			case `playerleaderboards`:
				let playerLeaderboards = await bingo.playerLeaderboards();
				let playerLeaderboardsArray = [];
				let usernameLength = 0;
				let points = 9;
				let pointsLength = 0;
				let numberOfPlayers = playerLeaderboards.size.toString().length + 7;
				let numberOfPlayersPadding = playerLeaderboards.size.toString().length;
				let pointsNumber;
				for (const [key, value] of playerLeaderboards) {
					let playerUsername = await general.getUsernameByID(key, interaction);
					pointsNumber = value + 9;
					playerLeaderboardsArray.push({playerUsername: playerUsername, value: pointsNumber});
					usernameLength = usernameLength < playerUsername.length ? playerUsername.length : usernameLength;
					pointsLength = pointsLength < pointsNumber.toFixed(2).length ? pointsNumber.toFixed(2).length : pointsLength;
				};
				playerLeaderboardsArray.sort(function(a, b){return b.value - a.value});
				let result = `\`\`\`ansi\n[1;36m`;
				for (let i = 0; i < (usernameLength + numberOfPlayers + points + pointsLength - `Player Leaderboards!`.length)/2; i++) {
					result += ' ';
				}
				result += `[1;4;36mPlayer Leaderboards!\n[0m[1;30m`
				for (let i = 0; i < usernameLength + numberOfPlayers + points + pointsLength; i++) {
					result += `-`;
				}
				for (const [i, value] of playerLeaderboardsArray.entries()) {
					result += `\n[1;30m|[0;35m ${(i+1).toString().padStart(numberOfPlayersPadding)}. [0;34m${value.playerUsername.padEnd(usernameLength)} [0;30m|[0;33m ${value.value.toFixed(2).padStart(pointsLength)} points [1;30m|\n`;
					result += ` ${''.padStart(numberOfPlayersPadding)}  hehepp`;
					if (i !== playerLeaderboardsArray.length - 1) {
						result += `[0;30m|`;
						for (let j = 0; j < usernameLength + numberOfPlayers + points + pointsLength - 2; j++) {
							result += `-`;
						}
						result += `|`
					}
				}
				for (let i = 0; i < usernameLength + numberOfPlayers + points + pointsLength; i++) {
					result += `-`;
				}
				result += `\n\`\`\``;
				await interaction.reply({content: result});
				break;
			case `drops`:
				let bingoTeam;
				if (!bingo.bingoPlayers.has(interaction.user.id)) {
					if (!team) {
						await interaction.reply({
							content: `You must select a team!`
							, ephemeral: true
						});
						return;
					}
				}
				if (team) {
					bingoTeam = team;
				} else {
					bingoTeam = bingo.bingoPlayers.get(interaction.user.id).team;
				}
				await interaction.reply({
					content: bingo.bingoTeams.get(bingoTeam).dropSpecifics
				});
				break;
			case 'casketcheck':
				if (attachment && imageURL) {
					await interaction.reply({content: 'Pick one only!', ephemeral: true});
					return;
				}
				if (!attachment && !imageURL) {
					await interaction.reply({content: 'You must upload an image!', ephemeral: true});
					return;
				}
				var casketCheck = bingo.casketCheckTypes.get(casket);
				var casketEmbed = new EmbedBuilder()
					.setTitle(casketCheck.name)
					.setTimestamp()
					.setFooter({text: casket.toString()});
		
				if (attachment) {
					casketEmbed.setImage(attachment.url);
					await interaction.reply({embeds: [casketEmbed], components: [casketButtons]});
					return;
				}
				if (imageURL) {
					casketEmbed.setImage(imageURL);
					await interaction.reply({embeds: [casketEmbed], components: [casketButtons]});
					return;
				}

				break;
			default:
				await interaction.reply({
					content: `There's an error!`
				});
		}
    },
	async autocomplete(interaction) {
		if (interaction.options.getSubcommand() === 'display') {
			var teams = await sequelize.query(`select id, name from bingoTeams`, {type: QueryTypes.SELECT});
			const focusedOption = interaction.options.getFocused(true);
			var filtered = [];
			filtered = await teams.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.id}))
			);
		}
		if (interaction.options.getSubcommand() === 'submit') {
			const focusedOption = interaction.options.getFocused(true);
			filtered = [];
			bingo.bingoTileDrops.forEach((values, keys) => {
				if (values.name.toLowerCase().includes(focusedOption.value.toLowerCase())) filtered.push({id: keys, name: values.name});
			});
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.id}))
			);
		}
		if (interaction.options.getSubcommand() === 'casketcheck') {
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
		if (interaction.options.getSubcommand() === 'drops') {
			var teams = await sequelize.query(`select id, name from bingoTeams`, {type: QueryTypes.SELECT});
			const focusedOption = interaction.options.getFocused(true);
			var filtered = [];
			filtered = await teams.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
			filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
			await interaction.respond(
				filtered.map(choice => ({name: choice.name, value: choice.id}))
			);
		}
	}
};