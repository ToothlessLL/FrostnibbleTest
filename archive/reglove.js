const { SlashCommandBuilder } = require('@discordjs/builders');
const { Squabble, SquabbleScore } = require('../dbObjects.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reglove')
		.setDescription('Admin only - resets the gauntlet with a fresh glove.'),
	async execute(interaction) {
        if (interaction.guild.id == '832404047889039361' && (interaction.channelId == '932089116483543060' || interaction.channelId == '920549364852731924')) {
            if (interaction.user.id == '171840823007117313' || interaction.user.id == '162955183670820864') {
                await interaction.deferReply();
                let userList = [];
                let users = await SquabbleScore.findAll();
                let embed;
                let message71 = '**7-0:**';
                let message72 = '\u200B';
                let message73 = '\u200B';
                let message61 = '**6-1:**';
                let message62 = '\u200B';
                let message63 = '\u200B';
                let message51 = '**5-2:**';
                let message52 = '\u200B';
                let message53 = '\u200B';
                let message41 = '**4-3:**';
                let message42 = '\u200B';
                let message43 = '\u200B';
                let message31 = '**3-4:**';
                let message32 = '\u200B';
                let message33 = '\u200B';
                let message21 = '**2-5:**';
                let message22 = '\u200B';
                let message23 = '\u200B';
                let message11 = '**1-6:**';
                let message12 = '\u200B';
                let message13 = '\u200B';
                let message01 = '**0-7:**';
                let message02 = '\u200B';
                let message03 = '\u200B';
                let message7count = 0;
                let message6count = 0;
                let message5count = 0;
                let message4count = 0;
                let message3count = 0;
                let message2count = 0;
                let message1count = 0;
                let message0count = 0;
                let countMessage = '';
                for (i = 0; i < users.length; i++) {
                    var username;
                    await interaction.guild.members.fetch(users[i].dataValues.userID)
                    .then((data) => {
                        if (data.nickname) {
                            username = data.nickname;
                        } else {
                            username = data.user.username;
                        }
                        userList.push({name: username, wins: users[i].dataValues.wins, losses: users[i].dataValues.losses, reset: users[i].dataValues.reset});
                    })
                    .catch(() => {
                
                    });
                    /*let user = await interaction.guild.members.fetch(users[i].dataValues.userID);
                    let username;
                    if (user.nickname) {
                        username = user.nickname;
                    } else {
                        username = user.user.username;
                    }
                    userList.push({name: username, wins: users[i].dataValues.wins, losses: users[i].dataValues.losses, reset: users[i].dataValues.reset});*/
                }
                userList.sort(function(a, b){return b.wins - a.wins});
                for (i = 0; i < userList.length; i++) {
                    if (userList[i].wins == 7 && message7count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message71 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message71 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message7count++;
                        continue;
                    }
                    if (userList[i].wins == 7 && message7count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message72 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message72 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message7count++;
                        continue;
                    }
                    if (userList[i].wins == 7 && message7count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message73 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message73 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message7count++;
                        continue;
                    }
                    if (userList[i].wins == 6 && message6count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message61 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message61 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message6count++;
                        continue;
                    }
                    if (userList[i].wins == 6 && message6count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message62 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message62 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message6count++;
                        continue;
                    }
                    if (userList[i].wins == 6 && message6count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message63 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message63 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message6count++;
                        continue;
                    }
                    if (userList[i].wins == 5 && message5count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message51 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message51 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message5count++;
                        continue;
                    }
                    if (userList[i].wins == 5 && message5count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message52 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message52 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message5count++;
                        continue;
                    }
                    if (userList[i].wins == 5 && message5count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message53 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message53 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message5count++;
                        continue;
                    }
                    if (userList[i].wins == 4 && message4count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message41 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message41 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message4count++;
                        continue;
                    }
                    if (userList[i].wins == 4 && message4count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message42 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message42 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message4count++;
                        continue;
                    }
                    if (userList[i].wins == 4 && message4count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message43 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message43 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message4count++;
                        continue;
                    }
                    if (userList[i].wins == 3 && message3count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message31 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message31 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message3count++;
                        continue;
                    }
                    if (userList[i].wins == 3 && message3count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message32 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message32 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message3count++;
                        continue;
                    }
                    if (userList[i].wins == 3 && message3count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message33 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message33 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message3count++;
                        continue;
                    }
                    if (userList[i].wins == 2 && message2count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message21 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message21 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message2count++;
                        continue;
                    }
                    if (userList[i].wins == 2 && message2count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message22 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message22 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message2count++;
                        continue;
                    }
                    if (userList[i].wins == 2 && message2count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message23 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message23 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message2count++;
                        continue;
                    }
                    if (userList[i].wins == 1 && message1count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message11 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message11 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message1count++;
                        continue;
                    }
                    if (userList[i].wins == 1 && message1count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message12 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message12 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message1count++;
                        continue;
                    }
                    if (userList[i].wins == 1 && message1count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message13 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message13 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message1count++;
                        continue;
                    }
                    if (userList[i].wins == 0 && message0count % 3 == 0) {
                        if (userList[i].reset == 1) {
                            message01 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message01 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message0count++;
                        continue;
                    }
                    if (userList[i].wins == 0 && message0count % 3 == 1) {
                        if (userList[i].reset == 1) {
                            message02 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message02 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message0count++;
                        continue;
                    }
                    if (userList[i].wins == 0 && message0count % 3 == 2) {
                        if (userList[i].reset == 1) {
                            message03 += '\n' + userList[i].name + " (1 reset)";
                        } else {
                            message03 += '\n' + userList[i].name + " (" + userList[i].reset + " resets)";
                        }
                        message0count++;
                        continue;
                    }
                }
                if (message7count == 0) {
                    message71 += '\nNone :(';
                }
                if (message6count == 0) {
                    message61 += '\nNone :(';
                }
                if (message5count == 0) {
                    message51 += '\nNone :(';
                }
                if (message4count == 0) {
                    message41 += '\nNone :(';
                }
                if (message3count == 0) {
                    message31 += '\nNone :(';
                }
                if (message2count == 0) {
                    message21 += '\nNone :(';
                }
                if (message1count == 0) {
                    message11 += '\nNone :(';
                }
                if (message0count == 0) {
                    message01 += '\nNone :(';
                }
                if (message7count == 1) {
                    countMessage += '7-0: ' + message7count + ' person\n';
                } else {
                    countMessage += '7-0: ' + message7count + ' people\n';
                }
                if (message6count == 1) {
                    countMessage += '6-1: ' + message6count + ' person\n';
                } else {
                    countMessage += '6-1: ' + message6count + ' people\n';
                }
                if (message5count == 1) {
                    countMessage += '5-2: ' + message5count + ' person\n';
                } else {
                    countMessage += '5-2: ' + message5count + ' people\n';
                }
                if (message4count == 1) {
                    countMessage += '4-3: ' + message4count + ' person\n';
                } else {
                    countMessage += '4-3: ' + message4count + ' people\n';
                }
                if (message3count == 1) {
                    countMessage += '3-4: ' + message3count + ' person\n';
                } else {
                    countMessage += '3-4: ' + message3count + ' people\n';
                }
                if (message2count == 1) {
                    countMessage += '2-5: ' + message2count + ' person\n';
                } else {
                    countMessage += '2-5: ' + message2count + ' people\n';
                }
                if (message1count == 1) {
                    countMessage += '1-6: ' + message1count + ' person\n';
                } else {
                    countMessage += '1-6: ' + message1count + ' people\n';
                }
                if (message0count == 1) {
                    countMessage += '0-7: ' + message0count + ' person\n';
                } else {
                    countMessage += '0-7: ' + message0count + ' people\n';
                }
                embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('The gauntlet has been reset.')
                    .setDescription("It's that time, the gates have been reopened and the gauntlet is once again available. You have one chance to use /squabblereset to reset your score, allowing you to once more undertake the gauntlet.")
                    //.setDescription(message)
                    .addFields(
                        {name: '\u200B', value: message71, inline: true},
                        {name: '\u200B', value: message72, inline: true},
                        {name: '\u200B', value: message73, inline: true},
                        {name: '\u200B', value: message61, inline: true},
                        {name: '\u200B', value: message62, inline: true},
                        {name: '\u200B', value: message63, inline: true},
                        {name: '\u200B', value: message51, inline: true},
                        {name: '\u200B', value: message52, inline: true},
                        {name: '\u200B', value: message53, inline: true},
                        {name: '\u200B', value: message41, inline: true},
                        {name: '\u200B', value: message42, inline: true},
                        {name: '\u200B', value: message43, inline: true},
                        {name: '\u200B', value: message31, inline: true},
                        {name: '\u200B', value: message32, inline: true},
                        {name: '\u200B', value: message33, inline: true},
                        {name: '\u200B', value: message21, inline: true},
                        {name: '\u200B', value: message22, inline: true},
                        {name: '\u200B', value: message23, inline: true},
                        {name: '\u200B', value: message11, inline: true},
                        {name: '\u200B', value: message12, inline: true},
                        {name: '\u200B', value: message13, inline: true},
                        {name: '\u200B', value: message01, inline: true},
                        {name: '\u200B', value: message02, inline: true},
                        {name: '\u200B', value: message03, inline: true},
                        {name: 'Here is the previous distribution:', value: countMessage, inline: true},
                    )
                    .setTimestamp()
                    await Squabble.update({canReset: 1}, {where: {}});
                    const content = `<&1048046560027607060>`;
                    interaction.editReply({
                        content: content
                        , embeds: [embed]
                    });
            } else {
                interaction.reply({
                    content: "This pog command is only available for Esmaionnaise. :("
                    , ephemeral: true
                });
            }
        } else {
            interaction.reply({
                content: "This pog command is only available in the cool server and in the pog channel :(."
                , ephemeral: true
            });
        }
    }
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}