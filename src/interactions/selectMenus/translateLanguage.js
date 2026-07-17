const translate = require("../../services/translator");

module.exports = async (interaction) => {
    try {
        const [, messageId] = interaction.customId.split(":");
        const targetLanguage = interaction.values[0];

        console.log("Message ID:", messageId);
        console.log("Target language:", targetLanguage);

        console.log("Channel:", interaction.channel?.id);

        const message = await interaction.channel.messages.fetch(messageId);

        console.log("Fetched message:", message.content);

        const translated = await translate(
            message.content,
            targetLanguage
        );

        await interaction.update({
            content:
                `Translated:
${translated}`,
            components: []
        });

    } catch (error) {
        console.error(error);

        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: "An error occurred.",
                ephemeral: true
            });
        }
    }
};