const { createLogger, transports, format } = require('winston');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

const client = require("../index.js");

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
        .setCustomId("prev")
        .setLabel("<")
        .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
        .setCustomId("first")
        .setLabel("First")
        .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
        .setCustomId("next")
        .setLabel(">")
        .setStyle(ButtonStyle.Primary)
);

client.on("interactionCreate", async (interaction) => {
    if (
        interaction.customId === "prev" ||
        interaction.customId === "first" ||
        interaction.customId === "next"
    ) {
        interaction.deferUpdate();

        if (interaction.customId === "prev") {
            if (currentImageIndex > 0) {
                currentImageIndex--;
            }
        } else if (interaction.customId === "first") {
            currentImageIndex = 0;
        } else if (interaction.customId === "next") {
            if (currentImageIndex < imageUrls.length - 1) {
                currentImageIndex++;
            }
        }

        const embed = {
            color: 0x0099ff,
            title: "طريقة الإبلاغ عن السب و الشتم داخل اللعبة",
            description: `    
             هذه هي الطريقة للإبلاغ عن المخالفين لكي يتم عقابهم بالعقوبة المناسبة , يرجى العلم بأن هذه البلاغات تتم بداخل اللعبة فقط و ليس لنا علاقة بهم نهائياً !!`,
            image: { url: imageUrls[currentImageIndex] },
        };

        await messageReference.edit({ embeds: [embed] })

    } else {
        if (!interaction.isButton()) return;

        if (interaction.customId === '8️⃣' || interaction.customId === 'report') {
            // Set the currentImageIndex to 0
            currentImageIndex = 0;

            // Create the initial embed
            const embed = {
                color: 0x0099ff,
                title: 'طريقة الإبلاغ عن السب و الشتم داخل اللعبة',
                description: `هذه هي الطريقة للإبلاغ عن المخالفين لكي يتم عقابهم بالعقوبة المناسبة. يرجى العلم بأن هذه البلاغات تتم بداخل اللعبة فقط و ليس لنا علاقة بهم نهائياً !!`,
                image: { url: imageUrls[currentImageIndex] },
            };

            const reply = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
            messageReference = reply;

        }

        const responses = {
            "1️⃣": {
                description: `
      هو سيرفر خاص للاعبين مواجهة الأبطال العرب والهدف من هذا السيرفر هو توفير بيئة آمنة بالنسبة لك لإجراء المحادثات مع باقي الأعضاء ومشاركة آراءك حول اللعبة والتبليغ عن المشاكل التقنية في اللعبة بالإضافة إلى الحصول على الدعم من مجتمع اللعبة وأن تكون دوماً على اطلاع باخر التحديثات التي تخص اللعبة والمزيد.
      
      لنبذل جهدنا لخلق مجتمع أفضل يقوم على أساس إحترام الآخريين وتقديم الأفضل للجميع في الوطن العربي. قم بالحرص على إتباع القوانين المنصوص عليها #⛔・rules للاستمتاع معنا!
      
      وقم بمراجعة #🤗・introduction للحصول على معلومات إضافية وباقي القنوات الموجودة بالسيرفر.`,
            },
            "2️⃣": {
                description: `
          أهلاً وسهلاً بك عزيزي اللاعب في السيرفر العربي الرسمي الخاص بمواجهة الأبطال - MLBB.
          
          لفرصة المشاركة في الأحداث والفعاليات والحصول على الجوائز، يجب عليك إكمال التحقق من الهوية. يمكنك تعبئة طلب التحقق من خلال الرابط التالي:
          https://forms.gle/iB4bCPvFNru9UHU27
          
          يتم إكمال الطلب خلال 48 ساعة، لذا يرجى الانتظار. يمكنك فتح تذكرة في حال تجاوز الوقت المذكور فقط!
          
          يرجى العلم أنه يجب تقديم البيانات بشكل صحيح لكي يتم إكمال التحقق بنجاح. في حال كانت لديك أي مشكلة، يرجى التوجه ل #😎・help-center.`,
                image:
                    "https://cdn.discordapp.com/attachments/1003614797738283011/1037406082122920056/d3d58a49e77f6396.png",
            },

            "3️⃣": {
                description: `
          يتم تقديم العديد من المكافآت المختلفة في سيرفر مواجهة الأبطال العربي. يمكنك مراجعتها من خلال قسم المكافآت الموجود في #🎈・rewards-system.
          
          تذكر أنه يتم تحديث المكافآت بانتظام، عادةً كل شهر تقريبًا. لذا، حافظ على متابعتها بانتظام لضمان عدم فوت أي مكافأة قيمة. <:PepeRose:1000019064950890497>
      
                  `,
            },
            "4️⃣": {
                description: `
          جوائز منصة الديسكورد يتم إرسالها شهريًا. يتم إرسال هذه الجوائز في الجمعة الأخيرة من كل شهر.
          
          تذكر دائمًا متابعة الإعلانات والتحديثات على السيرفر للتأكد من عدم تفويت أي جوائز قيمة أو أحداث خاصة. لا تتردد في الاستفسار عن أي تفاصيل إضافية في #😎・help-center.
                  `,
            },
            "5️⃣": {
                description: `
          إذا كنت صانع محتوى وترغب في الحصول على الدعم، يمكنك الانضمام إلى أحد البرامج الرسمية التالية:
      
          للمزيد من التفاصيل حول هذه البرامج وكيفية التقديم، يرجى زيارة #📕・official-programs وتقديم الطلب الذي يناسب نشاطك.
                  `,
            },
            "6️⃣": {
                description: `
          يتم اختيار السيرفر الذي سيتم استخدامه في البطولة الأسبوعية اعتمادًا على عدد الفرق المشاركة. في الغالب، يتم اختيار السيرفر الذي يحتوي على النسبة الأكبر من الفرق المسجلة للمشاركة.
          
          للحصول على مزيد من المعلومات حول البطولات وكيفية المشاركة، يمكنك زيارة قسم البطولات الخاص بنا في #🏆・tournaments ومتابعة التحديثات الدورية.
                  `,
            },
            "7️⃣": {
                description: `
          جوائز السيرفر تُحتسب وتُمنح كل يوم إثنين قبل الجمعة الأخيرة من كل شهر. يجب أن تكون قد تحققت من الهدف الخاص بك قبل هذا الموعد لضمان الحصول على جوائزك.
          
          تأكد من الاطلاع على تحديثات الجوائز والقوانين في #🎈・rewards-system للتأكد من أنك على دراية بمتطلبات الحصول على الجوائز والوقت المحدد لذلك.
                  `,
            },
        };

        const emoji = interaction.customId;
        const reply = responses[emoji];

        if (reply) {
            const embed = {
                color: 0x0099ff,
                description: reply.description,
            };

            if (reply.image) {
                embed.image = { url: reply.image };
            }

            embed.description = embed.description.replace(
                /#⛔・rules/g,
                "<#992437579939053570>"
            );
            embed.description = embed.description.replace(
                /#😎・help-center/g,
                "<#1001492505939947520>"
            );
            embed.description = embed.description.replace(
                /#🎈・rewards-system/g,
                "<#1009210027325784114>"
            );
            embed.description = embed.description.replace(
                /#📕・official-programs/g,
                "<#1000751488580210708>"
            );
            embed.description = embed.description.replace(
                /#🏆・tournaments/g,
                "<#1037066255892484227>"
            );
            embed.description = embed.description.replace(
                /#🤗・introduction/g,
                "<#993550031967760404>"
            );

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
});