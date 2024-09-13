const pajak = 0;

const handler = async (m, { conn, text }) => {
  let who;
  
  // تحديد المستخدم
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) throw '╔═══════════════════════════╗\n║ ❗️ حدد مستخدم عاوز تضيفله اكسبي يا مطوري 🎯 ║\n╚═══════════════════════════╝';

  // استخراج النص المدخل
  const txt = text.replace('@' + who.split`@`[0], '').trim();
  
  if (!txt) throw '╔═══════════════════════════╗\n║ 💬 دخل الكمية الي عايز تبعتها يا تان ║\n╚═══════════════════════════╝';
  if (isNaN(txt)) throw '╔═══════════════════════════╗\n║ 🔢 الكمية لازم تكون رقم يا كامادو ║\n╚═══════════════════════════╝';

  const xp = parseInt(txt);
  let exp = xp;
  const pjk = Math.ceil(xp * pajak);
  exp += pjk;

  if (exp < 1) throw '╔═══════════════════════════╗\n║ ⚠️ الكمية لازم تكون اكبر من 0 ║\n╚═══════════════════════════╝';

  // تحديث بيانات المستخدم
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const users = global.db.data.users;
  users[who].exp += xp;

  // إرسال رسالة تأكيد
  m.reply(`╔════════════════════════════════╗\n║ 🎉≡ تم اضافة الاكسبي مبروك يا @${who.split`@`[0]} ║\n║ ────────────── ║\n║ ▢  ✨ كمية الاكسبي المضافة: ${xp} ║\n╚════════════════════════════════╝`);
};

// تعريف الأمر
handler.help = ['اضافة_اكسبي'];
handler.tags = ['ow'];
handler.command = ['اضافة_اكسبي'];
handler.rowner = true;

export default handler;