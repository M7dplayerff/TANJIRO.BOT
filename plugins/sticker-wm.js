import { addExif } from '../lib/sticker.js';

const handler = async (m, { conn, text }) => {
  if (!m.quoted) throw '❌ رد على ملصق عايز تسرق حقوقه يا زميلي 💬';
  let stiker = false;
  try {
    let [packname, ...author] = text.split('|');
    author = (author || []).join('|');
    await conn.sendMessage(m.chat, { react: { text: "🔃",key: m.key,}
  })
    const mime = m.quoted.mimetype || '';
    if (!/webp/.test(mime)) throw '🚫 نوع MIME غير صحيح.';
    const img = await m.quoted.download();
    if (!img) throw '❌ فشل تحميل الصورة.';
    stiker = await addExif(img, packname || global.packname, author || global.author);
  } catch (e) {
    console.error(e);
    if (Buffer.isBuffer(e)) stiker = e;
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true });
    else throw '❌ فشل إنشاء الملصق.';
  }
};

handler.help = ['سرقة_حقوق'];
handler.tags = ['st'];
handler.command = /^سرقة_حقوق|سرقه_حقوق$/i;

handler.credit = '🔹 حقوق النشر: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢 🔹';

export default handler;