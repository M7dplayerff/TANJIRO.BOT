const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  await conn.sendMessage(m.chat, { react: { text: "📧",key: m.key,}
  })
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const pesan = args.join` `;
  let teks = `*➺━━━━━★⊰🕷️⊱★━━━━━➺*\n`;
  teks += `*【🍷┇مـنـشـن ⍅  جـمـاعــي】*\n\n`;
  teks += `- *الـرسـالــة↜${pesan}*\n\n`;
  for (const mem of participants) {
    teks += `*ـ* 🔱 @${mem.id.split('@')[0]}\n\n`;
  }
  teks += `*➺━━━━━★⊰🕷️⊱★━━━━━➺*`;
  teks += ``;
  
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};

handler.help = ['منشن'];
handler.tags = ['gc'];
handler.command = /^(منشن)$/i;
handler.admin = true;
handler.group = true;
export default handler;