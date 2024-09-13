import {randomBytes} from 'crypto';

const link = /chat.whatsapp.com/;
const handler = async (m, {conn, text, groupMetadata}) => {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  if (!text) throw `╔════════════════════════════════════╗
║   ✍️ *اكتب حاجه بعد الامر عشان تتذاع للجروبات كلها يا تان*   ║
║                                    ║
║   🛠️ *صانع البوت: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢*  🛠️   ║
║   📱 *للاستفسار: [رابط المحادثة](https://wa.me/201220864180)*   ║
╚════════════════════════════════════╝`; // رسالة بديلة إذا لم يكن هناك نص
  const linkThisGroup = `${link}`;
  if (m.text.includes(linkThisGroup)) return conn.reply(m.chat, `╔════════════════════════════════════╗
║   🚫 *مينفعش لينكات يا حب*        ║
║                                    ║
║   🛠️ *صانع البوت: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢*  🛠️   ║
║   📱 *للاستفسار: [رابط المحادثة](https://wa.me/201220864180)*   ║
╚════════════════════════════════════╝`, m); // رسالة بديلة للروابط
  const time = global.db.data.users[m.sender].msgwait + 300000;
  if (new Date - db.data.users[m.sender].msgwait < 300000) throw `╔════════════════════════════════════╗
║   ⏳ *استني شويه بس وابعت تاني يا تان*    ║
║     ⏰ ${msToTime(time - new Date())}     ║
║                                    ║
║   🛠️ *صانع البوت: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢*  🛠️   ║
║   📱 *للاستفسار: [رابط المحادثة](https://wa.me/201220864180)*   ║
╚════════════════════════════════════╝`; // رسالة بديلة للانتظار
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const name = await conn.getName(m.sender);
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map((v) => v[0]);
  const fakegif = {key: {participant: `0@s.whatsapp.net`}, message: {'videoMessage': {'title': 'NʏᴀɴCᴀᴛBᴏᴛ - MD', 'h': `Hmm`, 'seconds': '99999', 'gifPlayback': 'true', 'caption': '𝚃𝚎𝚜𝚝 - 𝙱𝚘𝚝', 'jpegThumbnail': false}}};
  const teks = `╔════════════════════════════════════╗
║   📢 *رسالة عامة من مطور البوت*        ║
║  ══════════════════════════════════ ║
║  اسم المستخدم: ${name}                   ║
║  رابط المستخدم: wa.me/${who.split`@`[0]}  ║
║  محتويات الرسالة: ${text}               ║
║                                    ║
║   🛠️ *صانع البوت: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢*  🛠️   ║
║   📱 *للاستفسار: [رابط المحادثة](https://wa.me/201220864180)*   ║
╚════════════════════════════════════╝`;
  for (const id of groups) {
    await conn.sendMessage(id, {text: teks}, {quoted: fakegif});
    global.db.data.users[m.sender].msgwait = new Date * 1;
  }
};
handler.help = ['رساله_عامه'];
handler.tags = ['ow'];
handler.command = /^(رساله_عامه)$/i; // تغيير الأمر إلى رسالة_عامه
handler.owner = true;
handler.group = true;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return minutes + ' m ' + seconds + ' s ';
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const randomID = (length) => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);