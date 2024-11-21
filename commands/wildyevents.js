// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
// const { WildyPings, sequelize } = require('../dbObjects.js');
// const { QueryTypes, Op } = require('sequelize');
// const {Cron} = require(`croner`);

import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { sequelize } from '../dbObjects.js';
import { QueryTypes } from 'sequelize';
import {Cron} from 'croner';

export default {
    startingTime: new Date('February 06, 2024 03:00:00').valueOf()/1000,
    guildID: ['0'],
	data: new SlashCommandBuilder()
	.setName('wildyevents')
	.setDescription('Get next event details!')
    .addSubcommand(subcommand =>
        subcommand
        .setName('display')
        .setDescription('Get next three upcoming wildy events details')
    )
    .addSubcommandGroup(subcommandGroup =>
        subcommandGroup
        .setName('notification')
        .setDescription('Change notification settings')
        .addSubcommand(subcommand =>
            subcommand
            .setName('subscribe')
            .setDescription('Subcribe to a wilderness event notification')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('unsubscribe')
            .setDescription('Unsubcribe from a wilderness event notification')
        )
    ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'display':
                await interaction.deferReply();
                const startingTime = this.startingTime;
                const hour = 3600;
                const currentTime = Math.floor(new Date().valueOf() / 1000);
                let eventList = await sequelize.query(`
                    select id
                        , a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
                        , hasCombat
                        , isSpecial
                        , image
                    from WildyEvents a
                    order by id
                `, {type: QueryTypes.SELECT});
                let userSubscribedList = await sequelize.query(`select * from WildyPings where userID = ?`, {replacements: [interaction.user.id], type: QueryTypes.SELECT});
                const eventNumber = Math.ceil(((currentTime - startingTime)/hour)%eventList.length);
                let newEventList = eventList.splice(eventNumber);
                newEventList = [...newEventList, ...eventList]
                const hoursElapsed = Math.ceil((currentTime - startingTime)/hour);
                const nextHour = (hoursElapsed * 3600) + startingTime;
                const embed = new EmbedBuilder()
                    .setTitle('Upcoming Wilderness Events')
                    .setColor('#3b5cac')
                if (userSubscribedList.length > 0) {
                    let nextSubscribedEventIndex = newEventList.findIndex(index => {
                        for (let i = 0; i < userSubscribedList.length; i++) {
                            if (userSubscribedList[i].eventNumber == index.id) return true;
                        }
                        return false;
                    });
                    let description = `Your next subscribed event is **${newEventList[nextSubscribedEventIndex].name} <t:${nextHour + (3600 * nextSubscribedEventIndex)}:R>** at **<t:${nextHour + (3600 * nextSubscribedEventIndex)}:t>**.`;
                    embed
                        .setDescription(description)
                        .setImage(newEventList[nextSubscribedEventIndex].image);
                } else {
                    let description = `<t:${nextHour}:R>: **${newEventList[0].name}**`;
                    if (newEventList[0].isSpecial != 1) {
                        let nextSpecial = newEventList.findIndex(event => event.isSpecial == 1);
                        let nextSpecialHour = nextHour + (3600 * nextSpecial);
                        description += `\n\n**Next Special Event: ${newEventList[nextSpecial].name}** at <t:${nextSpecialHour}:t>`;
                    }
                    embed
                        .setDescription(description)
                        .setImage(newEventList[0].image);
                }
                await interaction.editReply({embeds: [embed]});
                break;

            case 'subscribe':
                await interaction.deferReply({ephemeral: true});
                const userNotSubscribedEvents = await sequelize.query(`
                    select a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
                        , id
                        , a.emojiID
                    from WildyEvents a
                    where a.id not in (
                        select eventNumber
                        from WildyPings
                        where userID = ?
                    )
                `, {replacements: [interaction.user.id], type: QueryTypes.SELECT});
                if (userNotSubscribedEvents.length == 0) {
                    await interaction.editReply({
                        content: `You have already subscribed to all wilderness event notifications!`
                    });
                    return;
                }
                var wildyMenu = [];
                userNotSubscribedEvents.forEach(element => {
                    wildyMenu.push({
                        label: element.name
                        , value: element.id.toString()
                        , emoji: element.emojiID ? element.emojiID : '1208608771803185173'
                    });
                });
                const row = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('wildy subscribe')
                            .setPlaceholder('Nothing selected')
                            .setMinValues(1)
                            .setMaxValues(userNotSubscribedEvents.length)
                            .addOptions(wildyMenu)
                    );
                var wildyEmbed = new EmbedBuilder()
                .setColor('#3b5cac')
                .setTitle('Select events to be subscribed in:')
                .setDescription('You can select multiple at once:');

                await interaction.editReply({embeds: [wildyEmbed], components: [row] });
                break;

            case 'unsubscribe':
                await interaction.deferReply({ephemeral: true});                
                const userSubscribedEvents = await sequelize.query(`
                    select a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
                        , id
                        , a.emojiID
                    from WildyEvents a
                    where a.id in (
                        select eventNumber
                        from WildyPings
                        where userID = ?
                    )
                `, {replacements: [interaction.user.id], type: QueryTypes.SELECT});
                if (userSubscribedEvents.length == 0) {
                    await interaction.editReply({
                        content: `You are not subscribed to any wilderness event notifications!`
                    });
                    return;
                }
                var wildyMenu = [];
                userSubscribedEvents.forEach(element => {
                    wildyMenu.push({
                        label: element.name
                        , value: element.id.toString()
                        , emoji: element.emojiID
                    });
                });
                let unsubscribeSelectMenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('wildy unsubscribe')
                            .setPlaceholder('Nothing selected')
                            .setMinValues(1)
                            .setMaxValues(userSubscribedEvents.length)
                            .addOptions(wildyMenu)
                    );
                var wildyEmbed = new EmbedBuilder()
                .setColor('#3b5cac')
                .setTitle('Select events to unsubscribe from:')
                .setDescription('Select events to unsubscribe from');
                await interaction.editReply({embeds: [wildyEmbed], components: [unsubscribeSelectMenu] });
                break;
        
            default:
                break;
        }
    },
    async hourlyNotification(client) {
        const startingTime = this.startingTime;
		const hour = 3600;

		const job = Cron('00 53 * * * *', async () => {
            const currentTime = Math.floor(new Date().valueOf() / 1000);
            let eventList = await sequelize.query(`
                select id
                    , a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
                    , hasCombat
                    , isSpecial
                    , image
                from WildyEvents a
                order by id
            `, {type: QueryTypes.SELECT});
            let subscriptionList = await sequelize.query(`select * from WildyPings`, {type: QueryTypes.SELECT});
            const eventNumber = Math.ceil(((currentTime - startingTime)/hour)%eventList.length);
            const data = subscriptionList.filter(event => event.eventNumber == eventNumber + 1);
            let newEventList = eventList.splice(eventNumber);
            newEventList = [...newEventList, ...eventList];
            let splicedEventList = newEventList.splice(1);
            let modifiedEventList = [...splicedEventList, ...newEventList];
            newEventList = [...newEventList, ...splicedEventList];
            const hoursElapsed = Math.ceil((currentTime - startingTime)/hour);
            const nextHour = (hoursElapsed * 3600) + startingTime;
            let description = `# ${newEventList[0].name} <t:${nextHour}:R>`;
            const embed = new EmbedBuilder()
                .setTitle('Upcoming Wilderness Events')
                .setColor('#3b5cac')
                .setImage(newEventList[0].image);
			let user;
			for (let i = 0; i < data.length; i++) {
				user = await client.users.fetch(data[i].userID).catch(console.error);
                let userList = subscriptionList.filter(list => list.userID == data[i].userID);
                let nextSubscribedEventIndex = modifiedEventList.findIndex(index => {
                    for (let i = 0; i < userList.length; i++) {
                        if (userList[i].eventNumber == index.id) return true;
                    }
                    return false;
                });
                embed.setDescription(`${description}\n\nAfterwards, get ready for **${modifiedEventList[nextSubscribedEventIndex].name} <t:${nextHour + (3600 * (nextSubscribedEventIndex + 1))}:R>** at **<t:${nextHour + (3600 * (nextSubscribedEventIndex + 1))}:t>**.`);
				await user.send({embeds: [embed]}).catch((err) => {
					sequelize.query(`delete from WildyPings where userID = ?`, {type: QueryTypes.DELETE, replacements: [data[i].userID]});
					console.log(err);
				});
			}
		});
    }
};