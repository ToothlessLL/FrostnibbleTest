// const fs = require('node:fs');
// const path = require('node:path');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');

// import * as fs from 'fs';
import { REST, Routes } from 'discord.js';
import config from './config.json' with {type: "json"};


// const commandsList = new Map();
// const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	//const filePath = path.join(commandsPath, file);
// 	const command = require(`./commands/${file}`);
// 	command.guildID.forEach(id => {
// 		// if (command.data.toJSON().name === 'clues') console.log(command.data.toJSON().options[0].options[0].options[0].choices);
// 		if (commandsList.has(id)) {
// 			commandsList.get(id).commands.push(command.data.toJSON());
// 		} else {
// 			commandsList.set(id, {commands: [command.data.toJSON()]});
// 		}
// 	})
// }

const rest = new REST({ version: '10' }).setToken(config.token);

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(config.clientId), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);