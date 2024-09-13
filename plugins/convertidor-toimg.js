 import sharp from 'sharp'

 const TIMEOUT = 10000; // 10 detik

 let handler = async (m, { conn, usedPrefix, command }) => {
   const notStickerMessage = `- *🔱 قــم بـلــرد عــلــي الـمـلـصـق الــذي تــريــد تــحــويـلــه لــصــورة*`;

   if (!m.quoted) throw notStickerMessage;

   const q = m.quoted || m;
   const mime = q.mimetype || '';

   if (!/image\/webp/.test(mime)) throw notStickerMessage;

   try {
     // Download sticker
     const media = await q.download();

     // Dekoding WebP tanpa webp-js
     const decodedBuffer = await sharp(media).toFormat('png').toBuffer();

     // Send PNG image
     if (decodedBuffer.length > 0) {
       await conn.sendFile(m.chat, decodedBuffer, 'out.png', '- *🔱 تـــم الــتــحــويــل*', m);
     } else {
       throw '- *🔱 فــشــل الــتــحــويــل*';
     }
   } catch (error) {
     console.error(error);
     if (error.message === 'Timeout of 10000ms exceeded') {
       m.reply('- *🔱 فــشــل الــتــحــويــل*');
     } else {
       m.reply(`- *🔱 فــشــل الــتــحــويــل*`);
     }
   }
 };

 handler.help = ['تحويل_لصوره']
 handler.tags = ['co']
 handler.command = ['تحويل_لصوره']

 

 export default handler
