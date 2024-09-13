const handler = async (m, {conn, text}) => {
  const datas = global;

  if (!text) return m.reply(`*☜ بعد الامر اكتب الرساله وقم بمنشنة الشخص المراد عمل فيك ريبلاي له*`, null);
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const cm = copy(m);
  let who;
  if (text.includes('@0')) who = '0@s.whatsapp.net';
  else if (m.isGroup) who = cm.participant = m.mentionedJid[0];
  else who = m.chat;
  if (!who) return m.reply(`*☜ بعد الامر اكتب الرساله وقم بمنشنة الشخص المراد عمل فيك ريبلاي له*`, null);

  cm.key.fromMe = false;
  cm.message[m.mtype] = copy(m.msg);
  const sp = '@' + who.split`@`[0];
  const [fake, ...real] = text.split(sp);
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
    contextInfo: {
      mentionedJid: conn.parseMention(real.join(sp).trim()),
    },
  });
};

handler.help = ['فيك_ريبلاي'];
handler.tags = ['to'];
handler.command = /^(فيك_ريبلاي)$/;

export default handler;

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}