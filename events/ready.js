// const bingo = require(`../functions/bingo/bingo.js`);
import wildyEvents from '../commands/wildyevents.js';

export default {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		// await bingo.prePopulateValues();
		await wildyEvents.hourlyNotification(client);
	},
};
