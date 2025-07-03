import { ChannelType } from "discord.js";

export default {
    data: {
        name: `bingoissues`
    },
    async execute(interaction) {
        await interaction.update({});
        let user = interaction.user.username;
        user += interaction.member.nickname ? ` (${interaction.member.nickname})` : '';
        let title = `${user} - Summer 2025 Bingo`;
        const thread = await interaction.channel.threads.create({
            name: `${title}`,
            autoArchiveDuration: 10080,
            type: ChannelType.PrivateThread,
            reason: `Created bingo issue ticket for ${user}`,
        });
        thread.members.add(interaction.user.id);
        let message = `<@&917436369876430928>`;
        message = `${message}\n\nRSN:`;
        message = `${message}\nTeam:`;
        message = `${message}\nQuestion/Concern:`;
        thread.send(message);
    }
}