const Canvas = require('@napi-rs/canvas');
const { sequelize } = require('../../dbObjects.js');
const { QueryTypes } = require('sequelize');
const fs = require('fs');
const { AttachmentBuilder} = require('discord.js');
const bingo = require('./bingo.js');

module.exports = {
    width: null,
    height: null,
    lineWidth: 10,
    canvasWidth: null,
    canvasHeight: null,
    horizontalPosition: null,
    verticalPosition: null,
    pixels: 420,
    boardTilePath: 'C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\bingo\\bingo-board-tiles.png',
    boardBasePath: 'C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\bingo\\bingo-board-base.png',
    teamPath: 'C:\\Users\\warri\\OneDrive\\Alan\\ToothlessBot\\images\\bingo\\',
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

    async prepopulateValues() {
        boardValues = await sequelize.query(`select view_start_time, submit_start_time, submit_end_time, width, height from bingo where id = 1`, {type: QueryTypes.SELECT});
        if (boardValues.length == 0) return;
        this.width = boardValues[0].width;
        this.height = boardValues[0].height;
        this.canvasWidth = boardValues[0].width * this.pixels;
        this.canvasHeight = boardValues[0].height * this.pixels;
        bingo.bingoTeams.forEach((value, key) => {
            try {
                fs.unlinkSync(`${this.teamPath}${value.name}.png`);
            } catch{

            }
        });
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
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: `${team}.png` });
        fs.writeFileSync(`${this.teamPath}${team}.png`,attachment);
    }
}