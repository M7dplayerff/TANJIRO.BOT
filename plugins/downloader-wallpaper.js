import {wallpaper} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `- *🔱 ادخــل اســم الــصــورة الــذي تــريــدهــا*`;
  await conn.sendMessage(m.chat, { react: { text: "📥",key: m.key,}
  })
  
  const res = await wallpaper(text);
  const img = res[Math.floor(Math.random() * res.length)];
  
  conn.sendFile(m.chat, img, 'error.jpg', `*⟪📥⟫ تـــم تـنـزيــل صــورتــك*

- *ـ 🔱 ${text}*`, m);
};

handler.help = ['تنزيل_صوره']
handler.tags = ['do'];
handler.command = /^(تنزيل_صوره?)$/i;

export default handler;