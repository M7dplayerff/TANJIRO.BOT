const handler = async (m, {conn, usedPrefix}) => {
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const text = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*❐* *مرحبا بك يا صديقي انت الان تستعمل تانجيرو بوت هذه الرساله موضوعه للتواصل واذا اردت اقتراح اي اضافات او تعديلات او افكار للبوت فادخل وحدث المطور بشأنها*\n\n
- *شــات الـمـطـور 👑*\n wa.me/201220864180
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
  *ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
  `.trim();

  const buttonMessage = {
    'text': text,
    'footer': '╔════════════════════════════════════╗\n║   🛠️ صانع البوت: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢  🛠️   ║\n║                                    ║\n║   📱 للاستفسار: [رابط المحادثة](https://wa.me/201220864180)   ║\n╚════════════════════════════════════╝',
    'headerType': 1 // Using headerType 1 for text messages
  };

  conn.sendMessage(m.chat, buttonMessage, {quoted: m});
};
handler.help = ['هوست']
handler.tags = ['in']
handler.command = ['هوست'];
export default handler;