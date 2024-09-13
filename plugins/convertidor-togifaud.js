/* 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 https://github.com/BrunoSobrino */

const handler = async (m, {conn, usedPrefix, command}) => {
  if (!m.quoted) throw '- *🔱 رد عــلــي فـيـديــو لـلـتـحـويــل*';

  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';
  if (!/(mp4)/.test(mime)) throw `- *🔱 صــيــغــة غــيــر مــدعـومــة*`;
  
  // إرسال تفاعل
  await conn.sendMessage(m.chat, { react: { text: "📽️", key: m.key } });

  m.reply('- *🔱 جــاري الـتـحـويــل*');
  
  const media = await q.download();
  conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: '- *🔱 تـــم الــتــحــويــل*'}, {quoted: m});
};
handler.help = ['تحويل_gif']
handler.tags = ['co']
handler.command = ['تحويل_gif'];
export default handler;