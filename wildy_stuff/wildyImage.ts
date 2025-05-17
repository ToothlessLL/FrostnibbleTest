import { loadImage, createCanvas, GlobalFonts, Image } from '@napi-rs/canvas';
import general from '../functions/general.js';
import path from 'path';

export type EventName = 'Infernal Star' | 'Surprising Seedlings' | 'Hellhound Pack' | 'Butterfly Swarm' | 'Demon Stragglers' | 'Unnatural Outcrop';
export type EventDetails = {
    name: EventName
    , time: string | null
}

type EventImages = {
    normal: Promise<Image> | Image
    , washed: Promise<Image> | Image
};

export type Event = EventDetails & EventImages;

export type Events = {
    INFERNAL_STAR: Event
    // , SURPRISING_SEEDLINGS: Event
    // , HELLHOUND_PACK: Event
    , BUTTERFLY_SWARM: Event
    // , DEMON_STRAGGLERS: Event
    // , UNNATURAL_OUTCROP: Event
}

type EventType = 'nextEvent' | 'followingEvent';
type ImageConfig = {baseImage: Promise<Image> | Image} & Record<EventType, Event>;

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

const imagePath = `./wildy_stuff/images/`;

const nextEvent: Event = {
    name: 'Infernal Star'
    , time: '17:00 GT'
    , normal: loadImage(`${imagePath}${events.INFERNAL_STAR.replaceAll(' ', '_')}.png`)
    , washed: loadImage(`${imagePath}${events.INFERNAL_STAR.replaceAll(' ', '_')}_washed.png`)
}

const followingEvent: Event = {
    name: 'Butterfly Swarm'
    , time: '19:00 GT'
    , normal: loadImage(`${imagePath}${events.BUTTERFLY_SWARM.replaceAll(' ', '_')}.png`)
    , washed: loadImage(`${imagePath}${events.BUTTERFLY_SWARM.replaceAll(' ', '_')}_washed.png`)
}

export const EventList: Events = {
    INFERNAL_STAR: nextEvent
    , BUTTERFLY_SWARM: followingEvent
} 

const config: ImageConfig = {
    baseImage: loadImage(`${imagePath}Wilderness_Events_Border.png`)
    , nextEvent
    , followingEvent
}

Promise.all([config.baseImage, config.nextEvent.normal, config.followingEvent.normal])
.then(result => {
    config.baseImage = result[0];
    config.nextEvent.normal = result[1];
    config.followingEvent.normal = result[2];

    const canvas = createCanvas(result[0].width, result[0].height);
    const context = canvas.getContext('2d');
    context.drawImage(config.nextEvent.normal, 0, 0, config.nextEvent.normal.width, config.nextEvent.normal.height);
    context.drawImage(config.followingEvent.normal, 0, 0, config.followingEvent.normal.width, config.followingEvent.normal.height);
    context.drawImage(result[0], 0, 0, result[0].width, result[0].height);

    context.font = '80px trajan pro';
    context.fillStyle = ivory;
    let fullText = `Wilderness Event: ${nextEvent}`;
    let fullTextMeasure = context.measureText(fullText);
    let text: string = 'Wilderness Event: ';
    let textMeasure = context.measureText(text);
    context.fillText(text, canvas.width/2 - fullTextMeasure.width/2, 1250);
    context.fillStyle = yellow;
    text = config.nextEvent.name;
    context.fillText(text, canvas.width/2 - fullTextMeasure.width/2 + textMeasure.width, 1250);

    context.font = '60px trajan pro';
    context.fillStyle = yellow;
    // text = config.nextEvent.time;
    textMeasure = context.measureText(text);
    context.fillText(text, 680 - textMeasure.width/2, 1120);
    
    context.font = '60px trajan pro';
    context.fillStyle = yellow;
    // text = config.followingEvent.time;
    textMeasure = context.measureText(text);
    context.fillText(text, 1460 - textMeasure.width/2, 1120);

    return canvas.encode('png');
})
.then(result => {
	general.writeFile(outputPath, result)
})
.catch(error => console.log(error));

// export function createImage (nextEventDetails: EventDetails, followingEventDetails: EventDetails) {
//     const nextEvent: Event = {
//         name: nextEventDetails.name
//         , time: nextEventDetails.time
//         , image: loadImage(`${imagePath}${nextEventDetails.name.replaceAll(' ', '_')}.png`)
//     }
    
//     const followingEvent: Event = {
//         name: followingEventDetails.name
//         , time: followingEventDetails.time
//         , image: loadImage(`${imagePath}${followingEventDetails.name.replaceAll(' ', '_')}_washed.png`)
//     }

//     const config: ImageConfig = {
//         baseImage: loadImage(`${imagePath}Wilderness_Events_Border.png`)
//         , nextEvent: nextEvent
//         , followingEvent: followingEvent
//     }
// }