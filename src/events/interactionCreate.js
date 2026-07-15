const {
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

const languages = require("../utils/languages");

module.exports = async (interaction) => {
    if (!interaction.isMessageContextMenuCommand()) return;

    if (interaction.commandName === "Translate") {

        const menu = new StringSelectMenuBuilder()
            .setCustomId("translate_language")
            .setPlaceholder("Select a language")
            .addOptions(
                languages.map((language) => ({
                    label: language.label,
                    value: language.value,
                    emoji: language.emoji
                }))
            );

        const row = new ActionRowBuilder()
            .addComponents(menu);

        await interaction.reply({
            content: "🌍 Choose the translation language:",
            components: [row],
            ephemeral: true
        });
    }
};