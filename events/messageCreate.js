const data = {
	name: 'messageCreate',
	async execute(message) {
        if (message.channel.type === 1 && !message.author.bot) {
            var files;
            var thisChannel;
            var guild = await message.client.guilds.fetch('1030538977935118408');
            var channels = await guild.channels.fetch();
            await channels.map(channel => {
                if (channel.name.split('-')[0].includes(message.author.id)) {
                    thisChannel = channel;
                }
            });
            if (!thisChannel) {
                thisChannel = await guild.channels.create({name: message.author.id});
            }
            if (message.attachments.size !== 0) {
                files = message.attachments.map(attachment => attachment.url);
            }
            thisChannel.send({content: message.content, files: files})
            .catch(err => console.error(err));
        }
        if (message.guildId == '1030538977935118408') {
            if (message.author.bot) return;
            message.client.users.fetch(message.channel.name.split('-')[0], false).then(user => {
                if (message.attachments.size !== 0) {
                    files = message.attachments.map(attachment => attachment.url);
                }
                user.send({content: message.content, files: files})
                .catch(err => console.error(err));
            })
            .catch(() => {
                console.log('not a user');
            })
        }
        if (message.guildId == '832404047889039361' && (message.channelId == '921569710498267217' || message.channelId == '920549364852731924') && !message.author.bot) {
            const user = await Squabble.findOne({where: {userID: message.author.id}});
            if (/^69 /.test(message.content) || / 69 /.test(message.content) || / 69$/.test(message.content) || message.content.trim() == "69") {
                message.channel.send("Nice.");
            }
            if (/^420 /.test(message.content) || / 420 /.test(message.content) || / 420$/.test(message.content) || message.content.trim() == "420") {
                message.channel.send("Drugs?! in our christian minecraft server?!");
            }
            if (user) {
                let chosen = 0;
                let uchoice = [];
                let bchoice = [];
                if (user.dataValues.uchoice1 != null) {
                    uchoice.push(user.dataValues.uchoice1);
                    bchoice.push(user.dataValues.bchoice1);
                    chosen = 1;
                }
                if (user.dataValues.uchoice2 != null) {
                    uchoice.push(user.dataValues.uchoice2);
                    bchoice.push(user.dataValues.bchoice2);
                    chosen = 2;
                }
                if (user.dataValues.uchoice3 != null) {
                    uchoice.push(user.dataValues.uchoice3);
                    bchoice.push(user.dataValues.bchoice3);
                    chosen = 3;
                }
                if (user.dataValues.uchoice4 != null) {
                    uchoice.push(user.dataValues.uchoice4);
                    bchoice.push(user.dataValues.bchoice4);
                    chosen = 4;
                }
                if (user.dataValues.uchoice5 != null) {
                    uchoice.push(user.dataValues.uchoice5);
                    bchoice.push(user.dataValues.bchoice5);
                    chosen = 5;
                }
                if (user.dataValues.uchoice6 != null) {
                    uchoice.push(user.dataValues.uchoice6);
                    bchoice.push(user.dataValues.bchoice6);
                    chosen = 6;
                }
                if (user.dataValues.uchoice7 != null) {
                    uchoice.push(user.dataValues.uchoice7);
                    bchoice.push(user.dataValues.bchoice7);
                    chosen = 7;
                }
                if (user.dataValues.confirmed == 0 && chosen < 7) {
                    if (message.content.toLowerCase().trim() == 'yes' && user.dataValues.counter < 3) {
                        let test = await Squabble.update({confirmed: 1}, {where: {userID: message.author.id}});
                        if (chosen == 0) {
                            message.channel.send("Pick your 7 choices of rock/paper/scissors.");
                        } else {
                            num = 7 - chosen;
                            message.channel.send("You chose " + chosen + " and needed to choose " + num + " more again, what are your new choices?");
                        }
                    } else if (message.content.toLowerCase().trim() == 'no' && user.dataValues.counter < 3) {
                        message.channel.send("Come back when you're ready.");
                        await Squabble.update({counter: 3}, {where: {userID: message.author.id}});
                    } else {
                        await Squabble.increment({counter: 1}, {where: {userID: message.author.id}});
                        if (user.dataValues.counter == 0) {
                            message.channel.send("What? It was a yes or no question, are you ready for the gauntlet?");
                        } else if (user.dataValues.counter == 1) {
                            message.channel.send("I told you it was just a yes or no question, are you ready for the gauntlet or not?");
                        } else if (user.dataValues.counter == 2) {
                            message.channel.send("It's a yes or no question, how ca - you know what, maybe the gauntlet isn't for you." );
                        }
                    }
                }
                if (user.dataValues.confirmed == 1 && chosen < 7) {
                    let choices = message.content.toLowerCase().split(",");
                    let ties = 0;
                    if (choices.length == 7 - chosen) {
                        for (i = 0; i < choices.length; i++) {
                            choices[i] = choices[i].trim();
                            let botChoice = getRandomInt(0,3);
                            let botSelection;
                            if (botChoice == 0) {
                                botSelection = "rock";
                            } else if (botChoice == 1) {
                                botSelection = "paper";
                            } else {
                                botSelection = "scissors";
                            }
                            if (choices[i] == botSelection) {
                                ties++;
                            } else if (choices[i] == "rock" || choices[i] == "paper" || choices[i] == "scissors") {
                                bchoice.push(botChoice);
                                if (choices[i] == "rock") {
                                    uchoice.push(0);
                                } else if (choices[i] == "paper") {
                                    uchoice.push(1);
                                } else {
                                    uchoice.push(2);
                                }
                            } else {
                                message.channel.send("Sorry, my fish was barking, please repeat that!\nPlease use the format of:\nfirst choice, second choice, third choice, fourth choice, fifth choice, sixth choice, seventh choice");
                                return;
                            }
                        }
                        if (ties > 0) {
                            if (user.dataValues.uchoice1 == null && uchoice[0] != null) {
                                await Squabble.update({uchoice1: uchoice[0], bchoice1: bchoice[0]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice2 == null && uchoice[1] != null) {
                                await Squabble.update({uchoice2: uchoice[1], bchoice2: bchoice[1]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice3 == null && uchoice[2] != null) {
                                await Squabble.update({uchoice3: uchoice[2], bchoice3: bchoice[2]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice4 == null && uchoice[3] != null) {
                                await Squabble.update({uchoice4: uchoice[3], bchoice4: bchoice[3]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice5 == null && uchoice[4] != null) {
                                await Squabble.update({uchoice5: uchoice[4], bchoice5: bchoice[4]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice6 == null && uchoice[5] != null) {
                                await Squabble.update({uchoice6: uchoice[5], bchoice6: bchoice[5]}, {where: {userID: message.author.id}});
                            }
                            if (ties > 1) {
                                message.channel.send("There are " + ties + " ties. Please pick " + ties + " more choices!");
                            } else {
                                message.channel.send("There was " + ties + " tie. Please pick " + ties + " more choice!");
                            }
                            return;
                        } else {
                            if (user.dataValues.uchoice1 == null && uchoice[0] != null) {
                                await Squabble.update({uchoice1: uchoice[0], bchoice1: bchoice[0]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice2 == null && uchoice[1] != null) {
                                await Squabble.update({uchoice2: uchoice[1], bchoice2: bchoice[1]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice3 == null && uchoice[2] != null) {
                                await Squabble.update({uchoice3: uchoice[2], bchoice3: bchoice[2]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice4 == null && uchoice[3] != null) {
                                await Squabble.update({uchoice4: uchoice[3], bchoice4: bchoice[3]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice5 == null && uchoice[4] != null) {
                                await Squabble.update({uchoice5: uchoice[4], bchoice5: bchoice[4]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice6 == null && uchoice[5] != null) {
                                await Squabble.update({uchoice6: uchoice[5], bchoice6: bchoice[5]}, {where: {userID: message.author.id}});
                            }
                            if (user.dataValues.uchoice7 == null && uchoice[6] != null) {
                                await Squabble.update({uchoice7: uchoice[6], bchoice7: bchoice[6]}, {where: {userID: message.author.id}});
                            }
                            let messageContent = [];
                            let upick;
                            let bpick;
                            let wins = 0;
                            let win = false;
                            let winMessage;
                            let messageDisplay = '';
                            let losses;
                            for (i = 0; i < uchoice.length; i++) {
                                win = false;
                                if (bchoice[i] == 0) {
                                    bpick = "rock";
                                } else if (bchoice[i] == 1) {
                                    bpick = "paper";
                                } else {
                                    bpick = "scissors";
                                }
                                if (uchoice[i] == 0) {
                                    upick = "rock";
                                } else if (uchoice[i] == 1) {
                                    upick = "paper";
                                } else {
                                    upick = "scissors";
                                }
                                if (upick == "rock" && bpick == "scissors") {
                                    win = true;
                                    wins++;
                                } else if (upick == "paper" && bpick == "rock") {
                                    win = true;
                                    wins++;
                                } else if (upick == "scissors" && bpick == "paper") {
                                    win = true;
                                    wins++;
                                }
                                losses = (i + 1) - wins;
                                if (win) {
                                    winMessage = "You won! " + wins + "-" + losses + "\n";
                                } else {
                                    winMessage = "You lost! " + wins + "-" + losses + "\n";
                                }
                                let num = i + 1;
                                let trolling = getRandomInt(0,7);
                                if (trolling < 2) {
                                    messageDisplay += "Round " + num + ": You picked " + upick + " and the bot chose";
                                    messageContent.push(messageDisplay);
                                    for (j = 0; j < 3; j++) {
                                        messageDisplay += ".";
                                        messageContent.push(messageDisplay);
                                    }
                                    let trollWin;
                                    let trollLose;
                                    if (upick == "rock" && bpick == "scissors") {
                                        messageDisplay += " Paper!\n";
                                        messageContent.push(messageDisplay);
                                        trollWin = wins - 1;
                                        trollLose = losses + 1;
                                        messageDisplay += "You lost! " + trollWin + "-" + trollLose + "\n";
                                        messageContent.push(messageDisplay);
                                        messageDisplay += "Just kidding, it actually picked scissors! You won! " + wins + "-" + losses + "\n";
                                        messageContent.push(messageDisplay);
                                    } else if (upick == "rock" && bpick == "paper") {
                                        messageDisplay += " Scissors!\n";
                                        messageContent.push(messageDisplay);
                                        trollWin = wins + 1;
                                        trollLose = losses - 1;
                                        messageDisplay += "You won! " + trollWin + "-" + trollLose + "\n";
                                        messageContent.push(messageDisplay);
                                        messageDisplay += "Just kidding, it actually picked paper! You lost! " + wins + "-" + losses + "\n";
                                        messageContent.push(messageDisplay);
                                    } else if (upick == "scissors" && bpick == "paper") {
                                        messageDisplay += " Rock!\n";
                                        messageContent.push(messageDisplay);
                                        trollWin = wins - 1;
                                        trollLose = losses + 1;
                                        messageDisplay += "You lost! " + trollWin + "-" + trollLose + "\n";
                                        messageContent.push(messageDisplay);
                                        messageDisplay += "Just kidding, it actually picked paper! You won! " + wins + "-" + losses + "\n";
                                        messageContent.push(messageDisplay);
                                    } else if (upick == "scissors" && bpick == "rock") {
                                        messageDisplay += " Paper!\n";
                                        messageContent.push(messageDisplay);
                                        trollWin = wins + 1;
                                        trollLose = losses - 1;
                                        messageDisplay += "You won! " + trollWin + "-" + trollLose + "\n";
                                        messageContent.push(messageDisplay);
                                        messageDisplay += "Just kidding, it actually picked rock! You lost! " + wins + "-" + losses + "\n";
                                        messageContent.push(messageDisplay);
                                    } else if (upick == "paper" && bpick == "rock") {
                                        messageDisplay += " Scissors!\n";
                                        messageContent.push(messageDisplay);
                                        trollWin = wins - 1;
                                        trollLose = losses + 1;
                                        messageDisplay += "You lost! " + trollWin + "-" + trollLose + "\n";
                                        messageContent.push(messageDisplay);
                                        messageDisplay += "Just kidding, it actually picked rock! You won! " + wins + "-" + losses + "\n";
                                        messageContent.push(messageDisplay);
                                    } else if (upick == "paper" && bpick == "scissors") {
                                        messageDisplay += " Rock!\n";
                                        messageContent.push(messageDisplay);
                                        trollWin = wins + 1;
                                        trollLose = losses - 1;
                                        messageDisplay += "You won! " + trollWin + "-" + trollLose + "\n";
                                        messageContent.push(messageDisplay);
                                        messageDisplay += "Just kidding, it actually picked scissors! You lost! " + wins + "-" + losses + "\n";
                                        messageContent.push(messageDisplay);
                                    }
                                } else {
                                    messageDisplay += "Round " + num + ": You picked " + upick + " and the bot chose";
                                    messageContent.push(messageDisplay);
                                    for (j = 0; j < 3; j++) {
                                        messageDisplay += ".";
                                        messageContent.push(messageDisplay);
                                    }
                                    bpick = bpick.charAt(0).toUpperCase() + bpick.slice(1);
                                    messageDisplay += " " + bpick + "!\n";
                                    messageContent.push(messageDisplay);
                                    messageDisplay += winMessage;
                                    messageContent.push(messageDisplay);
                                }
                            }
                            messageDisplay += "_ _\n";
                            messageContent.push(messageDisplay);
                            messageDisplay += "Your final score in the gauntlet is " + wins + " - " + losses + ".\n";
                            messageContent.push(messageDisplay);
                            messageDisplay += "This is your life now.\n";
                            messageContent.push(messageDisplay);
                            let sentMessage;
                            for (i = 0; i < messageContent.length; i++) {
                                if (i == 0) {
                                    sentMessage = await message.channel.send(messageContent[i]);
                                } else {
                                    await sentMessage.edit(messageContent[i]);
                                }
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            }
                            let squabbleScore = await SquabbleScore.findOne({where: {userID: message.author.id}});
                            let totalWins = squabbleScore.dataValues.totalWins + wins;
                            let totalLosses = squabbleScore.dataValues.totalLosses + losses;
                            await SquabbleScore.update({wins: wins, losses: losses, totalWins: totalWins, totalLosses: totalLosses}, {where: {userID: message.author.id}});
                            let winloss = wins.toString() + "-" + losses.toString();
                            let role = message.guild.roles.cache.find(r => r.name == winloss);
                            message.member.roles.add(role);
                        }
                    } else {
                        let number = 7 - chosen;
                        message.channel.send("That's not " + number + " options!");
                        return;
                    }
                }
            }
        }
	},
};

export default data;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}