import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

async function wikipedia(query) {
  try {
    // تعديل رابط ويكيبيديا للبحث باللغة العربية
    const response = await axios.get(`https://ar.wikipedia.org/wiki/${query}`);
    const $ = cheerio.load(response.data);
    
    // جلب العنوان
    const title = $('#firstHeading').text().trim();
    
    // جلب الصورة
    const thumb = $('#mw-content-text .infobox img').attr('src') || 'https://i.ibb.co/nzqPBpC/http-error-404-not-found.png';
    
    // جلب المحتوى
    const paragraphs = [];
    $('#mw-content-text .mw-parser-output > p').each((index, element) => {
      let text = $(element).text().trim();
      if (text) {
        // تأكد من أن النص باللغة العربية فقط
        const arabicText = text.match(/[\u0600-\u06FF\s]+/g)?.join('').trim(); // استخراج النصوص العربية فقط
        if (arabicText) {
          // إضافة تنسيق بارز لجميع الفقرات
          paragraphs.push(`*${arabicText}*`);
        }
      }
    });

    const data = {
      status: response.status,
      result: {
        title: title,
        thumb: 'https:' + thumb,
        content: paragraphs.join('\n\n') // دمج جميع الفقرات
      }
    };
    return data;
  } catch (error) {
    console.error('Error fetching data from Wikipedia:', error);
    const notFound = {
      status: 404,
      message: '- *🔱 حــدث خــطــأ*'
    };
    return notFound;
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `- *🔱 ادخــل الـنـص الــمــراد الـبـحث عــنــه*`;
  
  await conn.sendMessage(m.chat, { react: { text: "🔍",key: m.key,}
  })
  const result = await wikipedia(text);
  
  if (result.status === 200) {
    const formattedContent = `*${result.result.title}*\n\n${result.result.content}`; 
    
    await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}
  })
    m.reply(`\n\n${formattedContent}\n\n*📸الصورة↜* ${result.result.thumb}`);
  } else {
    m.reply(result.message);
  }
};

handler.help = ['ويكيبيديا']
handler.tags = ['bu'];
handler.command = /^(بحث_ويكيبيديا|البحث_ويكيبيديا|ويكيبيديا)$/i;

export default handler;