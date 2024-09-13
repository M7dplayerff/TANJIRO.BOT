import fs from 'fs'; // تأكد من استيراد fs في حالة استخدامه

const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "👑",key: m.key,}
  })
  
  const imagePath = './PCB/المتصدرين.jpg'; // تعريف مسار الصورة الجديد

  const texto = `*➤━━━━━❖⊰🕷️⊱❖━━━━━➤*
- *مـالـك الـبـوت 👑↜تـانـجـيـرو*
❴ wa.me/201220864180 ❵

🔱 *الـمـسـاهـم1↜يـوتـا*
❴ wa.me/201274294082 ❵

🔱 *الـمـسـاهـم2↜الـمـعـلـم بـود*
❴ wa.me/201223977365 ❵

🔱 *الـمـسـاهـم3↜فـلـوريـتـا*
*❴ PRIVACY ❵*

🔱 *الـمـسـاهـم4↜غـوجـيـتـا*
❴ wa.me/963934010949 ❵

🔱 *الـمـسـاهـم5↜هـانـجـي*
*❴ PRIVACY ❵*

*➤━━━━━❖⊰🕷️⊱❖━━━━━➤*`.trim();

  // تحقق من وجود الصورة وأرسلها مع الرسالة
  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    conn.sendMessage(m.chat, { image: imageBuffer, caption: texto }, { quoted: m });
  } else {
    console.log(`File not found at ${imagePath}`);
    conn.reply(m.chat, 'الصورة المطلوبة غير موجودة.', m);
  }
};

handler.help = ['المالكين'];
handler.tags = ['in'];
handler.command = ['المالكين'];
handler.fail = null;

export default handler;