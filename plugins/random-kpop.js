import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix }) => {
  if (args.length === 0) {
    return conn.reply(m.chat, 
      `╔════════════════════════════════════╗\n` +
      `║  📝 اكتب/ي ${usedPrefix}كبوب بعد كدا اسم الفرقة يا عسل  ║\n` +
      `║  📜 الأسماء المتاحة هي:                           ║\n` +
      `║  • blackpink                                      ║\n` +
      `║  • exo                                            ║\n` +
      `║  • bts                                            ║\n` +
      `╚════════════════════════════════════╝`, 
      m
    );
  }
  
  const validGroups = ['blackpink', 'exo', 'bts'];
  if (validGroups.includes(args[0])) {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/${args[0]}.txt`);
      const body = await res.text();
      const kpopImages = body.split('\n');
      const randomImage = kpopImages[Math.floor(Math.random() * kpopImages.length)];

      if (!randomImage) throw '❌ في حاجة غلط يا صاحبي، ملقتش صور 🛑';
await conn.sendMessage(m.chat, { react: { text: "🎶",key: m.key,}
  })
      const message = `*🎶 كــبــوب 🎶*`;

      // Sending the image directly
      const caption = ``;

      await conn.sendFile(m.chat, randomImage, 'kpop.jpg', message + '\n' + caption, m, false, { mimetype: 'image/jpeg' });
    } catch (error) {
      // ⚠️ Error handling
      console.error('⚠️ Error:', error);
      conn.reply(m.chat, 
        `╔════════════════════════════════════╗\n` +
        `║  ⚠️ في حاجه غلط حصلت والصورة بتتبعت   ║\n` +
        `║  ✧✧✧                               ║\n` +
        `╚════════════════════════════════════╝`, 
        m
      );
    }
  } else {
    conn.reply(m.chat, 
      `╔════════════════════════════════════╗\n` +
      `║  📝 اكتب/ي ${usedPrefix}كبوب بعد كدا اسم الفرقة يا عسل  ║\n` +
      `║  📜 الأسماء المتاحة هي:                           ║\n` +
      `║  • blackpink                                      ║\n` +
      `║  • exo                                            ║\n` +
      `║  • bts                                            ║\n` +
      `╚════════════════════════════════════╝`, 
      m
    );
  }
};

handler.help = ['كبوب'].map((v) => v + '');
handler.tags = ['ra'];
handler.command = /^(كبوب)$/i;

export default handler;