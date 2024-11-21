const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users} = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('Claim your 50k gp (4 hour cooldown)'),
	async execute(interaction) {
        const user = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
        let timer = 14400000;
        if (user) {
            if (Date.now() - user.dataValues.lastClaimed > timer) {
                const affectedRows = await Users.update({balance: user.dataValues.balance + 50000, lastClaimed: Date.now()}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
                let total = (user.dataValues.balance + 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                await interaction.reply({
                    content: 'You have claimed your TGP! You now have ' + total + ' TGP!'
                    , ephemeral: true
                });
            } else {
                let time = parseMillisecondsIntoReadableTime(timer - (Date.now() - user.dataValues.lastClaimed));
                await interaction.reply({
                    content: 'You have already claimed your TGP! You can claim in ' + time
                    , ephemeral: true
                });
            }
        } else {
            const claimGP = Users.create({userID: interaction.user.id, guildID: interaction.guildId, balance: 50000, lastClaimed: Date.now()});
            await interaction.reply({
                content: 'You now have 50,000 TGP!'
                , ephemeral: true
            });
        }
	},
};

function parseMillisecondsIntoReadableTime(milliseconds){
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
  
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
  
    return h + ':' + m + ':' + s;
  }
  