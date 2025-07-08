// const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
// const { Goals, sequelize } = require('../dbObjects.js');
// const { QueryTypes } = require('sequelize');

import { google } from "googleapis";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MediaGalleryBuilder, MediaGalleryItemBuilder, SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags, SeparatorSpacingSize, SectionBuilder } from 'discord.js';
import {sequelize} from '../dbObjects.js';
import {QueryTypes} from 'sequelize';

const auth = new google.auth.GoogleAuth({
    // keyFile: './googleapi.json'
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
    , jsonContent: googlejson
});

const sheetConfig = {
    sheets: google.sheets({version: 'v4', auth})
    , valueInputOption: 'USER_ENTERED'
    , spreadsheetID: '1XgFF-ePLlrOzq_SXHwo97VbiLvZdhgHDf1sP8NpYSF0'
}

export default {
    guildID: ['1070593540045934652'],
	data: new SlashCommandBuilder()
		.setName('bingo')
		.setDescription('bingo!!')
        .addSubcommand(subcommand =>
            subcommand.setName('signup')
            .setDescription(`Sign up for bingo!`)
            .addStringOption(option =>
                option.setName('rsn')
                .setDescription(`What's your rsn?`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('submit')
            .setDescription('Submit drop')
            .addStringOption(option =>
                option.setName('item')
                .setDescription(`The drop you're submitting`)
                .setRequired(true)
                .addChoices(
                    { name: 'Cryptbloom Helm', value: 'Cryptbloom Helm' },
                    { name: 'Cryptbloom top', value: 'Cryptbloom top' },
                    { name: 'Cryptbloom bottoms', value: 'Cryptbloom bottoms' },
                )
            )
            .addAttachmentOption(option =>
                option.setName('screenshot')
                .setDescription('Screenshot proof')
                .setRequired(true)
            )
        ),
	async execute(interaction) {
        await interaction.deferReply({});
        const subcommand = interaction.options.getSubcommand();        
        const rsn = interaction.options.getString('rsn');
        const item = interaction.options.getString('item');
        const attachment = interaction.options.getAttachment('screenshot');

        switch (subcommand) {
            case 'signup':
                const uploadArray = [[interaction.user.id, rsn]];
                sheetConfig.sheets.spreadsheets.values.append({
                    spreadsheetId: sheetConfig.spreadsheetID
                    , range: `signup!A:B`
                    , valueInputOption: sheetConfig.valueInputOption
                    , resource: {
                        values: uploadArray
                    }
                });
                await interaction.editReply({
                    content: `added ${rsn}`
                })
                break;
            case 'submit':
                const container = new ContainerBuilder().setAccentColor(0x3b5cac);
                const text1 = new TextDisplayBuilder().setContent(item);
                container.addTextDisplayComponents(text1);
		        const media = new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(attachment.url));
		        container.addMediaGalleryComponents(media);
		        container.addSeparatorComponents(separator => separator.setSpacing(SeparatorSpacingSize.Small));
                const acceptButton = new ButtonBuilder()
                    .setCustomId('bingoaccept')
                    .setLabel('Accept')
                    .setEmoji('✅')
                    .setStyle(ButtonStyle.Success);
                const rejectButton = new ButtonBuilder()
                    .setCustomId('bingoreject')
                    .setLabel('Accept')
                    .setEmoji('❌')
                    .setStyle(ButtonStyle.Danger);
                container.addActionRowComponents(row => row.addComponents([acceptButton, rejectButton]));
                interaction.editReply({
			        components: [container]
                    , flags: [MessageFlags.IsComponentsV2]
                });
                break;
            default:
                break;
        }
    },
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        var filtered;
        switch (interaction.options.getSubcommandGroup()) {
            case 'title':
                if (interaction.options.getSubcommand() == 'add') {
                    const genres = await sequelize.query(`SELECT id, genre display from MovieGenres`, { type: QueryTypes.SELECT });
                    filtered = genres.filter(choice => choice.display.includes(focusedValue));
                } else {
                    const focusedOption = interaction.options.getFocused(true);
                    var output;
                    if (focusedOption.name === 'selected_movie') output = await sequelize.query(`SELECT id, title display from MovieTitles`, { type: QueryTypes.SELECT });
                    else output = await sequelize.query(`SELECT id, genre display from MovieGenres`, { type: QueryTypes.SELECT });
                    filtered = output.filter(choice => choice.display.includes(focusedValue));
                }
                break;
            case 'genre':
                const genres = await sequelize.query(`SELECT id, genre display from MovieGenres`, { type: QueryTypes.SELECT });
                filtered = genres.filter(choice => choice.display.includes(focusedValue));
                break;
            default:
                break;
        }
        // const specialExist = await sequelize.query(`SELECT \`id\`, \`goal\` FROM \`Goals\` WHERE userID = ?`, { replacements: [interaction.user.id], type: QueryTypes.SELECT });
        // const filtered = specialExist.filter(choice => choice.goal.includes(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice.display, value: choice.id })),
        ).catch(console.err);
    }
};