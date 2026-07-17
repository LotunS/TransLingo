const translate = require("../../services/translator");
const cache = require("../../utils/translationCache");
const crypto = require("crypto");

module.exports = async (interaction) => {
    try {

        await interaction.deferUpdate();

        const [, messageId] = interaction.customId.split(":");
        const targetLanguage = interaction.values[0];

        console.log("Message ID:", messageId);
        console.log("Target language:", targetLanguage);

        console.log("Channel:", interaction.channel?.id);

        const message = await interaction.channel.messages.fetch(messageId);

        console.log("Fetched message:", message.content);

        const cacheKey = crypto
            .createHash("sha256")
            .update(`${message.content}:${targetLanguage}`)
            .digest("hex");

        let translated = cache.get(cacheKey);

        if (translated) {
            console.log("✅ Cache hit");
        } else {
            console.log("❌ Cache miss");

            console.time("Google Translation");

            translated = await translate(
                message.content,
                targetLanguage
            );

            console.timeEnd("Google Translation");

            cache.set(cacheKey, translated);
        }

        await interaction.editReply({
            content: `Translated:\n${translated}`,
            components: []
        });

    } catch (error) {
        console.error(error);

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({
                content: "An error occurred.",
                components: []
            });
        } else {
            await interaction.reply({
                content: "An error occurred.",
                ephemeral: true
            });
        }
    }
};