import fs from 'fs';

// إعداد التوقيت والنقاط
const timeout = 60000;
const poin = 1500;

// الدالة الرئيسية
const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "🇦🇶",key: m.key,}
  })
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  
  if (id in conn.tekateki) {
    conn.reply(m.chat, '*⦧🕹️⦨ مــا زال هـنـاك لـعـبـة جــاريــة*\n\n- *لـلـانـسـحـاب↜.انسحب*', conn.tekateki[id][0]);
    throw false;
  }
  
  // تعريف الصور والشخصيات
  const tekateki = [
    { image: './src/علم/Tunisia.jpg', response: 'تونس' },
    { image: './src/علم/Qatar.jpg', response: 'قطر' },
    { image: './src/علم/Saudi Arabia.jpg', response: 'السعودية' },
    { image: './src/علم/Lebanon.jpg', response: 'لبنان' },
    { image: './src/علم/The UAE.jpg', response: 'الإمارات' },
    { image: './src/علم/Egypt.jpg', response: 'مصر' },
    { image: './src/علم/Oman.jpg', response: 'عمان' },
    { image: './src/علم/Bahrain.jpg', response: 'البحرين' },
    { image: './src/علم/Syria.jpg', response: 'سوريا' },
    { image: './src/علم/Türkiye.jpg', response: 'تركيا' },
    { image: './src/علم/Sudan.jpg', response: 'السودان' },
    { image: './src/علم/Palestine.jpg', response: 'فلسطين' },
    { image: './src/علم/Yemen.jpg', response: 'اليمن' },
    { image: './src/علم/Morocco.jpg', response: 'المغرب' },
    { image: './src/علم/Canada.jpg', response: 'كندا' },
    { image: './src/علم/Brazil.jpg', response: 'البرازيل' },
    { image: './src/علم/India.jpg', response: 'الهند' },
    { image: './src/علم/UK.jpg', response: 'بريطانيا' },
    { image: './src/علم/Spain.jpg', response: 'إسبانيا' },
    { image: './src/علم/England.jpg', response: 'إنجلترا' },
    { image: './src/علم/Ecuador.jpg', response: 'إكوادور' },
    { image: './src/علم/Germany.jpg', response: 'ألمانيا' },
    { image: './src/علم/Sweden.jpg', response: 'السويد' },
    { image: './src/علم/News Landa.jpg', response: 'نيوز لاند' },
    { image: './src/علم/Croatia.jpg', response: 'كرواتيا' }
  ];

  // اختار صورة جديدة غير الصورة الأخيرة
  const getNewImage = (lastImage) => {
    const availableImages = tekateki.filter(item => item.image !== lastImage);
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  const lastImage = conn.tekateki[id] ? conn.tekateki[id][1].image : null;
  const json = getNewImage(lastImage);
  
  const caption = `
ⷮ ╔═════════════════════ *⌠علم⌡* ═════════════════════╗
║  *【⏰ الوقت: 60:00】*                                   ║
║  *【🏆 الجائزة: 1500 XP】*                              ║
╠────────────────────────────────╣
║  *➤ اكتب \`.انسحب\` للإجابة*                ║
║  *➤ اعمل ريبلاي وجاوب*                  ║
╚═════════════════════ ⌠🕷️⌡ ═════════════════════╝
                *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`.trim();
  
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

handler.help = ['علم'];
handler.tags = ['ga'];
handler.command = /^علم$/i;

export default handler;