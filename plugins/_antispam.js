export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
  const datas = global;
  const user = datas.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const delet = m.key.participant;
  const bang = m.key.id;
  const name = await conn.getName(m.sender);

  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;

  // تجنب تطبيق الأمر على البوت نفسه
  if (m.sender === this.user.jid) return !0;

  // نظام مضاد للأسبام
  user.messages = user.messages || [];  // تعيين قائمة الرسائل إذا لم تكن موجودة
  user.messages.push(Date.now());  // إضافة توقيت الرسالة الحالية

  // الاحتفاظ بالرسائل الأخيرة فقط
  user.messages = user.messages.filter(time => Date.now() - time <= 15000);  // الاحتفاظ بالرسائل خلال آخر دقيقة

  // حساب عدد الرسائل الحالية
  const messageCount = user.messages.length;

  if (messageCount >= 7) {  // إذا كان عدد الرسائل 5 أو أكثر
    // التعامل مع التحذيرات
    user.warn = user.warn || 0;  // تعيين عدد التحذيرات إذا لم يكن موجودًا

    // تحديد متى يجب تطبيق التحذير التالي
    if (!user.lastWarnTime || Date.now() - user.lastWarnTime >= 15000) {
      user.warn += 1;  // زيادة عدد التحذيرات
      user.lastWarnTime = Date.now();  // تحديث وقت التحذير الأخير

      if (user.warn < 5) {
        await this.sendMessage(m.chat, {
          text: `*⦑🕷️⦒ ❐ مــمــنــوع الـاسـبـام هــنــا⚠️ ↜الـاسـبـام مـمـنـوع فــي هــذا الــروم اعــتــقــد انـــه شــئ ســهــل الــفــهــم حــتــي لـضـعـيـفـيـن الــفــهــم مـثـلــك انـــذارتك ${user.warn}/5 لـو وصـلـو خـمـسـه هـتـوحـشـنـا🥱👋*`,
          mentions: [m.sender]
        }, { quoted: m });
      } else {
        user.warn = 0;  // إعادة تعيين عدد التحذيرات
        await this.sendMessage(m.chat, {
          text: `*⦑🕷️⦒ ❐ نـهـيـاتـك هـنـا ☠️ ↜لـلأسـف حــزرتـك اكـتـر مـن مـره انـك هـتـطـرد مـن الـروم بــس نـقـول اي الـمـخ نـعـمـه فــي الاغـلـب مــش عـنـدك 🥱👋*`,
          mentions: [m.sender]
        }, { quoted: m });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }
    }
  }

  return !0;
}