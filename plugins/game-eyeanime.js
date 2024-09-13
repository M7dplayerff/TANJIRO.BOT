import fs from 'fs';

// إعداد التوقيت والنقاط
const timeout = 60000;
const poin = 3000;

// قائمة الصور والإجابات
const imagesAndResponses = [
  { image: './src/عين/باكوغو.jpg', response: 'باكوغو' },
  { image: './src/عين/ايتاتشي.jpg', response: 'ايتاتشي' },
  { image: './src/عين/نيزوكو.jpg', response: 'نيزوكو' },
  { image: './src/عين/اكازا.jpg', response: 'اكازا' },
  { image: './src/عين/رينغوكو.jpg', response: 'رينغوكو' },
  { image: './src/عين/ميدوريا.jpg', response: 'ميدوريا' },
  { image: './src/عين/ايرين.jpg', response: 'ايرين' },
  { image: './src/عين/اوبيتو.jpg', response: 'اوبيتو' },
  { image: './src/عين/بورتو.jpg', response: 'بورتو' },
  { image: './src/عين/ماهيتو.jpg', response: 'ماهيتو' },
  { image: './src/عين/غوجو.jpg', response: 'غوجو' },
  { image: './src/عين/سوكونا.jpg', response: 'سوكونا' },
  { image: './src/عين/موزان.jpg', response: 'موزان' },
  { image: './src/عين/تينغن.jpg', response: 'تينغن' },
  { image: './src/عين/فيجيتا.jpg', response: 'هيت' },
  { image: './src/عين/زورو.jpg', response: 'زورو' },
  { image: './src/عين/مادارا.jpg', response: 'مادارا' },
  { image: './src/عين/ايتشيغو.jpg', response: 'ايتشيغو' },
  { image: './src/عين/لوفي.jpg', response: 'لوفي' },
  { image: './src/عين/ايس.jpg', response: 'ايس' },
  { image: './src/عين/ساكورا.jpg', response: 'ساكورا' },
  { image: './src/عين/تانجيرو.jpg', response: 'تانجيرو' },
  { image: './src/عين/شينوبي.jpg', response: 'شينوبي' },
  { image: './src/عين/دوما.jpg', response: 'دوما' },
  { image: './src/عين/اوشو.jpg', response: 'اوشو' },
  { image: './src/عين/ماكياما.jpg', response: 'ماكياما' },
  { image: './src/عين/نيكولاس.jpg', response: 'نيكولاس' },
  { image: './src/عين/توكيساكي.jpg', response: 'توكيساكي' },
  { image: './src/عين/كاكاشي.jpg', response: 'كاكاشي' },
  { image: './src/عين/سارادا.jpg', response: 'سارادا' },
  { image: './src/عين/يوتا.jpg', response: 'يوتا' },
  { image: './src/عين/ايساغي.jpg', response: 'ايساغي' },
  { image: './src/عين/داكي.jpg', response: 'داكي' },
  { image: './src/عين/شيبو.jpg', response: 'شيبو' },
  { image: './src/عين/كانيكي.jpg', response: 'كانيكي' },
  { image: './src/عين/اماني.jpg', response: 'اماني' },
  { image: './src/عين/تسوكياما.jpg', response: 'تسوكياما' },
  { image: './src/عين/ايتوتشي.jpg', response: 'ايتوتشي' },
  { image: './src/عين/ميجيرو.jpg', response: 'ميجيرو' },
  { image: './src/عين/يومي.jpg', response: 'يومي' },
  { image: './src/عين/زينيتسو.jpg', response: 'زينيتسو' },
  { image: './src/عين/اينوسكي.jpg', response: 'اينوسكي' },
  { image: './src/عين/غون.jpg', response: 'غون' },
  { image: './src/عين/تدوروكي.jpg', response: 'تدوروكي' },
  { image: './src/عين/نوبورا.jpg', response: 'نوبورا' },
  { image: './src/عين/شانكس.jpg', response: 'شانكس' },
  { image: './src/عين/ياماتو.jpg', response: 'ياماتو' },
  { image: './src/عين/مايكي.jpg', response: 'مايكي' },
  { image: './src/عين/هانجي.jpg', response: 'هانجي' },
  { image: './src/عين/روبن.jpg', response: 'روبن' },
  { image: './src/عين/سانغي.jpg', response: 'سانغي' },
  { image: './src/عين/ماركو.jpg', response: 'ماركو' },
  { image: './src/عين/ناروتو.jpg', response: 'ناروتو' },
  { image: './src/عين/توغا.jpg', response: 'توغا' },
  { image: './src/عين/ميتسوري.jpg', response: 'ميتسوري' },
  { image: './src/عين/توغي.jpg', response: 'توغي' },
  { image: './src/عين/روبي.jpg', response: 'روبي' },
  { image: './src/عين/هيناتا.jpg', response: 'هيناتا' },
  { image: './src/عين/دابي.jpg', response: 'دابي' },
  { image: './src/عين/زيكي.jpg', response: 'زيكي' },
  { image: './src/عين/ليفاي.jpg', response: 'ليفاي' },
  { image: './src/عين/جين.jpg', response: 'جين' },
  { image: './src/عين/ال.jpg', response: 'ال' },
  { image: './src/عين/بورو.jpg', response: 'بورو' }
];

// الدالة الرئيسية
const handler = async (m, { conn, usedPrefix }) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  if (id in conn.tekateki) {
    conn.reply(m.chat, "*⦧🕹️⦨ مــا زال هـنـاك لـعـبـة جــاريــة*\n\n- *لـلـانـسـحـاب↜.انسحب*", conn.tekateki[id][0]);
    throw false;
  }

  // اختيار صورة جديدة عشوائية من القائمة
  await conn.sendMessage(m.chat, { react: { text: "👁️",key: m.key,}
  })
  const randomIndex = Math.floor(Math.random() * imagesAndResponses.length);
  const selectedImage = imagesAndResponses[randomIndex];

  const caption = `
ⷮ ╔═════════════════════ *⌠عين⌡* ═════════════════════╗
║  *【⏰ الوقت: 60:00】*                                   ║
║  *【🏆 الجائزة: 3000 XP】*                              ║
╠────────────────────────────────╣
║  *➤ اكتب \`.انسحب\` للإجابة*                ║
║  *➤ اعمل ريبلاي وجاوب*                  ║
╚═════════════════════ ⌠🕷️⌡ ═════════════════════╝
                *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
 
 
`.trim();
  
  if (fs.existsSync(selectedImage.image)) {
    conn.tekateki[id] = [
      await conn.sendMessage(m.chat, { image: fs.readFileSync(selectedImage.image), caption: caption }, { quoted: m }), 
      selectedImage, // إجابة الصورة الصحيحة
      poin,
      setTimeout(async () => {
        if (conn.tekateki[id]) await conn.reply(m.chat, `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ انــتــهــي الــوقــت*\n
- *الـاجـابـة كـــانــت↜${selectedImage.response}*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`, conn.tekateki[id][0]);
        delete conn.tekateki[id];
      }, timeout)
    ];
  } else {
    conn.reply(m.chat, 'الصورة المطلوبة غير موجودة.', m);
  }
};

handler.help = ['عين'];
handler.tags = ['ga'];
handler.command = /^عين$/i;

export default handler;