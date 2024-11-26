import * as fs from 'fs';
import { Routes, REST } from 'discord.js';
import config from '../config.json' with {type: "json"};

export default async function handleCommands(client) {
    const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(".js"));
    const commands2 = [];

    const {commands} = client;
    for (const file of commandFiles) {
        const {default: command} = await import(`../commands/${file}`);
        // console.log(command.guildID);
        commands.set(command.data.name, command);
        commands2.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(config.token);

    // rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    //     .then(() => console.log('Successfully deleted all guild commands.'))
    //     .catch(console.error);

    // // for global commands
    // rest.put(Routes.applicationCommands(clientId), { body: [] })
    //     .then(() => console.log('Successfully deleted all application commands.'))
    //     .catch(console.error);

    rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands2 })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}

// const fs = require('fs');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord.js');
// const { clientId, guildId, token } = require(`../config.json`);

// module.exports = client => {
//     client.handleCommands = async() => {
//         const commandFiles = fs.readdirSync(`./commands`).filter(
//             file => file.endsWith(".js") || file.endsWith(".mjs") || file.endsWith(".cjs")
//         );
//         const commands2 = [];

//         const {commands} = client;
//         for (const file of commandFiles) {
//             const command = require(`../commands/${file}`);
//             // console.log(command.guildID);
//             commands.set(command.data.name, command);
//             commands2.push(command.data.toJSON());
//         }

//         const rest = new REST({ version: '10' }).setToken(token);

//         // rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
//         //     .then(() => console.log('Successfully deleted all guild commands.'))
//         //     .catch(console.error);

//         // // for global commands
//         // rest.put(Routes.applicationCommands(clientId), { body: [] })
//         //     .then(() => console.log('Successfully deleted all application commands.'))
//         //     .catch(console.error);

//         rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands2 })
//             .then(() => console.log('Successfully registered application commands.'))
//             .catch(console.error);
//     }
// }