import fs from 'fs';

// إعداد التوقيت والنقاط
const timeout = 30000;
const poin = 1000;

// الأسئلة والأجوبة
const questions = [
  { question: 'تفكيك', response: 'ت ف ك ي ك' },
  { question: 'ايتشيغو', response: 'ا ي ت ش ي غ و' },
  { question: 'وان بيس', response: 'و ا ن ب ي س' },
  { question: 'ياماماتو', response: 'ي ا م ا م ا ت و' },
  { question: 'غوكو', response: 'غ و ك و' },
  { question: 'نوبورا', response: 'ن و ب و ر ا' },
  { question: 'تانجيرو', response: 'ت ا ن ج ي ر و' },
  { question: 'غون', response: 'غ و ن' },
  { question: 'كيلوا', response: 'ك ي ل و ا' },
  { question: 'سيرا', response: 'س ي ر ا' },
  { question: 'شيرا', response: 'ش ي ر ا' },
  { question: 'رينغوكو', response: 'ر ي ن غ و ك و' },
  { question: 'يوتا', response: 'ي و ت ا' },
  { question: 'ميدوريا', response: 'م ي د و ر ي ا' },
  { question: 'فلوريتا', response: 'ف ل و ر ي ت ا' },
  { question: 'جوغو', response: 'ج و غ و' },
  { question: 'بانكاي', response: 'ب ا ن ك ا ي' },
  { question: 'هاكونامي كاجورا', response: 'ه ا ك و ن ا م ي ك ا ج و ر ا' },
  { question: 'ياري ياري', response: 'ي ا ر ي ي ا ر ي' },
  { question: 'جامبري جامبري', response: 'ج ا م ب ر ي ج ا م ب ر ي' },
  { question: 'ساسكي', response: 'س ا س ك ي' },
  { question: 'ايتاتشي', response: 'ا ي ت ا ت ش ي' },
  { question: 'كانيكي', response: 'ك ا ن ي ك ي' },
  { question: 'سالمون', response: 'س ا ل م و ن' },
  { question: 'السلام عليكم', response: 'ا ل س ل ا م ع ل ي ك م' },
  { question: 'اهل الخير', response: 'ا ه ل ا ل خ ي ر' },
  { question: 'المغرب', response: 'ا ل م غ ر ب' },
  { question: 'تونس', response: 'ت و ن س' },
  { question: 'مصر', response: 'م ص ر' },
  { question: 'الشاطئ', response: 'ا ل ش ا ط ئ' },
  { question: 'الفردوس الاعلي', response: 'ا ل ف ر د و س ا ل ا ع ل ي' },
  { question: 'ادولف هتلر', response: 'ا د و ل ف ه ت ل ر' },
  { question: 'دينجي', response: 'د ي ن ج ي' },
  { question: 'غيتو', response: 'غ ي ت و' },
  { question: 'توغي', response: 'ت و غ ي' },
  { question: 'تينغن', response: 'ت ي ن غ ن' },
  { question: 'روبن دياز', response: 'ر و ب ن د ي ا ز' },
  { question: 'كريم بنزيما', response: 'ك ر ي م ب ن ز ي م ا' },
  { question: 'احبك', response: 'ا ح ب ك' },
  { question: 'لولي بوب', response: 'ل و ل ي ب و ب' },
  { question: 'مادارا', response: 'م ا د ا ر ا' },
  { question: 'غارا', response: 'ج ا ر ا' },
  { question: 'هيروهيكو', response: 'ه ي ر و ه ي ك و' },
  { question: 'كازوما ساكوراي', response: 'ك ا ز و م ا س ا ك و ر ا ي' },
  { question: 'اوروكي سوتا', response: 'ا و ر و ك ي س و ت ا' },
  { question: 'كينتو ناكاجيما', response: 'ك ي ن ت و ن ا ك ا ج ي م ا' },
  { question: 'ساكورا توياما', response: 'س ا ك و ر ا ت و ي ا م ا' },
  { question: 'ريوساكي موراشي', response: 'ر ي و س ا ك ي م و ر ا ش ي' },
  { question: 'كومارو ناكاجيما', response: 'ك و م ا ر و ن ا ك ا ج ي م ا' },
  { question: 'ميشيرو كوشيدو', response: 'م ي ش ي ر و ك و ش ي د و' },
  { question: 'شينجي كازاموتو', response: 'ش ي ن ج ي ك ا ز ا م و ت و' },
  { question: 'تيومو ماتسودا', response: 'ت ي و م و م ا ت س و د ا' },
  { question: 'شيون هاكودو', response: 'ش ي و ن ه ا ك و د و' },
  { question: 'فوميكي يامادا', response: 'ف و م ي ك ي ي ا م ا د ا' },
  { question: 'ساشا ليون', response: 'س ا ش ا ل ي و ن' },
  { question: 'ميدورا ريسا', response: 'م ي د و ر ا ر ي س ا' },
  { question: 'شيتاكي كوجي', response: 'ش ي ت ا ك ي ك و ج ي' },
];

const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "🔡",key: m.key,}
  })
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;

  if (id in conn.tekateki) {
    conn.reply(m.chat, '*⦧🕹️⦨ مــا زال هـنـاك لـعـبـة جــاريــة*\n\n- *لـلـانـسـحـاب↜.انسحب*', conn.tekateki[id][0]);
    throw false;
  }

  // اختيار سؤال عشوائي
  const tekateki = questions[Math.floor(Math.random() * questions.length)];

  const caption = `
ⷮ *✧━════━⊰🕷️⊱━════━✧*
*┇❒ الكلمة: ${tekateki.question}*

*【⏳┇الـوقـت ⟢ 30.00】*

*【💰┇الـجـائـزة ⟢ 1000 XP】*


*✠ ──── ✷ ─ ‹✵› ─ ✷ ──── ✠*
*☜ ⧉ اكتب \`.انسحب\` للخروج ❯*
*☜ ⧉ جاوب مع ريبلاي ع السؤال ❯*
*✧━════━⊰🕷️⊱━════━✧*
↠ *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
`.trim();

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), 
    tekateki,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ انــتــهــي الــوقــت*\n
- *الـاجـابـة كـــانــت↜${tekateki.response}*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)
  ];
};

handler.help = ['تفكيك'];
handler.tags = ['ga'];
handler.command = /^تفكيك$/i;

export default handler;