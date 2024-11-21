const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Users, UserItems, Shop } = require('../dbObjects.js');
const adventure = require ('../functions/gamba/adventure.js');
const generalFunctions = require('../functions/general.js');
const gambaRanking = require('../functions/gamba/gambaRanking.js');
const gambaKing = require('../functions/gamba/gambaKing.js');
const duel = require('../functions/gamba/duel/initiate.js');
const acceptDuel = require(`../functions/gamba/duel/accept.js`);
const cancelDuel = require(`../functions/gamba/duel/cancel.js`);
const { Op, QueryTypes } = require('sequelize');
const { sequelize } = require('../dbObjects.js');
const checkDuels = require(`../functions/gamba/duel/check.js`);
const gambaReset = require(`../functions/gamba/reset.js`);
const gambaSeason = require(`../functions/gamba/gambaSeason.js`);

module.exports = {
    guildID: ['808211349027946526'],
	data: new SlashCommandBuilder()
		.setName('gamba')
		.setDescription('Undertake the gauntlet with your own squabblings.')
        .setDMPermission(false)
        .addSubcommand(subcommand => 
            subcommand.setName('adventure')
            .setDescription('Set out on an adventure in an attempt to make money')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('claim')
            .setDescription('Claim your 50k gp (4 hour cooldown)')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('shop')
            .setDescription('Get the list of shop items')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('buy')
            .setDescription('Buy items with hard-earned TGP!')
            .addNumberOption(option =>
                option.setName('item')
                    .setDescription('The item you want to buy')
                    .setRequired(true)
                    .setAutocomplete(true))
            .addIntegerOption(option =>
                option.setName('quantity')
                    .setDescription('Quantity you want to buy')
                    .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand.setName('sell')
            .setDescription('Sell items for TGP!')
            .addNumberOption(option =>
                option.setName('item')
                    .setDescription('The item you want to sell')
                    .setRequired(true)
                    .setAutocomplete(true)
            )
            .addIntegerOption(option =>
                option.setName('quantity')
                    .setDescription('Quantity you want to sell')
                    .setRequired(true))
        )
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup.setName('profile')
            .setDescription(`Gamba profile!`)
            .addSubcommand(subcommand =>
                subcommand.setName('display')
                .setDescription(`Display gamba profile!`)
                .addUserOption(option =>
                    option.setName('user')
                    .setDescription(`The person's profile you want to view`)
                )
            )
            .addSubcommand(subcommand =>
                subcommand.setName('update')
                .setDescription('Update gamba profile image!')
                .addNumberOption(option =>
                    option.setName('item')
                    .setDescription('The item icon you want to set for your profile')
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
        )
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup
            .setName(`leaderboards`)
            .setDescription('The gamba kings!')
            .addSubcommand(subcommand =>
                subcommand
                .setName('current')
                .setDescription('The current gamba kings!')
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName(`season`)
                .setDescription(`Display season winners!`)
            )
        )
        .addSubcommandGroup(subcommandGroup => 
            subcommandGroup
            .setName('duel')
            .setDescription('Sends a stake to someone')
            .addSubcommand(subcommand =>
                subcommand
                .setName('initiate')
                .setDescription('Start a duel')
                .addUserOption(option =>
                    option
                        .setName('player')
                        .setDescription('Choose who you want stake')
                        .setRequired(true)
                )
                .addNumberOption(option => 
                    option
                        .setName('stakeitem1')
                        .setDescription('Choose item (or gp) you want to stake')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addIntegerOption(option =>
                    option 
                        .setName('quantity1')
                        .setDescription('How many/much you want to stake')
                        .setRequired(true)
                )
                .addNumberOption(option => 
                    option
                        .setName('stakeitem2')
                        .setDescription('Choose item (or gp) you want to stake')
                        .setRequired(false)
                        .setAutocomplete(true)
                )
                .addIntegerOption(option =>
                    option 
                        .setName('quantity2')
                        .setDescription('How many/much you want to stake')
                        .setRequired(false)
                )
                .addStringOption(option => 
                    option
                        .setName('stakeitem3')
                        .setDescription('Choose item (or gp) you want to stake')
                        .setRequired(false)
                        .setAutocomplete(true)
                )
                .addIntegerOption(option =>
                    option 
                        .setName('quantity3')
                        .setDescription('How many/much you want to stake')
                        .setRequired(false)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('accept')
                .setDescription('Accept a pending duel')
                .addUserOption(option =>
                    option
                        .setName('player')
                        .setDescription('Choose the duel you want accept')
                        .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('cancel')
                .setDescription('Cancel a pending duel')
                .addUserOption(option =>
                    option
                        .setName('player')
                        .setDescription('Choose the duel you want cancel')
                        .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('check')
                .setDescription('Check pending duels')
            )
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName(`reset`)
            .setDescription(`Reset current season`)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        var user;
        var totalCost;
        var shopItem;
        var quantity;
        var itemID;
        switch (interaction.options.getSubcommand()) {
            case 'adventure':
                let cooldown = 180000;
                let excuses = adventure.excuses;
                var adventureMessage;
                user = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
                if (user && Date.now() - user.dataValues.lastAdventure < cooldown) {
                    let excuse = generalFunctions.getRandomInt(0, excuses.length);
                    await interaction.editReply({
                        content: excuses[excuse] + 'Please come back in ' + generalFunctions.parseMillisecondsIntoReadableTime(cooldown - (Date.now() - user.dataValues.lastAdventure)) + '.'
                    });
                } else {
                    let luck = await UserItems.findAll({where:{
                        [Op.and]:[
                            {userID: interaction.user.id}
                            , {guildID: interaction.guildId}
                            , {[Op.or]: [
                                {itemID: 26}
                                , {itemID: 27}
                            ]}
                        ]
                    }});
                    let doubled = false;
                    let options = adventure.options;
                    let selection = generalFunctions.getRandomInt(0, options.length);
                    if (luck.length > 0) {
                        console.log(interaction.user.username + ' ' + interaction.guildId);
                        options[selection].items[options[selection].items.length-1].roll = Math.floor(options[selection].items[options[selection].items.length-1].roll * .90);
                        for (i = 0; i < luck.length; i++) {
                            if (luck[i].dataValues.itemID == 26) {
                                let hsr = generalFunctions.getRandomInt(50, 100);
                                console.log(interaction.user.username + ' ' + interaction.guildId + ' ' + hsr);
                                if (hsr == 69) {
                                    doubled = true;
                                }
                            }
                        }
                    }
                    let rng = generalFunctions.getRandomInt(0, options[selection].items[options[selection].items.length-1].roll);
                    for (i = 0; i < options[selection].items.length; i++) {
                        if (rng <= options[selection].items[i].roll) {
                            if (options[selection].items[i].max) {
                                options[selection].items[i].quantity = generalFunctions.getRandomInt(options[selection].items[i].min, options[selection].items[i].max) - options[selection].items[i].negative;
                            }
                            adventureMessage = options[selection].items[i].itemMessage + ' ' + generalFunctions.numberWithCommas(options[selection].items[i].quantity) + ' ' + options[selection].items[i].itemMessage2;
                            if (doubled) {
                                options[selection].items[i].quantity *= 2;
                                options[selection].items[i].itemMessage += " Your HSR doubled your drop! You receive " + generalFunctions.numberWithCommas(options[selection].items[i].quantity) + ' ' + options[selection].items[i].itemName;
                            }
                            break;
                        }
                    }
                    if (user && options[selection].items[i].itemID == 0) {
                        Users.update({balance: user.dataValues.balance + options[selection].items[i].quantity, lastAdventure: Date.now()}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
                    } else if (!user && options[selection].items[i].itemID == 0) {
                        Users.create({userID: interaction.user.id, guildID: interaction.guildId, balance: options[selection].items[i].quantity, lastAdventure: Date.now()})
                    } else if (user && options[selection].items[i].itemID != 0) {
                        Users.update({lastAdventure: Date.now()}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
                        let userItems = await UserItems.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID}});
                        if (userItems) {
                            UserItems.increment({quantity: options[selection].items[i].quantity}, {where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID}});
                        } else {
                            UserItems.create({userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID, quantity: options[selection].items[i].quantity});
                        }
                    } else {
                        Users.create({userID: interaction.user.id, guildID: interaction.guildId, balance: 0, lastAdventure: Date.now()});
                        UserItems.create({userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID, quantity: options[selection].items[i].quantity});
                    }
                    await interaction.editReply({
                        content: adventureMessage
                    });
                    await gambaKing.gambaKing(interaction);
                }
                break;
            case 'claim':
                user = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
                let timer = 14400000;
                if (user) {
                    if (Date.now() - user.dataValues.lastClaimed > timer) {
                        await Users.update({balance: user.dataValues.balance + 50000, lastClaimed: Date.now()}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
                        let total = (user.dataValues.balance + 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                        await interaction.editReply({
                            content: 'You have claimed your TGP! You now have ' + total + ' TGP!'
                            , ephemeral: true
                        });
                    } else {
                        let time = generalFunctions.parseMillisecondsIntoReadableTime(timer - (Date.now() - user.dataValues.lastClaimed));
                        await interaction.editReply({
                            content: 'You have already claimed your TGP! You can claim in ' + time
                            , ephemeral: true
                        });
                    }
                } else {
                    Users.create({userID: interaction.user.id, guildID: interaction.guildId, balance: 50000, lastClaimed: Date.now()});
                    await interaction.editReply({
                        content: 'You now have 50,000 TGP!'
                        , ephemeral: true
                    });
                }
                await gambaKing.gambaKing(interaction);
                break;
            case 'shop':
                const shopList = await Shop.findAll();
                if (shopList) {
                    await interaction.editReply({
                        content: `\`\`\`${shopList.map(i => `${i.itemName}: ${generalFunctions.numberWithCommas(i.price)}💰`).join('\n')}\`\`\``
                        , ephemeral: true
                    });
                } else {
                    await interaction.editReply({
                        content: 'No shop stock found! :('
                        , ephemeral: true
                    });
                }
                break;
            case 'buy':
                let total;
                quantity = interaction.options.getInteger('quantity');
                itemID = interaction.options.getNumber('item');
                const userData = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
                shopItem = await Shop.findOne({where: {id: itemID}});
                totalCost = shopItem.dataValues.price * quantity;
                if (quantity <= 0) {
                    await interaction.editReply({
                        content: "You have to buy at least 1 item!"
                    });
                } else if (userData.dataValues.balance >= totalCost) {
                    const item = await UserItems.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: itemID}});
                    if (item) {
                        await UserItems.increment({quantity: quantity}, {where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: itemID}});
                        total = item.dataValues.quantity + quantity
                    } else {
                        await UserItems.create({userID: interaction.user.id, guildID: interaction.guildId, itemID: itemID, quantity: quantity})
                        total = quantity;
                    }
                    await Users.increment({balance: (totalCost * -1)}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
                    interaction.editReply({
                        content: `You bought ${quantity} ${interaction.client.emojis.cache.get(shopItem.dataValues.emojiID).toString()}${shopItem.dataValues.itemName}. You now have ${total} ${interaction.client.emojis.cache.get(shopItem.dataValues.emojiID).toString()}${shopItem.dataValues.itemName}.`
                    });
                } else {
                    interaction.editReply({
                        content: 'You don\'t have enough TGP!'
                    });
                }
                break;
            case 'sell':
                itemID = interaction.options.getNumber('item');
                quantity = interaction.options.getInteger('quantity');
                item = await sequelize.query(`select a.quantity quantity, b.itemName itemName, b.price price, b.emojiID emoji from UserItems a left outer join Shops b on a.itemID = b.id where a.itemID = ? and a.userID = ? and a.guildID = ?`, {replacements: [itemID, interaction.user.id, interaction.guildId], type: QueryTypes.SELECT});
                var userProfileItem = await sequelize.query(`select itemID from Users where userID = ? and guildID = ?`, {replacements: [interaction.user.id, interaction.guildId], type: QueryTypes.SELECT});
                if (item[0].quantity < quantity) {
                    await interaction.editReply({
                        content: `You don't have enough ${item[0].itemName} to sell!`
                    });
                } else if (quantity <= 0) {
                    await interaction.editReply({
                        content: `You can't sell zero or negative items!`
                    });
                } else {
                    totalCost = item[0].price * quantity
                    if (item[0].quantity == quantity) {
                        await UserItems.destroy({where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: itemID}});
                        userProfileItem[0].itemID === itemID ? await sequelize.query(`update Users set itemID = null where userID = ? and guildID = ?`, {replacements: [interaction.user.id, interaction.guildId], type: QueryTypes.UPDATE}) : null;
                    } else {
                        await UserItems.increment({quantity: (quantity * -1)}, {where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: itemID}});
                    }
                    await Users.increment({balance: totalCost}, {where: {userID: interaction.user.id, guildID: interaction.guildId}})
                    await interaction.editReply({
                        content: `You have sold ${quantity} ${interaction.client.emojis.cache.get(item[0].emoji).toString()}${item[0].itemName}.`
                    });
                }
                break;
            case 'display':
                let itemMessage = '';
                let otherUser = interaction.options.getMember("user");
                let id;
                let nickname;
                var displayName;
                let userProfileImage;
                if (otherUser) {
                    id = otherUser.id;
                    nickname = otherUser.nickname ? otherUser.nickname : otherUser.user.username;
                    displayName = `${nickname}'s`;
                    userProfileImage = otherUser.user.avatarURL()
                } else {
                    id = interaction.user.id;
                    nickname = interaction.member.nickname ? interaction.member.nickname : interaction.user.username;
                    userProfileImage = interaction.member.avatarURL() ? interaction.member.avatarURL() : interaction.user.avatarURL();
                    displayName = 'Your';
                }
                let userDetails = await sequelize.query(`
                    select a.balance balance
                        , b.emojiID profileImage
                    from Users a
                        left outer join Shops b on a.itemID = b.id
                    where a.userID = ?
                        and a.guildID = ?`
                    , {replacements: [id, interaction.guildId], type: QueryTypes.SELECT});
                if (userDetails.length != 0) {
                    nickname = userDetails[0].profileImage ? `${interaction.client.emojis.cache.get(userDetails[0].profileImage).toString()} ${nickname}` : nickname;
                    let userItems = await sequelize.query(`
                        select a.quantity quantity
                            , b.itemName itemName
                            , b.emojiID emoji
                        from UserItems a
                            left outer join Shops b on a.itemID = b.id
                        where a.userID = ?
                            and a.guildID = ?
                        order by b.price desc`
                        , {replacements: [id, interaction.guildId], type: QueryTypes.SELECT});
                    let userWins = await sequelize.query(`
                        select count(*) wins
                        from WinLosses
                        where guildID = ?
                            and winnerID = ?`
                        , {replacements: [interaction.guildId, id], type: QueryTypes.SELECT});
                    let userLosses = await sequelize.query(`
                        select count(*) loss
                        from WinLosses
                        where guildID = ?
                            and loserID = ?`
                        , {replacements: [interaction.guildId, id], type: QueryTypes.SELECT});
                    let emoji = interaction.client.emojis.cache.get('1076622756180922510');
                    itemMessage += emoji.toString() + " GP x" + generalFunctions.numberWithCommas(userDetails[0].balance) + '\n\n';
                    itemMessage += userItems.map(item => `${interaction.client.emojis.cache.get(item.emoji).toString()} ${item.itemName} x${item.quantity}`).join('\n');
                    let embed = new EmbedBuilder()
                        .setTitle(nickname)
                        .setAuthor({name: 'Toothless Duels', iconURL: userProfileImage})
                        .addFields(
                            {name: `Record: ${userWins[0].wins}W-${userLosses[0].loss}L.`, value: '\u200B'}
                            , {name: `Inventory`, value: itemMessage}
                        )
                        .setColor(0x3b5cac)
                        .setTimestamp();
                    interaction.editReply({
                        embeds: [embed]
                    });
                } else {
                    interaction.editReply({
                        content: 'This profile doesn\'t exist.'
                        , ephemeral: true
                    });
                }
                break;
            case 'update':
                var itemID = interaction.options.getNumber('item');
                itemID = itemID === 0 ? null : itemID;
                await sequelize.query(`update Users set itemID = ? where userID = ? and guildID = ?`, {replacements: [itemID, interaction.user.id, interaction.guildId], type: QueryTypes.UPDATE});
                await interaction.editReply({
                    content: `Profile updated!`
                });
                break;
            case 'current':
                let displayMessage = '```';
                var gpDisplay;
                var userCash = await gambaRanking.gambaRanking(interaction);
                var coinsLength = 0;
                var nameLength = 0;
                if (userCash) {
                    for (const user of userCash) {
                        coinsLength = coinsLength > user.coinsLength ? coinsLength : user.coinsLength;
                        nameLength = nameLength > user.name.length ? nameLength : user.name.length;
                    }
                    for (const user of userCash) {
                        gpDisplay = `${generalFunctions.numberWithCommas(user.gp)} gp`;
                        displayMessage += `${user.name.padEnd(nameLength)} | ${gpDisplay.padStart(coinsLength)}\n`;
                    }
                    displayMessage += '```';
                    await interaction.editReply({
                        content: displayMessage
                    });
                } else {
                    await interaction.editReply({
                        content: 'No leaderboards found! :('
                        , ephemeral: true
                    });
                }
                break;
            case 'season':
                await gambaSeason.gambaSeason(interaction);
                break;
            case 'initiate':
                let message = await duel.execute(interaction);
                await interaction.editReply({
                    content: message
                    , ephemeral: true
                });
                break;
            case 'accept':
                await acceptDuel.acceptDuel(interaction);
                break;
            case 'cancel':
                await cancelDuel.cancel(interaction);
                break;
            case 'check':
                await checkDuels.checkDuels(interaction);
                break;
            case 'reset':
                await gambaReset.reset(interaction);
                break;
            default:
                await interaction.editReply({
                    content: 'test'
                });
        }
    },
    async autocomplete(interaction) {
        if (interaction.options.getSubcommand() === 'buy') {
            const itemsList = await sequelize.query(`select id, itemName from Shops`, {type: QueryTypes.SELECT});
            const focusedValue = interaction.options.getFocused();
            var filtered = itemsList.filter(choice => choice.itemName.toLowerCase().includes(focusedValue.toLowerCase()));
            if (filtered.length > 25) {
                filtered = filtered.slice(0, 25);
            }
            await interaction.respond(
                filtered.map(choice => ({name: choice.itemName, value: choice.id}))
            );
        }
        if (['initiate', 'sell', 'update'].includes(interaction.options.getSubcommand())) {
            const itemsList = await sequelize.query(`select itemID, b.itemName itemName from UserItems a left outer join Shops b on a.itemID = b.id where a.userID = ? and a.guildID = ? order by cast(a.itemID as integer)`, {replacements: [interaction.user.id, interaction.guildId], type: QueryTypes.SELECT});
            const focusedValue = interaction.options.getFocused();
            var filtered = await itemsList.filter(choice => choice.itemName.toLowerCase().includes(focusedValue.toLowerCase()));
            interaction.options.getSubcommand() === 'update' ? filtered.splice(0, 0, {itemID: 0, itemName: 'Nothing'}): null;
            interaction.options.getSubcommand() === 'initiate' ? filtered.splice(0, 0, {itemID: 0, itemName: 'TGP'}): null;
            filtered.length > 25 ? filtered = filtered.slice(0, 25) : null;
            await interaction.respond(
                filtered.map(choice => ({name: choice.itemName, value: choice.itemID}))
            );
        }
    }
};