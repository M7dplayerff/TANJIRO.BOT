import { googleImage } from '@bochilteam/scraper';
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    // إذا لم يتم إدخال نص، أرسل رسالة للتنبيه
    throw `- *🔱 ادخــل اســم الـصـورة الــذي تــريــد الـبـحـث عــنــهـا بــعــد الـامــر*`;
  }

  // أضف تفاعل على رسالة الأمر إذا تم إدخال نص
  await conn.sendMessage(m.chat, { react: { text: "📸", key: m.key } });

  // تحقق من المحتوى المحظور (تم تعليق هذا الجزء للتوضيح)
  // if (m.text.includes('gore') || m.text.includes('cp') || m.text.includes('porno') || m.text.includes('Gore') || m.text.includes('rule') || m.text.includes('CP') || m.text.includes('Rule34')) 
  // return m.reply('❗ لا يمكنني إرسال هذا المحتوى المحظور في المجموعة.\nإذا كنت أدمن وتريد تفعيل هذه الميزة، استخدم الأمر #enable modohorny');

  const res = await googleImage(text);
  const image = await res.getRandom();
  const imageUrl = image;

  // تحميل الصورة من الرابط كـ Buffer
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');

  // أرسل الصورة مباشرة كرسالة
  await conn.sendMessage(m.chat, { image: buffer, caption: '- *🔱 صــورتــك جــاهــزة*' }, { quoted: m });

  // إرسال رسالة تفاعلية مع زر للحصول على صورة أخرى
  const buttonMessage = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            hasMediaAttachment: false,
            mediaType: 1,  // 1 للإشارة إلى نص فقط
          },
          body: {
            text: '- *👑 مــن صــنــع تــانــجــيرو*',
            subtitle: "*📸 نتائج الصور*"
          },
          contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'quick_reply',
                buttonParamsJson: `{"display_text":"🔱 صــورة اخــري","id":".صوره2 ${text}"}`
              }
            ]
          }
        }
      }
    }
  };

  await conn.relayMessage(m.chat, buttonMessage, {});
};

handler.help = ['صوره2'];
handler.tags = ['do'];
handler.command = /^(صوره2|صورة2)$/i;

export default handler;