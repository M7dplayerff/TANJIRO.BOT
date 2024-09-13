export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {

  const datas = global;

  const user = datas.db.data.users[m.sender];

  const chat = global.db.data.chats[m.chat];

  const bot = global.db.data.settings[this.user.jid] || {};

  const delet = m.key.participant;

  const bang = m.key.id;

  const name = await conn.getName(m.sender);

  const botNumber = this.user.jid; // رقم البوت نفسه

  if (m.isBaileys && m.fromMe || m.sender === botNumber) {

    return !0; // تجاهل الرسائل من البوت نفسه

  }

  if (!m.isGroup) return !1;

  // الكلمات المحظورة

  const forbiddenWords = ["متناك", "متناكه", "متناكة", "شرموط", "شرموطه", "شرموطة", "قحبه", "قاحب", "قحبة", "عاهره", "عاهرة", "عاهر", "لبوه", "لبوة", "منيك", "منيكه", "منيكة", "شرمطه", "شرمطة", "كسمك", "كس", "كسختك", "القحبه", "القحبة", "وسخه", "وسخة", "الوسخه", "الوسخة", "ابن الحرام","بنت الحرام", "داعر", "داعره", "داعرة", "فاجر", "فاجرة", "فاجره", "بنتمتناكه","بنتمتناكة", "بنمتناكه", "بنمتناكة", "عرص", "معرصه", "معرصة", "بن العرص", "بنت العرص", "خول"]; // هنا يمكنك إضافة المزيد من الكلمات

  // نظام تحذير للكلمات المحظورة

  const messageText = m.text.toLowerCase().trim(); // تحويل النص إلى أحرف صغيرة وإزالة المسافات الزائدة

  for (let word of forbiddenWords) {

    // تعبير منتظم للتحقق من أن الكلمة مستقلة، محاطة بمسافات أو علامات ترقيم أو في بداية/نهاية النص

    const regex = new RegExp(`(^|\\s)${word}($|\\s)`, 'i');

    if (regex.test(messageText)) {

      if (isBotAdmin) {

        // حذف الرسالة أولاً

        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });

        

        // نظام التحذيرات

        user.warn = user.warn || 0;  // تعيين عدد التحذيرات إذا لم يكن موجودًا

        user.warn += 1;  // زيادة عدد التحذيرات

        if (user.warn < 5) {

          await this.sendMessage(m.chat, {

            text: `*⦑🕷️⦒ ❐ الــســب مــمــنــوع هــنــا⚠️ ↜اعــتــقــد ان مــن قــامــو بـتـعـلـيـمـك الــزوق نـسـيـو بـعـض الـاشـيـاء حــان الـوقـت لـتـعـلـم ذلــك انـــذارتك ${user.warn}/5 لـو وصـلـو خـمـسـه هـتـوحـشـنـا🥱👋*`,

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

        break; // إذا وجد الكلمة، يخرج من الحلقة

      } else {

        return m.reply('*⦑🕷️⦒ ❐ لا امـلـك الـصـلـاحـيـات⚠️ ↜لــم تـعـطـونــي الـصـلـحـيـات لـأقــوم بـلـتـحـذيــرات ارفـعـونــي ادمــــن🚫🫠*');

      }

    }

  }

  return !0;

}