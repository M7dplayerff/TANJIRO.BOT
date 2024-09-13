const handler = async (m, { conn, text, command }) => {
  // تحديد المعرف للمجموعة (إما النص المدخل أو المجموعة الحالية)
  const id = text ? text : m.chat;

  // إرسال رسالة إلى المجموعة
  await conn.sendMessage(m.chat, { react: { text: "👋",key: m.key,}
  })
  await conn.reply(id, `*⦑🕷️⦒ ❐ اشـعـار وداع ☠️ ↜الـبـوت غــادر الــروم قــم بـسـؤال الـمـطـور عــن الــسـبـب🥱👋*`.trim());
  
  // مغادرة المجموعة
  await conn.groupLeave(id);
};
handler.help = ['مغادرة'];
handler.tags = ['ow'];
handler.command = /^(خروج|مغادرة)$/i; // أوامر باللغة العربية
handler.group = true; // العمل في المجموعات
handler.rowner = true; // فقط للمالك
export default handler;