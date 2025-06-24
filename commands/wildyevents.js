import { 
    SlashCommandBuilder
    , EmbedBuilder
    , ActionRowBuilder
    , StringSelectMenuBuilder
    , InteractionContextType
    , ApplicationIntegrationType
    , ContainerBuilder
    , SeparatorBuilder
    , SeparatorSpacingSize
    , MediaGalleryBuilder
    , MediaGalleryItemBuilder
    , TextDisplayBuilder,
    MessageFlags,
    AttachmentBuilder
} from 'discord.js';
import { sequelize } from '../dbObjects.js';
import { QueryTypes } from 'sequelize';
import {Cron} from 'croner';

const config = {
    startingTime: new Date('February 06, 2024 03:00:00').valueOf()/1000
    , hour: 3600
}

export default {
    startingTime: new Date('February 06, 2024 03:00:00').valueOf()/1000,
    guildID: ['0'],
	data: new SlashCommandBuilder()
	.setName('wildyevents')
	.setDescription('Get next event details!')
    .setContexts([InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel])
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
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
        if (interaction.client.user.id === '1037880154938163220') config.command = `</wildyevents notification subscribe:1365544968411938895>`;
        else if (interaction.client.user.id === '903311924815622207') config.command = `</wildyevents notification subscribe:1309024042023391257>`;
        switch (interaction.options.getSubcommand()) {
            case 'display':
                interaction.deferReply()
                .then(result => getOutputUsingV2(interaction))
                // .then(result => getDisplayOutput(interaction))
                .then(result => interaction.editReply(result))
                .catch(err => console.log(err));
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
    async oldHourlyNotification(client) {
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
    , async hourlyNotification(client) {
        const startingTime = this.startingTime;
		const hour = 3600;
		const job = new Cron('00 53 * * * *', async () => {
        // const job = Cron('*/5 * * * * *', async () => {
            let userData = new Map();
            let indexMap = new Map();
            const currentTime = Math.floor(new Date().valueOf() / 1000);
            const hoursElapsed = Math.ceil((currentTime - startingTime)/hour);
            const nextHour = (hoursElapsed * 3600) + startingTime;
            let eventList = sequelize.query(`
                select id
                    , a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
                    , hasCombat
                    , isSpecial
                    , image
                from WildyEvents a
                order by id
            `, {type: QueryTypes.SELECT});
            let subscriptionList = sequelize.query(`select * from WildyPings`, {type: QueryTypes.SELECT});
            Promise.all([eventList, subscriptionList])
            .then(result => {
                const eventNumber = Math.ceil(((currentTime - startingTime)/hour)%result[0].length);
                const data = result[1].filter(event => event.eventNumber == eventNumber + 1);
                let newEventList = result[0].splice(eventNumber);
                newEventList = [...newEventList, ...result[0]];
                let splicedEventList = newEventList.splice(1);
                let modifiedEventList = [...splicedEventList, ...newEventList];
                newEventList = [...newEventList, ...splicedEventList];
                let user = [];
			    for (let i = 0; i < data.length; i++) {
                    user.push(client.users.fetch(data[i].userID)) - 1;
                    let userList = result[1].filter(list => list.userID == data[i].userID);
                    let nextSubscribedEventIndex = modifiedEventList.findIndex(index => {
                        for (let i = 0; i < userList.length; i++) {
                            if (userList[i].eventNumber == index.id) return true;
                        }
                        return false;
                    });
                    userData.set(data[i].userID, {
                        embed: new EmbedBuilder()
                            .setTitle('Upcoming Wilderness Events')
                            .setColor('#3b5cac')
                            .setImage(newEventList[0].image)
                            .setDescription(`# ${newEventList[0].name} <t:${nextHour}:R>\n\nAfterwards, get ready for **${modifiedEventList[nextSubscribedEventIndex].name} <t:${nextHour + (3600 * (nextSubscribedEventIndex + 1))}:R>** at **<t:${nextHour + (3600 * (nextSubscribedEventIndex + 1))}:t>**.`)
                    });
                }
                return Promise.allSettled(user);
            })
            .then(result => {
                let sendData = [];
                result.forEach(user => {
                    if (user.status == 'fulfilled') {
                        let index = sendData.push(user.value.send({embeds: [userData.get(user.value.id).embed]})) - 1;
                        indexMap.set(index, user.value.id);
                    } if (user.status == 'rejected') console.log(user.reason);
                });
                return Promise.allSettled(sendData);
            })
            .then(result => {
                let fulfilledList = [];
                let rejectedList = [];
                result.forEach((message, index) => {
                    console.log(message);
                    if (message.status == 'fulfilled') fulfilledList.push(indexMap.get(index));
                    else rejectedList.push(indexMap.get(index));
                });
                sequelize.query(`update WildyPingNotifications set counter = 0 where userID in ('${fulfilledList.join("','")}')`, {type: QueryTypes.UPDATE});
                return sequelize.query(`update WildyPingNotifications set counter = counter + 1 where userID in ('${rejectedList.join("','")}')`, {type: QueryTypes.UPDATE});
            })
            .then(result => {
                sequelize.query(`delete from WildyPings where userID in (select userID from WildyPingNotifications where counter >= 3);`, {type: QueryTypes.DELETE});
                sequelize.query(`delete from WildyPingNotifications where counter >= 3;`, {type: QueryTypes.DELETE});
            })
            .catch(err => console.log(err));
		});
    }
};

async function getDisplayOutput (interaction) {
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
        embed.setDescription(description)
            .setImage(newEventList[nextSubscribedEventIndex].image);
    } else {
        let description = `<t:${nextHour}:R>: **${newEventList[0].name}**`;
        if (newEventList[0].isSpecial != 1) {
            let nextSpecial = newEventList.findIndex(event => event.isSpecial == 1);
            let nextSpecialHour = nextHour + (3600 * nextSpecial);
            description += `\n\n**Next Special Event: ${newEventList[nextSpecial].name}** at <t:${nextSpecialHour}:t>`;
        }
        embed.setDescription(description)
            .setImage(newEventList[0].image);
    }
    return {embeds: [embed]};
}

async function getOutputUsingV2(interaction) {
    config.currentTime = Math.floor(new Date().valueOf() / 1000);
    return Promise.all([fetchEventList(), fetchUserSubscribedEvents(interaction.user.id)])
    .then(results => {
        let eventList = results[0];
        let userSubscribedList = results[1];
        const index = Math.ceil(((config.currentTime - config.startingTime)/config.hour)%eventList.length);
        const newEventList = reorderEventList(eventList, index);
        config.hoursElapsed = Math.ceil((config.currentTime - config.startingTime)/config.hour);
        config.nextHour = (config.hoursElapsed * 3600) + config.startingTime;
        config.firstEvent = getNextSubscribedEvent(newEventList, userSubscribedList, config, 0);
        const eventListTwo = reorderEventList(newEventList, 1 + config.firstEvent.index);
        config.secondEvent = getNextSubscribedEvent(eventListTwo, userSubscribedList, config, 1 + config.firstEvent.index);

        const container = new ContainerBuilder().setAccentColor(3890348);
        const image = new MediaGalleryItemBuilder();
        const media = new MediaGalleryBuilder()
    
        const text1 = [`# Upcoming Wilderness Event`];
        text1.push(`${config.firstEvent.subscribed ? `Your next subscribed` : `The next`} event is **${config.firstEvent.name} <t:${config.firstEvent.time}:R>** at **<t:${config.firstEvent.time}:t>**.`);
        image.setURL(config.firstEvent.image);
        const file = new AttachmentBuilder(config.firstEvent.image);
        // const imageLink = `C:\\Users\\warri\\OneDrive\\Alan\\node projects\\Frostnibble\\wildy_stuff\\images\\Wilderness_Events_Border.png`;
        // const file = new AttachmentBuilder(imageLink);
        // image.setURL(`attachment://Wilderness_Events_Border.png`);
        
        container.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(text1.join('\n'))
        );
        media.addItems(image);
        container.addMediaGalleryComponents(media);
        container.addSeparatorComponents(separator => separator.setSpacing(SeparatorSpacingSize.Large));
        const text2 = `Next Event: **${config.secondEvent.name}** at <t:${config.secondEvent.time}:t>`;
        container.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(text2)
        );
        container.addSeparatorComponents(separator => separator.setSpacing(SeparatorSpacingSize.Large));
        const text3 = `-# *Don't forget to subscribe using ${config.command} to get notified 7 minutes before the event starts!*`
        container.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(text3)
        );
        return {
            components: [container]
            , files: [file]
            , flags: [MessageFlags.IsComponentsV2]
        }
    });
}

async function fetchUserSubscribedEvents(userID) {
    return sequelize.query(`select * from WildyPings where userID = ?`, {replacements: [userID], type: QueryTypes.SELECT});
}

async function fetchEventList() {
    return sequelize.query(`
        select id
            , a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
            , hasCombat
            , isSpecial
            , image
        from WildyEvents a
        order by id
    `, {type: QueryTypes.SELECT});
}

function reorderEventList(eventList, index) {
    let newEventList = eventList.splice(index);
    return [...newEventList, ...eventList];
}

function getNextSubscribedEvent(eventList, userSubscribedList, config, initialIndex) {
    if (userSubscribedList.length > 0) {
        let index = eventList.findIndex(index => {
            for (let i = 0; i < userSubscribedList.length; i++) {
                if (userSubscribedList[i].eventNumber == index.id) return true;
            }
            return false;
        });
        return {
            name: eventList[index].name
            , time: config.nextHour + (3600 * (index + initialIndex))
            , image: eventList[index].image
            , index: index + initialIndex
            , subscribed: true
        }
    }
    return {
        name: eventList[0].name
        , time: config.nextHour + (3600 * (0 + initialIndex))
        , image: eventList[0].image
        , index: 0 + initialIndex
        , subscribed: false
    }
}