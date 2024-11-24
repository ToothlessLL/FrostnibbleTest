// const { EmbedBuilder } = require('discord.js');
// const {sequelize} = require('../../dbObjects');
// const {QueryTypes} = require('sequelize');

import { EmbedBuilder } from 'discord.js';
import {sequelize} from '../../dbObjects.js';
import {QueryTypes} from 'sequelize';

export default {
    data: {
        name: `wildy subscribe`
    },
    async execute(interaction) {
		let queryList = [];
		const userWildyPing = await sequelize.query(`select * from WildyPingNotifications where userID = ?`, {replacements: [interaction.user.id], type: QueryTypes.SELECT});
		if (userWildyPing.length == 0) queryList.push(sequelize.query(`insert into WildyPingNotifications values (?, 0)`, {replacements: [interaction.user.id], type: QueryTypes.INSERT}));
		else queryList.push(sequelize.query(`update WildyPingNotifications set counter = 0 where userID = ?`, {replacements: [interaction.user.id], type: QueryTypes.UPDATE}));
		queryList.push(sequelize.query(`
			select a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
				, id
			from WildyEvents a
		`, {type: QueryTypes.SELECT}));
		interaction.values.forEach(element => {
			queryList.push(sequelize.query(`insert into WildyPings (userID, eventNumber) values (?, ?)`, {replacements: [interaction.user.id, parseInt(element)], type: QueryTypes.INSERT}));
		});
		Promise.allSettled(queryList)
		.then(result => {
			console.log(result[1]);
			const selectedEventList = result[1].value.filter(event => {
				for (let i = 0; i < interaction.values.length; i++) {
					if (event.id.toString() == interaction.values[i]) return true;
				}
			});
			let description = `Please allow the bot to DM you as this is how you will be notified! You have subscribed for the following notifications:`;
			selectedEventList.forEach(event => {
				description += `\n- ${event.name}`;
			})
			let embed = new EmbedBuilder()				
				.setTitle('Wilderness Event Subscription')
				.setDescription(description)
				.setColor('#3b5cac');
			interaction.update({
				embeds: [embed]
				, components: []
			});
		});
    }
}