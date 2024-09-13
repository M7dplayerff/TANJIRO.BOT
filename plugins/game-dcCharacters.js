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
    { image: './src/شخصيات ديسي/Batman.jpg', response: 'باتمان' },
    { image: './src/شخصيات ديسي/Superman.jpg', response: 'سوبرمان' },
    { image: './src/شخصيات ديسي/flash.jpg', response: 'فلاش' },
    { image: './src/شخصيات ديسي/drfate.jpg', response: 'دوكتور فيت' },
    { image: './src/شخصيات ديسي/Shazam.jpg', response: 'شازام' },
    { image: './src/شخصيات ديسي/Harley Queen.jpg', response: 'هارلي كوين' },
    { image: './src/شخصيات ديسي/wonder woman.jpg', response: 'واندر وامان' },
    { image: './src/شخصيات ديسي/joker.jpg', response: 'الجوكر' },
    { image: './src/شخصيات ديسي/cyborg.jpg', response: 'سايبورغ' },
    { image: './src/شخصيات ديسي/black adam.jpg', response: 'بلاك ادم' },
    { image: './src/شخصيات ديسي/robin.jpg', response: 'روبن' },
    { image: './src/شخصيات ديسي/deadshot.jpg', response: 'ديد شوت' },
    { image: './src/شخصيات ديسي/aquaman.jpg', response: 'اكوا مان' }
  ];

  // اختار صورة جديدة غير الصورة الأخيرة
  const getNewImage = (lastImage) => {
    const availableImages = tekateki.filter(item => item.image !== lastImage);
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  const lastImage = conn.tekateki[id] ? conn.tekateki[id][1].image : null;
  const json = getNewImage(lastImage);
  
  const caption = `
ⷮ ╔═════════════════════ *⌠شخصيات ديسي⌡* ═════════════════════╗
║  *【⏰ الوقت: 60:00】*                                   ║
║  *【🏆 الجائزة: 1500 XP】*                              ║
╠────────────────────────────────╣
║  *➤ اكتب \`.انسحب\` للإجابة*                ║
║  *➤ اعمل ريبلاي وجاوب*                  ║
╚═════════════════════ ⌠🕷️⌡ ═════════════════════╝
                *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
`.trim();
  
  if (fs.existsSync(json.image)) {
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

handler.help = ['شخصيات_ديسي'];
handler.tags = ['ga'];
handler.command = /^شخصيات_ديسي$/i;

export default handler;