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

  // جلب المشاركين في المجموعة
  const ps = groupMetadata.participants;
  if (!ps || ps.length < 10) throw `- *🔱 عدد اعضاء غير كافي لتنفيذ الامر*`;

  const participantsCount = 10; // عدد المشاركين العشوائيين
  let selectedParticipants = [];

  // اختيار مشاركين عشوائيين بدون تكرار
  while (selectedParticipants.length < participantsCount) {
    let randomParticipant = ps[Math.floor(Math.random() * ps.length)];
    if (!selectedParticipants.includes(randomParticipant)) {
      selectedParticipants.push(randomParticipant);
    }
  }

  const x = `${pickRandom(['🤓', '😅', '😂', '😳', '😎', '🥵', '😱', '🤑', '🙄', '💩', '🍑', '🤨', '🥴', '🔥', '👇🏻', '😔', '👀', '🌚', '🔱', '🍻', '💋', '🤤', '🍷', '💀', '☠️', '🤴', '💦', '👌'])}`;
  
  // النص الثابت باللغة العربية مع الإطار الزخرفي المتناسب
  let top = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⟆🍻⟅ تـــوب تـــــن ${text}*\n`;

  selectedParticipants.forEach((participant, index) => {
    top += `- *ـ ${x}* @${participant.id.split('@')[0]}\n`;
  });

  top += `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;

  // إضافة التفاعل المطلوب قبل إرسال الرسالة
  await conn.sendMessage(m.chat, { react: { text: "👾", key: m.key } });
  
  // إرسال رسالة المنشنات
  await conn.sendMessage(m.chat, {text: top, mentions: selectedParticipants.map(p => p.id)});
}

handler.help = handler.command = ['توب'];
handler.tags = ['fu'];
handler.group = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}