import fetch from 'node-fetch';

const handler = async (m, {isPrems, conn}) => {
  const datas = global;

  const fkontak = {
    'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'},
    'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}},
    'participant': '0@s.whatsapp.net',
  };

  const mystic = './Menu2.jpg';
  const user = global.db.data.users[m.sender];
  const premium = user.premium;

  const exp = pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000]);
  const exppremium = pickRandom([2000, 3000, 4000, 5000, 6000, 7000, 8000]);

  const money = pickRandom([500, 1000, 1500, 2000, 2500, 3000]);
  const moneypremium = pickRandom([1000, 1500, 2000, 2500, 3000, 3500]);

  const recompensas = {
    exp: premium ? exppremium : exp,
    money: premium ? moneypremium : money,
  };

  const time = user.lastclaim + 2592000000; // شهر كامل (30 يوم)
  if (new Date - user.lastclaim < 2592000000) return await conn.reply(m.chat, `*لقد اخذت مكافأت الشهريه بلفعل طالب بها الشهر القادم⏳*`, fkontak, m);

  let texto = '';
  for (const reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue;
    user[reward] += recompensas[reward];
    let arabicRewardName;
    switch (reward) {
      case 'exp': arabicRewardName = 'الاكسبي 📈'; break;
      case 'money': arabicRewardName = 'عملات تانجيرو 💰'; break;
    }
    texto += `*+${recompensas[reward]}* ${arabicRewardName}\n `;
  }
await conn.sendMessage(m.chat, { react: { text: "🎁",key: m.key,}
  })
  const text = `
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*هديتك الشهريه🎁*\n\n${texto}
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
`;

  const img = 'PCB/منيو1.png';
  await conn.sendFile(m.chat, img, 'mystic.jpg', text, fkontak);
  user.lastclaim = new Date * 1;
};

handler.help = ['شهري'];
handler.tags = ['rp'];
handler.command = ['شهري'];
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
}