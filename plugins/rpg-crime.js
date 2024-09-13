//CÓDIGO CREADO POR elrebelde21 : https://github.com/elrebelde21

let crime = 500;
let diamante = 10;
const handler = async (m, { conn, usedPrefix, command, groupMetadata, participants, isPrems }) => {
  const date = global.db.data.users[m.sender].crime + 3600000; // 3600000 = 1 hr
  if (new Date - global.db.data.users[m.sender].crime < 3600000) 
    return m.reply(`*يجب الانتظار${msToTime(date - new Date())} قبل المحاوله مره اخري⏳*`);
  
  let randow;
  if (m.isGroup) 
    randow = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else 
    randow = m.chat;

  try {
    let ps = groupMetadata.participants.map(v => v.id);
    let randow = ps.getRandom();
    let users = global.db.data.users[randow];
    const exp = Math.floor(Math.random() * 9000);
    const diamond = Math.floor(Math.random() * 150);
    const money = Math.floor(Math.random() * 9000);
    let or = ['text', 'text2', 'text3', 'text4', 'text5'];
    let media = or[Math.floor(Math.random() * 4)];
    global.db.data.users[m.sender].crime = new Date * 1;
await conn.sendMessage(m.chat, { react: { text: "🕴️",key: m.key,}
  })
    if (media === 'text') 
      return m.reply(`💰 *نجحت في السرقة!*\n\nتمت سرقة: ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp);
    if (media === 'text2') 
      return m.reply(`🚓 *تم القبض عليك!*\n\nخسرت: ${exp} XP`).catch(global.db.data.users[m.sender].exp -= crime);
    if (media === 'text3') 
      return m.reply(`💰 *نجحت في السرقة!*\n\n*تم سرقة*\n*${diamond}* 💎 *الماس*\n*${money}* 💵 *اموال*`).catch(global.db.data.users[m.sender].limit += diamond).catch(global.db.data.users[m.sender].money += money);
    if (media === 'text4') 
      return m.reply(`🚓 *تم القبض عليك!*\n\nخسرت:\n${diamond} 💎 ألماسات\n${money} 💵 نقود`).catch(global.db.data.users[m.sender].limit -= diamante).catch(global.db.data.users[m.sender].money -= crime);
    if (media === 'text5') 
      return conn.reply(m.chat, `🚓 *تم القبض على @${randow.split`@`[0]}!*\n\nخسر: ${exp} XP`, m, { contextInfo: { mentionedJid: [randow] } }).catch(global.db.data.users[m.sender].exp += exp).catch(global.db.data.users[randow].exp -= crime);
  } catch (e) {
    console.log(e);
  }
}
handler.help = ['جريمه'];
handler.tags = ['rp'];
handler.command = /^(جريمه)$/i;
handler.register = true;
handler.group = true;
export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  return `${hours} ⏰ ساعة ${minutes} 🕑 دقيقة`;
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}