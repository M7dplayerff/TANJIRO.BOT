import fetch from 'node-fetch';

const handler = async (m, {conn, text, args}) => {
  if (!args[0]) return conn.reply(m.chat, `*☜ قم بوضع رابط الموقع بعد الامر وسيقوم البوت بارسال لك صوره من داخله*`, m);
  await conn.sendMessage(m.chat, { react: { text: "🌐",key: m.key,}
  })
  try {
    const ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer();
    conn.sendFile(m.chat, ss, '', '', m);
  } catch {
    try {
      const ss2 = `https://api.screenshotmachine.com/?key=c04d3a&url=${args[0]}&screenshotmachine.com&dimension=720x720`;
      conn.sendMessage(m.chat, {image: {url: ss2}}, {quoted: m});
    } catch {
      try {
        const ss3 = `https://api.lolhuman.xyz/api/SSWeb?apikey=${lolkeysapi}&url=${text}`;
        conn.sendMessage(m.chat, {image: {url: ss3}}, {quoted: m});
      } catch {
        const ss4 = `https://api.lolhuman.xyz/api/SSWeb2?apikey=${lolkeysapi}&url=${text}`;
        conn.sendMessage(m.chat, {image: {url: ss4}}, {quoted: m});
      }
    }
  }
};

handler.help = ["زيارة_موقع"]
handler.tags = ["to"];
handler.command = /^زيارة(_موقع)?f?$/i;

export default handler;