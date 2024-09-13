const handler = async (m, { conn, command, text }) => {
  const lovePercentage = Math.floor(Math.random() * 100);

  // تحديد الإيموشن بناءً على النسبة المئوية
  const getEmotion = (percentage) => {
    if (percentage <= 10) return "🤍";
    if (percentage <= 30) return "🩵";
    if (percentage <= 50) return "🩷";
    if (percentage <= 70) return "❤️";
    if (percentage <= 80) return "💓";
    if (percentage <= 90) return "💖";
    return "💝";
  };

  const emotion = getEmotion(lovePercentage);

  // استخراج منشن الشخص الآخر من النص
  const mentionedUser = text.includes('@') ? text.split('@')[1].split(' ')[0] : '';

  const response =
    `*╭────────── ⌠حب⌡ ──────────╮*\n` +
    `*│                                            │*\n` +
    `*┠≽ ❒ @${m.sender.split('@')[0]}   │*\n` +
    `*┠≽ ❒ @${mentionedUser}   │*\n` +
    `*❧ ❒ الايموشن المعبر عن هذه العلاقة: ${emotion} │*\n` +
    `*❧ ❒ نسبة الحب بينهم ${lovePercentage}%*\n` +
    `*│                                            │*\n` +
    `*╰────────── ⌠🥺⌡ ──────────╯*
    *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
    `;

  async function loading() {
    const progressMessages = [
      "*قياس نبضات القلب*\n《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "*قياس نسبة التقارب*\n《 ████▒▒▒▒▒▒▒▒》30%",
      "*قياس نجاح العلاقة*\n《 ███████▒▒▒▒▒》50%",
      "*قياس التشابه*\n《 ██████████▒▒》80%",
      "*قياس نسبة الحب الكلي*\n《 ████████████》100%"
    ];

    let { key } = await conn.sendMessage(m.chat, { text: "*سيتم قياس النسبه...*", mentions: conn.parseMention(response) }, { quoted: m });
    for (let i = 0; i < progressMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: progressMessages[i], edit: key, mentions: conn.parseMention(response) }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { text: response, edit: key, mentions: conn.parseMention(response) }, { quoted: m });
  }
  
  loading();
};

handler.help = ['حب'];
handler.tags = ['fu'];
handler.command = /^(حب)$/i;
export default handler;