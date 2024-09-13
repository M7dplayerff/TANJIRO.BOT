const handler = async (m, {conn, args}) => {
  await conn.sendMessage(m.chat, { react: { text: "😶",key: m.key,}
  })
  const text = args.slice(1).join(' ');
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/its-so-stupid', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    dog: text || 'im+stupid',
  }), 'error.png', `😅احممم هو انا سميته قسم الكرينج من قليل😂خد بوسه ومتزعلش😘انت اكيد مش كدا او ممكن عادي الله اعلم😈`, m);
};
handler.help = ['غبي'];
handler.tags = ['ma'];
handler.command = /^(غبي)$/i;
export default handler;