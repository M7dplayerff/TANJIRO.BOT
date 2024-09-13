const handler = async (m, {conn, usedPrefix}) => {
  await conn.sendMessage(m.chat, { react: { text: "🌐",key: m.key,}
  })
  const text = `*✦━━━━✦⊰🕷️⊱✦━━━━✦*\n*⦑🕷️⦒ ❐ قـنــاة الــبــوت 🌐↜هـذه هـي الـقـنـاه الـرسـمـيـه والـوحـيـدة لـلـبـوت*

- https://whatsapp.com/channel/0029ValNLOS7IUYNlsgu9X3w
*✦━━━━✦⊰🕷️⊱✦━━━━✦*`.trim();

  const buttonMessage = {
    'text': text,
    'footer': '╔════════════════════════════════════╗\n║    🤖 𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧    🤖 ║\n╚════════════════════════════╝',
    'headerType': 1 // Using headerType 1 for text messages
  };

  conn.sendMessage(m.chat, buttonMessage, {quoted: m});
};
handler.help = ['قناة_البوت']
handler.tags = ['in']
handler.command = ['قناة_البوت'];
export default handler;