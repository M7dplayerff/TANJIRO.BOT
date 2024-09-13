const handler = async (m, { conn, args }) => {
  await conn.sendMessage(m.chat, { react: { text: "💳",key: m.key,}
  })
  const usuario = global.db.data.users[m.sender].premiumTime;
  const user = Object.entries(global.db.data.users)
    .filter((user) => user[1].premiumTime)
    .map(([key, value]) => {
      return { ...value, jid: key };
    });
  const prem = global.db.data.users[m.sender].premium;
  const userr = global.db.data.users[m.sender].name || '@' + m.sender.split`@`[0];
  const sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'));
  const len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length);

  let infoprem = sortedP.slice(0, len).map(({ jid, premiumTime }, i) => {
    const userName = global.db.data.users[jid]?.name || '@' + jid.split`@`[0];
    return `
*═✦•••••••••••••🕷️•••••••••••••✦═*
*❐ الـمـسـتـخـدم ↜ ${userName}*\n
*❐ الـوقـت الـمـتـبـقـي ⏳*
- ${premiumTime > 0 ? `${formatTime(premiumTime - new Date() * 1)}` : 'منتهي'}
*═✦•••••••••••••🕷️•••••••••••••✦═*`;
  }).join('');

  m.reply(infoprem, null, { mentions: conn.parseMention(infoprem) });
};

handler.help = ['ليست_بريم'];
handler.tags = ['in'];
handler.command = /^(قائمة_بريميوم|ليست_بريم|قائمة_البريميوم|في_اي_بي)$/i;

export default handler;

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  return [
    years > 0 ? `*الاعوام*: ${years}` : '',
    months > 0 ? `*الشهور*: ${months % 12}` : '',
    weeks > 0 ? `*الاسابيع*: ${weeks % 4}` : '',
    days > 0 ? `*الايام*: ${days % 7}` : '',
    hours > 0 ? `*الساعات*: ${hours % 24}` : '',
    minutes > 0 ? `*الدقائق*: ${minutes % 60}` : '',
    seconds > 0 ? `*الثواني*: ${seconds % 60}` : ''
  ].filter(Boolean).join('\n- ');
}

function sort(property, ascending = true) {
  return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
}

function toNumber(property, _default = 0) {
  return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] };
  };
}