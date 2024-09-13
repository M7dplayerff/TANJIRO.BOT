const handler = async (m, {conn, usedPrefix}) => {
  await conn.sendMessage(m.chat, { react: { text: "🌐",key: m.key,}
  })
  const text = `*➤━━━❖⊰🕷️⊱❖━━━➤*
🔱 *هذه هي المجموعات الرسميه والوحيده للبوت*

- 🌐 https://chat.whatsapp.com/Fbu0tyAfSKA5SGniLTV8Ti

- 🌐 https://chat.whatsapp.com/K8yiEOjOeAv0wvjCBtlnpI

- 🌐 https://chat.whatsapp.com/DhsvJg47Cb29HTj9ugm3t7

- 🌐 https://chat.whatsapp.com/CbsmsXcpw27FCmQ0CrBRe7

- 🌐 https://chat.whatsapp.com/CUT3yYVOXU9I9Wsxq19u9Y
*➤━━━❖⊰🕷️⊱❖━━━➤*`.trim();

  const buttonMessage = {
    'text': text,
    'footer': '╔════════════════════════════════════╗\n║    🤖 𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧    🤖 ║\n╚════════════════════════════╝',
    'headerType': 1 // Using headerType 1 for text messages
  };

  conn.sendMessage(m.chat, buttonMessage, {quoted: m});
};
handler.help = ['جروبات_البوت']
handler.tags = ['in']
handler.command = ['جروبات_البوت'];
export default handler;