const handler = async (m, {conn}) => {
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  await conn.fetchBlocklist().then(async (data) => {
    let txt = `╔══════════════════════════════╗\n║ 🚫 عدد المتبلكين في البوت: ${data.length}    ║\n╚══════════════════════════════╝\n\n┌─⊷\n`;
    for (const i of data) {
      const user = await conn.getName(i) || 'غير معروف';
      txt += `▢ @${i.split('@')[0]} (${user})\n`;
    }
    txt += '└───────────';
    return conn.reply(m.chat, txt, m, {mentions: await conn.parseMention(txt)});
  }).catch((err) => {
    console.log(err);
    throw '╔══════════════════════════════╗\n║ ⚠️ في حاجه حصلت غلط وانا بجيب قايمة المتبلكين ║\n╚══════════════════════════════╝';
  });
};
handler.help = ['قائمة_البلوك'];
handler.tags = ['ow'];
handler.command = ['قائمة_البلوك'];
handler.rowner = true;
export default handler;

/* حقوق النشر الخاصة بصانع البوت */
const copyright = `╔════════════════════════════════════╗
║   🛠️ صانع البوت: 𝗧𝗔𝗡𝗝𝗜𝗥𝗢  🛠️   ║
║                                    ║
║   📱 للاستفسار: [رابط المحادثة](https://wa.me/201220864180)   ║
╚════════════════════════════════════╝`;

console.log(copyright);