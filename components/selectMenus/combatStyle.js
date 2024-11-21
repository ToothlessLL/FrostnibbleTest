// const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ChannelType } = require('discord.js');
// const { sequelize } = require('../../dbObjects.js');
// const { QueryTypes } = require('sequelize');
// const general = require(`../../functions/general.js`);

import {sequelize} from '../../dbObjects.js';
import {QueryTypes} from 'sequelize';
import general from '../../functions/general.js';

export default {
    data: {
        name: `combatStyle`
    },
    async execute(interaction) {
		await interaction.update({components: []});
		var bossID = /(\d+)-(learner|advanced|solo)-(\d+)/.exec(interaction.values[0]);
		var bossInfo = await sequelize.query(`select boss, emoji, advanced from LearnerSignup where id = ?`, {type: QueryTypes.SELECT, replacements: [bossID[1]]});
		var selectedCombatStyle = general.combatStyles.filter(filter => filter.id == bossID[3]);
		var bossPreset = await sequelize.query(`select preset from LearnerSignupPresets where bossID = ? and combatStyleID = ?`, {type: QueryTypes.SELECT, replacements: [bossID[1], bossID[3]]});
		let user = interaction.user.username;
		user += interaction.member.nickname ? ` (${interaction.member.nickname})` : '';
		interaction.guild.roles.fetch('1023034443381882900')
			.then(role => {
				interaction.member.roles.add(role)
				.then()
				.catch(console.error);
			})
			.catch(console.error);
		let title = `${bossID[2] == 'advanced' ? `Advanced ` : (bossID[2] == 'solo' ? 'Solo ' : '')}${bossInfo[0].boss} - ${user} - ${interaction.user.id}`;
		const thread = await interaction.channel.threads.create({
			name: `${title}`,
			autoArchiveDuration: 10080,
			reason: `Created learner signup for ${user}`,
		});
		interaction.channel.messages.fetch()
			.then(message => {
				message.map(message => {
					if (message.content === title) {
						message.delete()
							.then()
							.catch(console.error);
					}
				});
			})
			.catch(console.error);
		thread.members.add(interaction.user.id);
		var message;
		if (bossInfo[0].boss === 'Solak' && interaction.values[0].includes('advanced')) {
			message = `Hello fellow Solakers, and Grind 2 Win clan members. We have created this channel in order to take your Solak skills to the next level. You can sign up as long as you know the basic mechanics and have the Silver Mage/Melee/Ranged dps tags. <@216041543495188490>, <@276125290156130304>, <@205580747384422400>, <@641074538901143552>, <@443940818794053644>, and <@200408013893402633> will be the main hosts for the Advanced Solak Teaching Sessions. Others may be in on helping as well from time to time.`;
			message += `\n\nThe goal of this is to make everyone better at Solak. You can fill out the template below by copying and pasting it. This will be used to take you from the 6-8 min range down to sub 5s or even lower.  Feel free to sign up, and enjoy Solak’ing!`;
			message += `\n\nTemplate:`;
			message += `\n\nIgn:`;
			message += `\n\nPreset photo`;
			message += `\n\nKc:`;
			message += `\n\nPr:`;
		} else {
			message = `<@&1022330232474189915>`;
			message += `\nWhat is your in game Runescape name?`;
			message += `\nIs there any specific role you want to learn at the boss? (yes/no)`;
			message += `\nDo you have any experience at this boss? If so, what is your kc?`;
			message += `\nHave you watched any guides or videos for the boss? (yes/no)`;
			message += `\nWhat is your combat level?`;
			message += `\nWhat is your magic/ranged/attack/strength/defence/hitpoints level? xx/xx/xx/xx/xx/xx:`;
			message += `\nWhat is your herblore/summoning/prayer/invention level? xx/xx/xx/xx:`;
			message += `\nAre you able to join discord to listen for instructions/calls? (yes/no)`;
			message += `\nDo you have a preference on time of day/day of week you would like to learn the boss?`;
			message += `\nAny additional information you would like us to know?`;
			// if (bossPreset.length > 0) message += `\n\n**Here's an example [${selectedCombatStyle[0].style} preset](<${bossPreset[0].preset}>). Post one below best matched with your own gear.**`;
			if (bossPreset.length > 0) message += `\n\nYou've selected the ${selectedCombatStyle[0].style} style so here's a recommended [preset](<${bossPreset[0].preset}>) you can model after.`
			else message += `\n\nYou've selected the ${selectedCombatStyle[0].style} style, do your best to create a preset or a ask a bossing teacher to provide one for you.`
		}
		thread.send(message);
	}
}