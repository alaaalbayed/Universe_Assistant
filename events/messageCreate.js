const client = require('../index.js');
client.on('messageCreate', async message => {
    const prefix  = process.env.PREFIX;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        try {
            if(!prefix) prefix = "!!";
            command.run(client, message, args, prefix);
        } catch (e) {
            function id(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return result;
            }

            const i = id(12);

            console.error(`[ERROR] Error ID: ${i}\n ` + e);

            await message.reply(`Something went wrong while executing the command! Here is the error ID that you can report it to the developers: \`${i}\`}`)
        }
    }
})