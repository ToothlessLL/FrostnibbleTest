const { sequelize } = require(`../../../dbObjects`);
const generalFunctions = require(`../../general`);
const userItem = (`../userItems.js`);

module.exports = {
	async execute(interaction) {
        const userItemMap = await userItem.getUserItems(interaction.user.id, interaction.guildId);
        const receiver = interaction.options.getMember('player');
        var stakedItems = [{itemID: interaction.options.getNumber('stakeitem1'), quantity: interaction.options.getInteger('quantity1')}];
        if ((interaction.options.getNumber('stakeitem2') != null && interaction.options.getInteger('quantity2') == null) && (interaction.options.getNumber('stakeitem2') == null && interaction.options.getInteger('quantity2') != null))
            return `You must input an associated item or quantity!`
        else if (interaction.options.getNumber('stakeitem2') != null && interaction.options.getInteger('quantity2') != null)
            stakedItems.push({itemID: interaction.options.getNumber('stakeitem2'), quantity: interaction.options.getInteger('quantity2')});
        if ((interaction.options.getNumber('stakeitem3') != null && interaction.options.getInteger('quantity3') == null) && (interaction.options.getNumber('stakeitem3') == null && interaction.options.getInteger('quantity3') != null))
            return `You must input an associated item or quantity!`
        else if (interaction.options.getNumber('stakeitem3') != null && interaction.options.getInteger('quantity3') != null)
            stakedItems.push({itemID: interaction.options.getNumber('stakeitem3'), quantity: interaction.options.getInteger('quantity3')});
        var returnMessage;
        if (interaction.user.id == receiver.id) {
            interaction.editReply({
                content: "You cannot stake yourself!"
                , ephemeral: true
            }); 
            return;
        }
        var pendingChallenges = await sequelize.query(`select count(*) count from Challenges where guildID = ? and ((challengerID = ? and receiverID = ?) or (challengerID = ? and receiverID = ?))`, {replacements: [interaction.guildId, interaction.user.id, receiver.id, receiver.id, interaction.user.id], type: QueryTypes.SELECT});
        if (pendingChallenges[0].count > 0) return "You already have a pending challenge with <@" + receiver.id + ">";
        let seen = new Set();
        var hasDuplicates = stakedItems.some(function(currentObject) {
            return seen.size === seen.add(currentObject.itemID).size;
        });
        if (hasDuplicates) return `You selected duplicate items!`;

        for (const item of stakedItems) {
            if (item.quantity <= 0) return `You can't stake 0 or negative items!`;
            if (item.itemID == 0) {
                var user = await sequelize.query(`select balance from Users where userID = ? and guildID = ?`, {replacements: [interaction.user.id, interaction.guildId], type: QueryTypes.SELECT});
                userItemMap.set('0', {itemName: 'TGP', emoji: '1076622756180922510', quantity: user[0].balance});
                if (user[0].balance <= 0 || item.quantity > userItemMap.get('0').quantity) {
                    return `You don't have enough TGP!`;
                }
                continue;
            };
            if (item.quantity > userItemMap.get(item.itemID.toString()).quantity) return `You don't have enough ${interaction.client.emojis.cache.get(userItemMap.get(item.itemID.toString()).emoji).toString()} ${userItemMap.get(item.itemID.toString()).itemName} to make this stake!`;
        }
        const challenge = await sequelize.query(`insert into Challenges (challengerID, receiverID, guildID) values (?, ?, ?)`, {replacements: [interaction.user.id, receiver.id, interaction.guildId], type: QueryTypes.INSERT});
        returnMessage = 'Duelling <@' + receiver.id + '> for: \n\n';
        for (const item of stakedItems) {
            returnMessage += `${interaction.client.emojis.cache.get(userItemMap.get(item.itemID.toString()).emoji).toString()}${userItemMap.get(item.itemID.toString()).itemName} x${generalFunctions.numberWithCommas(item.quantity)}\n`;
            await sequelize.query(`insert into StakedItems (challengeID, itemID, quantity) values (?, ?, ?)`, {replacements: [challenge[0], item.itemID, item.quantity], type: QueryTypes.INSERT});
            if (item.itemID == 0) {
                await sequelize.query(`update Users set balance = ? where userID = ? and guildID = ?`, {replacements: [userItemMap.get('0').quantity - item.quantity, interaction.user.id, interaction.guildId], type: QueryTypes.UPDATE});
                continue;
            }
            if (item.quantity == userItemMap.get(item.itemID.toString()).quantity) {
                await sequelize.query(`delete from UserItems where userID = ? and guildID = ? and itemID = ?`, {replacements: [interaction.user.id, interaction.guildId, item.itemID], type: QueryTypes.DELETE});
                continue;
            }
            await sequelize.query(`update userItems set quantity = ? where userID = ? and guildID = ? and itemID = ?`, {replacements: [userItemMap.get(item.itemID.toString()).quantity - item.quantity, interaction.user.id, interaction.guildId, item.itemID], type: QueryTypes.UPDATE});
        }
        returnMessage += `\nUse **/gamba duel accept** to accept the stake or **/gamba duel decline** to decline.`
        return returnMessage;
	},
};