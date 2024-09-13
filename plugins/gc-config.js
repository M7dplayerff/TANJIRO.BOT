const handler = async (m, {conn, args, usedPrefix, command}) => {
  const isClose = {
    'فتح': 'not_announcement',
    'قفل': 'announcement',
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
  }[(args[0] || '')];
  
  if (isClose === undefined) {
    throw `
*⦙🍷⦘ ↫ طريقة الاستخدام الصحيحه للأمر*
- *.جروب فتح*
- *.جروب قفل*`.trim();
  }
await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  await conn.groupSettingUpdate(m.chat, isClose);
};

handler.help = ['جروب'];
handler.tags = ['gc'];
handler.command = /^(جروب)$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;