// const { SlashCommandBuilder } = require('@discordjs/builders');
// const {google} = require('googleapis');
// const general = require('../functions/general');
// const { sequelize } = require('../dbObjects');
// const { QueryTypes } = require('sequelize');
// const {GlobalFonts} = require('@napi-rs/canvas');
// const Canvas = require('@napi-rs/canvas');
// const { AttachmentBuilder} = require('discord.js');

import { AttachmentBuilder, SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType } from 'discord.js';

export default {
    guildID: ['0']
	, itemPrices: null
	, data: new SlashCommandBuilder()
		.setName('rebeccaisstinky')
		.setDescription('rebecca is stinky')
		.setContexts([InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
		.setIntegrationTypes([ApplicationIntegrationType.UserInstall]),
    async execute(interaction) {
		interaction.reply({content: `# Rebecca is stinky`});
    }
}