export default {
    data: {
        name: `nonexptags`
    },
    async execute(interaction) {
        interaction.update({});
        let user = interaction.user.username;
        user += interaction.member.nickname ? ` (${interaction.member.nickname})` : '';
        let title = `Discord Tag Application - ${user} - ${interaction.user.id}`;
        interaction.guild.roles.fetch('1028203764877889576')
            .then(role => {
                interaction.member.roles.add(role)
                .then()
                .catch(console.error);
            })
            .catch(console.error);
        const thread = await interaction.channel.threads.create({
            name: `${title}`,
            autoArchiveDuration: 10080,
            reason: `Created discord tag application for ${user}`,
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
        thread.send(`<@&396185096463581186><@&396184742439026699><@&396184274769805313>
What tag(s) are you applying for? Please provide screenshot proof.`);
    }
}