import axios from 'axios';

const handler = async (m, { command, conn }) => {
  try {
    // Fetching the data from the provided URL
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/anime-${command}.json`)).data;
    
    // Selecting a random image from the JSON data
    const imageUrl = res[Math.floor(res.length * Math.random())];

    // Caption to send with the image, formatted as requested
    await conn.sendMessage(m.chat, { react: { text: "🔮",key: m.key,}
  })
    const caption = `*${command.toUpperCase()}*`;

    // Fetching the image as a buffer
    const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageRes.data, 'binary');

    // Sending the image directly with the caption
    await conn.sendMessage(m.chat, { image: imageBuffer, caption: caption }, { quoted: m });
  } catch (error) {
    // Error handling
    conn.reply(m.chat, 
      `╔════════════════════════════════════╗\n` +
      `║  ⚠️ خطأ في جلب الصورة!             ║\n` +
      `║  ✧✧✧                               ║\n` +
      `╚════════════════════════════════════╝`, 
      m
    );
    console.error('Error fetching anime image:', error);
  }
};

// List of commands that trigger the handler
handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay'];
handler.tags = ['an'];

export default handler;