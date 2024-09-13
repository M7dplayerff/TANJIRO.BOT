import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

const effects = ['greyscale', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'pixelate', 'blur'];

const handler = async (m, { conn, usedPrefix, text }) => {
  const effect = text.trim().toLowerCase();
  if (!effects.includes(effect)) {
    throw `
🚫 *تأثير غير صالح!* يرجى استخدام أحد التأثيرات التالية:
📜═════════════════════📜
${effects.map((effect) => {
  switch (effect) {
    case 'greyscale': return `🌑 _${effect}_`;
    case 'invert': return `🔄 _${effect}_`;
    case 'brightness': return `✨ _${effect}_`;
    case 'threshold': return `⚖️ _${effect}_`;
    case 'sepia': return `🟤 _${effect}_`;
    case 'red': return `🔴 _${effect}_`;
    case 'green': return `🟢 _${effect}_`;
    case 'blue': return `🔵 _${effect}_`;
    case 'blurple': return `🔷 _${effect}_`;
    case 'pixelate': return `🔳 _${effect}_`;
    case 'blur': return `🌫️ _${effect}_`;
    default: return `➡️ _${effect}_`;
  }
}).join('\n')}
📜═════════════════════📜
`.trim();
  }
  const q = m.quoted ? m.quoted : m;
  const mime = (q.mimetype || '');
  if (!mime) throw '⚠️ لم يتم العثور على وسائط!';
  if (!/image\/(jpe?g|png)/.test(mime)) throw '❌ نوع الوسائط غير مدعوم!';
await conn.sendMessage(m.chat, { react: { text: "🔃",key: m.key,}
  })
  const img = await q.download();
  const url = await uploadImage(img);
  const apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
    avatar: url,
  });

  try {
    const stiker = await sticker(null, apiUrl, global.packname, global.author);
    await conn.sendFile(m.chat, stiker, null, { asSticker: true });
  } catch (e) {
    m.reply('🚨 حدث خطأ أثناء معالجة طلبك.');
    await conn.sendFile(m.chat, apiUrl, 'image.png', null, m);
  }
};

handler.help = ['تأثير_ستك2'];
handler.tags = ['st'];
handler.command = /^(تأثير_ستك2|ت_س2)$/i;

export default handler;