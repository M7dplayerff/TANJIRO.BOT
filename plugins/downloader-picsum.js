import fetch from 'node-fetch';

async function picSumAvz(text) {
  try {
    const imageUrl = `https://picsum.photos/seed/${text}/800/600`;
    return imageUrl;
  } catch (err) {
    return null;
  }
}

const handler = async (m, { conn, args, command }) => {
  const q = args.join(' '); // للحصول على الاستعلام الكامل

  if (!q) {
    return m.reply(`- *🔱 اكــتــب الــنــص الــذي تــريــد الــبــحــث عــنــه*`);
  }
await conn.sendMessage(m.chat, { react: { text: "📸",key: m.key,}
  })
  // البحث عن الصورة
  const result = await picSumAvz(q);
  if (result) {
    const message = {
      image: { url: result },
      caption: `- *🔱 تـــم صــورتـــك جــاهــزة الـامــر لــصــور الـطـبـيـعـه فـقـط*`
    };
    await conn.sendMessage(m.chat, message);
  } else {
    m.reply('- *🔱 حـــدث خــــطــــأ*');
  }
}

handler.help = ['صوره3'];
handler.tags = ['do'];
handler.command = /^(صوره3|صورة3)$/i;

export default handler;
