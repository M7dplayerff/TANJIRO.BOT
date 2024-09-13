const getDisplayName = (userId) => {
  const user = db.data.users[userId];
  return user && user.name ? user.name : `@${userId.split('@')[0]}`;
};

async function handler(m, { groupMetadata, conn }) {
  const ps = groupMetadata.participants;
  const a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);

  // Add the reaction before sending the message
  await conn.sendMessage(m.chat, { react: { text: "💏", key: m.key } });

  const message = `*╭────────── ⌠زواج⌡ ──────────╮*
*│                                            │*
*❦ ❒ مبروك للعروسين:*

*┠≽ ❒ العريس: ${getDisplayName(a.id)}                      │*
*┠≽ ❒ العروسة: ${getDisplayName(b.id)}                     │*
*│                                            │*
*╰────────── ⌠💑⌡ ──────────╯*
    *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
`;

  await m.reply(message, null, {
    mentions: [a.id, b.id],
  });
}

handler.help = ['زواج'];
handler.tags = ['fu'];
handler.command = ['زواج'];
handler.group = true;

export default handler;