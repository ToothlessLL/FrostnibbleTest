import { loadImage, createCanvas, GlobalFonts } from '@napi-rs/canvas';
import general from '../functions/general.js';
import path from 'path';

const filename = path.parse(import.meta.filename).name;
console.log(`\x1b[48;5;201m\x1b[34;2;145;231;255m${filename}\x1b[0m`);

GlobalFonts.registerFromPath(`./Fonts/trajan-pro\\TrajanPro-Regular.ttf`, 'trajan pro');
const ivory = "#fcf7e4";
const yellow = '#FFCB05FF';

const images = [
    loadImage(`./wildy_stuff/images/Wilderness_Events_Border.png`)
    , loadImage(`./wildy_stuff/images/Hellhounds.png`)
    , loadImage(`./wildy_stuff/images/Hellhounds_washed.png`)
    , loadImage(`./wildy_stuff/images/Surprising_Seedlings.png`)
    , loadImage(`./wildy_stuff/images/Surprising_Seedlings_washed.png`)
];

const scaling = 3180/2271;

Promise.all(images)
.then(result => {
    result.forEach(item => console.log(item.width, item.height));
    const upcomingStartX = 244;
    const upcomingEndX = 1620;
    const followingStartX = 1020;
    const followingEndX = followingStartX + (upcomingEndX - upcomingStartX);
    const y = 155;

    const canvas = createCanvas(result[0].width, result[0].height);
    const context = canvas.getContext('2d');
    context.drawImage(result[1], upcomingStartX, y, upcomingEndX - upcomingStartX, (upcomingEndX - upcomingStartX)/scaling + 5);
    context.drawImage(result[4], followingStartX, y, upcomingEndX - upcomingStartX, (upcomingEndX - upcomingStartX)/scaling + 5);
    context.drawImage(result[0], 0, 0, result[0].width, result[0].height);

    
    context.font = '80px trajan pro';
    context.fillStyle = yellow;
    let text = 'Wilderness Event: King Black Dragon Rampage';
    let textMeasure = context.measureText(text);
    context.fillText(text, canvas.width/2 - textMeasure.width/2, 1250);

    context.font = '60px trajan pro';
    context.fillStyle = ivory;
    text = '16:00 GT';
    textMeasure = context.measureText(text);
    context.fillText(text, 680 - textMeasure.width/2, 1120);
    
    context.font = '60px trajan pro';
    context.fillStyle = ivory;
    text = '17:00 GT';
    textMeasure = context.measureText(text);
    context.fillText(text, 1460 - textMeasure.width/2, 1120);

    return canvas.encode('png');
})
.then(result => {
	general.writeFile(`./${filename}.png`, result)
})
.catch(error => console.log(error));