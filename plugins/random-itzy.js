import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { conn, usedPrefix, command }) => {
  // Define the path to the itzy.json file
const filePath = 'RPW/itzy.json';
  
  // Read the JSON file
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const res = JSON.parse(fileContent);
    
    // Select a random image URL from the JSON data
    const mystic = res[Math.floor(res.length * Math.random())];
    
    // Ensure we have a valid image URL
    if (!mystic) {
      return conn.reply(m.chat, 
        `╔════════════════════════════════════╗\n` +
        `║  ⚠️ لم أتمكن من العثور على صورة!   ║\n` +
        `╚════════════════════════════════════╝`, 
        m
      );
    }
    
    // Define the caption
    const caption = `╔════════════════════════════════════╗\n` +
                    `║   🛠️ صانع البوت: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢  🛠️   ║\n` +
                    `║                                    ║\n` +
                    `║   📱 للاستفسار: [رابط المحادثة](https://wa.me/201220864180)   ║\n` +
                    `╚════════════════════════════════════╝`;

    // Send the image directly
    await conn.sendMessage(m.chat, { react: { text: "🧚",key: m.key,}
  })
    await conn.sendFile(m.chat, mystic, 'image.jpg', 
      `*🌸🧚 اتـــزي 🌸🧚*`, +
      
      m
    );

  } catch (error) {
    conn.reply(m.chat, 
      `╔════════════════════════════════════╗\n` +
      `║  ⚠️ حدث خطأ أثناء قراءة الملف!   ║\n` +
      `╚════════════════════════════════════╝`, 
      m
    );
    console.error('Error:', error);
  }
};

handler.help = ['اتزي'];
handler.tags = ['ra'];
handler.command = /^(اتزي|كبوب_اتزي)$/i;

export default handler;