/* Creado por Bruno Sobrino (https://github.com/BrunoSobrino) */
import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, {text, usedPrefix, command, conn}) => {
 try {
  if (!text) throw '- *🔱 ادخــل اســم الــفــيلــم او الـمـسـلـسـل الــذي تــريــده*';
  
  let aaaa;
  let img;
  aaaa = await searchC(text);
  const randomIndex = Math.floor(Math.random() * aaaa.length);
  
  try {
      img = 'https://wwv.cuevana8.com' + aaaa[randomIndex].image;
  } catch {
      img = 'https://www.poresto.net/u/fotografias/m/2023/7/5/f1280x720-305066_436741_5050.png';
  }
   await conn.sendMessage(m.chat, { react: { text: "🔍",key: m.key,}
  })

  if (aaaa.length === 0) throw '*- *🔱 فــشــل الــبــحــث*';
  
  const res = await aaaa.map((v) => `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
 *❐ ⤶الاسم↜${v.title}*
*❐ ⤶رابط↭التحميل↜* ${v.link}
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`).join('\n\n\n\n');
  const ads = ``;
   
   await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}
  })
  
  conn.sendMessage(m.chat, {image: {url: img}, caption: ads + res}, {quoted: m});
 } catch {
   return conn.sendMessage(m.chat, {text: '- *🔱 ادخــل اســم الــفــيــلــم او الـمـسـلـسـل الــذي تــريــده*'}, {quoted: m});   
 }    
};   
handler.help = ['سينما']
handler.tags = ['bu']
handler.command = ['سينما'];
export default handler;

async function searchC(query) {
  const response = await axios.get(`https://wwv.cuevana8.com/search?q=${query}`);
  const $ = cheerio.load(response.data);
  const resultSearch = [];
  $('.MovieList .TPostMv').each((_, e) => {
    const element = $(e);
    const title = element.find('.TPostMv .Title').first().text();  
    const link = element.find('a').attr('href');
    const image = element.find('img').attr('src');
    resultSearch.push({ title, link, image });
  });
  return resultSearch;
}