import fs from 'fs';

// إعداد التوقيت والنقاط
const timeout = 30000;
const poin = 1000;

// الأسئلة والأجوبة
const questions = [
  { question: 'ت ف ك ي ك', response: 'تفكيك' },
  { question: 'ا ي ت ش ي غ و', response: 'ايتشيغو' },
  { question: 'و ا ن ب ي س', response: 'وان بيس' },
  { question: 'ي ا م ا م ا ت و', response: 'ياماماتو' },
  { question: 'غ و ك و', response: 'غوكو' },
  { question: 'ن و ب و ر ا', response: 'نوبورا' },
  { question: 'ت ا ن ج ي ر و', response: 'تانجيرو' },
  { question: 'غ و ن', response: 'غون' },
  { question: 'ك ي ل و ا', response: 'كيلوا' },
  { question: 'س ي ر ا', response: 'سيرا' },
  { question: 'ش ي ر ا', response: 'شيرا' },
  { question: 'ر ي ن غ و ك و', response: 'رينغوكو' },
  { question: 'ي و ت ا', response: 'يوتا' },
  { question: 'م ي د و ر ي ا', response: 'ميدوريا' },
  { question: 'ف ل و ر ي ت ا', response: 'فلوريتا' },
  { question: 'ج و غ و', response: 'جوغو' },
  { question: 'ب ا ن ك ا ي', response: 'بانكاي' },
  { question: 'ه ا ك و ن ا م ي ك ا ج و ر ا', response: 'هاكونامي كاجورا' },
  { question: 'ي ا ر ي ي ا ر ي', response: 'ياري ياري' },
  { question: 'ج ا م ب ر ي ج ا م ب ر ي', response: 'جامبري جامبري' },
  { question: 'س ا س ك ي', response: 'ساسكي' },
  { question: 'ا ي ت ا ت ش ي', response: 'ايتاتشي' },
  { question: 'ك ا ن ي ك ي', response: 'كانيكي' },
  { question: 'س ا ل م و ن', response: 'سالمون' },
  { question: 'ا ل س ل ا م ع ل ي ك م', response: 'السلام عليكم' },
  { question: 'ا ه ل ا ل خ ي ر', response: 'اهل الخير' },
  { question: 'ا ل م غ ر ب', response: 'المغرب' },
  { question: 'ت و ن س', response: 'تونس' },
  { question: 'م ص ر', response: 'مصر' },
  { question: 'ا ل ش ا ط ئ', response: 'الشاطئ' },
  { question: 'ا ل ف ر د و س ا ل ا ع ل ي', response: 'الفردوس الاعلي' },
  { question: 'ا د و ل ف ه ت ل ر', response: 'ادولف هتلر' },
  { question: 'د ي ن ج ي', response: 'دينجي' },
  { question: 'غ ي ت و', response: 'غيتو' },
  { question: 'ت و غ ي', response: 'توغي' },
  { question: 'ت ي ن غ ن', response: 'تينغن' },
  { question: 'ر و ب ن د ي ا ز', response: 'روبن دياز' },
  { question: 'ك ر ي م ب ن ز ي م ا', response: 'كريم بنزيما' },
  { question: 'ا ح ب ك', response: 'احبك' },
  { question: 'ل و ل ي ب و ب', response: 'لولي بوب' },
  { question: 'م ا د ا ر ا', response: 'مادارا' },
  { question: 'ج ا ر ا', response: 'غارا' },
  { question: 'ه ي ر و ه ي ك و', response: 'هيروهيكو' },
  { question: 'ك ا ز و م ا س ا ك و ر ا ي', response: 'كازوما ساكوراي' },
  { question: 'ا و ر و ك ي س و ت ا', response: 'اوروكي سوتا' },
  { question: 'ك ي ن ت و ن ا ك ا ج ي م ا', response: 'كينتو ناكاجيما' },
  { question: 'س ا ك و ر ا ت و ي ا م ا', response: 'ساكورا توياما' },
  { question: 'ر ي و س ا ك ي م و ر ا ش ي', response: 'ريوساكي موراشي' },
  { question: 'ك و م ا ر و ن ا ك ا ج ي م ا', response: 'كومارو ناكاجيما' },
  { question: 'م ي ش ي ر و ك و ش ي د و', response: 'ميشيرو كوشيدو' },
  { question: 'ش ي ن ج ي ك ا ز ا م و ت و', response: 'شينجي كازاموتو' },
  { question: 'ت ي و م و م ا ت س و د ا', response: 'تيومو ماتسودا' },
  { question: 'ش ي و ن ه ا ك و د و', response: 'شيون هاكودو' },
  { question: 'ف و م ي ك ي ي ا م ا د ا', response: 'فوميكي يامادا' },
  { question: 'س ا ش ا ل ي و ن', response: 'ساشا ليون' },
  { question: 'م ي د و ر ا ر ي س ا', response: 'ميدورا ريسا' },
  { question: 'ش ي ت ا ك ي ك و ج ي', response: 'شيتاكي كوجي' },
];

const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "🔤",key: m.key,}
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

handler.help = ['تركيب'];
handler.tags = ['ga'];
handler.command = /^تركيب$/i;

export default handler;