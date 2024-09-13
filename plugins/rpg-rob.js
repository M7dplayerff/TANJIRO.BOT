const ro = 3000;
const handler = async (m, {conn, usedPrefix, command}) => {
  const datas = global

  const time = global.db.data.users[m.sender].lastrob + 7200000; // يمكنك تغيير 7200000 إلى الوقت الذي تريده بالمللي ثانية
  if (new Date - global.db.data.users[m.sender].lastrob < 7200000) throw `مينفعش تسرق دلوقت استني ⏳ ${msToTime(time - new Date())} قبل متحاول تاني.`;
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  if (!who) throw '*منشن المراد سرقته*';
  if (!(who in global.db.data.users)) throw 'المستخدم غير موجود في قاعدة البيانات. 🚫';
  const users = global.db.data.users[who];
  const rob = Math.floor(Math.random() * ro);
  if (users.exp < rob) return m.reply(`😔 @${who.split`@`[0]} معهوش اكسبي يكفي. تحتاج إلى ${ro} أكسبي.
💔`, null, {mentions: [who]});
 
  await conn.sendMessage(m.chat, { react: { text: "👣",key: m.key,}
  })
  global.db.data.users[m.sender].exp += rob;
  global.db.data.users[who].exp -= rob;
  m.reply(`👍 انت سرقت ${rob} أكسبي من @${who.split`@`[0]}`, null, {mentions: [who]});
  global.db.data.users[m.sender].lastrob = new Date * 1;
};
handler.help = ['سرقه'];
handler.tags = ['rp'];
handler.command = ['سرقه', ];
export default handler;
function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return hours + ' ساعه(س) ' + minutes + ' دقيقه(د)';
}