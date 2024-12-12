// const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
// const { Goals, sequelize } = require('../dbObjects.js');
// const { QueryTypes } = require('sequelize');
// const generalFunctions = require('../functions/general');
// const fs = require('fs');

import { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType } from 'discord.js';
import {sequelize} from '../dbObjects.js';
import {QueryTypes} from 'sequelize';
import generalFunctions from '../functions/general.js';
import * as fs from 'fs';

export default {
    guildID: ['0'],
	data: new SlashCommandBuilder()
		.setName('preset')
		.setDescription('Save your presets and find them easier!')
		.setContexts([InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel])
		.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
        .addSubcommand(subcommand =>
            subcommand.setName('add')
            .setDescription('Add a new preset')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('the name of the preset')
                .setRequired(true))
            .addStringOption(option =>
                option.setName('url')
                .setDescription('the url of the preset')
            )
            .addAttachmentOption(option =>
                option.setName('image')
                .setDescription('The image of the preset')
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('delete')
            .setDescription('Delete an existing preset')
            .addIntegerOption(option =>
                option.setName('name')
                .setDescription('The name of the preset you want to delete')
                .setRequired(true)
                .setAutocomplete(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('display')
            .setDescription('Display a preset')
            .addIntegerOption(option =>
                option.setName('preset')
                .setDescription('the preset you want to display')
                .setAutocomplete(true)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('update')
            .setDescription('Update a current preset')
            .addIntegerOption(option =>
                option.setName('preset')
                .setDescription('The preset to update')
                .setRequired(true)
                .setAutocomplete(true)
            )
            .addStringOption(option =>
                option.setName('name')
                .setDescription('The name of the preset')
            )
            .addStringOption(option =>
                option.setName('url')
                .setDescription('the url of the preset')
            )
            .addAttachmentOption(option =>
                option.setName('image')
                .setDescription('The image of the preset')
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('snoop')
            .setDescription(`Snoop on someone else's preset`)
            .addUserOption(option =>
                option.setName('user')
                .setDescription('The user you want to snoop')
                .setRequired(true)
            )
            .addIntegerOption(option =>
                option.setName('preset')
                .setDescription('the preset you want to display')
                .setAutocomplete(true)
                .setRequired(true)
            )
        ),
	async execute(interaction) {
        await interaction.deferReply();
        const url = interaction.options.getString('url');
		const attachment = interaction.options.getAttachment('image');
        const name = interaction.options.getString('name');
        const presetID = interaction.options.getInteger('preset');
        var persistentImageURL;

        switch (interaction.options.getSubcommand()) {
            case 'add':
                var folderPath = `C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\${interaction.user.id}\\`;
                var randomInt;

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

                do {
                    randomInt = generalFunctions.getRandomInt(100000000000000,999999999999999);
                    folderPath += `${randomInt}`;
                } while (fs.existsSync(folderPath));

                fs.mkdirSync(folderPath);
                filename = attachment ? attachment.name : `image.png`;
                const file = `${folderPath}\\${filename}`;
                console.log(file);
                await sequelize.query(`insert into test (image) values (?)`, {replacements:[file], type: QueryTypes.INSERT});
                generalFunctions.downloadImage(url, file);

                if (attachment && url) {
                    interaction.editReply({content: 'Pick either image URL or attachment only!', ephemeral: true});
                    return;
                }
                if (!attachment && !url) {
                    interaction.editReply({content: 'You must upload an image!', ephemeral: true});
                    return;
                }
                if (attachment) {
                    message = await interaction.editReply({
                        content: name
                        , files: [attachment.url]
                        , fetchReply: true
                    });
                } else if (url) {
                    message = await interaction.editReply({
                        content: name
                        , files: [url]
                        , fetchReply: true
                    });
                }
        		persistentImageURL = message.attachments.map(attachment => attachment.url);
                await sequelize.query(`insert into Presets (userID, name, url) values (?, ?, ?)`, {type: QueryTypes.INSERT, replacements: [interaction.user.id, name, persistentImageURL[0]]});
                interaction.editReply({
                    content: `${name} created successfully!`
                });
                break;
            case 'display':
                var preset = await sequelize.query(`select name, url from Presets where id = ?`, {type: QueryTypes.SELECT, replacements: [presetID]});
                await interaction.editReply({
                    content: preset[0].name
                    , files: [preset[0].url]
                });
                break;
            case 'update':
                var preset = await sequelize.query(`select name, url from Presets where id = ?`, {type: QueryTypes.SELECT, replacements: [presetID]});
                var newName = name ? name : preset[0].name;
                var newImage = preset[0].url;
                if (attachment && url) {
                    interaction.editReply({content: 'Pick either image URL or attachment only!', ephemeral: true});
                    return;
                }
                if (attachment) {
                    message = await interaction.editReply({
                        content: name
                        , files: [attachment.url]
                        , fetchReply: true
                    });
        		    newImage = (message.attachments.map(attachment => attachment.url))[0];

                } else if (url) {
                    message = await interaction.editReply({
                        content: name
                        , files: [url]
                        , fetchReply: true
                    });
        		    newImage = (message.attachments.map(attachment => attachment.url))[0];
                }
                await sequelize.query(`update Presets set name = ?, url = ? where id = ?`, {type: QueryTypes.UPDATE, omitNull: true, replacements: [newName, newImage, presetID]});
                await interaction.editReply({
                    content: `${newName} updated!`
                    , files: [newImage]
                });
                break;
            case 'delete':
                var preset = await sequelize.query(`select name from Presets where id = ?`, {type: QueryTypes.SELECT, replacements: [presetID]});
                await sequelize.query(`delete from Presets where id = ?`, {type: QueryTypes.DELETE, replacements: [presetID]});
                await interaction.editReply({
                    content: `${preset[0].name} deleted`
                });
            case 'snoop':
                var preset = await sequelize.query(`select name, url from Presets where id = ?`, {type: QueryTypes.SELECT, replacements: [presetID]});
                await interaction.editReply({
                    content: preset[0].name
                    , files: [preset[0].url]
                });
            default:
                break;
        }
    }, 
    async autocomplete(interaction) {
        let selectedUser;
        try {
            selectedUser = interaction.options.get('user').value;
        } catch {
            selectedUser = interaction.user.id;
        }
        var preset = await sequelize.query(`SELECT \`id\`, \`name\` FROM \`Presets\` WHERE userID = ?`, { replacements: [selectedUser], type: QueryTypes.SELECT });
        const focusedValue = interaction.options.getFocused();
        const filtered = preset.filter(choice => choice.name.includes(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice.name, value: choice.id })),
        ).catch(console.err);
    }
};