const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Goals, sequelize } = require('../dbObjects.js');
const { QueryTypes } = require('sequelize');

module.exports = {
    guildID: ['0'],
	data: new SlashCommandBuilder()
		.setName('goals')
		.setDescription('Your RS goals!')
        .addSubcommand(subcommand =>
            subcommand.setName('add')
            .setDescription('Add a new goal')
            .addStringOption(option =>
                option.setName('goal')
                .setDescription('the goal you want to add')
                .setRequired(true))
            .addIntegerOption(option =>
                option.setName('priority')
                .setDescription('the priority to set')
                .setRequired(true)
                .addChoices(
                    {name: 'High', value: 1}
                    , {name: 'Medium', value: 2}
                    , {name: 'Low', value: 3}
                )
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('delete')
            .setDescription('Delete an existing goal')
            .addIntegerOption(option =>
                option.setName('selectedgoal')
                .setDescription('The goal name')
                .setRequired(true)
                .setAutocomplete(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('display')
            .setDescription('Display current goals')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('The user you want to snoop, or leave empty if you want to track your own')
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('update')
            .setDescription('Update a current goal')
            .addIntegerOption(option =>
                option.setName('selectedgoal')
                .setDescription('The goal name')
                .setRequired(true)
                .setAutocomplete(true)
            )
            .addStringOption(option =>
                option.setName('goal')
                .setDescription('the goal you want to update')
            )
            .addIntegerOption(option =>
                option.setName('priority')
                .setDescription('the priority to set')
                .addChoices(
                    {name: 'High', value: 1}
                    , {name: 'Medium', value: 2}
                    , {name: 'Low', value: 3}
                    , {name: 'Complete', value: 4}
                )
            )
        ),
	async execute(interaction) {
        await interaction.deferReply();
        const goal = interaction.options.getString('goal');
        const priority = interaction.options.getInteger('priority');
        const id = interaction.options.getInteger('selectedgoal');
        const user = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;
        var result;

        switch (interaction.options.getSubcommand()) {
            case 'add':
                Goals.create({userID: interaction.user.id, goal: goal, priority: priority});
                interaction.editReply({content: 'Goal added!'});
                break;
            case 'delete':
                result = await Goals.destroy({where: {userID: interaction.user.id, id: id}});
                if (result[0] === 0) {
                    interaction.editReply({
                        content: 'ID not found, please verify again!'
                    });
                } else {
                    interaction.editReply({
                        content: 'Goal is deleted!'
                    });
                }
                
                break;
            case 'display':
                const title = `${user.username}'s goals`
                let filterName;
                const results = await sequelize.query(`SELECT \`id\`, \`goal\`, \`priority\` FROM \`Goals\` WHERE userID = ${user.id}`, { type: QueryTypes.SELECT });
                var embed = new EmbedBuilder()
                    .setAuthor({name: title, iconURL: user.avatarURL()})
                    .setTimestamp();
                for (i = 1; i < 5; i++) {
                    if (i === 1) {
                        filterName = 'High';
                    } else if (i === 2) {
                        filterName = 'Medium';
                    } else if (i === 3) {
                        filterName = 'Low';
                    } else {
                        filterName = 'Most Recently Completed';
                    }
                    let filter = results.filter(goal => goal.priority === i);
                    if (filter.length !== 0) {
                        embed.addFields({name: filterName, value: filter.map(x => `${x.goal}`).join('\n')});
                    }
                }
                interaction.editReply({embeds: [embed]});
                
                break;
            case 'update':
                if (!goal && !priority) {
                    await interaction.editReply({
                        content: 'You need to pick at least one item to update!'
                    });
                    return;
                }
                result = await Goals.update({goal: goal, priority: priority}, {where: {userID: interaction.user.id, id: id}, omitNull: true});
                if (result[0] === 0) {
                    interaction.editReply({
                        content: 'ID not found, please verify again!'
                    });
                } else {
                    interaction.editReply({
                        content: 'Goal is updated!'
                    });
                }
                break;
        
            default:
                break;
        }
    },
    async autocomplete(interaction) {
        const specialExist = await sequelize.query(`SELECT \`id\`, \`goal\` FROM \`Goals\` WHERE userID = ?`, { replacements: [interaction.user.id], type: QueryTypes.SELECT });
        const focusedValue = interaction.options.getFocused();
        const filtered = specialExist.filter(choice => choice.goal.includes(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice.goal, value: choice.id })),
        ).catch(console.err);
    }
};