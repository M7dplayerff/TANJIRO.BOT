const handler = async (m, { conn, args }) => {
  if (!args || !args[0]) throw `*⦙🍷⦘ ↫ ضع الاسم الذي تريده بعد الامر لجعله اسم المجموعه*`;
  try {
    const text = args.join` `;
    await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
    conn.groupUpdateSubject(m.chat, text);
    // يمكنك إضافة رسالة تأكيد هنا إذا رغبت في ذلك
  } catch (e) {
    throw `
*【❌┇حــــــدث ⍅  خـــطـــأ】*`;
  }
};

handler.help = ['اسم_الروم'];
handler.tags = ['gc'];
handler.command = /^(اسم_الروم)$/i;
handler.group = true;
handler.admin = true;

export default handler;