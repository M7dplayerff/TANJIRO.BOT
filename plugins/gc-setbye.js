const handler = async (m, {conn, text}) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply(`
╔════════════════════════════╗
║ ✅ *تم تحديث الرسالة بنجاح.* ║
╚════════════════════════════╝
    `);
  } else throw `
╔════════════════════════════╗
║ 📜 *دخل رسالة المغادرة الي انت عايزها بعد الامر يا حب* ║
║ (*@user*) *اذا كنت تريد البوت ان يقوم بمنشنة الشخص الي غادر او تم طرده ايآ كان.* ║
╚════════════════════════════╝
    *𝙏𝘼𝙉𝙅𝙄𝙍𝙊.𝘽𝙊𝙏*
    `;
};

handler.help = ['رسالة_المغادرة'];
handler.tags = ['gc'];
handler.command = ['رسالة_المغادرة'];
handler.admin = true;

export default handler;