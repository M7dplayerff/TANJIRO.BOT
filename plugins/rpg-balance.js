const handler = async (m, {usedPrefix}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  await conn.sendMessage(m.chat, { react: { text: "💎",key: m.key,}
  })
  const name = conn.getName(who);
  m.reply(`*✧━═════━⊰📄⊱━═════━✧*
*❐⤶الاسم👤↜${name}*

*❐⤶الالماس💎↜${global.db.data.users[who].limit}*

*❐⤶الاوامر المتاحه لشراء*\n*.شراء*\n*.شراء_الكل*\n
*✠ ──── ✷ ─ ‹🕷️› ─ ✷ ──── ✠*`);
};

handler.help = ['الماس'];
handler.tags = ['rp'];
handler.command = ['الماس'];
export default handler;