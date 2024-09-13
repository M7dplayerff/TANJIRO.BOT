const handler = async (m, {conn, usedPrefix, text}) => {
  if (isNaN(text) && !text.match(/@/g)) {
    // التعامل مع الحالات عندما لا يكون النص رقمًا ولا يحتوي على علامة @
  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `
*⦙🍷⦘ ↫ قم بعمل منشن للمشرف المراد خفض رتبته*`, m);
  }
await conn.sendMessage(m.chat, { react: { text: "🔻",key: m.key,}
  })
  if (number.length > 13 || (number.length < 11 && number.length > 0)) {
    return conn.reply(m.chat, `
*【❌┇فــشــلـت ⍅  الـعـمـلـيـة】*`, m);
  }

  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
    // التعامل مع الأخطاء
  } finally {
    await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    conn.reply(m.chat, `*⦙🍷⦘ ↫ تـــــم تـخـفـيـض مـشـرف مـن رتـبـتـه*\n\n- 🔱 *مـتـأسـف لـذلـك*`, m, {mentions: [user]});
  }
};

handler.help = ['خفض']
handler.tags = ['gc'];
handler.command = /^(خفض)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;