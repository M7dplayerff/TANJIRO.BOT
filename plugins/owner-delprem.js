import fs from 'fs';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  const datas = global;

  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const user = global.db.data.users[who];
  if (!who) throw '⚠️ [🚫] انت محدتش مستخدم يا تانجيرو [🚫] ⚠️';
  if (!user) throw '❌ [📋] الشخص دا مش موجود في بيناتي انا اسف [📋] ❌';
  if (user.premiumTime <= 0) throw '⏳ [🔚] خلاص كدا انتهت فترتك البريميوم في البوت 😔 بتمني ليك انهم يعطوك بريميوم تاني قريب [🔚] ⏳';

  const txt = text.replace('@' + who.split`@`[0], '').trim();

  user.premiumTime = 0;
  user.premium = false;
  const textdelprem = `\n━━━【🚫】━━━\n✦ تم إزالة البريميوم من العضو @${who.split`@`[0]} ✦\n━━━【🚫】━━━\n`;
  m.reply(textdelprem, null, {mentions: conn.parseMention(textdelprem)});
};

handler.help = ['حذف_بريميوم'];
handler.tags = ['ow'];
handler.command = /^(حذف_بريميوم)$/i;
handler.group = true;
handler.rowner = true;

export default handler;