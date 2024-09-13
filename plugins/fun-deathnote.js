const handler = async (m, { conn, command, text }) => {
  await conn.sendMessage(m.chat, { react: { text: "💀",key: m.key,}
  })
  // دالة لتوليد وقت عشوائي
  const generateRandomTime = () => {
    const years = Math.floor(Math.random() * 10); // عدد السنوات
    const days = Math.floor(Math.random() * 365); // عدد الأيام
    const hours = Math.floor(Math.random() * 24); // عدد الساعات

    // تحديد الوقت المتبقي بناءً على الاحتمالات العشوائية
    const timeFormat = Math.floor(Math.random() * 4); // اختيار نوع الوقت العشوائي
    switch (timeFormat) {
      case 0:
        return { years: 0, days: 0, hours: Math.floor(Math.random() * 24) }; // ساعات فقط
      case 1:
        return { years: 0, days: Math.floor(Math.random() * 30), hours: Math.floor(Math.random() * 24) }; // أيام وساعات
      case 2:
        return { years: Math.floor(Math.random() * 5), days: Math.floor(Math.random() * 365), hours: Math.floor(Math.random() * 24) }; // سنوات وأيام وساعات
      default:
        return { years, days, hours }; // سنوات وأيام وساعات بشكل عشوائي
    }
  };

  // حساب الوقت المتبقي لموت المستخدم
  const { years, days, hours } = generateRandomTime();

  // استخراج منشن الشخص الآخر من النص
  const mentionedUser = text.includes('@') ? text.split('@')[1].split(' ')[0] : '';

  // تحديد المنشن الصحيح
  const mentionedUserId = mentionedUser ? conn.parseMention(`@${mentionedUser}`) : [m.sender];

  const response =
    `*╭────────── ⌠ديث نوت⌡ ──────────╮*\n` +
    `*│                                            │*\n` +
    `*┠≽ ❒ ${mentionedUser ? `@${mentionedUser}` : `@${m.sender.split('@')[0]}`}   │*\n` +
    `*┠≽ ❒ الوقت المتبقي لموتك:* \n` +
    `*┠≽ ⏰ ${years > 0 ? `${years} سنوات، ` : ''}${days > 0 ? `${days} أيام، ` : ''}${hours > 0 ? `${hours} ساعات` : ''}*\n` +
    `*│                                            │*\n` +
    `*╰────────── ⌠💀⌡ ──────────╯*\n` +
    `*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*\n`;

  async function loading() {
    const progressMessages = [
      "*اكتشاف مجرايات الزمن*\n《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "*اكتشاف احداث حياة الشخص*\n《 ████▒▒▒▒▒▒▒▒》30%",
      "*اكتشاف الحوادث القادمه*\n《 ███████▒▒▒▒▒》50%",
      "*اكتشاف طريقة الموت*\n《 ██████████▒▒》80%",
      "*استخراج الوقت المتبقي للموت*\n《 ████████████》100%"
    ];

    let { key } = await conn.sendMessage(m.chat, { text: "*جــاري حـسـاب الـوقـت الـمـتـبـقـي...*" }, { quoted: m });
    for (let i = 0; i < progressMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: progressMessages[i], edit: key }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { text: response, edit: key, mentions: mentionedUserId }, { quoted: m });
  }
  
  loading();
};

handler.help = ['ديث_نوت'];
handler.tags = ['fu'];
handler.command = /^(ديث_نوت)$/i;
export default handler;