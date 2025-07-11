import { Cron } from "croner";
import { EmbedBuilder } from "discord.js";

let a = [
    {name: `Kate's birthday`, timezone: `Europe/London`, birthday: "01/20/2000"}
    , {name: `Orefist's birthday`, timezone: `Asia/Singapore`, birthday: "01/11"}
    , {name: `Rebecca's birthday`, timezone: `America/Chicago`, birthday: "02/01/1995"}
    , {name: `Gumbo's birthday`, timezone: `America/Chicago`, birthday: "01/30/1992"}
    , {name: `bun's birthday`, timezone: `America/Los_Angeles`, birthday: "12/16/1980"}
    , {name: `Kayla's birthday`, timezone: `America/New_York`, birthday: "12/07/1994"}
    , {name: `Jen's birthday`, timezone: `America/New_York`, birthday: "06/08/1996"}
    , {name: `Blob's birthday`, timezone: `Australia/Sydney`, birthday: "08/08"}
    , {name: `Annie's birthday`, timezone: `America/Los_Angeles`, birthday: "02/02/1990"}
    , {name: `Hannah's birthday`, timezone: `America/Los_Angeles`, birthday: "06/13/1988"}
    , {name: `Sharon's birthday`, timezone: `America/Los_Angeles`, birthday: "10/06/1986"}
    , {name: `Jasmin's birthday`, timezone: `America/Los_Angeles`, birthday: "01/14/1985"}
    , {name: `Lori's birthday`, timezone: `America/Los_Angeles`, birthday: "12/22/1982"}
    , {name: `Jacob's birthday`, timezone: `America/Los_Angeles`, birthday: "1/16"}
    , {name: `Dib's birthday`, timezone: `America/New_York`, birthday: "10/23"}
    , {name: `Suizzy's birthday`, timezone: `America/Phoenix`, birthday: "04/06"}
];

export function loadBirthdays(client) {
    a.forEach((value, key) => {
        const user = client.users.fetch('162955183670820864').catch(err => console.log(err));
        const minutes = 5;
        const ms = minutes * 60 * 1000;
        const date = new Date(value.birthday).getTime();
        const previousDay = new Date(date - ms);
        const month = previousDay.getMonth() + 1;
        const day = previousDay.getDate();
        user.then(user => {
            const cron = new Cron(`0 0 23 ${day} ${month} *`, {timezone: value.timezone}, () => {
                console.log(`${value.name} is ${value.birthday} coming up in an hour`);
                const embed = new EmbedBuilder()
                .setColor('3b5cac')
                .setTitle('BIRTHDAY NOTIFICATION')
                .setDescription(`${value.name} is ${value.birthday} coming up in an hour`);
                user.send({
                    content: `<@162955183670820864>`
                    , embeds: [embed]
                });
            });
            const cron2 = new Cron(`0 55 23 ${day} ${month} *`, {timezone: value.timezone}, () => {
                console.log(`${value.name} is ${value.birthday} coming up in 5 minutes`);
                const embed = new EmbedBuilder()
                .setColor('3b5cac')
                .setTitle('BIRTHDAY NOTIFICATION')
                .setDescription(`${value.name} is ${value.birthday} coming up in 5 minutes`);
                user.send({
                    content: `<@162955183670820864>`
                    , embeds: [embed]
                });
            });
            console.log(cron.nextRuns(5));
            console.log(cron2.nextRuns(5));
        })
        .catch(err => console.log(err));
    });
}