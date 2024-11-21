const { sequelize } = require('../../../dbObjects.js');
const { QueryTypes } = require('sequelize');
const userItemMap = require(`../userItems`);

module.exports = {
	async cancel(interaction) {
        let challengee = interaction.options.getMember("player");
        var pendingChallenges = await sequelize.query(`select a.id, a.challengerID challengerID, b.itemID itemID, b.quantity quantity from Challenges a left outer join StakedItems b on a.id = b.challengeID where a.guildID = ? and ((a.challengerID = ? and a.receiverID = ?) or (a.challengerID = ? and a.receiverID = ?))`, {replacements: [interaction.guildId, interaction.user.id, challengee.id, challengee.id, interaction.user.id], type: QueryTypes.SELECT});
        console.log(pendingChallenges);
        if (pendingChallenges.length == 0) {
            await interaction.editReply({
                content: `You do not have a pending duel with <@${challengee.id}>`
            });
            return;
        }
        var userItems = await userItemMap.getUserItems(pendingChallenges[0].challengerID, interaction.guildId);
        for (const item of pendingChallenges) {
            if (item.itemID == 0) {
                await sequelize.query(`update Users set balance = balance + ? where userID = ? and guildID = ?`, {replacements: [item.quantity, item.challengerID, interaction.guildId], type: QueryTypes.UPDATE});
            } else {
                if (userItems.get(item.itemID.toString())) {
                    await sequelize.query(`update UserItems set quantity = quantity + ? where userID = ? and guildID = ? and itemID = ?`, {replacements: [item.quantity, item.challengerID, interaction.guildId, item.itemID], type: QueryTypes.UPDATE});
                } else {
                    await sequelize.query(`insert into UserItems (quantity, userID, guildID, itemID) values (?, ?, ?, ?)`, {replacements: [item.quantity, item.challengerID, interaction.guildId, item.itemID], type: QueryTypes.INSERT});
                }
            }
        }
        await sequelize.query(`delete from Challenges where id = ?`, {replacements: [pendingChallenges[0].id], type: QueryTypes.DELETE});
        await sequelize.query(`delete from StakedItems where challengeID = ?`, {replacements: [pendingChallenges[0].id], type: QueryTypes.DELETE});
        await interaction.editReply({
            content: `Cancelled pending duel with <@${challengee.id}>`
        });
    }
}