import {readdirSync} from 'fs';

export default async function handleComponents(client) {
    const componentFolders = readdirSync(`./components`);
    for (const folder of componentFolders) {
        const componentFiles = readdirSync(`./components/${folder}`).filter(
            file => file.endsWith(".js")
        );

        const {buttons, selectMenus, modals, contextMenus} = client;
        
        switch (folder) {
            case "buttons":
                for (const file of componentFiles) {
                    const {default: button} = await import(`../components/${folder}/${file}`);
                    buttons.set(button.data.name, button);
                }
                break;
            case "selectMenus":
                for (const file of componentFiles) {
                    const {default: selectMenu} = await import(`../components/${folder}/${file}`);
                    selectMenus.set(selectMenu.data.name, selectMenu);
                }
                break;
            case "modals":
                for (const file of componentFiles){
                    const {default: modal} = await import(`../components/${folder}/${file}`);
                    modals.set(modal.data.name, modal);
                }
                break;
            default:
                break;
        }
    }
}

// const {readdirSync} = require('fs');

// module.exports = client => {
//     client.handleComponents = async () => {
//         const componentFolders  = readdirSync(`./components`);
//         for (const folder of componentFolders) {
//             const componentFiles = readdirSync(`./components/${folder}`).filter(
//                 file => file.endsWith(".js")
//             );

//             const {buttons, selectMenus, modals, contextMenus} = client;
            
//             switch (folder) {
//                 case "buttons":
//                     for (const file of componentFiles) {
//                         const button = require(`../components/${folder}/${file}`);
//                         buttons.set(button.data.name, button);
//                     }
//                     break;
//                 case "selectMenus":
//                     for (const file of componentFiles) {
//                         const selectMenu = require(`../components/${folder}/${file}`);
//                         selectMenus.set(selectMenu.data.name, selectMenu);
//                     }
//                     break;
//                 case "modals":
//                     for (const file of componentFiles){
//                         const modal = require(`../components/${folder}/${file}`);
//                         modals.set(modal.data.name, modal);
//                     }
//                     break;
//                 default:
//                     break;
//             }
//         }
//     }
// }