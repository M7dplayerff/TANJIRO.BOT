const handler = async (m, {conn, text, usedPrefix, command}) => {
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    who = m.chat;
  }

  if (!who) {
    const textpremERROR = `*⌫ ❐ الطريقه الصحيحه لأستخدم الامر هي↜ .اضافة_بريميوم 1 @user*`;
    return m.reply(textpremERROR, null, {mentions: conn.parseMention(textpremERROR)});
  }

  const user = global.db.data.users[who];
  const name = '@' + who.split`@`[0];

  if (!user) {
    const ERROR = `*【🚫┇مستخدم ⍅ غير موجود】*`;
    return m.reply(ERROR, null, {mentions: conn.parseMention(ERROR)});
  }

  const hora1 = 60 * 60 * 1000; // 1 ساعة
  const dia1 = 24 * hora1; // 1 يوم
  const semana1 = 7 * dia1; // 1 أسبوع
  const mes1 = 30 * dia1; // 1 شهر
  const now = Date.now();

  if (command === 'اضافة_بريميوم' || command === 'عضو_بريميوم') {
    if (now < user.premiumTime) user.premiumTime += hora1;
    else user.premiumTime = now + hora1;
    user.premium = true;
    const textprem1 = `*╔═━━━═⊰🕷️⊱═━━━═╗*\n*❐ المستخدم↜ ${name}*\n*❐ بريميوم:* ✅\n*❐ المده↜ ساعة*\n*╚═━━━═⊰🕷️⊱═━━━═╝*`;
    m.reply(textprem1, null, {mentions: conn.parseMention(textprem1)});
  }

  if (command === 'اضافة_بريميوم2' || command === 'عضوبريميوم2') {
    if (now < user.premiumTime) user.premiumTime += dia1;
    else user.premiumTime = now + dia1;
    user.premium = true;
    const textprem2 = `*╔═━━━═⊰🕷️⊱═━━━═╗*\n*❐ المستخدم↜ ${name}*\n*❐ بريميوم:* ✅\n*❐ المده↜ يوم*\n*╚═━━━═⊰🕷️⊱═━━━═╝*`;
    m.reply(textprem2, null, {mentions: conn.parseMention(textprem2)});
  }

  if (command === 'اضافة_بريميوم3' || command === 'عضوبريميوم3') {
    if (now < user.premiumTime) user.premiumTime += semana1;
    else user.premiumTime = now + semana1;
    user.premium = true;
    const textprem3 = `*╔═━━━═⊰🕷️⊱═━━━═╗*\n*❐ المستخدم↜ ${name}*\n*❐ بريميوم:* ✅\n*❐ المده↜ أسبوع*\n*╚═━━━═⊰🕷️⊱═━━━═╝*`;
    m.reply(textprem3, null, {mentions: conn.parseMention(textprem3)});
  }

  if (command === 'اضافة_بريميوم4' || command === 'عضوبريميوم4') {
    if (now < user.premiumTime) user.premiumTime += mes1;
    else user.premiumTime = now + mes1;
    user.premium = true;
    const textprem4 = `*╔═━━━═⊰🕷️⊱═━━━═╗*\n*❐ المستخدم↜ ${name}*\n*❐ بريميوم:* ✅\n*❐ المده↜ شهر*\n*╚═━━━═⊰🕷️⊱═━━━═╝*`;
    m.reply(textprem4, null, {mentions: conn.parseMention(textprem4)});
  }
};

handler.help = ['اضافة_بريميوم'];
handler.tags = ['ow'];
handler.command = ['اضافة_بريميوم', 'عضوبريميوم', 'اضافة_بريميوم2', 'عضوبريميوم2', 'اضافة_بريميوم3', 'عضوبريميوم3', 'اضافة_بريميوم4', 'عضوبريميوم4'];
handler.group = true;
handler.rowner = true;

export default handler;