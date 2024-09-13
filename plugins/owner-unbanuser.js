const handler = async (m, {conn, text}) => {
  if (!text) throw '🔔 منشن او رد علي رسالة الي عايز ترفع عنه الحظر يا حب';
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) throw '🚫 انت محدتش حد';
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const users = global.db.data.users;
  users[who].banned = false;
  conn.reply(m.chat, `*⦑🕷️⦒ ❐ تـم رفـع الـحـظـر ✅ ↜اتـمـنـي مـنـك عــدم تـكـرار خـطـأك🥱👋*`, m, { mentions: [who] });
};

handler.help = ['الغاء_بان'];
handler.tags = ['ow'];
handler.command = /^(رفع_الحظر|الغاء_بان)$/i;
handler.rowner = true;

export default handler;