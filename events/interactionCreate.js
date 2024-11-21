import { InteractionType } from 'discord.js';

const data = {
    name: "interactionCreate",
    async execute(interaction, client) {    
        if (interaction.isChatInputCommand()) {
            const {commands} = client;
            const {commandName} = interaction;
            const command = commands.get(commandName);

            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(`command name is ${interaction}`);
                console.error(error);
            }
        } else if (interaction.isButton()) {
            const {buttons} = client;
            const {customId} = interaction;
            const buttonId = ['PLD', 'WAR', 'DRK', 'GNB', 'WHM', 'SCH', 'AST', 'SGE', 'MNK', 'DRG', 'NIN', 'SAM', 'RPR', 'BRD', 'MCH', 'DNC', 'BLM', 'SMN', 'RDM'].includes(customId) ? 'raid' : customId;
            const button = buttons.get(buttonId);
            
            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.log(err);
            }
        } else if (interaction.isSelectMenu()) {
            const {selectMenus} = client;
            const {customId} = interaction;
            const selectMenu = selectMenus.get(customId);
            
            try {
                await selectMenu.execute(interaction, client);
            } catch (err) {
                console.log(err);
            }
        } else if (interaction.type == InteractionType.ModalSubmit) {
            const {modals} = client;
            const {customId} = interaction;
            const modal = modals.get(customId);

            try {
                await modal.execute(interaction, client);
            } catch (err) {
                console.log(err);
            }
        } else if (interaction.isContextMenuCommand()) {
            const {commands} = client;
            const {commandName} = interaction;
            const contextMenu = commands.get(commandName);

            try {
                await contextMenu.execute(interaction);
            } catch (err) {
                console.log(err);
            }
        } else if (interaction.isAutocomplete()) {
            const {commands} = client;
            const {commandName} = interaction;
            const command = commands.get(commandName);

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.log(`autocomplete name is ${interaction}`);
                console.error(error);
            }
        }
    }
}

export default data;