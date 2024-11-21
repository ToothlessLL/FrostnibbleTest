// const { EmbedBuilder } = require('discord.js');
// const {sequelize} = require('../../dbObjects');
// const {QueryTypes} = require('sequelize');

import { EmbedBuilder } from 'discord.js';
import {sequelize} from '../../dbObjects.js';
import {QueryTypes} from 'sequelize';

export default {
    data: {
        name: `wildy unsubscribe`
    },
    async execute(interaction) {
		const wildyEventList = await sequelize.query(`
			select a.name || case when a.hasCombat = 1 then ' (combat)' else '' end || case when a.isSpecial = 1 then ' (special)' else '' end as name
				, id
			from WildyEvents a
		`, {type: QueryTypes.SELECT});
		await interaction.values.forEach(element => {
			sequelize.query(`delete from WildyPings where userID = ? and eventNumber = ?`, {replacements: [interaction.user.id, parseInt(element)], type: QueryTypes.DELETE});
		});
		const selectedEventList = wildyEventList.filter(event => {
			for (let i = 0; i < interaction.values.length; i++) {
				if (event.id.toString() == interaction.values[i]) return true;
			}
		});
		let description = `You have unsubscribed for the following notifications:`;
		selectedEventList.forEach(event => {
			description += `\n- ${event.name}`;
		})
		let embed = new EmbedBuilder()				
			.setTitle('Wilderness Event Unsubscription :(')
			.setDescription(description)
			.setColor('#3b5cac')
		await interaction.update({
			embeds: [embed]
			, components: []
		});
    }
}