
const handler = async (m, { conn, args }) => {
  if (!args || !args[0]) throw `
*⦙🍷⦘ ↫ ضع الوصف الذي تريده بعد الامر لجعله وصف المجموعه*`;
  await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  try {
    const description = args.join(' ');
    await     conn.groupUpdateDescription(m.chat, description);
    m.reply(`*【✅┇تــــــم ⍅  الــتــغــيــر】*`);
  } catch (e) {
    m.reply(`*【❌┇حــــدث ⍅  خـــطـــأ】*`);
  }
};

handler.help = ['وصف_الروم'];
handler.tags = ['gc'];
handler.command = /^وصف_الروم$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;