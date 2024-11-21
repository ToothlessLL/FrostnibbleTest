const { SlashCommandBuilder, SlashCommandAttachmentOption } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require('discord.js');
const { sequelize } = require('../dbObjects.js');
const {QueryTypes} = require('sequelize');

module.exports = {
    guildID: ['0'],
	data: new SlashCommandBuilder()
	.setName('setrsn')
	.setDescription('Set your rsn!')
	.addStringOption(option =>
		option.setName('rsn')
		.setDescription('The rsn you want to set')
		.setRequired(true)
	),
    async execute(interaction) {
		await interaction.deferReply({ephemeral: true});
		const rsn = interaction.options.getString('rsn');
		const search = await sequelize.query(`select id from rsn where userID = ?`, {replacements: [interaction.user.id], type: QueryTypes.SELECT});
		if (search.length > 0) {
			sequelize.query(`update rsn set rsn = ? where userID = ?`, {replacements: [rsn, interaction.user.id], type: QueryTypes.UPDATE});
		} else {
			sequelize.query(`insert into rsn (rsn, userID) values (?,?)`, {replacements: [rsn, interaction.user.id], type: QueryTypes.INSERT});
		}
        interaction.editReply({content: `Your rsn is now updated!`, ephemeral: true});
    },
};