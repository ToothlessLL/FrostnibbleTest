import * as fs from 'fs';

export default async function handleEvents(client) {
    const eventFiles = fs.readdirSync(`./events`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const {default: event} = await import(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

// const fs = require('fs');

// module.exports = client =>  {
//     client.handleEvents = async () => {
//         const eventFiles = fs.readdirSync(`./events`).filter(file => file.endsWith('.js') || file.endsWith(".cjs"));
//         for (const file of eventFiles) {
//             const event = require(`../events/${file}`);
//             if (event.once) {
//                 client.once(event.name, (...args) => event.execute(...args, client));
//             } else {
//                 client.on(event.name, (...args) => event.execute(...args, client));
//             }
//         }
//     }
// }