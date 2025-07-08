// const fs = require('node:fs');
// const path = require('node:path');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');

import * as fs from 'fs';
// import config from './config.json' with {type: "json"};
import {REST, Routes} from 'discord.js';
import {config} from './index.js';

const commandsList = new Map();
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	//const filePath = path.join(commandsPath, file);
	const {default: command} = await import(`./commands/${file}`);
	command.guildID.forEach(id => {
		// if (command.data.toJSON().name === 'clues') console.log(command.data.toJSON().options[0].options[0].options[0].choices);
		if (commandsList.has(id)) {
			commandsList.get(id).commands.push(command.data.toJSON());
		} else {
			commandsList.set(id, {commands: [command.data.toJSON()]});
		}
	})
}

const rest = new REST({ version: '10' }).setToken(config.token);

commandsList.forEach((value, key) => {
	if (key == '0') {
		rest.put(Routes.applicationCommands(config.clientId), { body: value.commands })
		.then(() => console.log('Successfully registered global application commands.'))
		.catch(console.error);
	} else {
		rest.put(Routes.applicationGuildCommands(config.clientId, key), { body: value.commands })
		.then(() => console.log(`Successfully registered application commands for ${key}.`))
		.catch(console.error);
	}
});