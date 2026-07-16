require("dotenv").config();

const { REST, Routes, ApplicationCommandType } = require("discord.js");

const commands = [
    {
        name: "Translate",
        type: ApplicationCommandType.Message,
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering commands...");

        // DEBUG
        // console.log("CLIENT_ID:", process.env.CLIENT_ID);
        // console.log("GUILD_ID:", process.env.GUILD_ID);

        const result = await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("Registered:", result);

        console.log("Commands registered successfully.");
    } catch (error) {
        console.error(error);
    }

})();

