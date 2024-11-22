// const { VoiceStateUpdate } = require('../dbObjects.js');
// const { sequelize } = require('../dbObjects.js');
// const { QueryTypes } = require('sequelize');

import { sequelize } from '../dbObjects.js';
import {QueryTypes} from 'sequelize';

export default {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        if (oldState.channelId == null && newState.channelId == '841973467511390238') {
            // let timer = await VoiceStateUpdate.findOne({where: {VSUID: 1}});
            let timer = await sequelize.query(`select timer from VoiceStateUpdates where id = 1`, {type: QueryTypes.SELECT});
            let cooldown = 3600000;
            if (Date.now() - timer[0].timer > cooldown) {
				let users = await sequelize.query(`select id from ToxicCuntPings`, {type: QueryTypes.SELECT});
                await newState.guild.channels.cache.get('911164388164124692').send(`<@${newState.id}> has joined <#${newState.channelId}> <@${users.map(user => user.id).join('> <@')}>`);
                // await newState.guild.channels.cache.get('911164388164124692').send(`<@107255303497601024> is a cutie so I'll ping him twice`);
                // await newState.guild.channels.cache.get('911164388164124692').send(`Maybe even 3 times <@107255303497601024>`);
                // newState.client.users.fetch('107255303497601024', false).then((user) => {
                //     user.send('Hi josh I hope this is enough pings, but someone just joined toxic cunts. love you :) <3');
                // });
                // newState.client.users.fetch('522686803711361026', false).then((user) => {
                //     user.send(`Hi kate someone joined toxic cunts :D you're welcome`);
                // });

                await sequelize.query('update VoiceStateUpdates set timer = ? where id = ?', {type: QueryTypes.UPDATE, replacements: [Date.now(), 1]});
                // await VoiceStateUpdate.update({timer: Date.now()}, {where: {VSUID: 1}});
            }
        }
	},
};