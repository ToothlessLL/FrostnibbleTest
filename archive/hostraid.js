const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    guildID: ['1003482379366715402'],
	data: new SlashCommandBuilder()
		.setName('hostraid')
		.setDescription('Host FFIV raids')
        .addStringOption(option =>
            option.setName('boss')
            .setDescription('The boss to fight')
            .setRequired(false))
        .addStringOption(option => 
            option.setName('date')
            .setDescription('The date you like to host this boss')
            .setRequired(false))
        .addStringOption(option => 
            option.setName('time')
            .setDescription('The time you like to host this boss')
            .setRequired(false))
        .addStringOption(option => 
            option.setName('comments')
            .setDescription('Any comments you want to add about this session')
            .setRequired(false)),
    async execute(interaction) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('PLD')
					.setLabel('PLD')
                    .setEmoji(interaction.client.emojis.cache.get('1020852399503577118').toString())
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('WAR')
					.setLabel('WAR')
                    .setEmoji(interaction.client.emojis.cache.get('1020852917001003028').toString())
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('DRK')
					.setLabel('DRK')
                    .setEmoji(interaction.client.emojis.cache.get('1020852971799593100').toString())
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('GNB')
					.setLabel('GNB')
                    .setEmoji(interaction.client.emojis.cache.get('1020852947866890250').toString())
					.setStyle(ButtonStyle.Primary),
			);
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('WHM')
                    .setLabel('WHM')
                    .setEmoji(interaction.client.emojis.cache.get('1020852998303395860').toString())
                    .setStyle(ButtonStyle.Success),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SCH')
                    .setLabel('SCH')
                    .setEmoji(interaction.client.emojis.cache.get('1020853020344471572').toString())
                    .setStyle(ButtonStyle.Success),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('AST')
                    .setLabel('AST')
                    .setEmoji(interaction.client.emojis.cache.get('1020853067165474867').toString())
                    .setStyle(ButtonStyle.Success),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SGE')
                    .setLabel('SGE')
                    .setEmoji(interaction.client.emojis.cache.get('1020853095913242675').toString())
                    .setStyle(ButtonStyle.Success),
            );
        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('MNK')
                    .setLabel('MNK')
                    .setEmoji(interaction.client.emojis.cache.get('1020853515733713008').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('DRG')
                    .setLabel('DRG')
                    .setEmoji(interaction.client.emojis.cache.get('1020853552731664435').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('NIN')
                    .setLabel('NIN')
                    .setEmoji(interaction.client.emojis.cache.get('1020853663146713138').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SAM')
                    .setLabel('SAM')
                    .setEmoji(interaction.client.emojis.cache.get('1020853629227368548').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('RPR')
                    .setLabel('RPR')
                    .setEmoji(interaction.client.emojis.cache.get('1020853593265426432').toString())
                    .setStyle(ButtonStyle.Danger),
            );
        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('BRD')
                    .setLabel('BRD')
                    .setEmoji(interaction.client.emojis.cache.get('1020853734105940059').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('MCH')
                    .setLabel('MCH')
                    .setEmoji(interaction.client.emojis.cache.get('1020853793203695706').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('DNC')
                    .setLabel('DNC')
                    .setEmoji(interaction.client.emojis.cache.get('1020853767551328427').toString())
                    .setStyle(ButtonStyle.Danger),
            );
        const row5 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('BLM')
                    .setLabel('BLM')
                    .setEmoji(interaction.client.emojis.cache.get('1020853829283090434').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SMN')
                    .setLabel('SMN')
                    .setEmoji(interaction.client.emojis.cache.get('1020853919561306193').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('RDM')
                    .setLabel('RDM')
                    .setEmoji(interaction.client.emojis.cache.get('1020853879149170718').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setEmoji('❌')
                    .setStyle(ButtonStyle.Secondary),
            );
        const boss = interaction.options.getString('boss');
        const date = interaction.options.getString('date');
        const time = interaction.options.getString('time');
        const comments = interaction.options.getString('comments');
        let content = '';
        content += boss ? `Boss: **${boss}**\n` : '';
        content += date ? `Date: **${date}**\n` : '';
        content += time ? `Time: **${time}**\n` : '';
        content += comments ? `Comments: **${comments}**\n\nRoster (0/8):` : '\nRoster (0/8):';
        await interaction.deferReply();
        await interaction.editReply({ content: content, components: [row, row2, row3, row4, row5] });
    },
};
    
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}