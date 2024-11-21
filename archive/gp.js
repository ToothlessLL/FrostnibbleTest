const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users} = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gp')
		.setDescription('Get your current gp'),
	async execute(interaction) {
        const user = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
        if (user) {
            await interaction.reply({
                content: 'You have ' + numberWithCommas(user.dataValues.balance) + " gp."
                , ephemeral: true
            });
        } else {
            await interaction.reply({
                content: 'You don\'t have any gp. Use **/claim** to get started!'
                , ephemeral: true
            });
        }
	},
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}