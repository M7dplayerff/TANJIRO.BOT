const handler = async (m, {conn, usedPrefix, text}) => {
  const datas = global;

  if (isNaN(text) && !text.match(/@/g)) {

  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  if (!text && !m.quoted) return conn.reply(m.chat, `*⦙🍷⦘ ↫ قم بعمل منشن للمراد ترقيته مع استخدام الامر*`, m);
  await conn.sendMessage(m.chat, { react: { text: "🔝",key: m.key,}
  })

  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `
*【❌┇فــشــلـت ⍅  الـعـمـلـيـة】*`, m);

  try {
    let user;
    if (text) {
      user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      user = m.quoted.sender;
    } else if (m.mentionedJid) {
      user = number + '@s.whatsapp.net';
    }

    const groupMetadata = await conn.groupMetadata(m.chat);
    const isAdmin = groupMetadata.participants.find(member => member.jid === user && member.isAdmin);

    if (isAdmin) {
      return conn.reply(m.chat, `*🔱 العضو المراد ترقيته ادمن بلفعل*`, m);
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    const participant = groupMetadata.participants.find(member => member.jid === user);
    const mentions = participant ? [participant.jid] : [];

    conn.sendMessage(m.chat, {
      text: `*⦙🍷⦘ ↫ تـــــم تــرقــيــة عــضــو جــديــد*\n\n- 🔱 *مـبـروك الـتـرقـيـة*`,
      mentions
    });
  } catch (e) {
    console.error(e);
  }
};

handler.help = ['رفع'];
handler.tags = ['gc'];
handler.command = /^رفع_ادمن|رفع$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;