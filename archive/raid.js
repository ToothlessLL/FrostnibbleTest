
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: `raid`
    },
    async execute(interaction) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('PLD')
					.setLabel('PLD')
                    .setEmoji(interaction.client.emojis.cache.get('1020852399503577118').toString())
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('WAR')
					.setLabel('WAR')
                    .setEmoji(interaction.client.emojis.cache.get('1020852917001003028').toString())
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('DRK')
					.setLabel('DRK')
                    .setEmoji(interaction.client.emojis.cache.get('1020852971799593100').toString())
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('GNB')
					.setLabel('GNB')
                    .setEmoji(interaction.client.emojis.cache.get('1020852947866890250').toString())
					.setStyle(ButtonStyle.Primary),
			);
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('WHM')
                    .setLabel('WHM')
                    .setEmoji(interaction.client.emojis.cache.get('1020852998303395860').toString())
                    .setStyle(ButtonStyle.Success),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SCH')
                    .setLabel('SCH')
                    .setEmoji(interaction.client.emojis.cache.get('1020853020344471572').toString())
                    .setStyle(ButtonStyle.Success),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('AST')
                    .setLabel('AST')
                    .setEmoji(interaction.client.emojis.cache.get('1020853067165474867').toString())
                    .setStyle(ButtonStyle.Success),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SGE')
                    .setLabel('SGE')
                    .setEmoji(interaction.client.emojis.cache.get('1020853095913242675').toString())
                    .setStyle(ButtonStyle.Success),
            );
        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('MNK')
                    .setLabel('MNK')
                    .setEmoji(interaction.client.emojis.cache.get('1020853515733713008').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('DRG')
                    .setLabel('DRG')
                    .setEmoji(interaction.client.emojis.cache.get('1020853552731664435').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('NIN')
                    .setLabel('NIN')
                    .setEmoji(interaction.client.emojis.cache.get('1020853663146713138').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SAM')
                    .setLabel('SAM')
                    .setEmoji(interaction.client.emojis.cache.get('1020853629227368548').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('RPR')
                    .setLabel('RPR')
                    .setEmoji(interaction.client.emojis.cache.get('1020853593265426432').toString())
                    .setStyle(ButtonStyle.Danger),
            );
        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('BRD')
                    .setLabel('BRD')
                    .setEmoji(interaction.client.emojis.cache.get('1020853734105940059').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('MCH')
                    .setLabel('MCH')
                    .setEmoji(interaction.client.emojis.cache.get('1020853793203695706').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('DNC')
                    .setLabel('DNC')
                    .setEmoji(interaction.client.emojis.cache.get('1020853767551328427').toString())
                    .setStyle(ButtonStyle.Danger),
            );
        const row5 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('BLM')
                    .setLabel('BLM')
                    .setEmoji(interaction.client.emojis.cache.get('1020853829283090434').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('SMN')
                    .setLabel('SMN')
                    .setEmoji(interaction.client.emojis.cache.get('1020853919561306193').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('RDM')
                    .setLabel('RDM')
                    .setEmoji(interaction.client.emojis.cache.get('1020853879149170718').toString())
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setEmoji('❌')
                    .setStyle(ButtonStyle.Secondary),
            );
        const roleList = ['<:PLD:1020852399503577118>PLD', '<:WAR:1020852917001003028>WAR', '<:DRK:1020852971799593100>DRK', '<:GNB:1020852947866890250>GNB', '<:WHM:1020852998303395860>WHM', '<:SCH:1020853020344471572>SCH', '<:AST:1020853067165474867>AST', '<:SGE:1020853095913242675>SGE', '<:MNK:1020853515733713008>MNK', '<:DRG:1020853552731664435>DRG', '<:NIN:1020853663146713138>NIN', '<:SAM:1020853629227368548>SAM', '<:RPR:1020853593265426432>RPR', '<:BRD:1020853734105940059>BRD', '<:MCH:1020853793203695706>MCH', '<:DNC:1020853767551328427>DNC', '<:BLM:1020853829283090434>BLM', '<:SMN:1020853919561306193>SMN','<:RDM:1020853879149170718>RDM'];
        const emojiList = [
            {roleName: 'PLD', roleEmoji: '1020852399503577118'}
            , {roleName: 'WAR', roleEmoji: '1020852917001003028'}
            , {roleName: 'DRK', roleEmoji: '1020852971799593100'}
            , {roleName: 'GNB', roleEmoji: '1020852947866890250'}

            , {roleName: 'WHM', roleEmoji: '1020852998303395860'}
            , {roleName: 'SCH', roleEmoji: '1020853020344471572'}
            , {roleName: 'AST', roleEmoji: '1020853067165474867'}
            , {roleName: 'SGE', roleEmoji: '1020853095913242675'}
            
            , {roleName: 'MNK', roleEmoji: '1020853515733713008'}
            , {roleName: 'DRG', roleEmoji: '1020853552731664435'}
            , {roleName: 'NIN', roleEmoji: '1020853663146713138'}
            , {roleName: 'SAM', roleEmoji: '1020853629227368548'}
            , {roleName: 'RPR', roleEmoji: '1020853593265426432'}
            
            , {roleName: 'BRD', roleEmoji: '1020853734105940059'}
            , {roleName: 'MCH', roleEmoji: '1020853793203695706'}
            , {roleName: 'DNC', roleEmoji: '1020853767551328427'}
            
            , {roleName: 'BLM', roleEmoji: '1020853829283090434'}
            , {roleName: 'SMN', roleEmoji: '1020853919561306193'}
            , {roleName: 'RDM', roleEmoji: '1020853879149170718'}
        ];
        const list1 = ['PLD', 'WAR', 'DRK', 'GNB'];
        const list2 = ['WHM', 'SCH', 'AST', 'SGE'];
        const list3 = ['MNK', 'DRG', 'NIN', 'SAM', 'RPR'];
        const list4 = ['BRD', 'MCH', 'DNC'];
        const list5 = ['BLM', 'SMN', 'RDM'];
        let playerList1 = [];
        let playerList2 = [];
        let playerList3 = [];
        let playerList4 = [];
        let playerList5 = [];
        let playersArray = interaction.message.content.split('\n'); 
        let emojiIndex = emojiList.findIndex(element => element.roleName === interaction.customId);
        let emojiID = interaction.client.emojis.cache.get(emojiList[emojiIndex].roleEmoji).toString();
        let newPlayerArray = [];
        const playerExist = playersArray.findIndex(element => element.match(interaction.user.id));
        if (playerExist !== -1) {
            var roles = playersArray[playerExist].match(/\(.*\)/gi)[0].substring(1,playersArray[playerExist].match(/\(.*\)/gi)[0].length-1).split(', ');
            if (playersArray[playerExist].match(interaction.customId)) {
                if (roles.length === 1) playersArray.splice(playerExist,1);
                else {
                    roles.splice(roles.findIndex(element => element.match(interaction.customId)),1);
                    playersArray[playerExist] = `<@${interaction.user.id}>: (${roles.join(', ')})`;
                }
            } else {
                roles.push(`${emojiID}${interaction.customId}`);
                roles.sort((a,b) => roleList.indexOf(a) - roleList.indexOf(b));
                playersArray[playerExist] = `<@${interaction.user.id}>: (${roles.join(', ')})`;
            }
        } else {
            playersArray.push(`<@${interaction.user.id}>: (${emojiID}${interaction.customId})`);
        }
        let rosterRow = playersArray.findIndex(element => element.match(`Roster`));
        for (i = 0; i < rosterRow; i++) {
            newPlayerArray.push(playersArray[i]);
        }
        newPlayerArray.push(`Roster (${playersArray.length - rosterRow - 1}/8)`);
        if (playersArray.length > ++rosterRow) {
            for (i = rosterRow; i < playersArray.length; i++) {
                roles = playersArray[i].match(/\(.*\)/gi)[0].substring(1,playersArray[i].match(/\(.*\)/gi)[0].length-1).split(', ');
                roles = roles.map(element => element.substring(element.length-3,element.length));
                if (roles.some(r => list1.includes(r))) playerList1.push(i);
                else if (roles.some(r => list2.includes(r))) playerList2.push(i);
                else if (roles.some(r => list3.includes(r))) playerList3.push(i);
                else if (roles.some(r => list4.includes(r))) playerList4.push(i);
                else if (roles.some(r => list5.includes(r))) playerList5.push(i);
            }
            for (const item of playerList1) {
                newPlayerArray.push(playersArray[item]);
            }
            for (const item of playerList2) {
                newPlayerArray.push(playersArray[item]);
            }
            for (const item of playerList3) {
                newPlayerArray.push(playersArray[item]);
            }
            for (const item of playerList4) {
                newPlayerArray.push(playersArray[item]);
            }
            for (const item of playerList5) {
                newPlayerArray.push(playersArray[item]);
            }

        }
        await interaction.update({
            content: newPlayerArray.join('\n')
            , components: [row, row2, row3, row4, row5]
        });
    }
}