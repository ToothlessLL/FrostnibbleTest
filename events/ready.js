// const bingo = require(`../functions/bingo/bingo.js`);
import wildyEvents from '../commands/wildyevents.js';
import clues from '../commands/clues.js';

export default {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		// await bingo.prePopulateValues();
		await wildyEvents.hourlyNotification(client);
		await clues.fetchPrices();
	},
};
