// const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
// const { Goals, sequelize } = require('../dbObjects.js');
// const { QueryTypes } = require('sequelize');

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import {sequelize} from '../dbObjects.js';
import {QueryTypes} from 'sequelize';

export default {
    guildID: ['1070593540045934652'],
	data: new SlashCommandBuilder()
		.setName('movies')
		.setDescription('Movies!')
        .addSubcommandGroup(subcommand =>
            subcommand.setName('title')
            .setDescription('Movie Titles!')
            .addSubcommand(subcommand =>
                subcommand.setName('add')
                .setDescription('Add a movie')
                .addIntegerOption(option =>
                    option.setName('selected_genre')
                    .setDescription('The genre of the movie')
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option.setName('title')
                    .setDescription('The movie title')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand.setName('update')
                .setDescription('Update a movie')
                .addIntegerOption(option =>
                    option.setName('selected_movie')
                    .setDescription('The title of the movie')
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addIntegerOption(option =>
                    option.setName('selected_genre')
                    .setDescription('The genre of the movie')
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option.setName('title')
                    .setDescription('The movie title')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand.setName('delete')
                .setDescription('Delete a movie')
                .addIntegerOption(option =>
                    option.setName('selected_movie')
                    .setDescription('The movie title')
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
        )
        .addSubcommandGroup(subcommand =>
            subcommand.setName('genre')
            .setDescription('Movie Genres!')
            .addSubcommand(subcommand =>
                subcommand.setName('add')
                .setDescription('Add a genre')
                .addStringOption(option =>
                    option.setName('genre')
                    .setDescription('The name of the genre')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand.setName('update')
                .setDescription('Update a movie')
                .addIntegerOption(option =>
                    option.setName('selected_genre')
                    .setDescription('The genre of the movie')
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option.setName('genre')
                    .setDescription('The movie title')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand.setName('delete')
                .setDescription('Delete a genre')
                .addIntegerOption(option =>
                    option.setName('selected_genre')
                    .setDescription('The movie genre')
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('display')
            .setDescription('Display movies')
        ),
	async execute(interaction) {
        await interaction.deferReply({
        });
        
        const movie = interaction.options.getString('title');
        const selectedMovie = interaction.options.getInteger('selected_movie');
        const genre = interaction.options.getString('genre')
        const selectedGenre = interaction.options.getInteger('selected_genre');
        var outputText;

        switch (interaction.options.getSubcommandGroup()) {
            case 'title':
                if (interaction.options.getSubcommand() == 'add') {
                    await sequelize.query(`insert into MovieTitles (title, genre) values (?, ?)`, { replacements: [movie, selectedGenre], type: QueryTypes.INSERT });
                    outputText = `Added movie ${movie}`;
                } else if (interaction.options.getSubcommand() == 'update') {
                    await sequelize.query(`update MovieTitles set title = ?, genre = ? where id = ?`, { replacements: [movie, selectedGenre, selectedMovie], type: QueryTypes.UPDATE });
                    outputText = `Updated movie ${movie}`;
                } else {
                    await sequelize.query(`delete from MovieTitles where id = ?`, { replacements: [selectedMovie], type: QueryTypes.DELETE });
                    outputText = `Deleted movie`;
                }
                break;
            case 'genre':
                if (interaction.options.getSubcommand() == 'add') {
                    await sequelize.query(`insert into MovieGenres (genre) values (?)`, { replacements: [genre], type: QueryTypes.INSERT });
                    outputText = `Added genre ${genre}`;
                } else if (interaction.options.getSubcommand() == 'update') {
                    await sequelize.query(`update MovieGenres set genre = ? where id = ?`, { replacements: [genre, selectedGenre], type: QueryTypes.UPDATE });
                    outputText = `Updated genre ${genre}`;
                } else {
                    await sequelize.query(`delete from MovieGenres where id = ?`, { replacements: [selectedGenre], type: QueryTypes.DELETE });
                    // await sequelize.query(`update MovieTitles set genre = 0 where genre = ?`, {replacements: [selectedGenre], type: QueryTypes.UPDATE});
                    outputText = `Deleted genre`;
                }
                break;
            default:
                break;
        }

        
        if (interaction.options.getSubcommand() == 'display') {
            const genreList = await sequelize.query(`select a.id, a.genre from MovieGenres a`, {type: QueryTypes.SELECT});
            const movieList = await sequelize.query(`select a.title, b.genre, b.id from MovieTitles a left outer join MovieGenres b on a.genre = b.id order by b.id`, {type: QueryTypes.SELECT});
            var embed = new EmbedBuilder()
                .setAuthor({name: 'Movies for the stinky pookies', iconURL: interaction.user.avatarURL()})
                .setTimestamp();
            genreList.forEach(element => {
                let filteredList = movieList.filter(filter => filter.id == element.id);
                let title = element.genre;
                let value = filteredList.length == 0 ? '\u200B' : filteredList.map(items => `- ${items.title}`).join(`\n`);
                embed.addFields({name: title, value: value, inline: true});
            });
            let filteredList = movieList.filter(filter => filter.id == null);
            if (filteredList.length > 0) {
                let title = 'Uncategorized';
                let value = filteredList.map(items => `- ${items.title}`).join(`\n`);
                embed.addFields({name: title, value: value, inline: false});
            }
        }

        if (interaction.options.getSubcommand() == 'display') {
            await interaction.editReply({
                embeds: [embed]
            });
        } else {
            await interaction.editReply({
                content: outputText
            });
        }
    },
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        var filtered;
        switch (interaction.options.getSubcommandGroup()) {
            case 'title':
                if (interaction.options.getSubcommand() == 'add') {
                    const genres = await sequelize.query(`SELECT id, genre display from MovieGenres`, { type: QueryTypes.SELECT });
                    filtered = genres.filter(choice => choice.display.includes(focusedValue));
                } else {
                    const focusedOption = interaction.options.getFocused(true);
                    var output;
                    if (focusedOption.name === 'selected_movie') output = await sequelize.query(`SELECT id, title display from MovieTitles`, { type: QueryTypes.SELECT });
                    else output = await sequelize.query(`SELECT id, genre display from MovieGenres`, { type: QueryTypes.SELECT });
                    filtered = output.filter(choice => choice.display.includes(focusedValue));
                }
                break;
            case 'genre':
                const genres = await sequelize.query(`SELECT id, genre display from MovieGenres`, { type: QueryTypes.SELECT });
                filtered = genres.filter(choice => choice.display.includes(focusedValue));
                break;
            default:
                break;
        }
        // const specialExist = await sequelize.query(`SELECT \`id\`, \`goal\` FROM \`Goals\` WHERE userID = ?`, { replacements: [interaction.user.id], type: QueryTypes.SELECT });
        // const filtered = specialExist.filter(choice => choice.goal.includes(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice.display, value: choice.id })),
        ).catch(console.err);
    }
};