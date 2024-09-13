import { createHash } from 'crypto';
import fs from 'fs'; // تأكد من استيراد fs

const handler = async (m, { conn, usedPrefix, participants, isPrems }) => {
  const localImagePath = './PCB/بروفايل.js'; // المسار المحلي للصورة
  let pp = 'https://telegra.ph/file/06cc652844ea19e8aed1c.jpg';
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  
  if (!(who in global.db.data.users)) throw 'المستخدم غير موجود';
  
  try {
    pp = await conn.profilePictureUrl(who);
  } catch (e) {
    // في حالة عدم القدرة على الحصول على صورة الملف الشخصي، استخدم الصورة المحلية
    if (fs.existsSync(localImagePath)) {
      pp = localImagePath;
    }
  } finally {
    const { name, age, registered, premiumTime } = global.db.data.users[who];
    const sn = createHash('md5').update(who).digest('hex');
    await conn.sendMessage(m.chat, { react: { text: "🤴",key: m.key,}
  })
    const prem = premiumTime > 0 || isPrems;
    const str = `*✧━════━⊰🤴⊱━════━✧*\n` +
                `*❐⤶الاسم:* *${registered ? name : 'غير مسجل'}*\n` +
                `*❐⤶الحاله:* *${registered ? 'مسجل' : 'غير مسجل'}*\n` +
                `*❐⤶بريميوم:* *${prem ? '✅' : '🚫'}*\n` +
                `*❐⤶السيريال⇠نمبر:* *${sn}*\n` +
                `*✠ ─── ✷ ─ ‹🕷️› ─ ✷ ─── ✠*`;
    
    conn.sendMessage(m.chat, { image: { url: pp }, caption: str }, { quoted: m });
  }
};

handler.help = ['بروفايل'];
handler.tags = ['rp'];
handler.command = /^بروف|بروفايل?$/i;
export default handler;