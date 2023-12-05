const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require(`../index.js`)
const imageUrls = [
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260597460508774/1.png?ex=653403e3&is=65218ee3&hm=10eaebbb1d73d535f52a41e18f9900184828864490b60f52fb7671ef97b1b60f&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260597858975774/2.png?ex=653403e3&is=65218ee3&hm=82a89e87bee7a1f10a8e5274e1b3c84212861bbe1d80be19d4bbf625587f2854&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260598219673731/3.png?ex=653403e3&is=65218ee3&hm=d4f2f07f966cad676411099f0232e6aa5d164acbdb2ad2821ff6d91e70329fa5&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260598601359530/4.png?ex=653403e3&is=65218ee3&hm=2b926d229f48c9bbf51c9e07d1027e66b8e97744b0ba9b5bea86ad1c1ff26720&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260598945300530/5.png?ex=653403e3&is=65218ee3&hm=3e1f3ae33c228ce7b5a4ebaeb82a54216095fa6e3781c309cc54f752a8e9444b&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260599276646501/6.png?ex=653403e3&is=65218ee3&hm=a70e5ed9dde71ebc37f8bd22346eaf03a9c3ee1a4470e75fdeb11006911ac719&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260599633166437/7.png?ex=653403e3&is=65218ee3&hm=c7a3b41c14bd14f7e9778aeb686f5d2e1eca8ab20511fb6bbb2295d626eb7ea1&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260599956115617/8.png?ex=653403e3&is=65218ee3&hm=25633dbed8ce4338ea64e2339f44a6a3f16bf3309361af77fbcad524f5ce92d6&",
    "https://cdn.discordapp.com/attachments/1010162960120946718/1160260600388132994/9.png?ex=653403e3&is=65218ee3&hm=526546a6994c8b1dda5a168a405712bc25ac6975435d79fcd7ebd5b12832b809&",
];

const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('prev')
      .setLabel('<')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('first')
      .setLabel('First')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('next')
      .setLabel('>')
      .setStyle(ButtonStyle.Primary)
  );
  
  module.exports = {
    name: 'report',
    aliases: ['rep'],
    category: 'Admin',
    description: 'Report command',
    cooldown: 3,
    run: async (client, message, args) => {
      if (!message.member.roles.cache.has('999694931746631721')) {
        return;
      }
  
      currentImageIndex = 0;
  
      const embed = {
        color: 0x0099ff,
        title: 'طريقة الإبلاغ عن السب و الشتم داخل اللعبة',
        description: `هذه هي الطريقة للإبلاغ عن المخالفين لكي يتم عقابهم بالعقوبة المناسبة. يرجى العلم بأن هذه البلاغات تتم بداخل اللعبة فقط و ليس لنا علاقة بهم نهائياً !!`,
        image: { url: imageUrls[currentImageIndex] },
      };
  
      const reply = await message.channel.send({
        embeds: [embed],
        components: [row],
      });
  
      messageReference = reply;
    },
  };
