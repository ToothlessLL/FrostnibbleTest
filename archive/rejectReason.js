const {EmbedBuilder} = require(`discord.js`);

module.exports = {
    data: {
        name: `rejectReason`
    },
    async execute(interaction, client) {
        var person = interaction.member.nickname ? interaction.member.nickname : interaction.user.username;
        var content = `${interaction.message.content}\n❌ ${interaction.fields.getTextInputValue('rejectReasonInput')}`;
        messageEmbed = interaction.message.embeds[0];
        newEmbed = EmbedBuilder.from(messageEmbed)
            .setFooter({text: `❌Rejected by ${person}`})
            .setTimestamp()
            .setDescription(`This submission was rejected for: ${interaction.fields.getTextInputValue('rejectReasonInput')}`);
        await interaction.update({
            embeds: [newEmbed]
            , components: []
        });
    }
}