const handler = async (m, {conn, usedPrefix, command}) => {
  // التحقق من وجود ذكر لمستخدم أو رد على رسالة
  if (!m.mentionedJid[0] && !m.quoted) {
    return m.reply(`*⦙🍷⦘ ↫ قم بعمل منشن للشخص المراد طرده من الروم*`, m.chat, {
      mentions: conn.parseMention(`*⦙🍷⦘ ↫ قم بعمل منشن للشخص المراد طرده من الروم*`)
    });
  }

  // تحديد المستخدم الذي سيتم طرده إما من خلال ذكره في الرسالة أو من خلال الرد على رسالة
await conn.sendMessage(m.chat, { react: { text: "👋",key: m.key,}
  })
  const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

  // طرد المستخدم من المجموعة
  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};
handler.help = ['طرد']
handler.tags = ['gc']
handler.command = /^(طرد)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;