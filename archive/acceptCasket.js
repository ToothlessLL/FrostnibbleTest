const { EmbedBuilder } = require(`discord.js`);
const bingo = require(`../functions/bingo/bingo.js`);
const { sequelize } = require('../dbObjects.js');
const { QueryTypes } = require('sequelize');

module.exports = {
    data: {
        name: `acceptCasket`
    },
    async execute(interaction, client) {
        if (bingo.bingoAdmins.some(id => id == interaction.user.id)) {
            var person = interaction.member.nickname ? interaction.member.nickname : interaction.user.username;
            
            messageEmbed = interaction.message.embeds[0];
            textSplit = messageEmbed.data.footer.text;
            await sequelize.query(`insert into bingoCasketCheck (userID, casketCheckTypeID) values (?, ?)`, {replacements: [interaction.message.interaction.user.id, Number(textSplit)], type: QueryTypes.INSERT});
            await bingo.casketCheckTypes.get(Number(textSplit)).playerID.push(interaction.message.interaction.user.id);
            newEmbed = EmbedBuilder.from(messageEmbed).setFooter({text: `✅Accepted by ${person} | ${messageEmbed.data.footer.text}`})
            .setTimestamp();
            console.log(bingo.casketCheckTypes);
    
            await interaction.update({
                embeds: [newEmbed]
                , components: [] 
            });
        } else {
            await interaction.reply({
                content: `Sorry you're not an admin, you can't use this button!`
                , ephemeral: true
            });
            return;
        }
    }
}