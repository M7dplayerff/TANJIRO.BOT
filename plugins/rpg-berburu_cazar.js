function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s]
    .map(v => v.toString().padStart(2, 0))
    .join(':');
}

const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];
  
  if (!user) return; // للتحقق من وجود المستخدم في قاعدة البيانات

  const now = new Date();
  const cooldown = 7200000; // ساعتين

  if (user.lastberburu && (now - user.lastberburu < cooldown)) {
    const remainingTime = cooldown - (now - user.lastberburu);
    return conn.reply(m.chat, `*يجب عليك الانتظار ${clockString(remainingTime)}⏳  قبل المحاولة مرة أخرى*`, m);
  }

  // تحديث الوقت الأخير لاستخدام الأمر
  user.lastberburu = now;

  // باقي الكود الخاص بك...
  const randomaku1 = `${Math.floor(Math.random() * 5)}`;
  const randomaku2 = `${Math.floor(Math.random() * 5)}`;
  const randomaku3 = `${Math.floor(Math.random() * 5)}`;
  const randomaku4 = `${Math.floor(Math.random() * 5)}`;
  const randomaku5 = `${Math.floor(Math.random() * 5)}`;
  const randomaku6 = `${Math.floor(Math.random() * 5)}`;
  const randomaku7 = `${Math.floor(Math.random() * 5)}`;
  const randomaku8 = `${Math.floor(Math.random() * 5)}`;
  const randomaku9 = `${Math.floor(Math.random() * 5)}`;
  const randomaku10 = `${Math.floor(Math.random() * 5)}`;
  const randomaku11 = `${Math.floor(Math.random() * 5)}`;
  const randomaku12 = `${Math.floor(Math.random() * 5)}`;

  const rbrb1 = (randomaku1 * 1);
  const rbrb2 = (randomaku2 * 1);
  const rbrb3 = (randomaku3 * 1);
  const rbrb4 = (randomaku4 * 1);
  const rbrb5 = (randomaku5 * 1);
  const rbrb6 = (randomaku6 * 1);
  const rbrb7 = (randomaku7 * 1);
  const rbrb8 = (randomaku8 * 1);
  const rbrb9 = (randomaku9 * 1);
  const rbrb10 = (randomaku10 * 1);
  const rbrb11 = (randomaku11 * 1);
  const rbrb12 = (randomaku12 * 1);

  const ar1 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar2 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar3 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar4 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar5 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar6 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar7 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar8 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar9 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar10 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar11 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  const ar12 = `${['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'].getRandom()}`;
  
  await conn.sendMessage(m.chat, { react: { text: "👹",key: m.key,}
  })
  const hsl = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*لقد قمت باصتياد👹*

 *🐂 ${ar1} ${rbrb1}*			 *🐃 ${ar7} ${rbrb7}*
 *🐅 ${ar2} ${rbrb2}*			 *🐮 ${ar8} ${rbrb8}*
 *🐘 ${ar3} ${rbrb3}*			 *🐒 ${ar9} ${rbrb9}*
 *🐐 ${ar4} ${rbrb4}*			 *🐗 ${ar10} ${rbrb10}*
 *🐼 ${ar5} ${rbrb5}*			 *🐖 ${ar11} ${rbrb11}*
 *🐊 ${ar6} ${rbrb6}*			 *🐓 ${ar12} ${rbrb12}*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`.trim();

  global.db.data.users[m.sender].banteng += rbrb1;
  global.db.data.users[m.sender].harimau += rbrb2;
  global.db.data.users[m.sender].gajah += rbrb3;
  global.db.data.users[m.sender].kambing += rbrb4;
  global.db.data.users[m.sender].panda += rbrb5;
  global.db.data.users[m.sender].buaya += rbrb6;
  global.db.data.users[m.sender].kerbau += rbrb7;
  global.db.data.users[m.sender].sapi += rbrb8;
  global.db.data.users[m.sender].monyet += rbrb9;
  global.db.data.users[m.sender].babihutan += rbrb10;
  global.db.data.users[m.sender].babi += rbrb11;
  global.db.data.users[m.sender].ayam += rbrb12;

  setTimeout(() => {
    conn.reply(m.chat, hsl, m);
  }, 20000);

  setTimeout(() => {
    conn.reply(m.chat, `*في انتظار الفريسه👹*`, null, {mentions: [m.sender]});
  }, 15000);
};
handler.help = ['صيد'];
handler.tags = ['rp'];
handler.command = /^(صيد)$/i;
export default handler;
