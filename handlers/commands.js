const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Commands Handler");
table.setHeading('N°', 'COMMANDS:', 'STATUS:');
var colors = require('colors');

module.exports = (client) => {
	readdirSync('./commands/').forEach(dir => {
		const commands = readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
		for (let file of commands) {
			let pull = require(`../commands/${file}`);
			if (pull.name) {
				client.commands.set(pull.name, pull);
				table.addRow(client.commands.size, file, '🟩')
			} else {
				table.addRow(client.commands.size, file, '🟥')
				continue;
			} if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
		}
	});
//	console.log(table.toString());
	console.log(`[HANDLER] Successfully loaded ${client.commands.size} commands!`.green.bold);
};