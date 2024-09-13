const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `*⟆👾⟅ الـاسـتـخـدام الـصـحـيـح لـلـأمــر*

- *${usedPrefix}${command} @user*`;
  await conn.sendMessage(m.chat, { react: { text: "👾",key: m.key,}
  })
  const percentages = (500).getRandom();
  let emoji = '';
  let specialEmoji = '';
  let description = '';

  switch (command) {
    case 'شاذ':
      emoji = '🏳️‍🌈';
      description = `شاذ`;
      specialEmoji = percentages < 50 ? '🦾' : '';
      break;
    case 'جبان':
      emoji = '😟';
      description = `جبان`;
      specialEmoji = percentages < 50 ? '💪' : '';
      break;
    case 'خروف':
      emoji = '🐏';
      description = `خروف`;
      specialEmoji = percentages < 50 ? '💪' : '';
      break;
    case 'سيمب':
      emoji = '💘';
      description = `سيمب`;
      specialEmoji = percentages < 50 ? '💪' : '';
      break;
    case 'كرينج':
      emoji = '🤡';
      description = `كرينج`;
      specialEmoji = percentages < 50 ? '😎' : '';
      break;
    case 'رومنسي':
      emoji = '💓';
      description = `رومنسي`;
      specialEmoji = percentages < 50 ? '🥀' : '';
      break;
    case 'كيوت':
      emoji = '🥺';
      description = `كيوت`;
      specialEmoji = percentages < 50 ? '👿' : '';
      break;
    case 'شرير':
      emoji = '😈';
      description = `شرير`;
      specialEmoji = percentages < 50 ? '🥺' : '';
      break;
    case 'مدي':
      emoji = '🤑';
      description = `مدي`;
      specialEmoji = percentages < 50 ? '🚫🤑' : '';
      break;
    default:
      throw `الأمر غير معروف`;
  }

  const cal = `*╭────────── ⌠تنبؤات⌡ ──────────╮*
*│                                            │*
*┠≽ ❒ ${text}   │*
*┠≽ ❒ ${description}   │*
*┠≽ ${percentages}%   │*
*┠≽ ❒ مبروك الشعار: ${emoji} ${specialEmoji} │*
*│                                            │*
*╰────────── ⌠🧐⌡ ──────────╯*
     *ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
`.trim();
  
  async function loading() {
    var hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ]
    let { key } = await conn.sendMessage(m.chat, { text: `*جــاري الــتــنــبــؤ...*`, mentions: conn.parseMention(cal) }, { quoted: m })
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(cal) }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { text: cal, edit: key, mentions: conn.parseMention(cal) }, { quoted: m });
  }
  loading()
};

handler.help = ['شاذ', 'جبان', 'خروف', 'سيمب', 'كرينج', 'رومنسي', 'كيوت', 'شرير', 'مدي']
handler.tags = ['fu'];
handler.command = /^(شاذ|جبان|خروف|سيمب|كرينج|رومنسي|كيوت|شرير|مدي)$/i;
export default handler;