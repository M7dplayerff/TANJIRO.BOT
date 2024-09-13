import axios from 'axios';

let handler = async (message, { conn, text }) => {
  if (!text) return conn.reply(message.chat, '- *🔱 اكــتــب اســم الــشــئ الــذي تــريــد الـبـحـث عــنــه فــي تـيـكـتـوك*', message);

  // إرسال التفاعل الأول بمجرد كتابة الأمر
  await conn.sendMessage(message.chat, { react: { text: "🔎",key: message.key,}
  });

  try {
    // جلب نتائج البحث من API
    let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + text);
    let searchResults = response.data;

    if (searchResults.length === 0) {
      return conn.sendMessage(message.chat, { text: '- *🔱 فــشــل الــبــحــث*' });
    }

    // اختيار نتيجة واحدة عشوائيًا
    let result = searchResults[Math.floor(Math.random() * searchResults.length)];

    // تحميل الفيديو كملف
    const videoUrl = result.nowm;  // رابط الفيديو بدون العلامة المائية
    const videoBuffer = (await axios.get(videoUrl, { responseType: 'arraybuffer' })).data;

    // إرسال الفيديو إلى الدردشة
    await conn.sendMessage(message.chat, { 
      video: videoBuffer, 
      caption: ` *⟪🔎⟫ نــتــيــجــة الــبــحــث*

- *الــعــنــوان↜* ${result.title}

- *الـــرابـــط↜* ${videoUrl}`,
      mimetype: 'video/mp4'
    });

    // إرسال التفاعل الثاني بعد إتمام العملية
    await conn.sendMessage(message.chat, { text: "✅ تم التحميل بنجاح" });

  } catch (error) {
    await conn.reply(message.chat, '⚠️ حدث خطأ أثناء جلب الفيديو.', message);
    console.error(error);
  }
}

handler.help = ['تيكتوك'];
handler.tags = ['bu'];
handler.command = ['البحث_تيكتوك', 'بحث_تيكتوك', 'تيكتوك'];
export default handler;