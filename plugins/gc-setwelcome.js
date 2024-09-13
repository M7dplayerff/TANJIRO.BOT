const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    // الحصول على بيانات المجموعة
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupName = groupMetadata.subject || 'اسم المجموعة غير متوفر';

    // استبدال المتغيرات في النص
    let welcomeText = text
      .replace(/@user/g, `@${m.sender.split('@')[0]}`)
      .replace(/@group/g, groupName)
      .replace(/@desc/g, groupMetadata.desc || 'لا يوجد وصف');

    global.db.data.chats[m.chat].sWelcome = welcomeText;
    m.reply(`
╔════════════════════════════════╗
║ ✅  *تم تعيين رسالة الترحيب بنجاح*  ✅
╚════════════════════════════════╝
`);
  } else throw `
╔════════════════════════════════╗
║ ⚠️  *يرجى تحديد نص رسالة الترحيب*  ⚠️
╠════════════════════════════════╣
║ يمكنك استخدام المتغيرات التالية:  ║
║ ⤷ *@user*  (مستخدم)                ║
║ ⤷ *@group*  (اسم المجموعة)         ║
║ ⤷ *@desc*  (وصف المجموعة)          ║
╚════════════════════════════════╝
    *𝙏𝘼𝙉𝙅𝙄𝙍𝙊.𝘽𝙊𝙏*
`;
};

handler.help = ['رسالة_الترحيب'];
handler.tags = ['gc'];
handler.command = ['رسالة_الترحيب'];
handler.admin = true;

export default handler;