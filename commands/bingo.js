// const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
// const { Goals, sequelize } = require('../dbObjects.js');
// const { QueryTypes } = require('sequelize');

import { google } from "googleapis";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MediaGalleryBuilder, MediaGalleryItemBuilder, SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags, SeparatorSpacingSize, SectionBuilder } from 'discord.js';
import {sequelize} from '../dbObjects.js';
import {QueryTypes} from 'sequelize';

const googlejson = {
  "type": "service_account",
  "project_id": "striking-effort-443801-v3",
  "private_key_id": "319c721b6d450195666043df3db756efa7f0b0ae",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDva3hPuxANsd0g\n6sJfijfHK+LF1fmMDjuCuKtihqKffaZlBYyptGiTDRmuS8uXdzdlRy0K3pxDZbL0\n35a4C9/ZOvIkeMtJoD1M0mqy6dSg2U9qGmjPLCK4ivvggopHjtG04Pj4vbtqkhPu\nvTkn25X9KEHOMI3v8BCoJF5E95z2oJUydu/wtfzlMI2NMRdbxgozLn0tME0eucx4\nbExcAnxelFKho/5kfPTJjk0VTRTMjeXY3bixag8zOcLXnSZp53A6yCGuBpgiaF/z\nHI/O50rD+v7dJkctj7XCfQQLCV2q4lfeEd5gLtQJgRqdqyREA0gjBoMR2Zu5LIaw\nOKBq1SwNAgMBAAECggEAMlDGpxLsC8S+cSWFFekJUd1COkt+t1ViYlWHBxy+XoBc\nkMx6xEt60rSlGgEp1zohtTIhIDCqbGuaEWZP2Xv9XjzKGKoeJun7GAL8k38axXcF\n/olwT2G6JkhnKMamYuV74uSIzlWpZnsunzS7J0o5mkt0kO2ZVrx/86Y4/YuAPEAZ\nKr6tYCfHK77hMu9hIGaJkzbdN4vn0tSy3WwipL9ZkRJ1pyOriGn39melj6tvvay6\ngwyXyXygxn9xowUQnewmpW2FEBiHXto3nm5RHDhWKzX6kVq3KG32euM5+K+RlhPh\nrTcEbctjDQHgc7MPL/eIy1CCY4inUAByM8ZRe1L0IQKBgQD5w/llbe4e6TrYEh60\n61ydtmy7bZf/R6IFbsIldpLRmfsjWiaEDx7BN/eL0WgM59UyA3qTwJIOrze4ET9O\n+FDXwulZrSy6k5s6HYmW11eVbSun9GgNe5snTwoH7wRsp7wJs4sHAmlAZx+//oHG\nGSq7qXwsxgP+hM5/cEfc3B67xQKBgQD1ZWK3t8BHDBxtRfnw/NMvTaFjgRWS/TSO\nU4edq4AXmyrR1LC1wTz18hAqnGgLKab8SkeQaO1fTrb3YUIijetXlqp8lYSnUEg0\nQ69rV44tTwAnPuOTblCLryzIsv4A36h+b1xDzo/J3TWz9Yt9vxCE1pmtTTWGvTqB\nLU55qW7LqQKBgDaBfAWUjeiVAVBx892Ll3SbgPMOIaOGIGeLGjdOvw+ayOGYJNug\n6RdFfXI3yrs2RKJbe/6OgdFOj5xNt0Emk43ibUYyspYs7C0skQAoEmb7ohFPFv4K\nQXu8lfXRRWfo2vJLCkYHUqzJVHZztiJjD55QiFbFB84dcWsCN8yNBO/5AoGBAJ7U\nWkqy4f6aNiP78MQrv7yUMGso93/F5yhfpB1HDYc55UMeuKlLQ1ukqxYJWcYv1Wbh\n5OPxJgJT/lSrXJTk6ngsinhMhimM6s75KCb/6oQk5+J+7+lSs0tVvFTClWiXWoVL\nKpqwrZxoUwQBX6Gp8tUn2Ru0J3roK1/EpVBVe+LRAoGBAPJcEZgmCnWG7TpHoBY2\n+gMc4+mmaAf3KWojdcbcT/XVAqOB9D2FA2lobX9zVJ4QVNE6gUtRwsgG9HOdrrhi\n9t8A07jjyNlGXgJlQUR/CrCr9bVBygYqUYHfQobJdSH6tkV2wpRnoqU49YEXhhmJ\nKUz8VCHKx6SZxL1p5nRDKwFy\n-----END PRIVATE KEY-----\n",
  "client_email": "clue-chasers@striking-effort-443801-v3.iam.gserviceaccount.com",
  "client_id": "112210388370764950612",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/clue-chasers%40striking-effort-443801-v3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

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