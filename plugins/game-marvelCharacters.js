import fs from 'fs';

// إعداد التوقيت والنقاط
const timeout = 60000;
const poin = 1500;

// الدالة الرئيسية
const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "🦸‍♂️",key: m.key,}
  })
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;

  if (id in conn.tekateki) {
    conn.reply(m.chat, '*⦧🕹️⦨ مــا زال هـنـاك لـعـبـة جــاريــة*\n\n- *لـلـانـسـحـاب↜.انسحب*', conn.tekateki[id][0]);
    throw false;
  }

  // تعريف الصور والشخصيات
  const tekateki = [
    { image: './src/شخصيات مارفل/captain america.jpg', response: 'كابتن أمريكا' },
    { image: './src/شخصيات مارفل/thor.jpg', response: 'ثور' },
    { image: './src/شخصيات مارفل/ironman.jpg', response: 'ايرون مان' },
    { image: './src/شخصيات مارفل/Doctor Strange.jpg', response: 'دوكتور سترينج' },
    { image: './src/شخصيات مارفل/captain marvel.jpg', response: 'كابتن مارفل' },
    { image: './src/شخصيات مارفل/Spiderman.jpg', response: 'سبايدر مان' },
    { image: './src/شخصيات مارفل/Thanos.jpg', response: 'ثانوس' },
    { image: './src/شخصيات مارفل/Moon Night.jpg', response: 'مون نايت' },
    { image: './src/شخصيات مارفل/Loki.jpg', response: 'لوكي' },
    { image: './src/شخصيات مارفل/Hulk.jpg', response: 'هالك' },
    { image: './src/شخصيات مارفل/Starfox.jpg', response: 'ستارفوكس' },
    { image: './src/شخصيات مارفل/Wilfrin.jpg', response: 'ويلفرين' },
    { image: './src/شخصيات مارفل/Ghost Rider.jpg', response: 'جوست رايدر' },
    { image: './src/شخصيات مارفل/Ant man.jpg', response: 'الرجل النمله' },
    { image: './src/شخصيات مارفل/Deadpool.jpg', response: 'ديدبول' },
    { image: './src/شخصيات مارفل/Black Widow.jpg', response: 'بلاك ويدو' },
    { image: './src/شخصيات مارفل/Nebula.jpg', response: 'نيبولا' },
    { image: './src/شخصيات مارفل/Drax.jpg', response: 'دراكس' },
    { image: './src/شخصيات مارفل/Starlord.jpg', response: 'ستار لورد' },
    { image: './src/شخصيات مارفل/groot.jpg', response: 'جروت' },
    { image: './src/شخصيات مارفل/gamora.jpg', response: 'جامورا' },
    { image: './src/شخصيات مارفل/rocket.jpg', response: 'روكيت' }
  ];

  // اختار صورة جديدة غير الصورة الأخيرة
  const getNewImage = (lastImage) => {
    const availableImages = tekateki.filter(item => item.image !== lastImage);
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  const lastImage = conn.tekateki[id] ? conn.tekateki[id][1].image : null;
  const json = getNewImage(lastImage);

  const caption = `
╔═════════════════════ *⌠شخصيات مارفل⌡* ═════════════════════╗
║  *【⏰ الوقت: 60:00】*                                   ║
║  *【🏆 الجائزة: 1500 XP】*                              ║
╠────────────────────────────────╣
║  *➤ اكتب \`.انسحب\` للإجابة*                ║
║  *➤ اعمل ريبلاي وجاوب*                  ║
╚═════════════════════ ⌠🕷️⌡ ═════════════════════╝
                *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
`.trim();

  if (json && fs.existsSync(json.image)) {
    conn.tekateki[id] = [
      await conn.sendMessage(m.chat, { image: fs.readFileSync(json.image), caption: caption }, { quoted: m }), 
      json,
      poin,
      setTimeout(async () => {
        if (conn.tekateki[id]) await conn.reply(m.chat, `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ انــتــهــي الــوقــت*\n
- *الـاجـابـة كـــانــت↜${json.response}*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`, conn.tekateki[id][0]);
        delete conn.tekateki[id];
      }, timeout)
    ];
  } else {
    conn.reply(m.chat, 'الصورة المطلوبة غير موجودة.', m);
  }
};

handler.help = ['شخصيات_مارفل'];
handler.tags = ['ga'];
handler.command = /^شخصيات_مارفل$/i;

export default handler;