import yts from 'yt-search';
import axios from 'axios';
import fs from 'fs';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
  if (!text) throw '- *🔱 اكــتــب اســم الـفـيـديــو الــذي تــريــد الـبـحـث عــنــه فــي يـوتـيـوب*';
  await conn.sendMessage(m.chat, { react: { text: "🔎",key: m.key,}
  })
  
  try {
    // جلب نتائج البحث من YouTube
    const results = await yts(text);
    const videos = results.videos.slice(0, 5); // أخذ أول 5 فيديوهات
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    
    // إعداد رسالة الفيديو
    const messageText = `*✦━━━━━✦⊰🕷️⊱✦━━━━✦*
*❐ ⤶العنوان↜ ${randomVideo.title}*
*❐ ⤶المؤلف↜ ${randomVideo.author.name}*
*❐ ⤶المشاهدات↜ ${randomVideo.views}*
*❐ ⤶الرابط↜ ${randomVideo.url}*
*✦━━━━✦⊰🕷️⊱✦━━━━━✦*`;

    // تحميل صورة الفيديو
    const imageBuffer = (await axios.get(randomVideo.thumbnail, { responseType: 'arraybuffer' })).data;

    // إرسال رسالة تحتوي على الفيديو
    await conn.sendMessage(m.chat, { 
      image: imageBuffer, 
      caption: messageText
    });

    // إرسال رسالة نصية تكميلية


  } catch (error) {
    await conn.reply(m.chat, '- *🔱 حـــدث خــطــأ*', m);
    console.error(error);
  }
}

handler.help = ['بحث_يوتيوب'];
handler.tags = ['bu'];
handler.command = /^(ytsearch|بحث_يوتيوب|البحث_يوتيوب|يوتيوب_سيرش|سيرش_يوتيوب|audiosearch)$/i;
export default handler;