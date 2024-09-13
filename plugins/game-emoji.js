import fs from 'fs';

// إعداد التوقيت والنقاط

const timeout = 30000;

// الأسئلة والأجوبة

const questions = {

  سهل: [ // مستوى سهل (إيموجي واحد)

    { question: '🌟', response: '🌟' },

    { question: '🔥', response: '🔥' },

    { question: '🌈', response: '🌈' },

    { question: '🍎', response: '🍎' },

    { question: '🚀', response: '🚀' },

    { question: '🎉', response: '🎉' },

    { question: '🎵', response: '🎵' },

    { question: '🌺', response: '🌺' },

    { question: '🍕', response: '🍕' },

    { question: '⚽', response: '⚽' },

    { question: '💧', response: '💧' },

    { question: '🦄', response: '🦄' },

    { question: '🌙', response: '🌙' },

    { question: '🎯', response: '🎯' },

    { question: '🌴', response: '🌴' }

  ],

  متوسط: [ // مستوى متوسط (إيموجيين)

    { question: '🌟🔥', response: '🌟🔥' },

    { question: '🚀🎉', response: '🚀🎉' },

    { question: '🍎🎵', response: '🍎🎵' },

    { question: '🌈🍕', response: '🌈🍕' },

    { question: '🍕⚽', response: '🍕⚽' },

    { question: '🎵💧', response: '🎵💧' },

    { question: '🦄🌙', response: '🦄🌙' },

    { question: '🎯🌴', response: '🎯🌴' },

    { question: '🔥🌺', response: '🔥🌺' },

    { question: '🍎🎉', response: '🍎🎉' },

    { question: '🚀🎯', response: '🚀🎯' },

    { question: '🌴💧', response: '🌴💧' },

    { question: '⚽🦄', response: '⚽🦄' },

    { question: '🌈🍎', response: '🌈🍎' },

    { question: '💧🎵', response: '💧🎵' }

  ],

  صعب: [ // مستوى صعب (ثلاث إيموجيات)

    { question: '🌟🔥🚀', response: '🌟🔥🚀' },

    { question: '🍎🎉🎵', response: '🍎🎉🎵' },

    { question: '🌈🍕⚽', response: '🌈🍕⚽' },

    { question: '💧🦄🌙', response: '💧🦄🌙' },

    { question: '🎯🌴🔥', response: '🎯🌴🔥' },

    { question: '🍕🌟💧', response: '🍕🌟💧' },

    { question: '🌈🎵🌴', response: '🌈🎵🌴' },

    { question: '🍎🌙🎯', response: '🍎🌙🎯' },

    { question: '🔥🎉⚽', response: '🔥🎉⚽' },

    { question: '🦄🍎🌺', response: '🦄🍎🌺' },

    { question: '💧🌟🌴', response: '💧🌟🌴' },

    { question: '🚀⚽🌈', response: '🚀⚽🌈' },

    { question: '🎯🎵🔥', response: '🎯🎵🔥' },

    { question: '🍕💧🌙', response: '🍕💧🌙' },

    { question: '🌺🎉🦄', response: '🌺🎉🦄' }

  ]

};

const handler = async (m, { conn }) => {

  const args = m.text.split(' ').slice(1);

  const level = args[0]; // الحصول على مستوى الصعوبة من الأمر

  // تعيين id كمعرف الدردشة

  const id = m.chat;

  if (!level) {

    conn.reply(m.chat, '*⦧🕹️⦨ الـاســتــخــدام الــصــحــيــح*\n\n- *🔱 .ايموشن سهل*\n\n- *🔱 .ايموشن متوسط*\n\n- *🔱 .ايموشن صعب*\n\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*', m);

    return;

  }

  if (!['سهل', 'متوسط', 'صعب'].includes(level)) {

    conn.reply(m.chat, '- *🔱 مــســتــوي صــعــوبــه غــيــر مــوجــود*', m);

    return;

  }

  if (id in conn.tekateki) {

    conn.reply(m.chat, '*⦧🕹️⦨ مــا زال هـنـاك لـعـبـة جــاريــة*\n\n- *لـلـانـسـحـاب↜.انسحب*', conn.tekateki[id][0]);

    throw false;

  }

  // اختيار سؤال عشوائي بناءً على مستوى الصعوبة

  const tekateki = questions[level][Math.floor(Math.random() * questions[level].length)];

  // تحديد الجائزة بناءً على مستوى الصعوبة

  let reward;

  if (level === 'سهل') {

    reward = 500;

  } else if (level === 'متوسط') {

    reward = 1000;

  } else if (level === 'صعب') {

    reward = 1500;

  }

  const caption = `

ⷮ *✧━════━⊰🕷️⊱━════━✧*

*┇❒ الإيموجي: ${tekateki.question}*

*【⏳┇الـوقـت ⟢ 30.00】*

*【💰┇الـجـائـزة ⟢ ${reward} XP】*

*✠ ──── ✷ ─ ‹✵› ─ ✷ ──── ✠*

*☜ ⧉ اكتب \`.انسحب\` للخروج ❯*

*☜ ⧉ جاوب مع ريبلاي ع السؤال ❯*

*✧━════━⊰🕷️⊱━════━✧*

↠ *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*

`.trim();

  conn.tekateki[id] = [

    await conn.reply(m.chat, caption, m),

    tekateki,

    reward,

    setTimeout(async () => {

      if (conn.tekateki[id]) await conn.reply(m.chat, `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ انــتــهــي الــوقــت*\n

- *الـاجـابـة كـــانــت↜${tekateki.response}*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`, conn.tekateki[id][0]);

      delete conn.tekateki[id];

    }, timeout)

  ];

};

handler.help = ['ايموشن'];

handler.tags = ['ga'];

handler.command = /^ايموشن$/i;

export default handler;