const handler = async (m, {conn, isPrems}) => {
  const hasil = Math.floor(Math.random() * 1000);
  const time = global.db.data.users[m.sender].lastmiming + 1800000; // 30 minutes in milliseconds
  if (new Date - global.db.data.users[m.sender].lastmiming < 1800000) throw `*قم بلأنتظار ${msToTime(time - new Date())} قبل التعدين مره اخري⏳*`;
  await conn.sendMessage(m.chat, { react: { text: "⛏️",key: m.key,}
  })
  m.reply(`*مبروك تم التعدين وهديتك هي ${hasil} XP🎁*`);
  global.db.data.users[m.sender].lastmiming = new Date * 1;
};
handler.help = ['سنوي'];
handler.tags = ['rp'];
handler.command = ['تعدين'];
handler.fail = null;
handler.exp = 0;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return minutes + ' دقيقة ' + seconds + ' ثانية ';
}