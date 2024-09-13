import fs from 'fs';

const timeout = 60000;
const poin = 1500;  // تم تعديل النقاط من 500 إلى 1500

const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "🤲",key: m.key,}
  })
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;

  if (id in conn.tekateki) {
   conn.reply(m.chat, '*⦧🕹️⦨ مــا زال هـنـاك لـعـبـة جــاريــة*\n\n- *لـلـانـسـحـاب↜.انسحب*', conn.tekateki[id][0]);
    throw false;
  }

  // تعريف الأسئلة والأجوبة حول الدين الإسلامي
  const tekateki = [
    { question: "ما هو اسم أول نبي في الإسلام؟", response: "آدم", options: ["آدم", "نوح", "إبراهيم", "محمد"] },
    { question: "ما هي أولى سور القرآن الكريم؟", response: "الفاتحة", options: ["الفاتحة", "البقرة", "الإخلاص", "الناس"] },
    { question: "ما هو اسم أُم النبي محمد صلى الله عليه وسلم؟", response: "آمنة", options: ["آمنة", "خديجة", "فاطمة", "عائشة"] },
    { question: "كم عدد أركان الإسلام؟", response: "خمسة", options: ["خمسة", "ستة", "أربعة", "سبعة"] },
    { question: "ما هو اسم الكتاب المقدس في الإسلام؟", response: "القرآن", options: ["القرآن", "التوراة", "الإنجيل", "الزبور"] },
    { question: "من هو النبي الذي قام ببناء الكعبة؟", response: "إبراهيم", options: ["إبراهيم", "محمد", "موسى", "عيسى"] },
    { question: "ما هو اسم آخر الأنبياء في الإسلام؟", response: "محمد", options: ["محمد", "عيسى", "موسى", "إبراهيم"] },
    { question: "ما هي الصلاة التي تُصلى بعد صلاة العشاء؟", response: "قيام الليل", options: ["قيام الليل", "التهجد", "الفجر", "العصر"] },
    { question: "كم عدد أجزاء القرآن الكريم؟", response: "ثلاثون", options: ["ثلاثون", "عشرون", "خمسة عشر", "أربعون"] },
    { question: "ما هو اسم السورة التي تركز على الإخلاص في العقيدة؟", response: "الإخلاص", options: ["الإخلاص", "الناس", "الفاتحة", "البقرة"] },
    { question: "ما هو اسم أشهر غزوة للنبي محمد صلى الله عليه وسلم؟", response: "غزوة بدر", options: ["غزوة بدر", "غزوة أحد", "غزوة الخندق", "غزوة مؤتة"] },
    { question: "ما هو اسم المدينة التي وُلد فيها النبي محمد صلى الله عليه وسلم؟", response: "مكة", options: ["مكة", "المدينة", "الطائف", "بدر"] },
    { question: "ما هو اسم النبي الذي ابتلعه الحوت ثم خرج منه؟", response: "يونس", options: ["يونس", "إبراهيم", "موسى", "محمد"] },
    { question: "ما هي الصلوات التي تقام يوم الجمعة؟", response: "الجمعة", options: ["الجمعة", "العصر", "الظهر", "المغرب"] },
    { question: "من هو الصحابي الذي كان يلقب بـ 'أمين الأمة'؟", response: "أبو بكر الصديق", options: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"] },
    { question: "ما هو اسم الحجة الكبرى في الإسلام؟", response: "حجة الوداع", options: ["حجة الوداع", "حجة الإسلام", "حجة الفتح", "حجة التوبة"] },
    { question: "ما هو اسم النبي الذي أرسل إلى بني إسرائيل؟", response: "موسى", options: ["موسى", "عيسى", "إبراهيم", "محمد"] },
    { question: "ما هو اسم السورة التي تُقرأ في كل صلاة؟", response: "الفاتحة", options: ["الفاتحة", "الإخلاص", "الناس", "البقرة"] },
    { question: "ما هو اسم السورة التي تتحدث عن معركة بدر؟", response: "الأنفال", options: ["الأنفال", "البقرة", "الفتح", "التوبة"] },
    { question: "ما هي السنة النبوية التي تحدد كيفية أداء الصلاة؟", response: "الحديث", options: ["الحديث", "القرآن", "السيرة", "الفقه"] }
  ];

  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  if (!json) {
    conn.reply(m.chat, "لا توجد أسئلة متاحة حاليا.", m);
    return;
  }

  // ترتيب الخيارات بشكل عشوائي
  const shuffledOptions = json.options.sort(() => Math.random() - 0.5);

  const caption = `
ⷮ ╔═════════════════════ *⌠اسئله دينيه⌡* ═════════════════════╗
 *┠≽ ❐ ${json.question}*

${shuffledOptions.map((option, index) => ` *❐ ${option}*`).join('\n\n')}

═════════════════
║  *【⏰ الوقت: 60:00】*                                   ║
║  *【🏆 الجائزة: 1500 XP】*                              ║
╠────────────────────────────────╣
║  *➤ اكتب \`.انسحب\` للإجابة*                ║
║  *➤ اعمل ريبلاي وجاوب*                  ║
╚═════════════════════ ⌠🕷️⌡ ═════════════════════╝
                *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
`.trim();

  conn.tekateki[id] = [
    await conn.sendMessage(m.chat, { image: { url: './PCB/Religious question.jpg' }, caption: caption }, { quoted: m }),
    json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ انــتــهــي الــوقــت*\n
- *الـاجـابـة كـــانــت↜${json.response}*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)
  ];
};

// تحديث أمر الهاوندلر ليشمل الأمر الجديد فقط
handler.help = ['اسئله_دينيه'];
handler.tags = ['ga'];
handler.command = /^اسئله_دينيه$/i;

export default handler;