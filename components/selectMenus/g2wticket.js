// const { ChannelType } = require('discord.js');

import { ChannelType } from 'discord.js';

export default {
    data: {
        name: `g2wticket`
    },
    async execute(interaction) {
		await interaction.update({});
		let user = interaction.user.username;
		user += interaction.member.nickname ? ` (${interaction.member.nickname})` : '';
		var title;
		var body;
		var thread;

		switch (interaction.values[0]) {
			case 'overseer':
				title = `Overseer+ chat - ${user}`;
				body = `<@&396185096463581186> <@&396184742439026699> <@&396184274769805313>
What is the issue you'd like to report? Please try and provide as much information as possible.`;
				thread = await interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 10080,
					type: ChannelType.PrivateThread,
					reason: `Created overseer chat for ${user}`,
				});
				await thread.members.add(interaction.user.id);
				await thread.send(body);			
				break;
			case 'suggestion':
				title = `Suggestions chat - ${user}`;
				console.log(interaction.member._roles);
				body = `<@&683768135148634130>
What is your suggestion?`;
				thread = await interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 10080,
					reason: `Created suggestion chat for ${user}`,
				});
				await thread.members.add(interaction.user.id);
				await thread.send(body);
				interaction.channel.lastMessage.delete();
				break;
			case 'waitlist':
				title = `Waitlist Application- ${user}`;
				body = `<@&683768135148634130>
**Please fill out the following:**
What is your in game Runescape name?
Is this your main Runescape account, or an alt?
How did you find out about the clan?
What is your total level?
Do you plan on being active at least once a week?
Are you interested in bossing with the clan?`;
				thread = await interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 10080,
					reason: `Created waitlist application for ${user}`,
				});
				await thread.members.add(interaction.user.id);
				await thread.send(body);
				interaction.channel.lastMessage.delete();
				break;
			case 'discord tags':
				title = `Discord Tag Submission - ${user}`;
				body = `<@&683768135148634130>
**IF you're applying for an EXP tag, please fill out the following:**
What is your in game Runescape name?
Which exp tag are you applying for?
What role are you applying for, if applicable? Base
What style do you plan on using?
Have you met the gear and level requirements?
Have you met the KC requirements?
Have you met any listed kill time requirement?
Do you have a solid understanding of DPS rotations for the boss?
Do you understand all mechanics/weekly rotations?
Are you ready to trial with a clan team?

**If you're applying for an achievement tag (5.6, IFB etc.):**
Please provide screenshot proof.`;
				thread = await interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 10080,
					reason: `Created discord tag submission for ${user}`,
				});
				await thread.members.add(interaction.user.id);
				await thread.send(body);
				interaction.channel.lastMessage.delete();
				break;
			case 'bossing teacher':
				title = `Bossing Teacher Application - ${user}`;
				body = `<@&683768135148634130>
**Please fill out the following:**
What is your in game username?
What combat styles are you proficient with?
What is your magic/ranged/attack/strength/defence/hitpoints level?
What is your herblore/summoning/prayer/invention level?
What bosses are you interested in teaching?
Do you have a preference on time of day/day of week you would like to help clannies learn bosses?
Are you able to use the clan discord to help provide verbal instruction to learners?
Are you able to use in game chat to help provide learners with instructions?
May clannies message you on discord / in game to ask for help?`;
				thread = await interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 10080,
					reason: `Created bossing teacher application for ${user}`,
				});
				await thread.members.add(interaction.user.id);
				await thread.send(body);
				interaction.channel.lastMessage.delete();
				break;
			case 'gem scores':
				title = `Gem Scores Submission - ${user}`;
				body = `<@&683849988723179691>
**Please submit a valid 5-minute vod with both inventory and worn equipment visible**`;
				thread = await interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 10080,
					reason: `Created gem scores submission for ${user}`,
				});
				await thread.members.add(interaction.user.id);
				await thread.send(body);
				interaction.channel.lastMessage.delete();
				break;
			case 'general inquiries':
				title = `General Inquiries - ${user}`;
				body = `<@&683768135148634130>
**Please post the question you have here and we will get back to you as soon as we can**`;
				thread = await interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 10080,
					reason: `Created general inquiries for ${user}`,
				});
				await thread.members.add(interaction.user.id);
				await thread.send(body);
				interaction.channel.lastMessage.delete();
				break;
			default:
				break;
		}
    }
}