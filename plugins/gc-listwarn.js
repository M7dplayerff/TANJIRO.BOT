const handler = async (m, {conn, isOwner}) => {
  await conn.sendMessage(m.chat, { react: { text: "🥷",key: m.key,}
  })
  const adv = Object.entries(global.db.data.users).filter((user) => user[1].warn);

  // إعداد التسمية الخاصة بكل مستخدم
  const mentions = adv.map(([jid]) => jid);

  // إعداد النص للعرض مع المنشن
  const caption = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*🥷 عــدد الـمـنـذريـن ↜ ${adv.length}*

${adv.map(([jid, user], i) => `
🥷 *ـ* ${isOwner ? '@' + jid.split`@`[0] : jid}

- *⚠️ ${user.warn}/3*
`).join('\n')}
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;

  // إرسال الرسالة مع المنشنات
  await conn.sendMessage(m.chat, { text: caption, mentions }, { quoted: m });
};
handler.help = ['قائمة_الانذارات']
handler.tags = ['gc']
handler.command = /^(قائمة_الانذارات)$/i;
handler.group = true;
handler.admin = true;
export default handler;