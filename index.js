// const fs = require('fs');
// const { Collection, Client, GatewayIntentBits, Partials} = require('discord.js');
// const { token } = require('./config.json');

import * as fs from 'fs';
import { Collection, Client, GatewayIntentBits, Partials} from 'discord.js';
// import config from './config.json' with {type: "json"};

export const config = {
	token: process.env.DISCORD_BOT_TOKEN
	, clientId: process.env.CLIENT_ID
	, guildId: process.env.GUILD_ID
};

console.log(config.token);

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds
		, GatewayIntentBits.GuildMessages
		, GatewayIntentBits.MessageContent
		, GatewayIntentBits.GuildVoiceStates
		, GatewayIntentBits.DirectMessages
		, GatewayIntentBits.GuildPresences
		, GatewayIntentBits.GuildMembers
	],
	partials: [Partials.Channel]
});
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

console.clear();


const functionFiles = fs.readdirSync(`./handlers`).filter(file => file.endsWith(".js"));
for (const file of functionFiles) {
	const {default: handler} = await import(`./handlers/${file}`);
	handler(client);
}

// Login to Discord with your client's token
// client.handleEvents();
// client.handleCommands();
// client.handleComponents();
client.login(config.token);