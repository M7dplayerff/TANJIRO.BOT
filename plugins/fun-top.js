import util from 'util';
import path from 'path';
import fs from 'fs';

const user = (a) => '@' + a.split('@')[0];

async function handler(m, {groupMetadata, command, conn, text, usedPrefix}) {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  
  // النصوص الثابتة باللغة العربية مع الإطار الزخرفي المتناسب
  const usage = `*⟆👾⟅ ادخـــل اســم بـعـد كـلـمـة تــوب*

- *مــثــال↜.توب شهامه*`;
  
  if (!text) throw `${usage}`;
  const ps = groupMetadata.participants;
  const a = ps.getRandom();
  const b = ps.getRandom();
  const c = ps.getRandom();
  const d = ps.getRandom();
  const e = ps.getRandom();
  const f = ps.getRandom();
  const g = ps.getRandom();
  const h = ps.getRandom();
  const i = ps.getRandom();
  const j = ps.getRandom();
  const k = Math.floor(Math.random() * 70);
  const x = `${pickRandom(['🤓', '😅', '😂', '😳', '😎', '🥵', '😱', '🤑', '🙄', '💩', '🍑', '🤨', '🥴', '🔥', '👇🏻', '😔', '👀', '🌚', '🔱', '🍻', '💋', '🤤', '🍷', '💀', '☠️', '🤴', '💦', '👌'])}`;
  const l = Math.floor(Math.random() * x.length);
  const vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`;
  
  // النص الثابت باللغة العربية مع الإطار الزخرفي المتناسب
  const top = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⟆🍻⟅ تـــوب تـــــن ${text}*

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

- *ـ ${x}* @${a.id.split('@')[0]}

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
  
  // إضافة التفاعل المطلوب قبل إرسال الرسالة
  await conn.sendMessage(m.chat, { react: { text: "👾", key: m.key } });
  
  // إرسال رسالة المنشنات
  await conn.sendMessage(m.chat, {text: top, mentions: [a.id, b.id, c.id, d.id, e.id, f.id, g.id, h.id, i.id, j.id]} );
}

handler.help = handler.command = ['توب'];
handler.tags = ['fu'];
handler.group = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}