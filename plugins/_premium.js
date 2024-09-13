const handler = (m) => m;

export async function all(m) {
  // الحصول على بيانات المستخدمين
  const datas = global;

  for (const user of Object.values(datas.db.data.users)) {
    if (user.premiumTime !== 0 && user.premium) {
      // التحقق من انتهاء صلاحية العضوية المميزة
      if (new Date() * 1 >= user.premiumTime) {
        user.premiumTime = 0;
        user.premium = false;
        const JID = Object.keys(datas.db.data.users).find((key) => datas.db.data.users[key] === user);
        const usuarioJid = JID.split`@`[0];
        // رسالة ثابتة باللغة العربية
        const textoo = `*✦━━━━━✦⊰🕷️⊱✦━━━━━━✦*
*【⌛| تــم ⎗ انـتـهـاء الـبـريـمـيـوم |⌛】*
*⟪🕷️⟫  الـعـضـو  ⟪⤶@${usuarioJid} ⟫*
*✦━━━━━✦⊰🕷️⊱✦━━━━━━✦*`;
        await this.sendMessage(JID, { text: textoo, mentions: [JID] }, { quoted: '' });
      }
    }
  }
}

/* let handler = m => m

export async function all(m) {
  let user = global.db.data.users[m.sender]
  if (m.chat.endsWith('broadcast')) return

  if (user.premiumTime != 0 && user.premium && new Date() * 1 >= user.premiumTime) {
    user.premiumTime = 0
    user.premium = false

    await m.reply(`*[❗] @${m.sender.split`@`[0]} انتهت فترة استخدامك كعضو مميز، لم تعد عضوًا مميزًا.*`, m.sender, { mentions: [m.sender] })
  }
}*/