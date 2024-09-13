import { sticker } from '../lib/sticker.js';
import fetch from 'node-fetch';
import fs from 'fs';

// الدالة لجلب البيانات من الإنترنت
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err));
});

const handler = async (m, { conn, text, args }) => {
  if (!args[0]) throw ' ❐ *طريقة الاستخدام الصحيحه هي* \n\n*.مكس😈+🤤*';
  const [ايموشن1, ايموشن2] = text.split`+`;

  try {
    // استخدام API للحصول على الإيموشنات
    const anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(ايموشن1)}_${encodeURIComponent(ايموشن2)}`);
    
    if (anu.results.length === 0) {
      // إذا لم يكن هناك نتائج من Tenor API، حاول استخدام API بديل
      const backup = await fetchJson(`https://api.emojimix.com/api/mix/${encodeURIComponent(ايموشن1)}_${encodeURIComponent(ايموشن2)}`);
      
      if (backup.results.length === 0) {
        throw '❌ **لم يتم العثور على نتائج للإيموشنات المدخلة** ❌';
      }

      for (const res of backup.results) {
        const stiker = await sticker(false, res.url, global.packname, global.author);
        conn.sendFile(m.chat, stiker, null, { asSticker: true });
      }
    } else {
      for (const res of anu.results) {
        const stiker = await sticker(false, res.url, global.packname, global.author);
        conn.sendFile(m.chat, stiker, null, { asSticker: true });
      }
    }
  } catch (error) {
    throw `❌ **حدث خطأ أثناء البحث عن الإيموشنات**: ${error.message} ❌`;
  }
};

// تحديث الأمر إلى `مكس`
handler.help = ['مكس'].map((v) => v + '');
handler.tags = ['st'];
handler.command = /^(مكس)$/i;

export default handler;