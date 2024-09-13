const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

export async function before(m, {conn, isAdmin, isBotAdmin}) {
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
  const grupo = `https://chat.whatsapp.com`;
  

  // في حالة إذا كان المرسل أدمن وأرسل رابط مجموعة
  if (isAdmin && chat.antiLink && m.text.includes(grupo)) return !0;

  // في حالة تفعيل الحماية ضد الروابط، تم إرسال رابط مجموعة، والمُرسل ليس أدمن
  if (chat.antiLink && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      if (m.text.includes(linkThisGroup)) return !0;
    }

    // زيادة عدد التحذيرات
    user.warn = user.warn || 0;
    user.warn += 1;

    // حذف الرسالة التي تحتوي على الرابط إذا كان البوت أدمن
    if (isBotAdmin) {
      await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
    } else {
      // إرسال رسالة إذا لم يكن البوت أدمن
      return await m.reply(`*⦑🕷️⦒ ❐ لا امـلـك الـصـلـاحـيـات⚠️ ↜لا امـلـك الـصـلاحـيـات لازالـة الـروابــط🚫🫠*`);
    }

    // إذا كان عدد التحذيرات أقل من 5، يتم إرسال رسالة تحذير
    if (user.warn < 5) {
      await this.sendMessage(m.chat, {
        text: `
*⦑🕷️⦒ ❐ روابــط الـمـجـمـوعـات مـمـنـوعــه🚫 ↜روابــط الـمـجـمـوعــات مـمـنـوعـه فـي هـذا الـروم لا تـكـررهــا احـم عـدد تـحـذيـراتـك ${user.warn}/5 لـو وصـلـو خـمـسـه هـتـوحـشـنـا🥱👋*`,
        mentions: [m.sender]
      }, {quoted: m});
    } else {
      // إذا وصل عدد التحذيرات إلى 5، يتم طرد المستخدم
      user.warn = 0;
      await this.sendMessage(m.chat, {
        text: `*⦑🕷️⦒ ❐ نـهـيـاتـك هـنـا ☠️ ↜لـلأسـف حــزرتـك اكـتـر مـن مـره انـك هـتـطـرد مـن الـروم بــس نـقـول اي الـمـخ نـعـمـه فــي الاغـلـب مــش عـنـدك🥱👋*`,
        mentions: [m.sender]
      }, {quoted: m});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }

    if (!bot.restrict) return m.reply(texto4);
  }
  return !0;
}