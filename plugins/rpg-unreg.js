import { createHash } from 'crypto';

const handler = async function(m, { args }) {
  const datas = global;

  if (!args[0]) throw '> ☜ *قم بأدخال السيريال نمبر الخاص بك*';
  await conn.sendMessage(m.chat, { react: { text: "🚶",key: m.key,}
  })
  const user = global.db.data.users[m.sender];
  const sn = createHash('md5').update(m.sender).digest('hex');
  if (args[0] !== sn) throw '*سيريال نمبر خاطئ🚫*';
  user.registered = false;
  m.reply('*تم الغاء التسجيل بنجاح✅*');
};

handler.help = ['الغاء_التسجيل']
handler.tags = ['rp'];
handler.command = /^(الغاء_التسجيل)?$/i;
handler.register = true;
export default handler;