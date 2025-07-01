// const bingo = require(`../functions/bingo/bingo.js`);
import wildyEvents from '../commands/wildyevents.js';
import clues from '../commands/clues.js';
import { loadBirthdays } from '../functions/birthdays.js';
import { Cron } from "croner";

export default {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		// await bingo.prePopulateValues();
		await wildyEvents.hourlyNotification(client);
		await clues.fetchPrices();
		loadBirthdays(client);
        client.users.fetch('202233700572725249')
		.then(user => {
			const cron = new Cron(`0 0 * * * *`, {timezone: value.timezone}, () => {
				user.send({
					content: `# RYAN USE HOUSE TELEPORT FOR KAGS AND MENAPHOS SCAN`
				});
			});
			console.log(cron.nextRuns(3));
		}).catch(err => console.log(err));
	},
};
