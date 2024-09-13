export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
  const datas = global;
  const user = datas.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const delet = m.key.participant;
  const bang = m.key.id;
  const name = await conn.getName(m.sender);

  // تجاهل الرسائل المرسلة من البوت نفسه
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  
  if (!m.isGroup) return !1;

  // نظام حذف الرسائل الطويلة
  if (m.text.length >= 10000) { // أقصى عدد من الأحرف المقبولة في الرسالة هو 1000.
    if (isBotAdmin) {
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
    } else {
      return m.reply('*⦑🕷️⦒ ❐ لا امـلـك الـصـلـاحـيـات⚠️ ↜لا امـلـك الـصـلاحـيـات لازالـة الـرسـائـل الـمـفـيـرسـة🚫🫠*');
    }

    // نظام التحذيرات، تجاهل البوت نفسه
    if (!m.fromMe) {  // إضافة شرط لتجنب تحذير البوت نفسه
      user.warn = user.warn || 0;  // تعيين عدد التحذيرات إذا لم يكن موجودًا

      user.warn += 1;  // زيادة عدد التحذيرات

      if (user.warn < 5) {
        await this.sendMessage(m.chat, {
          text: `
*⦑🕷️⦒ ❐ رسـالـتـك طـويـلـة⚠️ ↜رسـالـتـك طـويـلـة و مــن الـمـمـكـن ان تـحـتـوي عـلـي فـيـرس لا تـكـررهــا احـم عـدد تـحـذيـراتـك ${user.warn}/5 لـو وصـلـو خـمـسـه هـتـوحـشـنـا🥱👋*`,
          mentions: [m.sender]
        }, { quoted: m });
      } else {
        user.warn = 0;  // إعادة تعيين عدد التحذيرات
        await this.sendMessage(m.chat, {
          text: `*⦑🕷️⦒ ❐ نـهـيـاتـك هـنـا ☠️ ↜لـلأسـف حــزرتـك اكـتـر مـن مـره انـك هـتـطـرد مـن الـروم بــس نـقـول اي الـمـخ نـعـمـه فــي الاغـلـب مــش عـنـدك🥱😮‍💨*`,
          mentions: [m.sender]
        }, { quoted: m });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }
    }
  }

  return !0;
}