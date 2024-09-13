const handler = async (m, { conn, text, participants }) => {
  await conn.sendMessage(m.chat, { react: { text: "👻",key: m.key,}
  })
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;

  const member = participants.map((u) => u.id);
  const sum = text ? parseInt(text) : member.length;

  let total = 0;
  const sider = [];
  const mentions = [];
  
  for (let i = 0; i < sum; i++) {
    const users = m.isGroup ? participants.find((u) => u.id === member[i]) : {};
    if ((typeof global.db.data.users[member[i]] === 'undefined' || global.db.data.users[member[i]].chat === 0) && !users.isAdmin && !users.isSuperAdmin) {
      if (typeof global.db.data.users[member[i]] !== 'undefined') {
        if (global.db.data.users[member[i]].whitelist === false) {
          total++;
          sider.push(member[i]);
          mentions.push(users);
        }
      } else {
        total++;
        sider.push(member[i]);
        mentions.push(users);
      }
    }
  }

  if (total === 0) {
    return conn.reply(m.chat, `*⦑🕷️⦒ ❐ مــلــوك الـتـفـاعـل 👑 ↜صـراحـه ابـهـرتـونـي بـتـفـاعـلـكـم مـا فـي ولـا شـبـح🥱👋*`, m);
  }

  // Prepare the text for the message with mentions
  let teks = `*➺━━━━━★⊰🕷️⊱★━━━━━➺*\n`;
  teks += `*اجـمـالـي الـاعـضـاء 🤴↜ ${participants.length}*\n\n`;
  teks += `*⦙👻⦘ ↫الـاشــبــاح*\n\n`;
  teks += `${sider.map(id => `- *ـ*👻 @${id.split('@')[0]}`).join('\n')}\n\n`;
  teks += `*➺━━━━━★⊰🕷️⊱★━━━━━➺*\n`;
  teks += `*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;

  conn.sendMessage(m.chat, {
    text: teks,
    mentions: mentions.map((user) => user.id)
  });
};
handler.help = ['الاشباح']
handler.tags = ['gc']
handler.command = /^(الاشباح)$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;