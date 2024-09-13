import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

const effects = ['jail', 'gay', 'glass', 'wasted', 'triggered', 'lolice', 'simpcard', 'horny'];

const handler = async (m, { conn, usedPrefix, text }) => {
  const effect = text.trim().toLowerCase();
  if (!effects.includes(effect)) {
    throw `
━━━ • ✾ • ━━━
⚠️ اختيار التأثير غير صحيح ⚠️
استعمل ${usedPrefix}تأثير_ستك لتحديد أحد التأثيرات التالية:
- jail 🏛️
- gay 🌈
- glass 🪟
- wasted 🔍
- triggered ✨
- lolice 🚨
- simpcard 💘
- horny 🔥
━━━ • ✾ • ━━━
`.trim();
  }

  const q = m.quoted ? m.quoted : m;
  const mime = (q.mimetype || '');
  if (!mime) throw '⚠️ رد على صورة او فيديو يا حب ⚠️';
  if (!/image\/(jpe?g|png)/.test(mime)) throw '⚠️ الملف يجب أن يكون صورة بصيغة JPG أو PNG ⚠️';
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
    m.reply('❌ حصلت مشكلة والملصق بيتعمل سوري ❌');
    await conn.sendFile(m.chat, apiUrl, 'image.png', null, m);
  }
};

handler.help = ['تأثير_ستك'];
handler.tags = ['st'];
handler.command = /^(تأثير_ستك)$/i;

export default handler;