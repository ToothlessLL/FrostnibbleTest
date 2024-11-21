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
		const wildyEventList = await sequelize.query(`
			select a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
				, id
			from WildyEvents a
		`, {type: QueryTypes.SELECT});
		await interaction.values.forEach(element => {
			sequelize.query(`insert into WildyPings (userID, eventNumber) values (?, ?)`, {replacements: [interaction.user.id, parseInt(element)], type: QueryTypes.INSERT});
		});
		const selectedEventList = wildyEventList.filter(event => {
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
			.setColor('#3b5cac')
		await interaction.update({
			embeds: [embed]
			, components: []
		});
    }
}