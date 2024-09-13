const handler = async (m, { isPrems, conn }) => {
  const time = global.db.data.users[m.sender].lastcofre + 86400000; // 36000000 10 ساعات // 86400000 24 ساعة
  if (new Date - global.db.data.users[m.sender].lastcofre < 86400000) {
    throw `*لقد فتحت الخزانة الخاصة بك قم بلعوده الشهر القادم⏳*`;
  }

  const img = 'PCB/الخزنة.jpg';
  const dia = Math.floor(Math.random() * 30);
  const tok = Math.floor(Math.random() * 10);
  const mystic = Math.floor(Math.random() * 4000);
  const expp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].limit += dia;
  global.db.data.users[m.sender].money += mystic;
  global.db.data.users[m.sender].joincount += tok;
  global.db.data.users[m.sender].exp += expp;
await conn.sendMessage(m.chat, { react: { text: "🎁",key: m.key,}
  })
  const texto = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
🌟 *لقد وجدت الكنز تفضل الغنائم*
💰 *${dia} نقاط إضافية*
🎟️ *${tok} مكافآت إضافية*
💎 *${mystic} عملات ذهبية*
📈 *${expp} نقاط إكسبي*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`;

  const fkontak = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast',
      'fromMe': false,
      'id': 'Halo',
    },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    'participant': '0@s.whatsapp.net',
  };

  await conn.sendFile(m.chat, img, 'mystic.jpg', texto, fkontak);
  global.db.data.users[m.sender].lastcofre = new Date * 1;
};
handler.help = ['الخزانة'];
handler.tags = ['rp'];
handler.command = ['الخزانة', 'خزنة'];
handler.level = 5;
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

  return `${hours} ساعة ${minutes} دقيقة`;
}