import yts from 'yt-search';
import fs from 'fs';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `- *🔱 ادخــل اســم قـائـمـة الـتـشـغـيـل الــذي تــريــدهــا عـلـي يــوتـيـوب*`;
  await conn.sendMessage(m.chat, { react: { text: "📥",key: m.key,}
  })

  try {
    const vids_ = {
      from: m.sender,
      urls: [],
    };
    if (!global.videoList) {
      global.videoList = [];
    }
    if (global.videoList[0]?.from == m.sender) {
      global.videoList.splice(0, global.videoList.length);
    }
    const results = await yts(text);
   const teks = results.all.map((v, i) => {
      const link = v.url;
      vids_.urls.push(link);
      return `*❴${i + 1}❵* *✧━══━⊰💽⊱━══━✧*
❴${v.title}❵

*❐⤶رابط↜* ${v.url}

*❐⤶المدة↜${v.timestamp}*

*❐⤶منذ↜${v.ago}*

*❐⤶المشاهدات↜* ${v.views}
*✠ ─── ✷ ─ ‹🕷️› ─ ✷ ─── ✠*`;
    }).join('\n\n');
    
    conn.sendFile(m.chat, results.all[0].thumbnail, 'yts.jpeg', textoInfo + '\n\n' + teks, m);
    global.videoList.push(vids_);
  } catch {
    await m.reply(`- *🔱 حــدث خــطــأ*`);
  }
};

handler.help = ['بلاي_ليست'];
handler.tags = ['do'];
handler.command = /^بلاي_ليست$/i;

export default handler;