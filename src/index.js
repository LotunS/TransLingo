require("dotenv").config();
const importSkills = require("./scripts/importSkills");

const { Client, GatewayIntentBits } = require("discord.js");
const interactionCreate = require("./events/interactionCreate");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("clientReady", async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);

    try {
        await importSkills(client);
        console.log("Import finished.");
    } catch (error) {
        console.error("Import failed:", error);
    }
});

const translationCache = require("./utils/translationCache");

setInterval(() => {
    translationCache.clearExpired();
}, 1000 * 60 * 10); // every 10 minutes

client.on("interactionCreate", interactionCreate);

client.login(process.env.TOKEN);