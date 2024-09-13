const handler = async (m, {conn, isOwner}) => {
  const chats = Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned);
  const users = Object.entries(global.db.data.users).filter((user) => user[1].banned);
await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const caption = `
╔══════════════════════════════════╗
║ 🚫 *قائمة المحظورين*             ║
║ 🔢 إجمالي : ${users.length} ${users ? '\n' + users.map(([jid], i) => `
║ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '║'}
╚══════════════════════════════════╝

╔══════════════════════════════════╗
║ 🚫  *قائمة الدردشات المحظوره*    ║
║ 🔢 إجمالي : ${chats.length} ${chats ? '\n' + chats.map(([jid], i) => `
║ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '║'}
╚══════════════════════════════════╝
`.trim();

  m.reply(caption, null, {mentions: conn.parseMention(caption)});
};
handler.help = ['قائمة_البان'];
handler.tags = ['ow'];
handler.command = /^قائمة_البان$/i;
handler.rowner = true;
export default handler;