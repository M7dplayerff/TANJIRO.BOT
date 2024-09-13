import fs from 'fs';

// إعداد التوقيت والنقاط
const timeout = 60000;
const poin = 1500;

// الدالة الرئيسية
const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "❓",key: m.key,}
  })
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;

  if (id in conn.tekateki) {
    conn.reply(m.chat, '*⦧🕹️⦨ مــا زال هـنـاك لـعـبـة جــاريــة*\n\n- *لـلـانـسـحـاب↜.انسحب*', conn.tekateki[id][0]);
    throw false;
  }

  // تعريف الصور والشخصيات
  const tekateki = [
    { image: './src/صور_احزر/luffy.jpg', response: 'لوفي' },
    { image: './src/صور_احزر/tanjiro.jpg', response: 'تانجيرو' },
    { image: './src/صور_احزر/sakuna.jpg', response: 'سوكونا' },
    { image: './src/صور_احزر/goku.jpg', response: 'غوكو' },
    { image: './src/صور_احزر/gojo.jpg', response: 'غوجو' },
    { image: './src/صور_احزر/Ghetto.jpg', response: 'غيتو' },
    { image: './src/صور_احزر/Itadori.jpg', response: 'ايتادوري' },
    { image: './src/صور_احزر/Utah.jpg', response: 'يوتا' },
    { image: './src/صور_احزر/naruto.jpg', response: 'ناروتو' },
    { image: './src/صور_احزر/madara.jpg', response: 'مادارا' },
    { image: './src/صور_احزر/Itachi.jpg', response: 'ايتاشي' },
    { image: './src/صور_احزر/Hinata.jpg', response: 'هيناتا' },
    { image: './src/صور_احزر/yami.jpg', response: 'يامي' },
    { image: './src/صور_احزر/aizen.jpg', response: 'ايزن' },
    { image: './src/صور_احزر/Ichigo.jpg', response: 'ايتشيغو' },
    { image: './src/صور_احزر/Yuhabakha.jpg', response: 'يوها باخ' },
    { image: './src/صور_احزر/Rengoku.jpg', response: 'رينغوكو' },
    { image: './src/صور_احزر/Inosuke.jpg', response: 'اينوسكي' },
    { image: './src/صور_احزر/Zenitsu.jpg', response: 'زينيتسو' },
    { image: './src/صور_احزر/mozan.jpg', response: 'موزان' },
    { image: './src/صور_احزر/Laito.jpg', response: 'لايت' },
    { image: './src/صور_احزر/Kaneki.jpg', response: 'كانيكي' },
    { image: './src/صور_احزر/Midoriya.jpg', response: 'ميدوريا' },
    { image: './src/صور_احزر/Tedoroki.jpg', response: 'تودوروكي' },
    { image: './src/صور_احزر/Bakugo.jpg', response: 'باغوكو' },
    { image: './src/صور_احزر/Whitebeard.jpg', response: 'الحية البيضاء' },
{ image: './src/صور_احزر/اوبيناي.jpg', response: 'اوبيناي' },
    { image: './src/صور_احزر/اكازا.jpg', response: 'اكازا' },
    { image: './src/صور_احزر/كوكوشيبو.jpg', response: 'كوكوشيبو' },
    { image: './src/صور_احزر/يوريتشي.jpg', response: 'يوريتشي' },
    { image: './src/صور_احزر/زينتسو.jpg', response: 'زينتسو' },
    { image: './src/صور_احزر/تنغن.jpg', response: 'تنغن' },
    { image: './src/صور_احزر/فيجيتا.jpg', response: 'فيجيتا' },
    { image: './src/صور_احزر/نانامي.jpg', response: 'نانامي' },
    { image: './src/صور_احزر/نوبورا.jpg', response: 'نوبورا' },
    { image: './src/صور_احزر/رينغوكو.jpg', response: 'رينغوكو' },
    { image: './src/صور_احزر/توغي.jpg', response: 'توغي' },
    { image: './src/صور_احزر/زاراكي.jpg', response: 'زاراكي' },
    { image: './src/صور_احزر/ياماماتو.jpg', response: 'ياماماتو' },
    { image: './src/صور_احزر/ليفاي.jpg', response: 'ليفاي' },
    { image: './src/صور_احزر/ساكورا.jpg', response: 'ساكورا' },
    { image: './src/صور_احزر/دينجي.jpg', response: 'دينجي' },
    { image: './src/صور_احزر/ايرين.jpg', response: 'ايرين' },
    { image: './src/صور_احزر/دابي.jpg', response: 'دابي' },
    { image: './src/صور_احزر/ساسكي.jpg', response: 'ساسكي' },
    { image: './src/صور_احزر/ماكي.jpg', response: 'ماكي' },
    { image: './src/صور_احزر/الريك.jpg', response: 'الريك' },
    { image: './src/صور_احزر/جارا.jpg', response: 'جارا' },
    { image: './src/صور_احزر/ميكاسا.jpg', response: 'ميكاسا' },
    { image: './src/صور_احزر/رينجي.jpg', response: 'رينجي' },
    { image: './src/صور_احزر/الوكارد.jpg', response: 'الوكارد' },
    { image: './src/صور_احزر/كويومي.jpg', response: 'كويومي' },
    { image: './src/صور_احزر/جين.jpg', response: 'جين' },
    { image: './src/صور_احزر/يوه.jpg', response: 'يوه' },
    { image: './src/صور_احزر/اسكيلاد.jpg', response: 'اسكيلاد' },
    { image: './src/صور_احزر/استا.jpg', response: 'استا' },
    { image: './src/صور_احزر/بلاك.jpg', response: 'بلاك' },
    { image: './src/صور_احزر/شين.jpg', response: 'شين' },
    { image: './src/صور_احزر/محمد.jpg', response: 'محمد' },
    { image: './src/صور_احزر/ازنابيل.jpg', response: 'ازنابيل' },
    { image: './src/صور_احزر/جوغو.jpg', response: 'جوغو' },
    { image: './src/صور_احزر/باردوك.jpg', response: 'باردوك' },
    { image: './src/صور_احزر/بيروس.jpg', response: 'بيروس' },
    { image: './src/صور_احزر/ديو.jpg', response: 'ديو' },
    { image: './src/صور_احزر/برولي.jpg', response: 'برولي' },
    { image: './src/صور_احزر/كانوت.jpg', response: 'كانوت' },
    { image: './src/صور_احزر/كروس.jpg', response: 'كروس' },
    { image: './src/صور_احزر/اوسامو.jpg', response: 'اوسامو' },
    { image: './src/صور_احزر/ادوارد.jpg', response: 'ادوارد' },
    { image: './src/صور_احزر/اندرويد18.jpg', response: 'اندرويد18' },
    { image: './src/صور_احزر/تسويو.jpg', response: 'تسويو' },
    { image: './src/صور_احزر/مينا.jpg', response: 'مينا' },
    { image: './src/صور_احزر/بولما.jpg', response: 'بولما' },
    { image: './src/صور_احزر/سي سي.jpg', response: 'سي سي' },
    { image: './src/صور_احزر/مومو.jpg', response: 'مومو' },
    { image: './src/صور_احزر/نانا.jpg', response: 'نانا' },
    { image: './src/صور_احزر/جونكو.jpg', response: 'جونكو' },
    { image: './src/صور_احزر/انيا.jpg', response: 'انيا' },
    { image: './src/صور_احزر/يور.jpg', response: 'يور' },
    { image: './src/صور_احزر/يونو.jpg', response: 'يونو' },
    { image: './src/صور_احزر/تورو.jpg', response: 'تورو' },
    { image: './src/صور_احزر/ساكورا.jpg', response: 'ساكورا' },
    { image: './src/صور_احزر/هيناتا.jpg', response: 'هيناتا' },
    { image: './src/صور_احزر/اوريهيمي.jpg', response: 'اوريهيمي' }
  ];

  // اختار صورة جديدة غير الصورة الأخيرة
  const getNewImage = (lastImage) => {
    const availableImages = tekateki.filter(item => item.image !== lastImage);
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  const lastImage = conn.tekateki[id] ? conn.tekateki[id][1].image : null;
  const json = getNewImage(lastImage);
  
  const caption = `
ⷮ ╔═════════════════════ *⌠احزر⌡* ═════════════════════╗
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

handler.help = ['احزر'];
handler.tags = ['ga'];
handler.command = /^احزر$/i;

export default handler;