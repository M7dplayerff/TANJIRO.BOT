import fetch from 'node-fetch';
import fs from 'fs'; // تأكد من استيراد fs

const handler = async (m, {conn}) => {
  const user = global.db.data.users[m.sender];
  const premium = user.premium;

  // تحديد القيم العشوائية للأموال ونقاط الخبرة
  const exp = pickRandom([500, 600, 700, 800, 900, 999, 1000, 1300, 1500, 1800]);
  const exppremium = pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500]);

  const money = pickRandom([300, 500, 700, 900, 500, 800, 900, 1100, 1350, 1500]);
  const moneypremium = pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500]);

  // تحديد المكافآت بناءً على حالة الحساب (مميز أم لا)
  const recompensas = {
    exp: premium ? exppremium : exp,
    money: premium ? moneypremium : money,
  };

  const lastClaimTime = user.lastclaim || 0;
  const currentTime = new Date().getTime();
  const timeSinceLastClaim = currentTime - lastClaimTime;
  const oneDay = 86400000; // 24 ساعة بالميلي ثانية

  if (timeSinceLastClaim < oneDay) {
    const remainingTime = msToTime(oneDay - timeSinceLastClaim);
    return await conn.reply(m.chat, `*لقد قمت بأخذ هديتك اليوميه بلفعل طالب بها غدا مره اخري⏳*`, m);
  }

  // تحديث بيانات المستخدم بالمكافآت
  let texto = '';
  for (const reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue;
    user[reward] += recompensas[reward];
    let arabicRewardName;
    switch (reward) {
      case 'exp': arabicRewardName = 'نقاط الخبرة 📈'; break;
      case 'money': arabicRewardName = 'الأموال 💰'; break;
    }
    texto += `*+${recompensas[reward]}* ${arabicRewardName}\n `;
  }
await conn.sendMessage(m.chat, { react: { text: "🎁",key: m.key,}
  })
  const text = `
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*هديتك اليوميه🎁*\n\n
${texto}
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
`;

  const imgPath = 'PCB/منيو1.png'; // تحديث المسار إلى الصورة الجديدة
  if (!fs.existsSync(imgPath)) {
    return await conn.reply(m.chat, 'فشل في العثور على الصورة المطلوبة.', m);
  }

  const img = fs.readFileSync(imgPath); // قراءة الصورة من المسار
  await conn.sendFile(m.chat, img, 'منيو1.png', text, m);
  user.lastclaim = currentTime; // تحديث وقت المطالبة
};

handler.help = ['يومي'];
handler.tags = ['rp'];
handler.command = ['يومي'];
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
}