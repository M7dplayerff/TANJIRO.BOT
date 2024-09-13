let handler = async (m, { conn, args }) => {
  await conn.sendMessage(m.chat, { react: { text: "🍻",key: m.key,}
  })
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

    const uniqueOnline = Object.values(conn.chats[id]?.messages || {}).map(item => item.key.participant).filter((value, index, self) => self.indexOf(value) === index);

    const sortedOnline = uniqueOnline.sort((a, b) => a.split('@')[0].localeCompare(b.split('@')[0]));

    const onlineList = sortedOnline.map((k, i) => `*${i + 1}ـ↜* @${k.split('@')[0]}`).join('\n') || '- *🔱 لـا يــوجــد احــد مــتــصــل الــان*';

    await conn.reply(m.chat, `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*🍻 الـمـتـصـلـيـن بــلـأنـتـرنــت هم*\n\n${onlineList}\n\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`, m, {
      contextInfo: { mentionedJid: sortedOnline }
    });
  } catch (e) {
    console.error(e);
  }
};

handler.help = ['قائمة_المتصلين'];
handler.tags = ['gc'];
handler.command = /^(قائمة_المتصلين)/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

export default handler;