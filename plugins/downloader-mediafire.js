import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { mediafiredl } from '@bochilteam/scraper';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `- *🔱 ادخــل رابــط مــلــف مـيـديـا فـايـر بــعــد الـامــر*`;
  
  // التفاعل بإيموجي قبل الرد
  try {
    await conn.sendMessage(m.chat, { react: { text: "📄", key: m.key } });
  } catch (e) {
    console.log("خطأ في التفاعل بالإيموجي:", e);
  }

  try {
    const resEX = await mediafiredl(args[0]);
    const captionES = `*✧━══════━⊰📄⊱━══════━✧*
*❐⤶الاسم↜${resEX.filename}*\n

*❐⤶الحجم↜${resEX.filesizeH}*\n

*❐⤶النوع↜${resEX.ext}*\n\n
 
*✠ ───── ✷ ─ ‹🕷️› ─ ✷ ───── ✠*  

`.trim();
    m.reply(captionES);
    await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, { mimetype: resEX.ext, asDocument: true });
    
  } catch (error) {
    try {
      const res = await mediafireDl(args[0]);
      const { name, size, date, mime, link } = res;
      const caption =  `*✧━═══════━⊰📄⊱━═══════━✧*
*❐⤶الاسم↜${name}*\n

*❐⤶الحجم↜${size}*\n

*❐⤶النوع↜${mime}*\n\n
 
*✠ ────── ✷ ─ ‹🕷️› ─ ✷ ────── ✠*  `.trim();
      await m.reply(caption);
      await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true });
    } catch (err) {
      await m.reply("- *🔱 فــشــل الـتـحـمـيـل*");
    }
  }
};
handler.help = ['ميديافاير']
handler.tags = ['do']
handler.command = /^(ميديافاير)$/i;
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www.mediafire.com/${url.replace('https://www.mediafire.com/', '')}`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').trim();
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').trim();
  let mime = '';
  const rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return { name, size, date, mime, link };
}