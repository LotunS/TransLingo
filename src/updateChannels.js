require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    ChannelType,
    PermissionsBitField
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    await guild.channels.fetch();

    for (const [, channel] of guild.channels.cache) {
        if (
            channel.type !== ChannelType.GuildText &&
            channel.type !== ChannelType.GuildAnnouncement
        ) {
            continue;
        }

        try {
            await channel.permissionOverwrites.edit(
                guild.roles.everyone,
                {
                    UseApplicationCommands: true,
                }
            );

            console.log(`✔ Updated: ${channel.name}`);
        } catch (err) {
            console.error(`✖ Failed: ${channel.name}`);
            console.error(err.message);
        }
    }

    console.log("Done!");
    process.exit(0);
});

client.login(process.env.TOKEN);