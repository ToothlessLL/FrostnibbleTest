const { SlashCommandBuilder } = require('@discordjs/builders');
//const client = require ("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const someEmoji = interaction.client.emojis.cache.get("902354857304924191");
		console.log(interaction.client);
		await interaction.reply({
			content: someEmoji.toString() + ' test'
			, ephemeral: true
		});
	},
};