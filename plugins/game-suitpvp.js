const timeout = 60000;
const poin = 2500;
const poin_lose = -500;
const poin_bot = 200;

const handler = async (m, { conn, usedPrefix, text }) => {
  conn.suit = conn.suit ? conn.suit : {};
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) 
    throw `- *🔱 انــت مـوجـود فــي لـعـبـه بـلـفـعـل*`;
  
  const textquien = `
*⦧🕹️⦨ مـنـشـن الـشـخـص الـذي تـريـد الــعــب مـعــه*`;
  
  if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, { mentions: conn.parseMention(textquien) });
  
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) 
    throw `- *🔱 الـخـصـم فــي لـعـبـه اخـــري*`;
  
  const id = 'suit_' + new Date() * 1;
  
  // الحصول على اسم المسجلين أو استخدام المنشن الافتراضي
  const challengerName = global.db.data.users[m.sender] && global.db.data.users[m.sender].registered && global.db.data.users[m.sender].name
    ? global.db.data.users[m.sender].name
    : `@${m.sender.split`@`[0]}`;
  
  const opponentName = global.db.data.users[m.mentionedJid[0]] && global.db.data.users[m.mentionedJid[0]].registered && global.db.data.users[m.mentionedJid[0]].name
    ? global.db.data.users[m.mentionedJid[0]].name
    : `@${m.mentionedJid[0].split`@`[0]}`;
  
  const caption = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ طــلــب مـنـافـسـة حـجـر ورقــة مــقــص*

- *الـمـطـالـب بـلـتـحـدي↜* *${challengerName}*

- *الـمـطـلـوب↜* *${opponentName}*

*لـلـقـبـول اكــتــب⤶*

- *قبول*

- *اقبل*

- *🔱 مــع رد عـلـي رسـالـتـي*\n\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
  
  const imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`;
  
  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, { text: caption }, { mentions: await conn.parseMention(caption) }),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) 
        conn.reply(m.chat, `*⦧🕹️⦨ تـــم الــغــاء الــعــبـة لـعـدم وجــود رد مــن الـمـنـافس*`, m);

      delete conn.suit[id];
    }, timeout), poin, poin_lose, poin_bot, timeout,
  };
};
handler.help = ['ح_و_م']
handler.tags = ['ga']
handler.command = /^حجر_ورقه_مقص|ح_و_م$/i;
handler.group = true;
handler.game = true;
export default handler;