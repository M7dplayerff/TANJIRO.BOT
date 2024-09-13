// banChat.js
const handler = async (m, {conn, command, args}) => {
  if (!args[0] || !['يوم', 'ثلاث أيام', 'أسبوع', 'شهر'].includes(args[0])) {
    return m.reply(`
╔════════════════════════════════════════╗
║ ❗️ *طريقة الاستخدام:*                     ║
║ ⏳ *مثال:* ${command} يوم                 ║
║ ⏳ *اختيارات:* يوم، ثلاث أيام، أسبوع، شهر ║
╚════════════════════════════════════════╝
    `);
  }

  const period = args[0];
  let duration;

  switch (period) {
    case 'يوم':
      duration = 1 * 24 * 60 * 60 * 1000; // 1 يوم
      break;
    case 'ثلاث أيام':
      duration = 3 * 24 * 60 * 60 * 1000; // 3 أيام
      break;
    case 'أسبوع':
      duration = 7 * 24 * 60 * 60 * 1000; // 1 أسبوع
      break;
    case 'شهر':
      duration = 30 * 24 * 60 * 60 * 1000; // 1 شهر
      break;
  }
await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const banUntil = Date.now() + duration;
  global.db.data.chats[m.chat].banUntil = banUntil;
  global.db.data.chats[m.chat].isBanned = true;

  m.reply(`
╔════════════════════════════════════════╗
║ 🚫 *تم حظر الشات من استعمال البوت*       ║
║ 🕒 *مدة الحظر:* ${period}                 ║
║ ⏳ *الوقت المتبقي لرفع الحظر:*             ║
║ *سيتم حسابه تلقائيًا عند محاولة الاستخدام*║
║ 😠 أكيد عملتو حاجة زعلت تانجيرو          ║
╚════════════════════════════════════════╝
  `);
};

// Check ban status before executing other commands
const checkBan = async (m, next) => {
  if (global.db.data.chats[m.chat]?.isBanned) {
    if (Date.now() > global.db.data.chats[m.chat].banUntil) {
      // Ban period expired, lift the ban
      global.db.data.chats[m.chat].isBanned = false;
      global.db.data.chats[m.chat].banUntil = null;
      m.reply(`
╔════════════════════════════════════════╗
║ 🎉 *تم رفع الحظر عن الشات!*             ║
║ 😌 *الآن يمكنك استخدام البوت*           ║
╚════════════════════════════════════════╝
      `);
    } else {
      // Still banned
      const remainingTime = global.db.data.chats[m.chat].banUntil - Date.now();
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
      m.reply(`
╔════════════════════════════════════════╗
║ 🚫 *الشات محظور من استعمال البوت*        ║
║ 🕒 *الوقت المتبقي لرفع الحظر:* ${days} أيام، ${hours} ساعات، ${minutes} دقائق، ${seconds} ثواني ║
╚════════════════════════════════════════╝
      `);
      return;
    }
  }
  next();
};

handler.checkBan = checkBan;
handler.help = ['بان_شات'];
handler.tags = ['ow'];
handler.command = /^بان_شات$/i;
handler.rowner = true;
export default handler;