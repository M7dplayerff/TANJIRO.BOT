import {createHash} from 'crypto';

const handler = async function(m, {conn, text, usedPrefix}){
  const sn =  createHash('md5').update(m.sender).digest('hex');
  await conn.sendMessage(m.chat, { react: { text: "🗝️",key: m.key,}
  })
  m.reply(`*رقم السيريال نمبر الخاص بك هو:*\n\n*${sn}*`.trim());
};

handler.help = ['سيريال_نمبر'];
handler.tags = ['rp'];
handler.command = /^(الرقم_التسلسلي|سيريال_نمبر)$/i;
handler.register = true;
export default handler;