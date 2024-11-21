const { sequelize } = require('../../dbObjects.js');
const { QueryTypes } = require('sequelize');
const fs = require('fs');
const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder} = require('discord.js');

module.exports = {
    bingoPlayers: new Map(),
    bingoTileDrops: new Map(),
    bingoTiles: new Map(),
    bingoTeams: new Map(),
    bingoAdmins: ['162955183670820864'],
    casketCheckTypes: new Map(),
    width: null,
    height: null,
    lineWidth: 10,
    canvasWidth: null,
    canvasHeight: null,
    horizontalPosition: null,
    verticalPosition: null,
    pixels: 420,
    boardViewTime: null,
    submitStartTime: null,
    submitEndTime: null,
    boardTilePath: 'C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\bingo\\bingo-board-tiles.png',
    boardBasePath: 'C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\bingo\\bingo-board-base.png',
    teamPath: 'C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\bingo\\',
    tileName: `[1;4;34m`,
    tileComplete: `[0;32m`,
    tileNotComplete: `[0;35m`,
    tileReset: `[0m`,

    async prePopulateValues() {
        boardValues = await sequelize.query(`select view_start_time, submit_start_time, submit_end_time, width, height from bingo where id = 1`, {type: QueryTypes.SELECT});
        if (boardValues.length == 0) return;
        this.boardViewTime = boardValues[0].view_start_time;
        this.submitStartTime = boardValues[0].submit_start_time;
        this.submitEndTime = boardValues[0].submit_end_time;
        this.width = boardValues[0].width;
        this.height = boardValues[0].height;
        this.canvasWidth = boardValues[0].width * this.pixels;
        this.canvasHeight = boardValues[0].height * this.pixels;

        let casketCheckTypes = await sequelize.query(`select id, name from bingoCasketCheckType`, {type: QueryTypes.SELECT});
        casketCheckTypes.map(casketCheckType => {
            this.casketCheckTypes.set(casketCheckType.id, {name: casketCheckType.name, playerID: []});
        });

        let casketChecks = await sequelize.query(`select userID, casketCheckTypeID from bingoCasketCheck`, {type: QueryTypes.SELECT});
        casketChecks.map(casketCheck => {
            this.casketCheckTypes.get(casketCheck.casketCheckTypeID).playerID.push(casketCheck.userID);
        })

        let teams = await sequelize.query(`select id, name from bingoTeams`, {type: QueryTypes.SELECT});
        teams.map(team => {
            this.bingoTeams.set(team.id, {name: team.name, points: 0, dropSpecifics: ''});
        });

        let players = await sequelize.query(`select id, team from bingoPlayers where team is not null`, {type: QueryTypes.SELECT});
        players.map(player => {
            this.bingoPlayers.set(player.id, {team: player.team, points: 0});
        });

        let tiles = await sequelize.query(`select name, id, count, completionType, casketCheckTypeID from bingoTiles order by id`, {type: QueryTypes.SELECT});
        tiles.map(tile => {
            this.bingoTiles.set(tile.id, {name: tile.name, completionType: tile.completionType, count: tile.count, casketCheckType: tile.casketCheckTypeID, tiles: new Map()});
        });

        tiles = await sequelize.query(`select name, id, bingoTileID from bingoTileDrops`, {type: QueryTypes.SELECT}); 
        tiles.map(tile => {
            // this.bingoTiles.get(tile.bingoTileID).tileDrops.set(tile.id, {name: tile.name, team1: 0, team2: 0});
            this.bingoTileDrops.set(tile.id, {name: tile.name, bingoTileID: tile.bingoTileID});
            this.bingoTiles.get(tile.bingoTileID).tiles.set(tile.id, new Map());
            this.bingoTeams.forEach((values, key) => {
                this.bingoTiles.get(tile.bingoTileID).tiles.get(tile.id).set(key, new Map());
            });
        });

        let drops = await sequelize.query(`select bingoPlayerID, bingoTileDropID, acceptedDate from bingoDrops where acceptedDate is not null order by acceptedDate asc`, {type: QueryTypes.SELECT});
        drops.map(drop => {
            this.updateDrop(drop.bingoPlayerID, drop.bingoTileDropID, drop.acceptedDate);
        });

        this.bingoTeams.forEach((value, key) => {
            this.dropSpecificsText(key);
        });

        let admins = await sequelize.query(`select id from bingoAdmins`, {type: QueryTypes.SELECT});

        admins.map(admin => this.bingoAdmins.push(admin.id));

        this.bingoTeams.forEach((value, key) => {
            try {
                fs.unlinkSync(`${this.teamPath}${value.name}.png`);
            } catch (err) {

            }
        });

        this.playerLeaderboards();
    },

    async updateDrop(userID, bingoTileDropID, acceptedDate) {
        let bingoTileDrop = this.bingoTileDrops.get(bingoTileDropID);
        let bingoTile = this.bingoTiles.get(bingoTileDrop.bingoTileID);
        let teamID = this.bingoPlayers.get(userID).team;
        if (bingoTile.completionType == 1) {
            if (bingoTile.count > bingoTile.tiles.get(bingoTileDropID).get(teamID).size) {
                bingoTile.tiles.get(bingoTileDropID).get(teamID).set(acceptedDate, userID);
                this.dropSpecificsText(teamID);
                await this.updatePoints(teamID, bingoTile.completionType, bingoTileDropID);
                if (bingoTile.count == bingoTile.tiles.get(bingoTileDropID).get(teamID).size) {
                    await this.highlightAndSave(this.bingoTeams.get(teamID).name, bingoTileDrop.bingoTileID);
                }
            }
        } else {
            let complete = false;
            bingoTile.tiles.forEach((value, key) => {
                if (value.get(teamID).size >= bingoTile.count) {
                    complete = true;
                }
            });
            if (!complete) {
                bingoTile.tiles.get(bingoTileDropID).get(teamID).set(acceptedDate, userID);
                await this.updatePoints(teamID, bingoTile.completionType, bingoTileDropID);
                this.dropSpecificsText(teamID);
                if (bingoTile.count == bingoTile.tiles.get(bingoTileDropID).get(teamID).size) {
                    await this.highlightAndSave(this.bingoTeams.get(teamID).name, bingoTileDrop.bingoTileID);
                }
            }
        }
    },

    async playerLeaderboards() {
        let playerLeaderboardMap = new Map();
        this.bingoTiles.forEach((value, key) => {
            let numberOfDrops = value.tiles.size;
            let bingoCount = value.count;
            let points = value.completionType == 1 ? parseFloat(1/(bingoCount * numberOfDrops)) : parseFloat(1/bingoCount);
            value.tiles.forEach((value, key) => {
                value.forEach((value, key) => {
                    value.forEach((value, key) => {
                        if (playerLeaderboardMap.has(value)) {
                            playerLeaderboardMap.set(value, playerLeaderboardMap.get(value) + points);
                        } else {
                            playerLeaderboardMap.set(value, points);
                        }
                    });
                });
            });
        });
        return playerLeaderboardMap;
    },

    async updatePoints(team, completionType, bingoTileDropID) {
        let bingoTileDrop = this.bingoTileDrops.get(bingoTileDropID);
        let bingoTile = this.bingoTiles.get(bingoTileDrop.bingoTileID);
        let bingoCount = bingoTile.count;
        let numberOfDrops = bingoTile.tiles.size;
        let points;
        let highest = 0;
        let current = 0;
        if (completionType == 1) {
            points = parseFloat(1/(bingoCount * numberOfDrops));
            this.bingoTeams.get(team).points += points;
        } else {
            points = parseFloat(1/bingoCount);
            bingoTile.tiles.forEach((values, key) => {
                if (key == bingoTileDropID) {
                    current = values.get(team).size;
                } else {
                    highest = values.get(team).size > highest ? values.get(team).size : highest;
                }
            });
            if (current > highest) {
                this.bingoTeams.get(team).points += points;
            }
        }
    },

    async idtox (id) {
        return id % this.width == 0 ? this.width : id % this.width;
    },
    async idtoy (id) {
        return Math.ceil(id / this.width);
    },
    async xytoid (x, y) {
        return this.width*(y-1) + x;
    },
    async createBoardBase() {
        const gray = '#cccccc';
        const black = '#000000';
        const canvas = Canvas.createCanvas(this.canvasWidth, this.canvasHeight);
        const context = canvas.getContext('2d');

        context.lineWidth = this.lineWidth;
        context.strokeStyle = black;
        context.fillStyle = gray;
        
        context.fillRect(0,0,this.canvasWidth,this.canvasHeight);
        
        for (let i = 1; i < this.width; i++) {
            context.beginPath();
            context.moveTo(this.pixels * i,0);
            context.lineTo(this.pixels * i,this.canvasHeight);
            context.closePath();
            context.stroke();
        }

        for (let i = 1; i < this.height; i++) {
            context.beginPath();
            context.moveTo(0, this.pixels * i);
            context.lineTo(this.canvasWidth, this.pixels * i);
            context.closePath();
            context.stroke();
        }

        const attachment = await canvas.encode('png');
        fs.writeFileSync(this.boardBasePath,attachment);
    },

    async createTileBoard() {
        const canvas = Canvas.createCanvas(this.canvasWidth, this.canvasHeight);
        const context = canvas.getContext('2d');
        const attachment = await canvas.encode('png');
        fs.writeFileSync(this.boardTilePath,attachment);
    },

    async colorCell (x, y, context) {
        const color = '#90ee90';
        context.fillStyle = color;
        const width = x == 1 ? 0 : this.pixels * (x - 1) + this.lineWidth/2;
        const height = y == 1 ? 0 : this.pixels * (y - 1)+ this.lineWidth/2;
        var endingWidth;
        var endingHeight;
        if (x == 1) {
            endingWidth = this.pixels - this.lineWidth/2;
        } else if (x == this.width) {
            endingWidth = this.pixels;
        } else {
            endingWidth = this.pixels - this.lineWidth;
        }
        if (y == 1) {
            endingHeight = this.pixels - this.lineWidth/2;
        } else if (y == this.height) {
            endingHeight = this.pixels;
        } else {
            endingHeight = this.pixels - this.lineWidth;
        }
        context.fillRect(width, height, endingWidth, endingHeight);
    },
    
    async loadTiles(x, y, imagePath, context) {
        const width = x == 1 ? 0 : this.pixels * (x - 1) + this.lineWidth/2;
        const height = y == 1 ? 0 : this.pixels * (y - 1)+ this.lineWidth/2;
        var endingWidth;
        var endingHeight;
        if (x == 1) {
            endingWidth = this.pixels - this.lineWidth/2;
        } else if (x == this.width) {
            endingWidth = this.pixels;
        } else {
            endingWidth = this.pixels - this.lineWidth;
        }
        if (y == 1) {
            endingHeight = this.pixels - this.lineWidth/2;
        } else if (y == this.height) {
            endingHeight = this.pixels;
        } else {
            endingHeight = this.pixels - this.lineWidth;
        }
        background = await Canvas.loadImage(imagePath);
        context.drawImage(background,width,height, endingWidth, endingHeight);
    },

    async setDimensions(width, height) {
        this.width = width;
        this.height = height;
        this.canvasWidth = width * this.pixels;
        this.canvasHeight = height * this.pixels;
        await sequelize.query(`update bingo set width = ?, height = ?`, {replacements: [width, height], type: QueryTypes.UPDATE});
        this.createBoardBase();
        this.createTileBoard();
    },

    async addTile(x, y, path) {
        const canvas = Canvas.createCanvas(this.canvasWidth, this.canvasHeight);
        const context = canvas.getContext('2d');
        background = await Canvas.loadImage(this.boardTilePath);
        context.drawImage(background, 0, 0, this.canvasWidth, this.canvasHeight);
        await this.loadTiles(x, y, path, context);
        const attachment = await canvas.encode('png');
        fs.writeFileSync(this.boardTilePath,attachment);
    },
    
    async modifyTile(oldTile, newTile, path) {
        const oldx = await this.idtox(oldTile);
        const oldy = await this.idtoy(oldTile);
        const newx = newTile % this.width == 0 ? this.width : newTile % this.width;
        const newy = Math.ceil(newTile / this.width);
        const canvas = Canvas.createCanvas(this.canvasWidth, this.canvasHeight);
        const context = canvas.getContext('2d');
        background = await Canvas.loadImage(this.boardTilePath);
        context.drawImage(background, 0, 0, this.canvasWidth, this.canvasHeight);
        await this.deleteTile(oldx, oldy, context);
        await this.loadTiles(newx, newy, path, context);
        const attachment = await canvas.encode('png');
        fs.writeFileSync(this.boardTilePath,attachment);
    },

    async deleteAndSaveTile(id) {
        var x = await this.idtox(id);
        var y = await this.idtoy(id);
        const canvas = Canvas.createCanvas(this.canvasWidth, this.canvasHeight);
        const context = canvas.getContext('2d');
        background = await Canvas.loadImage(this.boardTilePath);
        context.drawImage(background, 0, 0, this.canvasWidth, this.canvasHeight);
        await this.deleteTile(x, y, context);
        const attachment = await canvas.encode('png');
        fs.writeFileSync(this.boardTilePath,attachment);
    },

    async deleteTile(x, y, context) {
        const width = x == 1 ? 0 : this.pixels * (x - 1) + this.lineWidth/2;
        const height = y == 1 ? 0 : this.pixels * (y - 1)+ this.lineWidth/2;
        var endingWidth;
        var endingHeight;
        if (x == 1) {
            endingWidth = this.pixels - this.lineWidth/2;
        } else if (x == this.width) {
            endingWidth = this.pixels;
        } else {
            endingWidth = this.pixels - this.lineWidth;
        }
        if (y == 1) {
            endingHeight = this.pixels - this.lineWidth/2;
        } else if (y == this.height) {
            endingHeight = this.pixels;
        } else {
            endingHeight = this.pixels - this.lineWidth;
        }
        context.clearRect(width, height, endingWidth, endingHeight);
    },

    async displayTeamBoard(name) {
        const canvas = Canvas.createCanvas(this.canvasWidth, this.canvasHeight);
        const context = canvas.getContext('2d');
        
        const background = await Canvas.loadImage(this.boardBasePath);
        context.drawImage(background,0,0);

        try {
            const background = await Canvas.loadImage(`${this.teamPath}${name}.png`);
            context.drawImage(background,0,0);
        } catch {

        }

        // load images
        const tileImage = await Canvas.loadImage(this.boardTilePath);
        context.drawImage(tileImage, 0, 0);
        return new AttachmentBuilder(await canvas.encode('png'), { name: `${name}.png` });
    }, 

    async highlightAndSave(team, tile) {
        const canvas = Canvas.createCanvas(this.canvasWidth, this.canvasHeight);
        const context = canvas.getContext('2d');
        try {
            const background = await Canvas.loadImage(`${this.teamPath}${team}.png`);
            context.drawImage(background,0,0);
        } catch {

        }
        //fill colors
        x = await this.idtox(tile);
        y = await this.idtoy(tile);
        
        //color tiles
        this.colorCell(x, y, context);
        const attachment = await canvas.encode('png');
        fs.writeFileSync(`${this.teamPath}${team}.png`,attachment);
    },

    async checkDrop(team, bingoDropTileID) {
        var bingoTileID = this.bingoTileDrops.get(bingoDropTileID);
        var bingoTileMap = this.bingoTiles.get(bingoTileID.bingoTileID);
        let complete = false;
        if (bingoTileMap.completionType == 1) {
            if (bingoTileMap.count <= bingoTileMap.tiles.get(bingoDropTileID).get(team).size) {
                complete = true;
            }
        } else {
            bingoTileMap.tiles.forEach((value, key) => {
                if (value.get(team).size >= bingoTileMap.count) {
                    complete = true;
                }
            });
        }
        return complete;
    },

    async dropSpecificsText(team) {
        let text = `\`\`\`ansi\n`;
        text += `[1;34m${this.bingoTeams.get(team).name}${this.tileReset}\n\n`;
        let complete = false;
        let currentBingoTile;
        this.bingoTiles.forEach((value, key) => {
            complete = false;
            currentBingoTile = value;
            if (currentBingoTile.completionType == 1) {
                complete = true;
                for (let [key, value] of currentBingoTile.tiles) {
                    if (value.get(team).size < currentBingoTile.count) {
                        complete = false;
                        break;
                    }
                }
            } else if (currentBingoTile.completionType == 2) {
                for (let [key, value] of currentBingoTile.tiles) {
                    if (value.get(team).size >= currentBingoTile.count) {
                        complete = true;
                        break;
                    }
                }
            }
            if (!complete) {
                text += `${this.tileName}${currentBingoTile.name}${this.tileReset}\n`;
                for (let [key, value] of currentBingoTile.tiles) {
                    let currentColor = value.get(team).size < currentBingoTile.count ? this.tileNotComplete : this.tileComplete;
                    text += `${currentColor}${value.get(team).size}/${currentBingoTile.count} ${this.bingoTileDrops.get(key).name}${this.tileReset}\n`;
                }
                text += `\n`;
            }
        })
        text += `\`\`\``;
        this.bingoTeams.get(team).dropSpecifics = text;
    }
}