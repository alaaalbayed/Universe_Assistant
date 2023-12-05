const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Events Handler:");
table.setHeading('EVENTS:', 'STATUS:');

module.exports = (client) => {
    readdirSync('./events/').forEach(dir => {
        const events = readdirSync(`./events/`).filter(file => file.endsWith('.js'));
        for(let file of events) {
            let pull = require(`../events/${file}`);
            if(pull.name) {
                client.events.set(pull.name, pull);
            } else {
                table.addRow(file, '🟩');
                continue;
            }
        }
    });
    console.log(table.toString());
	console.log(`[HANDLER] Successfully loaded`);
}