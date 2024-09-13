const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📜 لازم تكتب حاجة، مثال: ${usedPrefix + command} أمر ستك في مشكله.`;
  if (text.length < 10) throw `✍️ لازم الشكوى تبقى أكتر من عشر حروف يا حب.`;
  if (text.length > 1000) throw `📝 الكلام كتير أوى يا حب حاول تخليه أقل من ألف حرف.`;
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const teks = `
*⦑🕷️⦒ ❐ تـم ارسـال شـكـوي مـن ${m.sender.split`@`[0]} ⚠️↜${text}🥱👋*`;
  try {
    await conn.reply('201220864180@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] } });
    m.reply('*【✅┇تــــــــم ⍅  الـارســال】*');
  } catch (error) {
    console.error('*【❌┇فــشــل ⍅  الـارســال】*', error);
    m.reply('*【❌┇فــشــل ⍅  الـارســال】*');
  }
};

handler.help = ['شكوي'];
handler.tags = ['ow'];
handler.command = /^(شكوي|بلاغ)$/i;
export default handler;