const translate = require("../interactions/messageContext/translate");
const translateLanguage = require("../interactions/selectMenus/translateLanguage");

module.exports = async (interaction) => {

    console.log(
        "Interaction:",
        interaction.type,
        interaction.commandName,
        interaction.customId
    );

    if (interaction.isMessageContextMenuCommand()) {
        if (interaction.commandName === "Translate") {
            return translate(interaction);
        }
    }

    if (interaction.isStringSelectMenu()) {
        console.log("Select menu received!");

        if (interaction.customId.startsWith("translate_language:")) {
            return translateLanguage(interaction);
        }
    }
};