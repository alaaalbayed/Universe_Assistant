const { ActionRowBuilder, MessageButton, StringSelectMenuBuilder } = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./mainDB.sqlite');

const cityNames = [
  'الرياض', 'جده', 'المدينه المنوره', 'تبوك', 'الدمام', 'الاحساء', 'القطيف', 'خميس مشيط', 'المظيلف', 'الهفوف',
  'المبرز', 'الطائف', 'نجران', 'حفر الباطن', 'الجبيل', 'ضباء', 'الخرج', 'الثقبة', 'ينبع البحر', 'الخبر',
  'عرعر', 'الحوية', 'عنيزه', 'اخرى'
];

const gender = ['ذكر', 'انثى'];

module.exports = {
  name: 'city',
  aliases: ['cy'],
  category: 'Admin',
  description: 'Add or increase XP to a specified user',
  cooldown: 3,
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) {
      return;
    }
    const user = await getUser(message.author.id);

    const citySelectMenu = new StringSelectMenuBuilder()
      .setCustomId('citySelect')
      .setPlaceholder('المدينة')
      .addOptions(cityNames.map((city, index) => ({ label: city, value: index.toString() })));

    const genderSelectMenu = new StringSelectMenuBuilder()
      .setCustomId('genderSelect')
      .setPlaceholder('الجنس')
      .addOptions(gender.map((gender, index) => ({ label: gender, value: index.toString() })));

    const row = new ActionRowBuilder().addComponents(citySelectMenu);
    const row2 = new ActionRowBuilder().addComponents(genderSelectMenu);

    message.channel.send({
      content: 'يرجى اختيار المدينة والجنس الخاصين بك!',
      components: [row, row2],
    });

    async function getUser(discordId) {
      const user = await sql.prepare('SELECT * FROM users WHERE discordId = ?').get(discordId);
      if (!user) {
        await sql.prepare('INSERT OR REPLACE INTO users (discordId, city, gender) VALUES (?, ?, ?)').run(discordId, '', '');
      }
      return user;
    }
  }
}
