const { SlashCommandBuilder } = require('@discordjs/builders');
const { SquabbleScore } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lifetime')
		.setDescription('Displays your overall squabblage across your time through the gauntlet.'),
	async execute(interaction) {
        if (interaction.guild.id == '832404047889039361' && (interaction.channelId == '921569710498267217' || interaction.channelId == '920549364852731924')) {
            let user = await SquabbleScore.findOne({where: {userID: interaction.user.id}});
            let message = "You have fought valiantly in the gauntlet. Your overall score is " + user.dataValues.totalWins + "-" + user.dataValues.totalLosses + ". ";
            if (user) {
                if (user.dataValues.totalWins == 0 && user.dataValues.totalLosses == 0) {
                    message = "You have fought in - wait, no you haven't. Go squabble, you have no history here.";
                } else if (user.dataValues.totalWins > user.dataValues.totalLosses) {
                    message += "Spooned.";
                } else if (user.dataValues.totalWins < user.dataValues.totalLosses) {
                    message += "Never lucky.";
                } else if (user.dataValues.totalWins == user.dataValues.totalLosses) {
                    message += "How will your next fight end, I wonder?";
                }
                if (user.dataValues.reset == 1) {
                    message += " You have reset " + user.dataValues.reset + " time.";
                } else {
                    message += " You have reset " + user.dataValues.reset + " times.";
                }
            } else {
                message = "You have fought in - wait, no you haven't. Go squabble, you have no history here.";
            }
            await interaction.reply({
                content: message
            });
        } else {
            await interaction.reply({
                content: "This pog command is only available in the cool server."
                , ephemeral: true
            });
        }
    }
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}