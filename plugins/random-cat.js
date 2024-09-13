import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    // Fetching data from the Dog API
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const img = await res.json();
    const imageUrl = img[0].url;

    // Fetching the image buffer
    const imageRes = await fetch(imageUrl);
    const imageBuffer = await imageRes.buffer();
await conn.sendMessage(m.chat, { react: { text: "🐈",key: m.key,}
  })
    const message = `*🥹 مـيـاو 🥹*`.trim();

    // Sending the image directly
    await conn.sendMessage(m.chat, { image: imageBuffer, caption: message }, { quoted: m });
  } catch (error) {
    // Error handling
    conn.reply(m.chat, 
      `╔════════════════════════════════════╗\n` +
      `║  ⚠️ خطأ في جلب الصورة!             ║\n` +
      `║  ✧✧✧                               ║\n` +
      `╚════════════════════════════════════╝`, 
      m
    );
    console.error('Error:', error);
  }
};

handler.help = ['قطه'];
handler.tags = ['ra'];
handler.command = /^قطه$/i;
handler.fail = null;

export default handler;