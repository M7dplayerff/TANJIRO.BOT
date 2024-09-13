import os from "os";
import util from "util";
import sizeFormatter from "human-readable";
import fs from "fs";
import { performance } from "perf_hooks";

const handler = async (m, { conn, usedPrefix }) => {
  await conn.sendMessage(m.chat, { react: { text: "🤖",key: m.key,}
  })
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const totalusrReg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
  const totalusr = Object.keys(global.db.data.users).length;
  const chats = Object.entries(conn.chats).filter(
    ([id, data]) => id && data.isChats,
  );
  const groupsIn = chats.filter(([id]) => id.endsWith("@g.us"));
  const groups = chats.filter(([id]) => id.endsWith("@g.us"));
  const used = process.memoryUsage();
  const { restrict, antiCall, antiprivado, modejadibot } =
    global.db.data.settings[conn.user.jid] || {};
  const { autoread, gconly, pconly, self } = global.opts || {};
  const old = performance.now();
  const neww = performance.now();
  const rtime = (neww - old).toFixed(7);
  const wm = '𝗧𝗔𝗡𝗝𝗜𝗥𝗢.BOT';
  const info = `*➤━━━━━❖⊰🕷️⊱❖━━━━━➤*
*ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*\n  
*❐ رقـم الـمـطـور:*\n
- wa.me/201220864180
*ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ*
*⏱️ وقت التشغيل: ${rtime}*  
*🔄 الوقت النشط: ${uptime}*  
*🔧 البريفكس: ${usedPrefix}*  
*🌐 الحالة: ${self ? "خاص" : "عام"}*  
*👥 عدد المستخدمين المسجلين: ${totalusrReg}*  
*📈 إجمالي المستخدمين: ${totalusr}*  
*🤖 البوت الفرعي: ${(conn.user.jid == global.conn.user.jid ? '' : `بوت فرعي من:\n ▢ +${global.conn.user.jid.split`@`[0]}`) || 'لا يوجد بوت فرعي'}*
*ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ*
*💬 الدردشات: ${chats.length - groups.length}*  
*🗂️ المجموعات: ${groups.length}*  
*📊 الإجمالي: ${chats.length}*  
*ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ*
*📚 قراءة تلقائية: ${autoread ? "مفعل" : "غير مفعل"}*  
*🔒 تقييد: ${restrict ? "مفعل" : "غير مفعل"}*  
*💻 فقط للكمبيوتر: ${pconly ? "مفعل" : "غير مفعل"}*  
*🏢 فقط للمجموعات: ${gconly ? "مفعل" : "غير مفعل"}*  
*🛡️ مضاد للخصوصية: ${antiprivado ? "مفعل" : "غير مفعل"}*  
*📵 مضاد للمكالمات: ${antiCall ? "مفعل" : "غير مفعل"}*  
*⚙️ وضع JadiBot: ${modejadibot ? "مفعل" : "غير مفعل"}*
*➤━━━━━❖⊰🕷️⊱❖━━━━━➤*`.trim();
  
  const Message = {
    text: info,
    footer: wm,
  };

  // إرسال الرسالة
  await conn.sendMessage(m.chat, Message, { quoted: m });
};
handler.help = ['معلومات_البوت']
handler.tags = ['in']
handler.command = /^(معلومات_البوت)$/i;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}