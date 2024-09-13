const handler = async (m, {conn}) => {
  global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  await m.reply('✅ خلاص كدا انت رجعت بادئة الأوامر زي ما كانت في الأول.'); // رسالة مع رمز التحقق
  // conn.fakeReply(m.chat, '[❗𝐈𝐍𝐅𝐎❗] 🔄 إعادة تعيين البادئة', '0@s.whatsapp.net', 'إعادة تعيين البادئة')
};
handler.help = ['البادئه_الاصليه'];
handler.tags = ['ow'];
handler.command = /^(البادئه_الاصليه)$/i; // تعديل الأمر إلى البادئة_الاصليه
handler.rowner = true;

export default handler;