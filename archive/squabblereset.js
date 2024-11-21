const { SlashCommandBuilder } = require('@discordjs/builders');
const { Squabble, SquabbleScore } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('squabblereset')
		.setDescription("Resets the current score of a player's squabblings in the guantlet!")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The person\'s squabble you want to reset')
                .setRequired(false)),
	async execute(interaction) {
        await interaction.deferReply();
        const userMember = interaction.options.getMember("user");
        let user;
        if (userMember && !(interaction.user.id == '171840823007117313'/* || interaction.user.id == '162955183670820864'*/) && userMember.user.id != interaction.user.id) {
            await interaction.editReply({
                content: "You cannot reset other people's gauntlet >:("
                , ephemeral: true
            });
            return;
        }
        if (!userMember) {
            user = interaction.member;
        } else {
            user = userMember;
        }
        let userSquabble = await Squabble.findOne({where: {userID: user.user.id}});
        let userSquabbleScore = await SquabbleScore.findOne({where: {userID: user.user.id}});
        let resetCounter = userSquabbleScore.dataValues.reset + 1;
        if (userSquabble) {
            if (userSquabble.dataValues.canReset == 1 || interaction.user.id == '171840823007117313') {
                let role = interaction.guild.roles.cache.find(r => r.name == "7-0");
                user.roles.remove(role);
                role = interaction.guild.roles.cache.find(r => r.name == "6-1");
                user.roles.remove(role);
                role = interaction.guild.roles.cache.find(r => r.name == "5-2");
                user.roles.remove(role);
                role = interaction.guild.roles.cache.find(r => r.name == "4-3");
                user.roles.remove(role);
                role = interaction.guild.roles.cache.find(r => r.name == "3-4");
                user.roles.remove(role);
                role = interaction.guild.roles.cache.find(r => r.name == "2-5");
                user.roles.remove(role);
                role = interaction.guild.roles.cache.find(r => r.name == "1-6");
                user.roles.remove(role);
                role = interaction.guild.roles.cache.find(r => r.name == "0-7");
                user.roles.remove(role);
                await Squabble.destroy({where: {userID: user.user.id}});
                await SquabbleScore.update({reset: resetCounter}, {where: {userID: user.user.id}});
                await interaction.editReply({
                    content: "<@" + user.user.id + "> squabble reset."
                });
                return;

            } else {
                await interaction.editReply({
                    content: "You can't reset your squabble yet!"
                    , ephemeral: true
                });
                return;
            }
        } else {
            await interaction.editReply({
                content: "Can't find you in the system! Type **/squabble** to start!"
                , ephemeral: true
            });
            return;
        }
	},
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}