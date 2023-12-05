const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require("fs")

const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});


client.commands = new Collection();
client.aliases = new Collection();
// Exporting the modules:
module.exports = client;

// Handler:
["commands", "events"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

// Anticrash handler:
process.on("unhandledRejection", (err) => {
  console.log(`[ERROR] Unhandled promise rejection: ${err.message}.`);
  console.log(err);
});

// Login to the bot:
const AUTH = process.env.TOKEN || config.client.TOKEN;
if (!AUTH) {
  console
    .warn("[WARN] You need to provide a Bot token!")
    .then(async () => process.exit(1));
} else {
  client
    .login(AUTH)
    .catch(() =>
      console.log(
        "[WARN] It seems like the token is invalid, please recheck it. If the this error stills showing, then enable the 3 Gateaway Intents."
      )
    );
}
