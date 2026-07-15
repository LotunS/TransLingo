require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const interactionCreate = require("./events/interactionCreate");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("clientReady", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", interactionCreate);

client.login(process.env.TOKEN);