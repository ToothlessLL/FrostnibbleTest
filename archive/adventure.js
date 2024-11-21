const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users, UserItems} = require('../dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adventure')
		.setDescription('Set out on an adventure in an attempt to make money'),
	async execute(interaction) {
        await interaction.deferReply();
        let cooldown = 180000;
        let options = [
            {
                items: [
                    {
                        itemMessage: "You decide to kill Kerapac and you find Kerry! You earn"
                        , itemMessage2: "TGP from it!"
                        , roll: 0
                        , quantity: 0
                        , itemID: 0
                        , itenName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Kerapac and you find a crit stick piece! You earn"
                        , itemMessage2: "TGP from it!"
                        , roll: 2
                        , quantity: 225000
                        , itemID: 0
                        , itenName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Kerapac and you find a Scripture of Jas! You earn"
                        , itemMessage2: "TGP from it!"
                        , roll: 5
                        , quantity: 225000
                        , itemID: 0
                        , itenName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Kerapac and you find a Kerapac's Wristwraps! You earn"
                        , itemMessage2: "TGP from it!"
                        , roll: 8
                        , quantity: 225000
                        , itemID: 0
                        , itenName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Kerapac! You earn"
                        , itemMessage2: "TGP from it!"
                        , roll: 80
                        , quantity: 0
                        , itemID: 0
                        , itenName: "TGP!"
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Zuk and you find a banite 2H weapon piece! You make"
                        , itemMessage2: "TGP from it!"
                        , roll: 2
                        , itemID: 0
                        , quantity: 150000
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Zuk and you find Little Zuk! Zuk it! You make"
                        , itemMessage2: "TGP from it!"
                        , roll: 3
                        , itemID: 0
                        , quantity: 0
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Zuk and you find Magma Temptest Ability Codex! You make"
                        , itemMessage2: "TGP from it!"
                        , roll: 5
                        , itemID: 0
                        , quantity: 125000
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Zuk and you find Scripture of Zuk! You make"
                        , itemMessage2: "TGP from it!"
                        , roll: 7
                        , itemID: 0
                        , quantity: 80000
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You decide to kill Zuk and you make"
                        , itemMessage2: "TGP from it!"
                        , roll: 70
                        , itemID: 0
                        , quantity: 0
                        , itemName: "TGP!"
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You kill Arch-Glacor and you find Gladys! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , roll: 0
                        , itemID: 0
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You kill Arch-Glacor and you find a frozen core! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 150000
                        , roll: 2
                        , itemID: 0
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You kill Arch-Glacor and you find some nilas! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 5000
                        , roll: 10
                        , itemID: 0
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You kill Arch-Glacor and you find a leng artefact! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 15000
                        , roll: 12
                        , itemID: 0
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You kill Arch-Glacor and you find a Scripture of Wen! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 75000
                        , roll: 14
                        , itemID: 0
                        , itemName: "TGP!"
                    }, {
                        itemMessage: "You kill Arch-Glacor and you earn"
                        , itemMessage2: "TGP!"
                        , quantity: 150000
                        , roll: 150
                        , itemID: 0
                        , itemName: "TGP!"
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Croesus and you find Little Sus! That's a little sus... You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find Cryptbloom Top! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 150000
                        , itemID: 0
                        , roll: 2
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find Cryptbloom Bottoms! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 125000
                        , itemID: 0
                        , roll: 4
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find Cryptbloom Helm! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 100000
                        , itemID: 0
                        , roll: 6
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find Cryptbloom Gloves! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 50000
                        , itemID: 0
                        , roll: 8
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find Cryptbloom Boots! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 150000
                        , itemID: 0
                        , roll: 10
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find Scripture of Bik! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 75000
                        , itemID: 0
                        , roll: 12
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find a foultorch! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 30000
                        , itemID: 0
                        , roll: 15
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find a sporehammer! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 30000
                        , itemID: 0
                        , roll: 18
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you find a spore sack! You earn"
                        , itemMessage2: "TGP."
                        , quantity: 5000
                        , itemID: 0
                        , roll: 21
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Croesus and you earn"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , itemID: 0
                        , roll: 250
                        , itemName: "TGP."
                        , min: 0
                        , max: 15000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill AOD and you find a chest! You earn"
                        , itemMessage2: "TGP since it was splits!"
                        , quantity: 20000
                        , itemID: 0
                        , roll: 1
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill AOD and you find a chest! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 80000
                        , itemID: 0
                        , roll: 3
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill AOD and you find a Praesul Wand! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 200000
                        , itemID: 0
                        , roll: 13
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill AOD and you find a Imperium Core! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 150000
                        , itemID: 0
                        , roll: 23
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill AOD and you find a Praesul Codex! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 125000
                        , itemID: 0
                        , roll: 123
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill AOD and you find a blood tendril! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 175
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill AOD and make"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 20000
                        , itemName: "TGP."
                        , min: 0
                        , max: 15000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Telos, and you find Tessie! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Telos, and you find an orb! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 50000
                        , itemID: 0
                        , roll: 6
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Telos, and you find an Dormant Staff of Sliske! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 75000
                        , itemID: 0
                        , roll: 8
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Telos, and you find an Dormant Seren Godbow! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 70000
                        , itemID: 0
                        , roll: 10
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Telos, and you find an Dormant Zaros Godsword! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 70000
                        , itemID: 0
                        , roll: 12
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Telos, and you find an Reprisal Codex! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 30000
                        , itemID: 0
                        , roll: 15
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Telos and you get"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 150
                        , itemName: "TGP."
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Solak, and you find a Solly! You get"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , itemID: 0
                        , roll: 1
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Solak, and you find a Offhand Blightbound Crossbow! You get"
                        , itemMessage2: "TGP."
                        , quantity: 300000
                        , itemID: 0
                        , roll: 4
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Solak, and you find a Blightbound Crossbow! You get"
                        , itemMessage2: "TGP."
                        , quantity: 250000
                        , itemID: 0
                        , roll: 7
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Solak, and you find a Erethdore's Grimoire! You get"
                        , itemMessage2: "TGP."
                        , quantity: 100000
                        , itemID: 0
                        , roll: 13
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Solak, and you find a pair of Cinderbane Gloves! You get"
                        , itemMessage2: "TGP."
                        , quantity: 30000
                        , itemID: 0
                        , roll: 14
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Solak, and you find a Elven Crystal Ritual Shard! You get"
                        , itemMessage2: "TGP."
                        , quantity: 30000
                        , itemID: 0
                        , roll: 15
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Solak and you make"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , itemID: 0
                        , roll: 150
                        , itemName: "TGP."
                        , min: 0
                        , max: 15000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Vorago, and you find a Vitalis! Share it with Alan pls and ty. You get"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , itemID: 0
                        , roll: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Vorago, and you find a Bombi! You get"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , itemID: 0
                        , roll: 10
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Vorago, and you find a Seismic Wand! You get"
                        , itemMessage2: "TGP."
                        , quantity: 150000
                        , itemID: 0
                        , roll: 250
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Vorago, and you find a Seismic Singularity! You get"
                        , itemMessage2: "TGP."
                        , quantity: 250000
                        , itemID: 0
                        , roll: 500
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Vorago and you get"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , itemID: 0
                        , roll: 5000
                        , itemName: "TGP."
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Raksha. You find a Greater Ricochet Ability Codex! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 200000
                        , itemID: 0
                        , roll: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Raksha. You find a Greater Chain Ability Codex! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 100000
                        , itemID: 0
                        , roll: 1
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Raksha. You find a Divert Ability Codex! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 75000
                        , itemID: 0
                        , roll: 2
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Raksha. You find a Shadow Spike! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 100000
                        , itemID: 0
                        , roll: 3
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Raksha. You find a pair of Laceration Boots! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 20000
                        , itemID: 0
                        , roll: 5
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Raksha. You find a pair of Blast Diffusion Boots! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 20000
                        , itemID: 0
                        , roll: 7
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Raksha. You find a pair of Fleeting Boots! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 30000
                        , itemID: 0
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Raksha and you make"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 100
                        , itemName: "TGP."
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Araxxor. You find a fang! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 75000
                        , itemID: 0
                        , roll: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Araxxor. You find a web! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 60000
                        , itemID: 0
                        , roll: 1
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Araxxor. You find an eye! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 50000
                        , itemID: 0
                        , roll: 2
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Araxxor. You find a spider leg piece! You sell it for"
                        , itemMessage2: "TGP!"
                        , quantity: 35000
                        , itemID: 0
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Araxxor. You make"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 100
                        , itemName: "TGP."
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to RWT and transfer your bank account to TGP! You buy"
                        , itemMessage2: "TGP!"
                        , quantity: 100000
                        , itemID: 0
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to RWT and transfer your bank account to TGP! You buy"
                        , itemMessage2: "TGP!"
                        , quantity: 100000
                        , itemID: 0
                        , roll: 100
                        , itemName: "TGP."
                        , min: 0
                        , max: 10000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to PVP and you get a big fat drop! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 50000
                        , roll: 9
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to PVP! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 50000
                        , roll: 100
                        , itemID: 0
                        , itemName: "TGP."
                        , min: 0
                        , max: 5000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to dance for GP, and you find a nice donator! He donates"
                        , itemMessage2: "TGP!"
                        , quantity: 10000
                        , roll: 9
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to dance for GP! He donates"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , roll: 100
                        , itemID: 0
                        , itemName: "TGP."
                        , min: 0
                        , max: 1000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to work for Jenny W3 Lumbridge and you get a bonus for doing so well! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 5000
                        , itemID: 0
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to work for Jenny W3 Lumbridge and you get a bonus for doing so well! You earn"
                        , itemMessage2: "TGP!"
                        , quantity: 5000
                        , itemID: 0
                        , roll: 100
                        , itemName: "TGP."
                        , min: 0
                        , max: 3000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to loan to Squirtles. He went and gift chucked it all. You lost"
                        , itemMessage2: "TGP."
                        , quantity: -10000
                        , itemID: 0
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to loan to Squirtles. You lost"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , itemID: 0
                        , roll: 100
                        , itemName: "TGP."
                        , min: 0
                        , max: 5000
                        , negative: 5000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to become De_mercher and you flip ice dyes for dayz! You make"
                        , itemMessage2: "TGP!"
                        , roll: 9
                        , quantity: 300000
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to become De_mercher and you make"
                        , itemMessage2: "TGP!"
                        , roll: 100
                        , quantity: 0
                        , itemID: 0
                        , min: 0
                        , max: 10000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to stun stun pool and team wipe! You pay for everyone's deaths like a good samaritan. You pay"
                        , itemMessage2: "TGP for everyone's deaths."
                        , roll: 9
                        , quantity: -90000
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to stun stun pool. Luckily no one died except yourself so you pay"
                        , itemMessage2: "TGP to reclaim your items."
                        , roll: 100
                        , quantity: 0
                        , itemID: 0
                        , min: 0
                        , max: 9000
                        , negative: 9000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to P50, you win it big! Shhhhhh, don't tell Squirtles. You win"
                        , itemMessage2: "TGP!"
                        , roll: 9
                        , itemID: 0
                        , quantity: 50000
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to P50, you win"
                        , itemMessage2: "TGP!"
                        , roll: 100
                        , itemID: 0
                        , quantity: 0
                        , min: 50
                        , max: 50
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to go Falador drop party and someone put a phat in! You spam click so hard you'll need a new mouse after. You did earn"
                        , itemMessage2: "TGP from it though!"
                        , roll: 9
                        , itemID: 0
                        , quantity: 30000
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to go Falador drop party but you didn't earn much. You get"
                        , itemMessage2: "TGP."
                        , roll: 100
                        , itemID: 0
                        , quantity: 0
                        , min: 0
                        , max: 6000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to take down @King Gamba, hope this is enough to achieve the impossible... You receive"
                        , itemMessage2: "TGP!"
                        , roll: 9
                        , itemID: 0
                        , quantity: 690000
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to take down @King Gamba, and receive"
                        , itemMessage2: "TGP."
                        , roll: 100
                        , itemID: 0
                        , quantity: 0
                        , min: 0
                        , max: 6900
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to skill for HSR. Your LOTD (do you have one?) shines bright and you receive"
                        , itemMessage2: "Hazelmere's Signet Ring!"
                        , itemID: 26
                        , quantity: 1
                        , roll: 3
                        , itemName: "Hazelmere's Signet Ring."
                    }, {
                        itemMessage: "You decide to skill for HSR. But seren spirit decides to give you 1x Uncut Diamond and you receive"
                        , itemMessage2: "TGP for it."
                        , itemID: 0
                        , quantity: 1
                        , roll: 100
                        , min: 0
                        , max: 2000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to Solak but suyo asks for brews. Your brews saved spoonyo, who gets a drop for you. You earn"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , quantity: 149000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to Solak but suyo asks for brews. You lose"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity :0
                        , roll: 30
                        , min: 0
                        , max: 2000
                        , negative: 2000
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to Solak but suyo asks for brews. You earn"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity :0
                        , roll: 100
                        , min: 0
                        , max: 10000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to trade staff for 2 rings and Congratulations! You earned the @2 rings better than 1 staff role! You lost"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , roll: 9
                        , quantity: -69696
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to trade staff for 2 rings and Congratulations! You earned the @2 rings better than 1 staff role! You lost"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , roll: 100
                        , quantity: 0
                        , min: 0
                        , max: 6969
                        , negative: 6969
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to help Kaffys questing services and we love Uncle Kaffers and Uncle Kaffers loves you. You earn"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , roll: 9
                        , quantity: 250000
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to help Kaffys questing services and you earn"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , roll: 100
                        , quantity: 0
                        , min: 0
                        , max: 25000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to DSF for Tavias and a sailfish pokes your tummy and you bleed over your green map. Now it's red! You obtain"
                        , itemMessage2: "Tavia's Fishing Rod!"
                        , itemID: 24
                        , roll: 3
                        , quantity: 1
                        , itemName: "Tavia's Fishing Rod."
                    }, {
                        itemMessage: "You decide to DSF for Tavias and you get"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , roll: 100
                        , quantity: 1
                        , min: 0
                        , max: 8000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to debt stake like a true degen, told ya I always win and pay you back! You get"
                        , itemMessage2: "TGP!"
                        , quantity: 150000
                        , itemID: 0
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to debt stake like a true degen, and you win"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 55
                        , min: 0
                        , max: 14000
                        , negative: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to debt stake like a true degen, and you lose"
                        , itemMessage2: "TGP!"
                        , quantity: 0
                        , itemID: 0
                        , roll: 100
                        , min: 0
                        , max: 14000
                        , negative: 14000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to grind for pet. WTF I just want the pet! Stop giving me drops! You got"
                        , itemMessage2: "TGP!"
                        , quantity: 80000
                        , roll: 9
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to grind for pet. You gain"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , roll: 100
                        , itemID: 0
                        , min: 0
                        , max: 8000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to bomb mid and you pay"
                        , itemMessage2: "TGP for their deaths. #Worth"
                        , quantity: -20000
                        , roll: 9
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to bomb mid and you pay"
                        , itemMessage2: "TGP for their deaths."
                        , quantity: 0
                        , roll: 100
                        , itemID: 0
                        , min: 0
                        , max: 5000
                        , negative: 5000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to SGB on reflect, not my fault they didn't pray ranged. You pay"
                        , itemMessage2: "TGP for their non-rod deaths."
                        , roll: 9
                        , quantity: -20000
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to SGB on reflect. You pay"
                        , itemMessage2: "TGP for their deaths."
                        , roll: 100
                        , quantity: 0
                        , itemID: 0
                        , min: 0
                        , max: 10000
                        , negative: 10000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to pawn Suyo's khops and the Lord giveth, and the Lord taketh away — Jeremiah 29:11. You gain"
                        , itemMessage2: "TGP!"
                        , roll: 9
                        , quantity: 300000
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to pawn Suyo's khops and you gain"
                        , itemMessage2: "TGP!"
                        , roll: 100
                        , quantity: 0
                        , itemID: 0
                        , min: 0
                        , max: 30000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to play ironman instead and drop trading is a thing. You get"
                        , itemMessage2: "TGP."
                        , quantity: 2000
                        , roll: 9
                        , itemID: 0
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to play ironman instead. You get"
                        , itemMessage2: "TGP."
                        , quantity: 0
                        , roll: 100
                        , itemID: 0
                        , min: 0
                        , max: 1000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to accept a gift chuck and you studied the scoreboard for 40min to guarantee this dub! You win"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , quantity: 50000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to accept a gift chuck and you win"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , quantity: 50000
                        , roll: 100
                        , min: 0
                        , max: 5000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to simp, you are a master simper and receive"
                        , itemMessage2: "... TGP."
                        , itemID: 0
                        , quantity: 696969
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to simp and you receive"
                        , itemMessage2: "... TGP."
                        , itemID: 0
                        , quantity: 6969
                        , roll: 100
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to bribe Alan. Alan's programming in Binary so you hope 110010 means partyhat! You gain"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 110010
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to bribe Alan. You gain"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 100
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to catfish and you don't care as long as it puts food on the table. You earn"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 100000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to catfish and you earn"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 100
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to Ice dye your Lengs. JK you blood dyed them instead! You lose"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: -50000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to Ice dye your Lengs. You lose"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 20000
                        , negative: 20000                        
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Times are tough, you swipe the card for a bond and sell it on the grand exchange. Who needs USD when you got TGP! You buy"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 200000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "Times are tough, you swipe the card for a bond and sell it on the grand exchange. You buy"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 20000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Your LOTD shines bright and you receive Raklette, but you tele out without picking it up. Thankfully, this is Gamba and God Alan trades you pet for"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 9
                        , min: 0
                        , max: 5000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "What is that? Agent #0069 the penguin! You find a hard clue casket. You open the hard casket and find"
                        , itemMessage2: "Orlando Smith's Hat! Don't question it."
                        , itemID: 18
                        , quantity: 1
                        , roll: 0
                        , itemName: "Orlando Smith's Hat."
                    }, {
                        itemMessage: "What is that? Agent #0069 the penguin! You find a hard clue casket. You open the hard casket and find"
                        , itemMessage2: "Blood dye! Don't question it."
                        , itemID: 19
                        , quantity: 1
                        , roll: 1
                        , itemName: "Blood dye."
                    }, {
                        itemMessage: "What is that? Agent #0069 the penguin! You find a hard clue casket. You open the hard casket and find"
                        , itemMessage2: "Third Age dye! Don't question it."
                        , itemID: 20
                        , quantity: 1
                        , roll: 2
                        , itemName: "Third Age dye."
                    }, {
                        itemMessage: "What is that? Agent #0069 the penguin! You find a hard clue casket. You open the hard casket and find"
                        , itemMessage2: "Ice dye! Don't question it."
                        , itemID: 21
                        , quantity: 1
                        , roll: 4
                        , itemName: "Ice dye."
                    }, {
                        itemMessage: "What is that? Agent #0069 the penguin! You find a hard clue casket. You open the hard casket and find"
                        , itemMessage2: "Shadow dye! It could have been a Blood dye. :/"
                        , itemID: 22
                        , quantity: 1
                        , roll: 7
                        , itemName: "Shadow dye."
                    }, {
                        itemMessage: "What is that? Agent #0069 the penguin! You find a hard clue casket. You open the hard casket and find"
                        , itemMessage2: "Barrows Dye! Yay poop dye!"
                        , itemID: 23
                        , quantity: 1
                        , roll: 14
                        , itemName: "Barrows dye."
                    }, {
                        itemMessage: "What is that? Agent #0069 the penguin! You find a hard clue casket. You open the hard casket and find"
                        , itemMessage2: "TGP! Better luck next time!"
                        , itemID: 0
                        , quantity: 0
                        , roll: 300
                        , min: 0
                        , max: 10000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Holy shmokes, you’ve found some goodies at Epic Smokes drop party in the Falador Party Room! You receive some shmokin hot drops. You earned"
                        , itemMessage2: "GP during the party!"
                        , itemID: 0
                        , quantity: 200000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "Holy shmokes, you’ve found some goodies at Epic Smokes drop party in the Falador Party Room! You earned"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 15000
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to buy some Tempy GIFs from Hokiepokie. Hoke charges you extra to afford new staff. You pay"
                        , itemMessage2: "GP for the cute GIFs and the staff!"
                        , itemID: 0
                        , quantity: -25000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to buy some Tempy GIFs from Hokiepokie. You pay"
                        , itemMessage2: "GP for the cute GIFs!"
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 15000
                        , negative: 15000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Not only have you failed root skips, but you’ve rooted your entire team, killing yourself and everyone else, and no one was wearing their ROD. You pay"
                        , itemMessage2: "TGP for everyone's non-rod deaths"
                        , itemID: 0
                        , quantity: -100000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "Not only have you failed root skips, but you’ve rooted your entire team, killing yourself and everyone else. You pay"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 10000
                        , negative: 10000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Running back from warbands, you are teleblocked and merked by U Blow G, embarrassing. And suyo tells you to sit. You lose"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: -25000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "Running back from warbands, you are teleblocked and merked by U Blow G, embarrassing. You lose"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 10000
                        , negative: 10000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You opted to let firey comet base tank for raids and he actually survived! You earn"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 50000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You opted to let firey comet base tank for raids and you lose"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 10000
                        , negative: 10000
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You contribute to paying off Josh's loan and he spoons you a drop! You earn"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , quantity: 16845
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You contribute to paying off Josh's loan and you lose"
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 10000
                        , negative: 10000    
                        , itemName: "TGP."                    
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Chaos Elemental and you get pked by a shitter. Sit noob! You lose"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: -10000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Chaos Elemental and you gain"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 100
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to kill Revenants and you find a Statius War Hammer! JK it's corrupt. You earn"
                        , itemMessage2: "TGP instead."
                        , itemID: 0
                        , quantity: 75000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to kill Revenants and you find"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: 0
                        , min: 1
                        , max: 7501
                        , roll: 100
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Legit_Player69 shows you 690m and says you can win if you bring bank and break Annakarl teleport tablet. You recieve a Free tele tab. Your noob ass breaks the tele tab and gets lured. You lost"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: -100000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "Legit_Player69 shows you 690m and says you can win if you bring bank and break Annakarl teleport tablet. You recieve a Free tele tab. You receive"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 1
                        , max: 101
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Kylie says green is ew. Tummy Poke is big depressed and gives you green phat to yeet. Zouble up! But now u got 2 ew colored phats. You earn"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: 500000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "Kylie says green is ew. Tummy Poke is big depressed and gives you green phat to yeet. You earn"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 1
                        , max: 25001
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You decide to play TH and you find 200m RSGP and convert it to TGP! You earned "
                        , itemMessage2: "TGP!"
                        , itemID: 0
                        , quantity: 200000
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You decide to play TH and you find"
                        , itemMessage2: "GP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , min: 0
                        , max: 1001
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Christmas Cracker from the 2001 Christmas Event!"
                        , itemID: 1
                        , quantity: 1
                        , roll: 0
                        , itemName: "Christmas Cracker."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Blue Partyhat from the 2001 Christmas Event!"
                        , itemID: 2
                        , quantity: 1
                        , roll: 1
                        , itemName: "Blue Partyhat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "White Partyhat from the 2001 Christmas Event!"
                        , itemID: 3
                        , quantity: 1
                        , roll: 2
                        , itemName: "White Partyhat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Red Partyhat from the 2001 Christmas Event!"
                        , itemID: 4
                        , quantity: 1
                        , roll: 3
                        , itemName: "Red Partyhat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Purple Partyhat from the 2001 Christmas Event!"
                        , itemID: 5
                        , quantity: 1
                        , roll: 4
                        , itemName: "Purple Partyhat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Green Partyhat from the 2001 Christmas Event!"
                        , itemID: 6
                        , quantity: 1
                        , roll: 5
                        , itemName: "Green Partyhat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Yellow Partyhat from the 2001 Christmas Event!"
                        , itemID: 7
                        , quantity: 1
                        , roll: 6
                        , itemName: "Yellow Partyhat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Golden Partyhat from the 2021 Christmas Event! (now?)"
                        , itemID: 8
                        , quantity: 1
                        , roll: 7
                        , itemName: "Golden Partyhat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Black Santa Hat from the 2013 Christmas Event!"
                        , itemID: 9
                        , quantity: 1
                        , roll: 9
                        , itemName: "Black Santa Hat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Half Jug of Wine from who knows when? All we know is why can't we just drink half from a full jug of wine?"
                        , itemID: 10
                        , quantity: 1
                        , roll: 11
                        , itemName: "Half Jug of Wine."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Red Santa Hat from the 2002 Christmas Event!"
                        , itemID: 11
                        , quantity: 1
                        , roll: 13
                        , itemName: "Red Santa Hat."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Red H'ween Mask from the 2002 Halloween Event!"
                        , itemID: 12
                        , quantity: 1
                        , roll: 15
                        , itemName: "Red H'ween Mask."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Blue H'ween Mask from the 2002 Halloween Event!"
                        , itemID: 13
                        , quantity: 1
                        , roll: 17
                        , itemName: "Blue H'ween Mask."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Green H'ween Mask from the 2002 Halloween Event!"
                        , itemID: 14
                        , quantity: 1
                        , roll: 19
                        , itemName: "Green H'ween Mask."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Disk of Returning from 2001. Were you one of the lucky people that got banned?"
                        , itemID: 15
                        , quantity: 1
                        , roll: 22
                        , itemName: "Disk of Returning."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Pumpkin from the 2001 Halloween Event!"
                        , itemID: 16
                        , quantity: 1
                        , roll: 25
                        , itemName: "Pumpkin."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and yoinked"
                        , itemMessage2: "Easter Egg from the 2002 Easter Event!"
                        , itemID: 17
                        , quantity: 1
                        , roll: 29
                        , itemName: "Easter Egg."
                    }, {
                        itemMessage: "Word has reached the almighty God Alan that you attempted to create P6E4. He pities your dumbass and hands you an Ultra Invention Potion. Upon drinking the potion and putting in 9 timeworn comps, you create a Time machine! You find a time machine and find"
                        , itemMessage2: "TGP sitting on the ground. :("
                        , itemID: 0
                        , quantity: 0
                        , roll: 1000
                        , min: 0
                        , max: 20001
                        , negative: 0
                        , itemName: "TGP."
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "Following clan tradition, you receive a muddy key for becoming Overseer! You walk around Gielinor trying to open every lock. As the key approaches the lock, you recognise some odd symbols on the case. You pick up a nearby rock and smash open the case. Congratulations you found Guildmaster Tony's mattock! You earn" 
                        , itemMessage2: "Guildmaster Tony's Mattock!"
                        , itemID: 25
                        , quantity: 1
                        , roll: 2
                        , itemName: "Guildmaster Tony's Mattock!"
                    }, {
                        itemMessage: "Following clan tradition, you receive a muddy key for becoming Overseer! You walk around Gielinor trying to open every lock. You earn" 
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , itemName: "TGP."
                        , min: 0
                        , max: 1000
                        , negative: 0
                    }
                ]
            }, {
                items: [
                    {
                        itemMessage: "You run out of ovls and decide to do 4k claims with combat potion (3) you picked up from Bandos. You are a legend and receive Golden Shmorden title! After celebrating, you file a lost item claim for 4 dtd that's worth"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 196969
                        , roll: 9
                        , itemName: "TGP."
                    }, {
                        itemMessage: "You run out of ovls and decide to do 4k claims with combat potion (3) you picked up from Bandos. You lose"
                        , itemMessage2: "TGP."
                        , itemID: 0
                        , quantity: 0
                        , roll: 100
                        , itemName: "TGP."
                        , min: 0
                        , max: 5000
                        , negative: 5000
                    }
                ]
            }
        ];
        let excuses = [
            'Your aura is on cooldown. '
            , 'Cara said no to carrying you. '
            , 'You ran out of adrenaline renewals so you need to make some more before continuing. '
            , 'You have been asked to do chores. '
            , 'Your pool is on fire and no time to adventure. '
            , 'Your goldfish is nagging you for a walk. '
            , 'You logged off because no one invited you because you\'re dog shit. '
            , "You are too busy admiring Tempy. "
            , "Dinner's ready! "
            , "You watch Adventure Time. "
            , "It's time for bedge so you say no to degen hours. "
            , "You try to group boss on mobile and get kicked for leeching. "
            , "You are edating and decide not to adventure. "
            , "You are busy twirling. "
            , "Your tummy gets poked and hurts too much to adventure. "
            , "Your fat ass decides to adventure IRL instead of gamba. "
            , "Cara's offline. "
            , "You are big shy to ask Cara to pvm with you. "
            , "King Gamba forbids you from adventuring within the kingdom "
            , "You send Suyo <3 but he ignores it. You are too heartbroken to adventure."
        ];
        const user = await Users.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId}});
        if (user && Date.now() - user.dataValues.lastAdventure < cooldown) {
            let excuse = getRandomInt(0, excuses.length);
            await interaction.editReply({
                content: excuses[excuse] + 'Please come back in ' + parseMillisecondsIntoReadableTime(cooldown - (Date.now() - user.dataValues.lastAdventure)) + '.'
            });
        } else {
            let luck = await UserItems.findAll({where:{
                [Op.and]:[
                    {userID: interaction.user.id}
                    , {guildID: interaction.guildId}
                    , {[Op.or]: [
                        {itemID: 26}
                        , {itemID: 27}
                    ]}
                ]
            }});
            let doubled = false;
            let selection = getRandomInt(0, options.length);
            if (luck.length > 0) {
                console.log(interaction.user.username + ' ' + interaction.guildId);
                options[selection].items[options[selection].items.length-1].roll = Math.floor(options[selection].items[options[selection].items.length-1].roll * .90);
                for (i = 0; i < luck.length; i++) {
                    if (luck[i].dataValues.itemID == 26) {
                        let hsr = getRandomInt(50, 100);
                        console.log(interaction.user.username + ' ' + interaction.guildId + ' ' + hsr);
                        if (hsr == 69) {
                            doubled = true;
                        }
                    }
                }
            }
            let rng = getRandomInt(0, options[selection].items[options[selection].items.length-1].roll);
            for (i = 0; i < options[selection].items.length; i++) {
                if (rng <= options[selection].items[i].roll) {
                    if (options[selection].items[i].max) {
                        options[selection].items[i].quantity = getRandomInt(options[selection].items[i].min, options[selection].items[i].max) - options[selection].items[i].negative;
                    }
                    options[selection].items[i].itemMessage += ' ' + numberWithCommas(options[selection].items[i].quantity) + ' ' + options[selection].items[i].itemMessage2;
                    if (doubled) {
                        options[selection].items[i].quantity *= 2;
                        options[selection].items[i].itemMessage += " Your HSR doubled your drop! You receive " + numberWithCommas(options[selection].items[i].quantity) + ' ' + options[selection].items[i].itemName;
                    }
                    break;
                }
            }
            if (user && options[selection].items[i].itemID == 0) {
                Users.update({balance: user.dataValues.balance + options[selection].items[i].quantity, lastAdventure: Date.now()}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
            } else if (!user && options[selection].items[i].itemID == 0) {
                Users.create({userID: interaction.user.id, guildID: interaction.guildId, balance: options[selection].items[i].quantity, lastAdventure: Date.now()})
            } else if (user && options[selection].items[i].itemID != 0) {
                Users.update({lastAdventure: Date.now()}, {where: {userID: interaction.user.id, guildID: interaction.guildId}});
                let userItems = await UserItems.findOne({where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID}});
                if (userItems) {
                    UserItems.increment({quantity: options[selection].items[i].quantity}, {where: {userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID}});
                } else {
                    UserItems.create({userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID, quantity: options[selection].items[i].quantity});
                }
            } else {
                Users.create({userID: interaction.user.id, guildID: interaction.guildId, balance: 0, lastAdventure: Date.now()});
                UserItems.create({userID: interaction.user.id, guildID: interaction.guildId, itemID: options[selection].items[i].itemID, quantity: options[selection].items[i].quantity});
            }
            await interaction.editReply({
                content: options[selection].items[i].itemMessage
            });
        }
	},
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseMillisecondsIntoReadableTime(milliseconds){
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
  }