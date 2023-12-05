const client = require("../index.js");
const SQLite = require("better-sqlite3")
const sql = new SQLite('./mainDB.sqlite')
const ms = require("ms");

client.once('ready', async () => {
  console.log(`[CLIENT] ${client.user.tag} is up and ready`.blue.bgWhite.bold);

  const up = ms(ms(Math.round(process.uptime() - (client.uptime / 1000)) + ' seconds'));

  console.log(`[NODEJS] Your IDE took ${up} to load and connect to the bot.`.white.dim);

  const users = sql
    .prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';").get();
  if (!users["count(*)"]) {
    sql.prepare("CREATE TABLE users (discordID TEXT PRIMARY KEY, city TEXT, gender TEXT);").run();
  }
});