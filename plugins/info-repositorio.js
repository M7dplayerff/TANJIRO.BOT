import moment from 'moment-timezone';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix }) => {
   await conn.sendMessage(m.chat, { react: { text: "📦",key: m.key,}
  })
   const res = await fetch('https://api.github.com/repos/BrunoSobrino/TheMystic-Bot-MD');
   const json = await res.json();
   let txt = `
╔════════════════════════════════════╗
║        📦 معلومات المستودع:        ║
╠════════════════════════════════════╣
║ 📛 اسم المستودع: ${json?.name || 'غير متاح'}      ║
╠════════════════════════════════════╣
║ 👁️ الزيارات: ${json?.watchers_count || '-'}           ║
╠════════════════════════════════════╣
║ 💾 الحجم: ${(json?.size / 1024).toFixed(2) || '-'} MB     ║
╠════════════════════════════════════╣
║ 🕒 التحديث الأخير: ${moment(json?.updated_at).format('DD/MM/YY - HH:mm:ss') || '-'} ║
╠════════════════════════════════════╣
║ 📊 التفاصيل: ${json?.forks_count || '-'} تشعبات,      ║
║ ${json?.stargazers_count || '-'} نجوم, ${json?.open_issues_count || '-'} قضايا مفتوحة ║
╚════════════════════════════════════╝
   `;
   await conn.sendMessage(m.chat, { text: txt.trim(), mentions: [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: { forwardingScore: 9999999, isForwarded: true, mentionedJid: [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net') } }, { quoted: m });
};
handler.taga = ['سكريبت']
handler.tags = ['in']
handler.command = ['سكريبت']
export default handler;