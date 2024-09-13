const handler = async (m, { conn, text, command, usedPrefix }) => {

  const pp = './src/warn.jpg';

  let who;

  if (m.isGroup) {

    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;

  } else {

    who = m.chat;

  }

  const user = global.db.data.users[who] || { warn: 0 };  // تعيين بيانات افتراضية إذا لم يكن المستخدم مسجلاً

  const bot = global.db.data.settings[conn.user.jid] || {};

  // رسالة توجيهية تتضمن منشن الشخص مع إيموجي مناسب

  const warntext = `*⦙🍷⦘ ↫ مـنـشـن الـشـخـص الـمـراد الـغـاء انـذار عــنــه*`;

  await conn.sendMessage(m.chat, { react: { text: "📛", key: m.key } });

  if (!who) {

    await m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });

    return;  // تأكد من إنهاء الدالة هنا إذا لم يتم تحديد المستخدم

  }

  if (m.mentionedJid.includes(conn.user.jid)) return;

  if (user.warn === 0) {

    await m.reply(`

*⦙🍷⦘ ↫ الـعـضـو الـذي تـحـاول رفــع انــذار عــنــه لـيـس لـديــه انــذارات*`, m.chat);

    return;  // تأكد من إنهاء الدالة هنا إذا لم يكن لدى المستخدم إنذارات

  }

  // الحصول على اسم المستخدم إذا كان مسجلًا في البوت، وإلا استخدام المنشن الافتراضي

  const userName = user && user.registered && user.name ? user.name : `@${who.split`@`[0]}`;

  // عدد الإنذارات قبل إلغاء الإنذار

  const warnsBefore = user.warn;

  // إلغاء الإنذار

  user.warn -= 1;

  // عدد الإنذارات بعد إلغاء الإنذار

  const warnsAfter = user.warn;

  // رسالة تنسيق جديدة مع إيموجي مناسب وإطار زخرفي

  const message = `*⦙🍷⦘ ↫ تــم الــغــاء انــذار مـن عــضــو*

- *🤴 الــعــضــو↜ ${userName}*

- *💳 عــدد الـانـذارات الــســابــق↜ ${warnsBefore}*

- *📛 عــدد الـانـذارات الــحــالي↜ ${warnsAfter}*`;

  await m.reply(message, null, { mentions: [who] });

};

handler.help = ['الغاء_انذار'];

handler.tags = ['gc'];

handler.command = /^(الغاء_انذار)$/i;

handler.group = true;

handler.admin = true;

handler.botAdmin = true;

export default handler;