// const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder  } = require('discord.js');

import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export default {
    data: {
        name: `plumbus`
    },
    async execute(interaction) {
		const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('plumbus')
                .setPlaceholder('Nothing selected')
                .addOptions(
                    {
                        label: 'Full plumbus',
                        value: '920434737653354556',
                        emoji: '🍇'
                    },
                    {
                        label: 'Blamp rubbed chumbles',
                        value: '920436843181404232',
                        emoji: '♨️'
                    },
                    {
                        label: 'Schlami rubbed and spat',
                        value: '920437081090707498',
                        emoji: '🥦'
                    },
                    {
                        label: 'Fleet rubbed',
                        value: '920438175980220457',
                        emoji: '🧽'
                    },
                    {
                        label: 'Grumbo held dinglebop',
                        value: '920437310967906365',
                        emoji: '🔘'
                    },
                    {
                        label: 'Schleemed dinglebop',
                        value: '920437432971821086',
                        emoji: '🍪'
                    },
                    {
                        label: 'Dinglebop',
                        value: '920437741693583461',
                        emoji: '🍞'
                    },
                ),
        );
        var roles = ['920434737653354556','920436843181404232','920437081090707498','920438175980220457','920437310967906365','920437432971821086','920437741693583461'];
        let message = '';
        const currentRoles = interaction.member._roles.filter(value => roles.includes(value));
        console.log(currentRoles);

        if (currentRoles.length == 0) {
            console.log('in here 1');
            interaction.member.roles.add(interaction.values[0]);
            message = 'Role added!';
        } else if (currentRoles[0] === interaction.values[0]) {
            console.log('in here 2');
            interaction.member.roles.remove(interaction.values[0]);
            message = 'Role removed!';
        } else {
            interaction.member.roles.remove(currentRoles[0]);
            interaction.member.roles.add(interaction.values[0]);
            message = 'Role added!';
        }
        await interaction.reply({
            content: message
            , ephemeral: true
        });
    }
}