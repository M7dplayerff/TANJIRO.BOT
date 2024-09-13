import { createHash } from 'crypto';
import fs from 'fs'; // تأكد من استيراد fs إذا لم يكن مستورداً بالفعل

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

const handler = async function(m, { conn, text, usedPrefix, command }) {
  const datas = global;
  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);
  const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => global.imagen1);

  if (user.registered === true) throw `*☜انت مسجل بلفعل استخدم الامر*\n\n\n*لالغاء التسجيل* \n\n*.الغاء_التسجيل سيريال نمبر*`;
  if (!Reg.test(text)) throw `*الاستخدام الصحيح هو:*\n\n*.تسجيل الاسم.العمر*`;
  
  let [_, name, splitter, age] = text.match(Reg);
  if (!name) throw `*ادخل الاسم الخاص بك*`;
  if (!age) throw `*قم بأدخال عمرك*`;
  if (name.length >= 30) throw `*دا اسم دوله ولا انسان ادخل اسمك الاول فقط😑*`;
  
  age = parseInt(age);
  if (age > 70) throw `*بمثل عمرك يصلون روح صلي يا عجوز👴*`;
  if (age < 5) throw `*بتعمل اي هنا يا نوغه روح نام يا بابا👶*`;
  
  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date;
  user.registered = true;
  
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const sn = createHash('md5').update(m.sender).digest('hex');
  const caption = `*✧━════━⊰🤴⊱━════━✧*
*❐⤶الاسم↜${name}*
*❐⤶العمر↜${age}*
*❐⤶السيريال⇠نمبر↜${sn}*
*✠ ─── ✷ ─ ‹🕷️› ─ ✷ ─── ✠*`;

  await conn.sendFile(m.chat, pp, 'ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ.jpg', caption, m);
  
  global.db.data.users[m.sender].money += 10000;
  global.db.data.users[m.sender].exp += 10000;
};

handler.help = ['تسجيل'];
handler.tags = ['rp'];
handler.command = /^(تسجيل)$/i;
export default handler;