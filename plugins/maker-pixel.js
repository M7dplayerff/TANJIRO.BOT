const handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: "🤪",key: m.key,}
  })
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/pixelate', {
    avatar: await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    comment: text,
    username: conn.getName(m.sender),
  }), 'error.png', '*مـبـروك يـا مـبـكـسـل 🙄*', m);
};

handler.help = ['بيكسل'];
handler.tags = ['ma'];
handler.command = /^(بيكسل)$/i;
export default handler;