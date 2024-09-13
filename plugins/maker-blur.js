const handler = async (m, {conn}) => {
  await conn.sendMessage(m.chat, { react: { text: "💨",key: m.key,}
  })
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/blur', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  }), 'hornycard.png', '*بـــلـــور 💨*', m);
};
handler.help = ['بلور'];
handler.tags = ['ma'];
handler.command = /^بلور$/i;
export default handler;