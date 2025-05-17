import { loadImage, createCanvas, GlobalFonts } from '@napi-rs/canvas';
import general from '../functions/general.js';
import path from 'path';

const filename = path.parse(import.meta.filename).name;
const outputPath = `${path.parse(import.meta.filename).dir}\\${filename}.png`;
console.log(`\x1b[48;5;201m\x1b[34;2;145;231;255m${filename}\x1b[0m`);

GlobalFonts.registerFromPath(`./Fonts/trajan-pro\\TrajanPro-Regular.ttf`, 'trajan pro');
const ivory = "#fcf7e4";
const yellow = '#FFCB05FF';

export const events = {
    INFERNAL_STAR: `Infernal Star`
    , SURPRISING_SEEDLINGS: `Surprising Seedlings`
    , HELLHOUND_PACK: `Hellhound Pack`
    , BUTTERFLY_SWARM: `Butterfly Swarm`
    , DEMON_STRAGGLERS: `Demon Stragglers`
    , UNNATURAL_OUTCROP: `Unnatural Outcrop`
}

let nextEvent;
const imagePath = `./wildy_stuff/images/`;

Promise.all(loadImages(events.UNNATURAL_OUTCROP, events.SURPRISING_SEEDLINGS))
.then(result => {
    const coloredImage = result[1];
    const washedImage = result[2];

    const canvas = createCanvas(result[0].width, result[0].height);
    const context = canvas.getContext('2d');
    context.drawImage(coloredImage, 0, 0, coloredImage.width, coloredImage.height);
    context.drawImage(washedImage, 0, 0, washedImage.width, washedImage.height);
    context.drawImage(result[0], 0, 0, result[0].width, result[0].height);

    
    context.font = '80px trajan pro';
    context.fillStyle = ivory;
    let fullText = `Wilderness Event: ${nextEvent}`;
    let fullTextMeasure = context.measureText(fullText);
    let text = 'Wilderness Event: ';
    let textMeasure = context.measureText(text);
    context.fillText(text, canvas.width/2 - fullTextMeasure.width/2, 1250);
    context.fillStyle = yellow;
    text = nextEvent;
    context.fillText(text, canvas.width/2 - fullTextMeasure.width/2 + textMeasure.width, 1250);

    context.font = '60px trajan pro';
    context.fillStyle = yellow;
    text = '16:00 GT';
    textMeasure = context.measureText(text);
    context.fillText(text, 680 - textMeasure.width/2, 1120);
    
    context.font = '60px trajan pro';
    context.fillStyle = yellow;
    text = '17:00 GT';
    textMeasure = context.measureText(text);
    context.fillText(text, 1460 - textMeasure.width/2, 1120);

    return canvas.encode('png');
})
.then(result => {
	general.writeFile(outputPath, result)
})
.catch(error => console.log(error));

function loadImages (colored, washed) {
    const images = [loadImage(`${imagePath}Wilderness_Events_Border.png`)];
    images.push(loadImage(`${imagePath}${colored.replaceAll(' ', '_')}.png`));
    images.push(loadImage(`${imagePath}${washed.replaceAll(' ', '_')}_washed.png`));
    return images;
}