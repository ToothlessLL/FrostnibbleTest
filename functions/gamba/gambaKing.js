const gambaRanking = require(`./gambaRanking`);

module.exports = {
    async gambaKing (interaction) {
        // var gambaKingRoleID = '903820814116352100'; //test server
        var gambaKingRoleID = '911024137546391552';
        try {
            let members = await interaction.guild.roles.resolve(gambaKingRoleID).members;
            var userCash = await gambaRanking.gambaRanking(interaction);
            let userExists = false;
            var newKingGamba = false;
            if (members.size > 1) {
                members.map(member => {
                    if (member.id != userCash[0].id) {
                        member.roles.remove(gambaKingRoleID);
                    } else {
                        userExists = true;
                    }
                });
                if (!userExists) interaction.guild.members.fetch(userCash[0].id)
                    .then(member => {
                        member.roles.add(gambaKingRoleID)
                        newKingGamba = true;
                    }).catch(() => {});
            } else if (!members.get(userCash[0].id)) {
                members.map(member => {
                    member.roles.remove(gambaKingRoleID);
                });
                interaction.guild.members.fetch(userCash[0].id)
                .then(member => member.roles.add(gambaKingRoleID))
                .catch(() => {});
                newKingGamba = true;
            }
            if (newKingGamba) await interaction.channel.send(`<@${userCash[0].id}> is our new <@&${gambaKingRoleID}>!`);
        } catch (error) {
            console.error(error);
        }
    }
}