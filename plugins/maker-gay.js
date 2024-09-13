const handler = async (m, {conn}) => {
  await conn.sendMessage(m.chat, { react: { text: "🎁",key: m.key,}
  })
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/gay', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  }), 'error.png', '*اصـلـا كـنـت شـاكـك 🙄🏳️‍🌈*', m);
};
handler.help = ['مفاجئه'];
handler.tags = ['ma'];
handler.command = /^(مفاجئه)$/i;
export default handler;