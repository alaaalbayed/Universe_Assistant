const client = require("../index.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./mainDB.sqlite');
const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder, Events } = require('discord.js');

const cityNames = [
  'الرياض', 'جده', 'المدينه المنوره', 'تبوك', 'الدمام', 'الاحساء', 'القطيف', 'خميس مشيط', 'المظيلف', 'الهفوف',
  'المبرز', 'الطائف', 'نجران', 'حفر الباطن', 'الجبيل', 'ضباء', 'الخرج', 'الثقبة', 'ينبع البحر', 'الخبر',
  'عرعر', 'الحوية', 'عنيزه', 'اخرى'
];

const genders = ['ذكر', 'انثى'];

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === 'citySelect') {
    const selectedCityIndex = interaction.values[0];
    const selectedCity = cityNames[selectedCityIndex];


    if (selectedCity === 'اخرى') {
      const modal = new ModalBuilder()
        .setCustomId('myModal')
        .setTitle('يرجى كتابة اسم المدينة');

      const cityInput = new TextInputBuilder()
        .setCustomId('cityInput')
        .setLabel("ما هي المدينة ؟")
        .setStyle(TextInputStyle.Short);

      const row = new ActionRowBuilder().addComponents(cityInput);
      modal.addComponents(row);
      await interaction.showModal(modal);
    }
    else{
      await updateUserField(interaction.user.id, 'city', selectedCity);

      await interaction.reply({
        content: `لقد تم اختيار المدينة التالية، شكراً لك! (**${selectedCity}**)`,
        ephemeral: true,
      });
    }
  }

  if (interaction.customId === 'genderSelect') {
    const selectedGenderIndex = interaction.values[0];
    const selectedGender = genders[selectedGenderIndex];
    await updateUserField(interaction.user.id, 'gender', selectedGender);

    await interaction.reply({
      content: `لقد تم اختيار الجنس التالي، شكراً لك! (**${selectedGender}**)`,
      ephemeral: true,
    });
  }
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'myModal') {
    const cityName = interaction.fields.getTextInputValue('cityInput');
    await updateUserField(interaction.user.id, 'city', cityName);
    await interaction.reply({content:`تم تقديم النموذج بنجاح **${cityName}**`, ephemeral:true});
	}
});

async function updateUserField(discordId, field, value) {
  const user = await sql.prepare('SELECT * FROM users WHERE discordId = ?').get(discordId);

  if (!user) {
    await sql.prepare('INSERT INTO users (discordId, city, gender) VALUES (?, ?, ?)').run(discordId, '', '');
  }
  await sql.prepare(`UPDATE users SET ${field} = ? WHERE discordId = ?`).run(value, discordId);
}


