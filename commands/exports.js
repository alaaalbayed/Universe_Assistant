const ExcelJS = require('exceljs');
const SQLite = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new SQLite('./mainDB.sqlite');

module.exports = {
    name: "exports",
    aliases: ["ex"],
    category: "Admin",
    description: "Export the user table to an Excel file",
    cooldown: 3,
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.addRow(['DiscordID', 'City', 'Gender']);

        const users = db.prepare('SELECT * FROM users').all();

        users.forEach(user => {
            worksheet.addRow([user.discordID, user.city, user.gender]);
        });

        const currentDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const fileName = `user_data_${currentDate}.xlsx`;
        const filePath = path.join(__dirname, fileName);

        await workbook.xlsx.writeFile(filePath);

        const fileBuffer = fs.readFileSync(filePath);

        message.reply({
            content: 'Here is the user data file:',
            files: [{
                attachment: fileBuffer,
                name: fileName,
            }],
        });

        fs.unlinkSync(filePath);
    }
}
