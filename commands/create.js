const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "create",
    aliases: ["c"],
    category: "Admin",
    description: "Add or increase XP to a specified user",
    cooldown: 3,
    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return;
        }

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("1️⃣")
                    .setEmoji({ id: "1018864164032225340", name: "Numbericons1" })
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("2️⃣")
                    .setEmoji({ id: "1018864168041971712", name: "Numbericons2" })
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("3️⃣")
                    .setEmoji({ id: "1018864171783303208", name: "Numbericons3" })
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("4️⃣")
                    .setEmoji({ id: "1018864175155519538", name: "Numbericons4" })
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("5️⃣")
                    .setEmoji({ id: "1018864178632605786", name: "Numbericons5" })
                    .setStyle(ButtonStyle.Primary)
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("6️⃣")
                    .setEmoji({ id: "1018864182558466058", name: "Numbericons6" })
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("7️⃣")
                    .setEmoji({ id: "1018864186727604354", name: "Numbericons7" })
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("8️⃣")
                    .setEmoji({ id: "1151421805995761666", name: ":NI8:" })
                    .setStyle(ButtonStyle.Primary)
            );

        const messageEmbed = {
            color: 0x0099ff,
            title: "الاسئلة الأكثر تكراراً",
            description: `
                  \u200B
                  <:NI1:1151421590429507635> ما هو سيرفر عالم مواجهة الأبطال؟
  
                  <:NI2:1151421643143520338> كيف يمكنني إكمال التحقق؟
  
                  <:NI3:1151421665226534912> ما هي المكافآت الموجودة بالسيرفر؟
  
                  <:NI4:1151421683895377940> متى يتم إرسال الجوائز/مكافآت؟
  
                  <:NI5:1151421699267514469> أنا صانع محتوى! كيف يمكني الحصول على 
                  الدعم؟
  
                  <:NI6:1151421740031934494> ما هو السيرفر المُختار للبطولة الأسبوعية؟
  
                  <:NI7:1151421758356848702> متى يتم إحتساب الجوائز؟
  
                  <:NI8:1151421805995761666> طريقة الإبلاغ عن السب و الشتم داخل اللعبة
  
                  \u200B
              `,
        };

        await message.channel.send({
            embeds: [messageEmbed],
            components: [row1, row2],
        });
    }
}
