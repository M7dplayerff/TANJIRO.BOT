import fetch from 'node-fetch';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `- *🔱 ادخــل اســم الــمــشــروع عــلــي جـيـتـهــاب*`;
  
  await conn.sendMessage(m.chat, { react: { text: "🔍",key: m.key,}
  })

  const res = await fetch(global.API('https://api.github.com', '/search/repositories', {
    q: text,
  }));
  const json = await res.json();
  if (res.status !== 200) throw json;
  
await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}
  })
  
  const str = json.items.map((repo, index) => {
  return `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*${1 + index} ☜ ${repo.full_name}${repo.fork ? ' (fork)' : ''}*
 
*❐ ⤶رابط⇠المشروع↜* ${repo.html_url}
*❐ تاريخ⇠المشروع↜${formatDate(repo.created_at)}*
*❐ ⤶اخر⇠تحديث↜${formatDate(repo.updated_at)}*
*❐ ⤶رابط⇠الاستنساخ↜* ${repo.clone_url}
*❐ ⤶المشاهدات↜${repo.watchers}*
*❐ ⤶عدد⇠الاستنساخات↜${repo.forks}*
*❐ ⤶عدد⇠النجوم↜${repo.stargazers_count}*
`.trim()}).join('\n\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n\n');

  conn.sendMessage(m.chat, {text: str.trim()}, {quoted: m})
};

handler.help = ['جيتهاب'];
handler.tags = ['bu'];
handler.command = /^(بحث_جيتهاب|بحث_جيتهوب|البحث_جيتهاب|البحث_جيتهوب|جيتهاب)$/i;
export default handler;

function formatDate(n, locale = 'ar') {
  const d = new Date(n);
  return d.toLocaleDateString(locale, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
}