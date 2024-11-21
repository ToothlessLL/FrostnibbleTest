// const { SlashCommandBuilder } = require('@discordjs/builders');

import { SlashCommandBuilder } from 'discord.js';

export default {
    guildID: ['396178885261262848'],
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Please select a ticket type you want to submit')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticket')
                .setDescription('Locks and archives this ticket/thread')),
    async execute(interaction) {
        if (interaction.channel.isThread()) {
            var count = 0;
            const learnerChannelID = '683209028234641408';
            const discordChannelID = '762017017233801218';
            const learnerSignupRoleID = '1023034443381882900';
            const expTagRoleID = '1028204069413736478';
            const discordTagRoleID = '1028203764877889576';
            let userID = interaction.channel.name.split(' - ');
            if (interaction.channel.parentId == learnerChannelID){ //learner signup
                interaction.guild.channels.cache.get(learnerChannelID).threads.fetchActive()
                .then(x => {
                    x.threads.map(thread => {
                        if (thread.name.includes(userID[userID.length - 1])) {
                            count++;
                        }
                    });
                    if (count === 1) {
                        interaction.guild.members.fetch(userID[userID.length - 1])
                        .then((user) => {
                            // remove role here
                            user.roles.remove(learnerSignupRoleID);
                        })
                        .catch(() => {});
                    }
                });
            } else if (interaction.channel.parentId == discordChannelID) { //discord tag applications
                if (interaction.channel.name.includes("Exp Tag Application")) {
                    interaction.guild.channels.cache.get(discordChannelID).threads.fetchActive()
                    .then(x => {
                        x.threads.map(thread => {
                            if (thread.name.includes(userID[userID.length - 1]) && thread.name.includes("Exp Tag Application")) {
                                count++;
                            }
                        });
                        if (count === 1) {
                            interaction.guild.members.fetch(userID[userID.length - 1])
                            .then((user) => {
                                // remove role here
                                user.roles.remove(expTagRoleID);
                            })
                            .catch(() => {});
                        }
                    });
                } else if (interaction.channel.name.includes("Discord Tag Application")) {
                    interaction.guild.channels.cache.get(discordChannelID).threads.fetchActive()
                    .then(x => {
                        x.threads.map(thread => {
                            if (thread.name.includes(userID[userID.length - 1]) && thread.name.includes("Discord Tag Application")) {
                                count++;
                            }
                        });
                        if (count === 1) {
                            interaction.guild.members.fetch(userID[userID.length - 1])
                            .then((user) => {
                                // remove role here
                                user.roles.remove(discordTagRoleID);
                            })
                            .catch(() => {});
                        }
                    });
                }
            }
            await interaction.reply({content: 'ticket is now locked and closed'});
            interaction.channel.setLocked(true);
            interaction.channel.setArchived(true);
        } else {
            interaction.reply({content: 'This is not a thread!'});
        }
    },
};