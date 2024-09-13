const handler = async (m, {conn, usedPrefix, command}) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `
*⦙🍷⦘ ↫ قم بلرد علي الرساله الذي تريد حذفها*`, m);
  }
  await conn.sendMessage(m.chat, { react: { text: "📛",key: m.key,}
  })
  try {
    const delet = m.message.extendedTextMessage.contextInfo.participant;
    const bang = m.message.extendedTextMessage.contextInfo.stanzaId;
    return conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
  } catch {
    return conn.sendMessage(m.chat, {delete: m.quoted.vM.key});
  }
};

handler.help = ['حذفف'];
handler.tags = ['gc'];
handler.command = /^حذ(فف)?$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;