const handler = async (m, {conn, text, args, usedPrefix, command}) => {
  let name = await conn.getName(m.sender);
  if (name == 'undefined') name = 'Indefinido';
  
  const b = text.split('|');
  if (!b[1]) throw `*☜ اكتب السؤال بعد ذلك الاختيارات الذي تريد الاعضاء ان يصوتو عليها مثال:*\n\n*.تصويت هل تحبني|نعم|لا|بلتأكيد*`;
  if (b.length > 12) throw `*🔱 لا يمكن اضافة المزيد من الخيارات*`;
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const question = text.split('|')[0];
  const options = text.split("|").slice(1).map(option => ({ optionName: option.trim() }));
  
  const caption = `*➺━━━━━★⊰🕷️⊱★━━━━━➺*
*${name}*

*الــســـؤال:*
- *${question}*
*➺━━━━━★⊰🕷️⊱★━━━━━➺*`;

  const sendPollMessage = {
    messageContextInfo: {
        messageSecret: "bT3tfZngfSMWK2zOEL8pSclPG+xldidYDX+ybB8vdEw="
    },
    pollCreationMessage: {
        name: caption,
        options: options,
        selectableOptionsCount: 1,
    }
  };

  conn.relayMessage(m.chat, sendPollMessage, {quoted: m});
};

handler.help = ['تصويت'];
handler.tags = ['to'];
handler.command = ['تصويت', 'encuesta'];

export default handler;