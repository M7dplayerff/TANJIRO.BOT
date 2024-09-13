import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper-sosmed'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `- *🔱 اكــتــب اســم الـاغـنـيـة الــذي تــريــدهــا*`
  let res = await yts(text)
  let vid = res.videos[0]
  await conn.sendMessage(m.chat, { react: { text: "🎶",key: m.key,}
  })  
  if (!vid) throw '- *🔱 تــأكــد مـــن الــرابــط الــذي ادخـلـتـه*'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
let vap = `*〔 Y O U T U B E P L A Y 〕*
*✧━═══━⊰🎶⊱━═══━✧*
*❐⤶العنوان↜${title}*

*❐⤶رابط المقطع↜* ${url}
*✠ ── ✷ ─ ‹🕷️› ─ ✷ ── ✠* `
conn.sendMessage(m.chat, {
text: vap,
contextInfo: {
externalAdReply: {
title: vap,
thumbnailUrl: thumbnail,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m}) 
  const yt = await youtubedl(url).catch(async () => await youtubedlv2(url))
const link = await yt.audio['128kbps'].download()
  let doc = { 
  audio: 
  { 
    url: link 
}, 
mimetype: 'audio/mp4', fileName: `${title}`, contextInfo: { externalAdReply: { showAdAttribution: true,
mediaType:  2,
mediaUrl: url,
title: title,
body: "ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ",
sourceUrl: url,
thumbnail: await(await conn.getFile(thumbnail)).data                                                                     
                                                                                                                 }
                       }
  }
  return conn.sendMessage(m.chat, doc, { quoted: m })
}
handler.help = ['شغل']
handler.tags = ['do']
handler.command = /^اغنية|شغل$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}