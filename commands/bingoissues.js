// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
//const client = require ("../index");

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MediaGalleryBuilder, MediaGalleryItemBuilder, SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags, SeparatorSpacingSize, SectionBuilder } from 'discord.js';

export default {
    guildID: ['396178885261262848'],
	data: new SlashCommandBuilder()
		.setName('bingoissues')
		.setDescription('Sends out the bingo issue button!'),
	async execute(interaction) {
        const container = new ContainerBuilder().setAccentColor(0x3b5cac);
		const media = new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL('https://cdn.discordapp.com/attachments/1373061487790395544/1373070522950226021/Bingo_Gif.gif?ex=68291313&is=6827c193&hm=39b915bf059218e13e7b72fed3d3d35dbd1ead8082dda25c040378942732aa1b&'));
        const text1 = new TextDisplayBuilder().setContent(
          `-# **Click the button to the right to contact a bingo overlord**`
        );
        const button = new ButtonBuilder()
			.setCustomId('bingoissues')
			.setLabel('Issue Ticket')
			.setEmoji('📩')
			.setStyle(ButtonStyle.Danger);
		container.addMediaGalleryComponents(media);
		container.addSeparatorComponents(separator => separator.setSpacing(SeparatorSpacingSize.Small));
		const section = new SectionBuilder().addTextDisplayComponents(text1).setButtonAccessory(button);
		container.addSectionComponents(section)
        // container.addTextDisplayComponents(text1);
        // container.addActionRowComponents(row => row.addComponents(button));
        interaction.channel.send({
			components: [container]
			, flags: [MessageFlags.IsComponentsV2]
		});
		interaction.reply({
			content: 'sent'
			, flags: [MessageFlags.Ephemeral]
			, ephemeral: true
		});
	},
};
