const translate = require("translate-google");

module.exports = async (text, targetLanguage) => {
    try {
        const translated = await translate(text, {
            to: targetLanguage
        });

        return translated;
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
};