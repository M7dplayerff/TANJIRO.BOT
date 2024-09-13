import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // 📡 Fetching list of images
    const ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text();
    const nek = ne.split('\n');
    const neko = nek[Math.floor(Math.random() * nek.length)];
    if (!neko) throw '❌ في حاجة غلط يا صاحبي، ملقتش صور 🛑';

    const message = `*🌸 نــيــكــو 🌸*`;

    // Text to be sent with the image
    const caption = ``;

    // Send the image directly
    await conn.sendMessage(m.chat, { react: { text: "🌸",key: m.key,}
  })
    await conn.sendFile(m.chat, neko, 'neko.jpg', message + '\n' + caption, m, false, { mimetype: 'image/jpeg' });
  } catch (error) {
    // ⚠️ Error handling
    console.error('⚠️ Error:', error);
    m.reply('🚫 حدث خطأ أثناء جلب الصورة. حاول مرة أخرى لاحقاً.');
  }
};

handler.command = /^(نيكو)$/i;
handler.tags = ['ra'];
handler.help = ['نيكو'];

export default handler;