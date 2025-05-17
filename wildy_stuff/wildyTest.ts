// import { EventList } from "./wildyImage.ts";
// import type { Event, EventName } from "./wildyImage.ts";
// import { sequelize } from '../dbObjects.js';
// import { QueryTypes } from 'sequelize';

// // const c: EventName = 'Infernal Star';

// const output: {id: number, name: EventName}[] = await sequelize.query(`select id, name from WildyEvents where id = 1`, {type: QueryTypes.SELECT});
// const a: Event = EventList[output[0].name];
// console.log(a);

// const b: Date = new Date();
// console.log(b.getUTCHours());

console.log(import.meta.filename);