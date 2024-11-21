const { EmbedBuilder } = require(`discord.js`);
const bingo = require(`../functions/bingo/bingo.js`);
const { sequelize } = require('../dbObjects.js');
const { QueryTypes } = require('sequelize');
const general = require(`../functions/general.js`);

module.exports = {
    data: {
        name: `acceptInput`
    },
    async execute(interaction, client) {
        if (bingo.bingoAdmins.some(id => id == interaction.user.id)) {
            let person = general.getUsernameByInteraction(interaction);
            let currentTimeStamp = Date.now().toString();
            
            messageEmbed = interaction.message.embeds[0];
            textSplit = messageEmbed.data.footer.text.split(" | ");
            await sequelize.query(`update bingoDrops set acceptedDate = ? where id = ?`, {replacements: [currentTimeStamp, Number(textSplit[0])], type: QueryTypes.UPDATE});
            if (textSplit.length < 3) {
                userID = interaction.message.interaction.user.id;
            } else {
                userID = textSplit[2];
            }
            await bingo.updateDrop(userID, Number(textSplit[1]), currentTimeStamp);
            newEmbed = EmbedBuilder.from(messageEmbed).setFooter({text: `✅Accepted by ${person} | ${messageEmbed.data.footer.text}`})
            .setTimestamp();
            // console.log(bingo.bingoTileDrops.get(Number(textSplit[1])).bingoTileID);
            // console.log(bingo.bingoTiles.get(bingo.bingoTileDrops.get(Number(textSplit[1])).bingoTileID).tiles);
    
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