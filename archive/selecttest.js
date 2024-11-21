const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: {
        name: `selecttest`
    },
    async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('selecttest')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'Report issue to overseer+',
							description: 'Report issue to overseer+',
							value: 'overseer',
						},
						{
							label: 'suggestion',
							description: 'What is your suggestion',
							value: 'suggestion',
						},
					),
			);
		embed = new EmbedBuilder ()
        .setColor('#0099ff')
        .setTitle('Create ticket here:')
        .setDescription('Select a reason to create a ticket');
		let user = interaction.user.username;
		user += interaction.member.nickname ? ` (${interaction.member.nickname})` : '';
		
			const thread = await interaction.channel.threads.create({
				name: `test`,
				// autoArchiveDuration: 60,
				// type: ChannelType.GuildPrivateThread,
				reason: `Created overseer chat for ${user}`,
			});
		interaction.channel.lastMessage.delete();
		console.log(thread);

		await interaction.reply({
			content: `<#${thread.id}>`
			, ephemeral: true
		});

		// await interaction.update({
		// 	embeds: [embed]
		// 	, components: [row]
		// });
		
		// if (interaction.values[0] === 'overseer') {
		// 	let title = `Overseer+ chat - ${user}`
		// 	const thread = await interaction.channel.threads.create({
		// 		name: `${title}`,
		// 		// autoArchiveDuration: 60,
		// 		// type: ChannelType.GuildPrivateThread,
		// 		reason: `Created overseer chat for ${user}`,
		// 	});
		// 	await thread.members.add(interaction.user.id);
		// 	thread.send(`What is the issue you want to report?`);
		// 	console.log(`Created thread: ${thread}`);
		// } else if (interaction.values[0] === 'suggestion') {
		// 	let title = `Suggestions chat - ${user}`
		// 	const thread = await interaction.channel.threads.create({
		// 		name: `${title}`,
		// 		autoArchiveDuration: 60,
		// 		// type: ChannelType.GuildPrivateThread,
		// 		reason: `Created suggestion chat for ${user}`,
		// 	});
		// 	await thread.members.add(interaction.user.id);
		// 	thread.send('What is your suggestion?');
		// 	console.log(`Created thread: ${thread}`);
		// }
		// console.log(interaction.channel.lastMessage.delete());
    }
}