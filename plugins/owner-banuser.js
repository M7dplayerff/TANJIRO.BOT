const handler = async (m, {conn, participants, usedPrefix, command}) => {
  const BANtext = `
╔════════════════════════════════════════╗
║ ⚠️ *منشن شخص عايز تعمله بان من استعمالي يا تانجيرو*  ║
╚════════════════════════════════════════╝
  `;
  if (!m.mentionedJid[0] && !m.quoted) return m.reply(BANtext, m.chat);
  
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  else who = m.chat;
await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const users = global.db.data.users;
  users[who].banned = true;

  // Message for banned user
  m.reply(`
*【✅┇تــــــــم ⍅  الــحــظــر】*`);
};
handler.help = ['بان'];
handler.tags = ['ow'];
handler.command = /^بان$/i;
handler.rowner = true;
export default handler;