// const client = require ('https');
// const fs = require('fs');

import * as client from 'https';
import * as fs from 'fs';

export default {
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    },
    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    parseMillisecondsIntoReadableTime(milliseconds){
        //Get hours from milliseconds
        var hours = milliseconds / (1000*60*60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
      
        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
      
        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
      
      
        return h + ':' + m + ':' + s;
    },

    downloadImage(url, filepath) {
        return new Promise((resolve, reject) => {
            client.get(url, (res) => {
                if (res.statusCode === 200) {
                    res.pipe(fs.createWriteStream(filepath))
                        .on('error', reject)
                        .once('close', () => resolve(filepath));
                } else {
                    // Consume response data to free up memory
                    res.resume();
                    reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
    
                }
            });
        });
    },

    getUsernameByInteraction(interaction) {
        if (interaction.member.nickname) {
            return interaction.member.nickname;
        } else if (interaction.user.globalName) {
            return interaction.user.globalName;
        } else {
            return interaction.user.username;
        }
    },

    async getUsernameByID(userID, interaction) {
        let username;
        if (interaction.guild) {
            await interaction.guild.members.fetch(userID)
            .then((data) => {
                if (data.nickname) {
                    username = data.nickname;
                } else if (data.user.globalName) {
                    username = data.user.globalName;
                } else {
                    username = data.user.username;
                }
            })
            .catch(() => {
        
            });
        } else {
            if (interaction.user.globalName) {
                username = interaction.user.globalName;
            } else {
                username = interaction.user.username;
            }
        }
        return username;
    },
    
    formatDate(date) {
        return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
        ].join('/');
    },

    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    combatStyles: [
			{id: 1, style: 'Magic', type: 'combat'}
			, {id: 2, style: 'Ranged', type: 'combat'}
			, {id: 3, style: 'Melee', type: 'combat'}
			, {id: 4, style: 'Necromancy', type: 'combat'}
			, {id: 5, style: 'Magic/Melee', type: 'combat'}
			, {id: 6, style: 'Magic/Ranged', type: 'combat'}
			, {id: 7, style: 'Ranged/Melee', type: 'combat'}
			, {id: 8, style: 'Hunter', type: 'skilling'}
			, {id: 9, style: 'Mining', type: 'skilling'}
			, {id: 10, style: 'Woodcutting', type: 'skilling'}
			, {id: 11, style: 'Fishing', type: 'skilling'}
			, {id: 12, style: 'Necromancy/Melee', type: 'combat'}
			, {id: 13, style: 'Necromancy/Ranged', type: 'combat'}
			, {id: 14, style: 'Necromancy/Magic', type: 'combat'}
    ],
}