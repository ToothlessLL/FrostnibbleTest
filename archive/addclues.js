const { SlashCommandBuilder } = require('@discordjs/builders');
const {google} = require('googleapis');

module.exports = {
    guildID: ['0'],
	data: new SlashCommandBuilder()
		.setName('addclues')
		.setDescription('add to clue spreadsheet')
		.addSubcommand(option =>
			option.setName('hard')
			.setDescription('add a hards clue drop')
			.addStringOption(option =>
				option.setName('item')
				.setDescription(`The item you're submitting`)	
				.addChoices(
					{name: `Barrows dye`, value: `Barrows dye`}
					, {name: `Shadow dye`, value: `Shadow dye`}
					, {name: `Sack of effigies`, value: `Sack of effigies`}
					, {name: `Backstab cape`, value: `Backstab cape`}
					, {name: `Explosive barrel`, value: `Explosive barrel`}
					, {name: `Third age ranger coif`, value: `Third age ranger coif`}
					, {name: `Third age ranger body`, value: `Third age ranger body`}
					, {name: `Third age ranger chaps`, value: `Third age ranger chaps`}
					, {name: `Third age vambraces`, value: `Third age vambraces`}
					, {name: `Third age robe top`, value: `Third age robe top`}
					, {name: `Third age robe`, value: `Third age robe`}
					, {name: `Third age mage hat`, value: `Third age mage hat`}
					, {name: `Third age amulet`, value: `Third age amulet`}
					, {name: `Third age platelegs`, value: `Third age platelegs`}
					, {name: `Third age platebody`, value: `Third age platebody`}
					, {name: `Third age full helmet`, value: `Third age full helmet`}
					, {name: `Third age kiteshield`, value: `Third age kiteshield`}
				)
				.setRequired(true)
			)
			.addIntegerOption(option =>
				option
				.setName('totalcluecount')
				.setDescription('the total clue count you have (not total caskets you are opening this time)')
				.setRequired(true)
			)
			.addIntegerOption(option =>
				option
				.setName('casketsleft')
				.setDescription('number of caskets left to open')
				.setRequired(true)
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
				.addChoices(
					{name: `Barrows dye`, value: `Barrows dye`}
					, {name: `Shadow dye`, value: `Shadow dye`}
					, {name: `Ice dye`, value: `Ice dye`}
					, {name: `Third Age dye`, value: `Third Age dye`}
					, {name: `Blood dye`, value: `Blood dye`}
					, {name: `Sack of effigies`, value: `Sack of effigies`}
					, {name: `Backstab cape`, value: `Backstab cape`}
					, {name: `Third age druidic staff`, value: `Third age druidic staff`}
					, {name: `Third age druidic cloak`, value: `Third age druidic cloak`}
					, {name: `Third age druidic wreath`, value: `Third age druidic wreath`}
					, {name: `Third age druidic robe top`, value: `Third age druidic robe top`}
					, {name: `Third age druidic robe bottom`, value: `Third age druidic robe bottom`}
				)
				.setRequired(true)
			)
			.addIntegerOption(option =>
				option
				.setName('totalcluecount')
				.setDescription('the total clue count you have (not total caskets you are opening this time)')
				.setRequired(true)
			)
			.addIntegerOption(option =>
				option
				.setName('casketsleft')
				.setDescription('number of caskets left to open')
				.setRequired(true)
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
				.addChoices(
					{name: `Barrows dye`, value: `Barrows dye`}
					, {name: `Shadow dye`, value: `Shadow dye`}
					, {name: `Ice dye`, value: `Ice dye`}
					, {name: `Third Age dye`, value: `Third Age dye`}
					, {name: `Blood dye`, value: `Blood dye`}
					, {name: `Sack of effigies`, value: `Sack of effigies`}
					, {name: `Backstab cape`, value: `Backstab cape`}
					, {name: `Second-Age full helm`, value: `Second-Age full helm`}
					, {name: `Second-Age platebody`, value: `Second-Age platebody`}
					, {name: `Second-Age platelegs`, value: `Second-Age platelegs`}
					, {name: `Second-Age sword`, value: `Second-Age sword`}
					, {name: `Second-Age mage mask`, value: `Second-Age mage mask`}
					, {name: `Second-Age robe top`, value: `Second-Age robe top`}
					, {name: `Second-Age robe bottom`, value: `Second-Age robe bottom`}
					, {name: `Second-Age staff`, value: `Second-Age staff`}
					, {name: `Second-Age range coif`, value: `Second-Age range coif`}
					, {name: `Second-Age range top`, value: `Second-Age range top`}
					, {name: `Second-Age range legs`, value: `Second-Age range legs`}
					, {name: `Second-Age bow`, value: `Second-Age bow`}
					, {name: `Orlando Smith's hat`, value: `Orlando Smith's hat`}
				)
				.setRequired(true)
			)
			.addIntegerOption(option =>
				option
				.setName('totalcluecount')
				.setDescription('the total clue count you have (not total caskets you are opening this time)')
				.setRequired(true)
			)
			.addIntegerOption(option =>
				option
				.setName('casketsleft')
				.setDescription('number of caskets left to open')
				.setRequired(true)
			)
			.addAttachmentOption(option =>
				option.setName('image')
				.setDescription('Screenshot of your drop')
			)
			.addStringOption(option =>
				option.setName('screenshoturl')
				.setDescription('Use this if you have the screenshot URL')
			)
		),
    async execute(interaction) {
		await interaction.deferReply();
		const tier = `${interaction.options.getSubcommand()[0].toUpperCase()}${interaction.options.getSubcommand().slice(1)}`;
		const item = interaction.options.getString('item')
		const attachment = interaction.options.getAttachment('image');
		const imageURL = interaction.options.getString('screenshoturl');
		const totalClueCount = interaction.options.getInteger('totalcluecount');
		const casketsLeft = interaction.options.getInteger('casketsleft');		

		let clueTotalCell;
		let itemWithImage;
		var message;
		const sheets = [
			{id: '162955183670820864', sheetID: '1UJ2hXXKMCyeCbC-uxzUgNi3cJBCcyvNWHG_DO_0POSY'} //alan
			, {id: '522686803711361026', sheetID: '1nZtokJhTIJx94hpDLB4SSG6w00ShMrTLClPrtStW1OQ'} //kate
			, {id: '443940818794053644', sheetID: '13WlydwhM4TnAir-YxE9uud1gTpVGDa7y7_Hi5sSqom0'} //thomas
			, {id: '164105600718995456', sheetID: '1h-vpycaF9DYt2U84tEb-zV_bnvyNCZgNRCkiAHWI0Lo'} //hunter
			, {id: '107255303497601024', sheetID: '1OyC_hvA_I-08Eh32n8tF4uomqbaXyV2zKYzwS1gYK_8'} //josh
		]
		const userSheet = sheets.filter(item => item.id === interaction.user.id);

		if (userSheet.length == 0) {
			interaction.editReply({content: `You're not setup to use this command!`});
			return;
		}
		if (attachment && imageURL) {
			interaction.editReply({content: 'Pick one only!', ephemeral: true});
			return;
		}
		if (!attachment && !imageURL) {
			interaction.editReply({content: 'You must upload an image!', ephemeral: true});
			return;
		}
		// if (attachment) {
		// 	itemWithImage = `=hyperlink("${attachment.url}","${item}")`;
		// }
		// if (imageURL) {
		// 	itemWithImage = `=hyperlink("${attachment.url}","${item}")`;
		// }
		if (attachment) {
			message = await interaction.editReply({
				files: [attachment.url]
				, fetchReply: true
			});
		}
		if (imageURL) {
			message = await interaction.editReply({
				files: [imageURL]
				, fetchReply: true
			});
		}
		
		const persistentImageURL = message.attachments.map(attachment => attachment.url);
		itemWithImage = `=hyperlink("${persistentImageURL[0]}","${item}")`;

		if (tier === 'Hard') {
			clueTotalCell = "fun!D16";
		} else if (tier === 'Elite') {
			clueTotalCell = "fun!I16";
		} else {
			clueTotalCell = "fun!N16";
		}

        const auth = new google.auth.GoogleAuth({
			keyFile: "marine-bison-365502-14f06e74af7e.json",
			scopes: 'https://www.googleapis.com/auth/spreadsheets',
		});
		
		const service = google.sheets({version: 'v4'});

		await service.spreadsheets.values.append({
			auth
			, spreadsheetId: userSheet[0].sheetID
			, range: "submissions!A:E"
            , valueInputOption: "USER_ENTERED"
            , resource: {
                values: [
                    [itemWithImage, null, totalClueCount - casketsLeft, formatDate(new Date()), tier]
                ]
            }
		});

		await service.spreadsheets.values.update({
			auth
			, spreadsheetId: userSheet[0].sheetID
			, range: clueTotalCell
            , valueInputOption: "USER_ENTERED"
            , resource: {
                values: [
                    [totalClueCount]
                ]
            }
		});
    },
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
