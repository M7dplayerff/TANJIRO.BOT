const pajak = 0;

const handler = async (m, { conn, text }) => {
  let who;

  // تحديد المستخدم
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) throw '╔═══════════════════════════╗\n║ ❗️ حدد مستخدم عاوز تضيفله الماس يا مطوري 💎 ║\n╚═══════════════════════════╝';

  // استخراج النص المدخل
  const txt = text.replace('@' + who.split`@`[0], '').trim();

  if (!txt) throw '╔═══════════════════════════╗\n║ 📝 دخل الكمية الي عايز تبعتها يا تان ║\n╚═══════════════════════════╝';
  if (isNaN(txt)) throw '╔═══════════════════════════╗\n║ 🔢 الكمية لازم تكون رقم يا كامادو ║\n╚═══════════════════════════╝';

  const dmt = parseInt(txt);
  let limit = dmt;
  const pjk = Math.ceil(dmt * pajak);
  limit += pjk;

  if (limit < 1) throw '╔═══════════════════════════╗\n║ ⚠️ الكمية لازم تكون اكبر من 0 ║\n╚═══════════════════════════╝';

  // تحديث بيانات المستخدم
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const users = global.db.data.users;
  users[who].limit += dmt;

  // إرسال رسالة تأكيد
  m.reply(`╔════════════════════════════════╗\n║ 🎉✨ تم اضافة الألماس بنجاح يا @${who.split`@`[0]} 🎉✨ ║\n║ ─────────────── ║\n║ ▢  💎 كمية الألماس المضافة: ${dmt} ║\n╚════════════════════════════════╝`);
};

// تعريف الأمر
handler.help = ['اضافة_الماس'];
handler.tags = ['ow'];
handler.command = ['اضافة_الماس'];
handler.rowner = true;

export default handler;