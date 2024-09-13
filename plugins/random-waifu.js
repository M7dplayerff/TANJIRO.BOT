import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command }) => {
  const res = await fetch('https://api.waifu.pics/sfw/waifu');
  if (!res.ok) throw await res.text();
  const json = await res.json();
  if (!json.url) throw '🚫 خطأ! 🚫';
  
  const message = `*🌸 وايــفــو 🌸*`;

  // Text to be sent with the image
  const caption = ``;

  // Send the image directly instead of as a button link
  await conn.sendMessage(m.chat, { react: { text: "🌸",key: m.key,}
  })
  await conn.sendFile(m.chat, json.url, 'waifu.jpg', message + '\n' + caption, m, false, { mimetype: 'image/jpeg' });
};

handler.help = ['وايفو'];
handler.tags = ['ra'];
handler.command = /^(وايفو)$/i;

export default handler;