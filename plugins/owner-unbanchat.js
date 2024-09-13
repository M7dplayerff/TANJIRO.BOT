const handler = async (m) => {
  // 🚫 إلغاء حظر الدردشة
  global.db.data.chats[m.chat].isBanned = false;
  
  // ✅ إرسال رسالة تأكيد
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  m.reply('*⦑🕷️⦒ ❐ تـم رفـع حـظـر الـشـات✅ ↜اتـمـنـي ان لـا تـقـومـو بـنـفـس الـخـطـأ مـرة اخــري🥱👋*');
};

handler.help = ['الغاء_حظر_الدردشه'];
handler.tags = ['ow'];
handler.command = /^(ا_ح_ا|الغاء_حظر_الدردشه)$/i; // الأوامر المعدلة هنا
handler.rowner = true;

export default handler;