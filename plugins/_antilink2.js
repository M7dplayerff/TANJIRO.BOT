// TheMystic-Bot-MD@BrunoSobrino - _antilink2.js

// لتعيين اللغة، قم بتعديل ملف config.json في جذر المشروع.

const linkRegex = /https:/i;
export async function before(m, {conn, isAdmin, isBotAdmin, text}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  
  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = global.db.data.users[m.sender];
  const isGroupLink = linkRegex.exec(m.text);

  if (chat.antiLink2 && isGroupLink && !isAdmin) {
    user.warn = user.warn || 0;  // تعيين عدد التحذيرات إذا لم يكن موجودًا

    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      const linkThisGroup2 = `https://www.youtube.com/`;
      const linkThisGroup3 = `https://youtu.be/`;
      if (m.text.includes(linkThisGroup) || m.text.includes(linkThisGroup2) || m.text.includes(linkThisGroup3)) return !0;
    }

    // حذف الرسالة التي تحتوي على الرابط
    if (isBotAdmin) {
      await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
    }

    user.warn += 1;  // زيادة عدد التحذيرات

    if (user.warn < 5) {
      await this.sendMessage(m.chat, {
        text: `
*⦑🕷️⦒ ❐ الـروبــط مـمـنـوعـه🚫 ↜الـروبــط مـمـنـوعـه فـي هـذا الـروم لا تـكـررهــا احـم عـدد تـحـذيـراتـك ${user.warn}/5 لـو وصـلـو خـمـسـه هـتـوحـشـنـا🥱👋*`,
        mentions: [m.sender]
      }, {quoted: m});
    } else {
      user.warn = 0;  // إعادة تعيين عدد التحذيرات
      await this.sendMessage(m.chat, {
        text: `*⦑🕷️⦒ ❐ نـهـيـاتـك هـنـا ☠️ ↜لـلأسـف حــزرتـك اكـتـر مـن مـره انـك هـتـطـرد مـن الـروم بــس نـقـول اي الـمـخ نـعـمـه فــي الاغـلـب مــش عـنـدك🥱👋*`,
        mentions: [m.sender]
      }, {quoted: m});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }

    if (!isBotAdmin) return m.reply("*⦑🕷️⦒ ❐ لا امـلـك الـصـلـاحـيـات⚠️ ↜لا امـلـك الـصـلاحـيـات لازالـة الـروابــط🚫🫠*");
  }
  return !0;
}