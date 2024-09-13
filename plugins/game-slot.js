/* CREDITOS A https://github.com/FG98F */

const handler = async (m, {args, usedPrefix, command}) => {
  const fa = `*⦧🕹️⦨ ضـــع ســعــر الــرهــان*

- *مــثــال↜.كازينو 1000*\n`.trim();
  
  if (!args[0]) throw fa;
  if (isNaN(args[0])) throw fa;
  const apuesta = parseInt(args[0]);
  const users = global.db.data.users[m.sender];
  const time = users.lastslot + 10000;
  
  if (new Date - users.lastslot < 10000) throw `*⦧🕹️⦨ انــتــظــر قـلـيـلـا قـبـل الـمـحـاولــة مـرة اخـري*

- *الــمــدة↜${msToTime(time - new Date())}*`;
  
  if (apuesta < 100) throw `
*⦧🕹️⦨ اقــل مـبـلـغ رهــان هــو 100 XP*`;
  
  if (users.exp < apuesta) throw `- *🔱 لــيــس لــديــك اكـسـبـي كـافـي*`;

  const emojis = ['🐋', '🐉', '🕊️'];
  let a = Math.floor(Math.random() * emojis.length);
  let b = Math.floor(Math.random() * emojis.length);
  let c = Math.floor(Math.random() * emojis.length);
  const x = [];
  const y = [];
  const z = [];
  
  for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
  }
  for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
  }
  for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
  }

  let end;
  if (a == b && b == c) {
    end = `
- *ـ🔱 ┇ +${apuesta + apuesta} XP*`;
    users.exp += apuesta;
  } else if (a == b || a == c || b == c) {
    end = `- *ـ🤷 ┇ +10 XP*`;
    users.exp += 10;
  } else {
    end = `- *ـ☠️ ┇ -${apuesta} XP*`;
    users.exp -= apuesta;
  }
  
  users.lastslot = new Date * 1;
  return await m.reply(
      `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*🎰 ┇كــازيــنــو تــانـجـيـرو*

*${x[0]} : ${y[0]} : ${z[0]}*
*${x[1]} : ${y[1]} : ${z[1]}*
*${x[2]} : ${y[2]} : ${z[2]}*

${end}

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`);
};

handler.help = ['كازينو'];
handler.tags = ['ga'];
handler.command = ['كازينو'];

export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + 'س ' + minutes + 'د ' + seconds + 'ث';
}