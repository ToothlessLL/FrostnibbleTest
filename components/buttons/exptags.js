export default {
    data: {
        name: `exptags`
    },
    async execute(interaction) {
        await interaction.update({});
        let user = interaction.user.username;
        user += interaction.member.nickname ? ` (${interaction.member.nickname})` : '';
        let title = `Exp Tag Application - ${user} - ${interaction.user.id}`;
        interaction.guild.roles.fetch('1028204069413736478')
            .then(role => {
                interaction.member.roles.add(role)
                .then()
                .catch(console.error);
            })
            .catch(console.error);
        const thread = await interaction.channel.threads.create({
            name: `${title}`,
            autoArchiveDuration: 10080,
            reason: `Created exp tag application for ${user}`,
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
        thread.send(`<@&909459158712082482><@&909459422437318717><@&935416318805573703>
**Please fill out the following:**
What is your in game Runescape name?
Which exp tag are you applying for?
What role are you applying for, if applicable?
What style do you plan on using?
Have you met the gear and level requirements?
Have you met the KC requirements?
Have you met any listed kill time requirement?
Do you have a solid understanding of DPS rotations for the boss?
Do you understand all mechanics/weekly rotations?
Are you ready to trial with a clan team?`);
    }
}