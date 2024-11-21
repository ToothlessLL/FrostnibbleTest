const { SlashCommandBuilder, SlashCommandAttachmentOption } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder  } = require('discord.js');
const { sequelize } = require('../dbObjects.js');
const {QueryTypes} = require('sequelize');

module.exports = {
    guildID: ['0'],
	data: new SlashCommandBuilder()
	.setName('xp')
	.setDescription('Get xp rates and time to your goal!')
	.addIntegerOption(option =>
		option.setName('skill')
		.setDescription('The skill you want to train')
		.setAutocomplete(true)
		.setRequired(true)
	)
	.addIntegerOption(option =>
		option.setName('defaultgoal')
		.setDescription('Default preset goals')
		.addChoices(
			{name: '200m', value: 200000000}
			, {name: '150m', value: 150000000}
			, {name: 'Level 120', value: 104273167}
			, {name: '50m', value: 50000000}
		)
	)
	.addIntegerOption(option =>
		option.setName('levelgoal')
		.setDescription('Set the level goal you want')
	)
	.addIntegerOption(option =>
		option.setName('xpgoal')
		.setDescription('Set the xp goal you want')
	)
	.addStringOption(option =>
		option.setName('rsn')
		.setDescription('The rsn you want to lookup')
	),
    async execute(interaction) {
		await interaction.deferReply({});
		const skill = interaction.options.getInteger('skill');
		const selectedxp = interaction.options.getInteger('defaultgoal');
		const levelgoal = interaction.options.getInteger('levelgoal')
		const xpgoal = interaction.options.getInteger('xpgoal');
		const passedrsn = interaction.options.getString('rsn');
		const allOtherSkills = [0,83,174,276,388,512,650,801,969,1154,1358,1584,1833,2107,2411,2746,3115,3523,3973,4470,5018,5624,6291,7028,7842,8740,9730,10824,12031,13363,14833,16456,18247,20224,22406,24815,27473,30408,33648,37224,41171,45529,50339,55649,61512,67983,75127,83014,91721,101333,111945,123660,136594,150872,166636,184040,203254,224466,247886,273742,302288,333804,368599,407015,449428,496254,547953,605032,668051,737627,814445,899257,992895,1096278,1210421,1336443,1475581,1629200,1798808,1986068,2192818,2421087,2673114,2951373,3258594,3597792,3972294,4385776,4842295,5346332,5902831,6517253,7195629,7944614,8771558,9684577,10692629,11805606,13034431,14391160,15889109,17542976,19368992,21385073,23611006,26068632,28782069,31777943,35085654,38737661,42769801,47221641,52136869,57563718,63555443,70170840,77474828,85539082,94442737,104273167];
		const inventionXP = [0,830,1861,2902,3980,5126,6390,7787,9400,11275,13605,16372,19656,23546,28138,33520,39809,47109,55535,64802,77190,90811,106221,123573,143025,164742,188893,215651,245196,277713,316311,358547,404634,454796,509259,568254,632019,700797,774834,854383,946227,1044569,1149696,1261903,1381488,1508756,1644015,1787581,1939773,2100917,2283490,2476369,2679907,2894505,3120508,3358307,3608290,3870846,4146374,4435275,4758122,5096111,5449685,5819299,6205407,6608473,7028964,7467354,7924122,8399751,8925664,9472665,10041285,10632061,11245538,11882262,12542789,13227679,13937496,14672812,15478994,16313404,17176661,18069395,18992239,19945833,20930821,21947856,22997593,24080695,25259906,26475754,27728955,29020233,30350318,31719944,33129852,34580790,36073511,37608773,39270442,40978509,42733789,44537107,46389292,48291180,50243611,52247435,54303504,56412678,58575823,60793812,63067521,65397835,67785643,70231841,72737330,75303019,77929820,80618654];

		var rsn;
		if (!passedrsn) {
			const searchResult = await sequelize.query(`select rsn from rsn where userID = ?`, {replacements: [interaction.user.id], type: QueryTypes.SELECT});
			if (searchResult.length === 0) {
				await interaction.editReply({content: `You don't have an rsn set! Use \`/setrsn\` to set your rsn!`});
				return;
			}
			rsn = searchResult[0].rsn;
		} else {
			rsn = passedrsn;
		}
		rsn = rsn.replace(" ","_");
		
		var xp;
		if (!((selectedxp && !levelgoal && !xpgoal) || (!selectedxp && levelgoal && !xpgoal) || (!selectedxp && !levelgoal && xpgoal))) {
			await interaction.editReply({content: 'Please choose only one option!'});
			return;
		}
		const result = await (await fetch(`https://secure.runescape.com/m=hiscore/index_lite.ws?player=${rsn}`)).text();
		const playerStats = result.split("\n");
		if (playerStats[0].includes('Page not found')) {
			await interaction.editReply({content: `Please verify the rsn and try again`});
			return;
		}
		
		/* convert selected goal to xp */
		if (selectedxp) {
			xp = selectedxp;
		}
		if (levelgoal) {
			if (skill === 28) {
				xp = inventionXP[levelgoal-1];
			} else {
				xp = allOtherSkills[levelgoal-1];
			}
		}
		if (xpgoal) {
			xp = xpgoal;
		}

		/* get current player xp */
		const currentXP = playerStats[skill].split(",")[2];
		if (xp-currentXP <= 0) {
			await interaction.editReply({content: 'You have reached the goal already!'});
			return;
		}
		const skillsMap = new Map();
		skillsMap.set(17
			, {
				skill: 'Agility'
				, methods: [
					{method: 'Silverhawks (68k xp/h)', xph: 68000}
					, {method: 'Hefin Agility Course (120k xp/h)', xph: 120000}
					, {method: 'Anachronia Agility Course (143k xp/h)', xph: 143000}
				]
			}
		);
		skillsMap.set(23
			, {
				skill: 'Construction'
				, methods: [
					{method: 'Construction Contracts (342k xp/h)', xph: 342000}
					, {method: 'Mahogany Tables (588k xp/h)', xph: 588000}
					, {method: 'Flotsam Pawnbrokers (1.12m xp/h)', xph: 1120000}
					, {method: 'Protean Planks (1.3m xp/h)', xph: 1300000}
				]
			}
		);
		skillsMap.set(8
			, {
				skill: 'Cooking'
				, methods: [
					{method: 'Rocktails (405k xp/h)', xph: 405000}
					, {method: 'Blue Blubber Jellyfish (423k xp/h)', xph: 423000}
					, {method: 'Sailfish (453,600 xp/h)', xph: 453600}
					, {method: 'Wobbegong (648k xp/h)', xph: 648000}
					, {method: 'Wines (844,200 xp/h)', xph: 844200}
				]
			}
		);
		skillsMap.set(13
			, {
				skill: 'Crafting'
				, methods: [
					{method: 'Black Dragonhide Bodies (412,800 xp/h)', xph: 412800}
					, {method: 'Royal Dragonhide Bodies (451,200 xp/h)', xph: 451200}
					, {method: 'Cutting Diamonds (591,250 xp/h)', xph: 591250}
					, {method: 'Black Dragonhide Shield(584,800 xp/h)', xph: 584800}
					, {method: 'Cutting Dragonstones (756,250 xp/h)', xph: 756250}
				]
			}
		);
		skillsMap.set(26
			, {
				skill: 'Divination'
				, methods: [
					{method: 'Hall of Memories (450k xp/h)', xph: 450000}
					, {method: 'Incandescent Energies (500k xp/h)', xph: 500000}
				]
			}
		);
		skillsMap.set(12
			, {
				skill: 'Firemaking'
				, methods: [
					{method: 'Corrupt Magic Logs (303,050 xp/h)', xph: 303050}
					, {method: 'Elder Logs (412,585 xp/h)', xph: 412585}
					, {method: 'Driftwood (431,300 xp/h)', xph: 431300}
					, {method: 'Protean Logs (570k xp/h)', xph: 570000}
					, {method: 'Curly Roots (783k xp/h)', xph: 783000}
				]
			}
		);
		skillsMap.set(11
			, {
				skill: 'Fishing'
				, methods: [
					{method: 'Blue Blubber Jellyfish (108k xp/h)', xph: 108000}
					, {method: 'Waterfall Fishing (110k xp/h)', xph: 110000}
					, {method: 'Sailfish (126k xp/h)', xph: 126000}
					, {method: 'Wobbegongs (137k xp/h)', xph: 137000}
					, {method: 'Fishing Frenzy (405k xp/h)', xph: 405000}
				]
			}
		);
		skillsMap.set(10
			, {
				skill: 'Fletching'
				, methods: [
					{method: 'Protean Logs (291k xp/h)', xph: 291000}
					, {method: 'Ascension Bolts (400k xp/h)', xph: 400000}
					, {method: 'Rune Arrows (562,500 xp/h)', xph: 562500}
					, {method: 'Broad Arrows (675k xp/h)', xph: 675000}
					, {method: 'Rune Darts (1.034m xp/h)', xph: 1034000}
					, {method: 'Dragon Darts (1.5m xp/h)', xph: 1500000}
				]
			}
		);
		skillsMap.set(16
			, {
				skill: 'Herblore'
				, methods: [
					{method: 'Overloads (2.5m xp/h)', xph: 2500000}
					, {method: 'Elder Overload (2.1m xp/h)', xph: 2100000}
					, {method: 'Elder Overload Salve (1.5m xp/h)', xph: 1500000}
					, {method: 'Vulnerability Bomb (3.1m xp/h)', xph: 3100000}
					, {method: 'Powerburst of Vitality (2.6m xp/h)', xph: 2600000}
				]
			}
		);
		skillsMap.set(22
			, {
				skill: 'Hunter'
				, methods: [
					{method: 'Crystal Skillchompas (250k xp/h)', xph: 250000}
					, {method: 'Grenwalls (250k xp/h)', xph: 250000}
					, {method: 'Charming Moths (240k xp/h)', xph: 240000}
					, {method: 'Ornate Tortles (400k xp/h)', xph: 400000}
					, {method: 'Proteah Traps (900k xp/h)', xph: 900000}
				]
			}
		);
		skillsMap.set(15
			, {
				skill: 'Mining'
				, methods: [
					{method: 'Light/Dark Animica (117,300 xp/h)', xph: 117300}
					, {method: 'Seren Stones (153,300 xp/h)', xph: 153300}
					, {method: 'Alaea Crablets (229,950 xp/h)', xph: 229950}
				]
			}
		);
		skillsMap.set(21
			, {
				skill: 'Runecrafting'
				, methods: [
					{method: 'Blood Runes (120k xp/h)', xph: 120000}
					, {method: 'Nature Runes (225k xp/h)', xph: 225000}
					, {method: 'Soul Runes (345k xp/h)', xph: 345000}
				]
			}
		);
		skillsMap.set(14
			, {
				skill: 'Smithing'
				, methods: [
					{method: 'Corrupt Ore (240k xp/h)', xph: 240000}
					, {method: 'Protean Bars (397k xp/h)', xph: 397000}
					, {method: 'Burial Bane Platebody 2 ticking (292173 xp/h)', xph: 292173}
					, {method: 'Elder Rune Platebody 2 ticking (1.912m xp/h)', xph: 1912350}
				]
			}
		);
		skillsMap.set(18
			, {
				skill: 'Thieving'
				, methods: [
					{method: 'Prifddinas Thieving (450k xp/h)', xph: 450000}
					, {method: 'Traders (800k xp/h)', xph: 800000}
					, {method: 'Safecracking (850k xp/h)', xph: 850000}
				]
			}
		);
		skillsMap.set(9
			, {
				skill: 'Woodcutting'
				, methods: [
					{method: 'Crystal Trees (92k xp/h)', xph: 92000}
					, {method: 'Golden Bamboo (131,100 xp/h)', xph: 131100}
					, {method: 'Acadia Trees with Crystallise (180k xp/h)', xph: 180000}
				]
			}
		);

		var embed = new EmbedBuilder()
		.setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
		.setTitle(`${rsn}'s xp and goal:`)
		.setDescription(`Current ${skillsMap.get(skill).skill} exp: ${numberWithCommas(currentXP)} exp\nTarget exp: ${numberWithCommas(xp)} exp\nRemaining exp: ${numberWithCommas(xp-currentXP)} exp`);
		for (const method of skillsMap.get(skill).methods) {
			embed.addFields({name: `${method.method}:`, value: `${numberWithCommas(((xp-currentXP)/method.xph).toFixed(2))} hours`});
		}

        interaction.editReply({embeds: [embed]});
    },
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		var filtered;
		var skills = [{name: 'Cooking', value: 8}
			, {name: 'Woodcutting', value: 9}
			, {name: 'Fletching', value: 10}
			, {name: 'Fishing', value: 11}
			, {name: 'Firemaking', value: 12}
			, {name: 'Crafting', value: 13}
			, {name: 'Smithing', value: 14}
			, {name: 'Mining', value: 15}
			, {name: 'Herblore', value: 16}
			, {name: 'Agility', value: 17}
			, {name: 'Thieving', value: 18}
			, {name: 'Runecrafting', value: 21}
			, {name: 'Hunter', value: 22}
			, {name: 'Construction', value: 23}
			, {name: 'Divination', value: 26}
		];
		filtered = skills.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.value })),
		);
	}
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}