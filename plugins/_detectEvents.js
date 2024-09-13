import fs from 'fs'; // تم إضافة استيراد fs لقراءة الملفات المحلية

export async function before(m, { conn, participants }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const groupName = (await conn.groupMetadata(m.chat)).subject;
  const groupAdmins = participants.filter((p) => p.admin);

  const chat = global.db.data.chats[m.chat];
  const mentionsString = [m.sender, m.messageStubParameters[0], ...groupAdmins.map((v) => v.id)];
  const mentionsContentM = [m.sender, m.messageStubParameters[0]];
  const fkontak2 = {
    'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' },
    'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } },
    'participant': '0@s.whatsapp.net'
  };

  // الأكواد التالية تبقى كما هي، باستثناء طريقة رفع الصورة
    if (chat.detect2 && m.messageStubType == 29) {
    let txt1 = "*✦━━━━✦⊰🕷️⊱✦━━━━✦*\n";
    txt1 += `*⦑🕷️⦒ ❐ تـم رفــع ادمــن جـديـد بــواسـطـة 🆙👤↜* @${m.sender.split`@`[0]}
*⦑🕷️⦒ ❐ مـبـرك الــتـرقـيـة🎉💪↜* @${m.messageStubParameters[0].split`@`[0]}
*✦━━━━✦⊰🕷️⊱✦━━━━✦*`;

    await conn.sendMessage(m.chat, { image: img, caption: txt1, mentions: mentionsString }, { quoted: fkontak2 });
  }

  if (chat.detect2 && m.messageStubType == 30) {
    let txt2 = "*✦━━━━✦⊰🕷️⊱✦━━━━✦*\n";
    txt2 += `*⦑🕷️⦒ ❐ تـم تـخـفـيـض ادمــن بـواسـطـة ⬇️👤↜* @${m.sender.split`@`[0]}
*⦑🕷️⦒ ❐ تـم تـخـفـيـض رتـبـتـك😥↜* @${m.messageStubParameters[0].split`@`[0]}
*✦━━━━✦⊰🕷️⊱✦━━━━✦*`;
    
    await conn.sendMessage(m.chat, { image: img, caption: txt2, mentions: mentionsString }, { quoted: fkontak2 });
  }

  
  if (chat.detect2 && m.messageStubType == 27) {
    let txt3 = "*✦━━━━✦⊰🕷️⊱✦━━━━✦*\n";
    txt3 += `*⦑🕷️⦒ ❐ تـم اضـافــة عـضـو جـديـد*
*⦑🕷️⦒ ❐ الادمــن الـمـضـيـف 🔱↜* @${m.sender.split`@`[0]}
*⦑🕷️⦒ ❐ العـضـو الجـديـد🆕👤↜* @${m.messageStubParameters[0].split`@`[0]}
*✦━━━━✦⊰🕷️⊱✦━━━━✦*`;
    if (!m.sender.endsWith('@g.us')) {
      

    }
    await conn.sendMessage(m.chat, { image: img, caption: txt3, mentions: mentionsContentM }, { quoted: fkontak2 });
  }

  if (chat.detect2 && m.messageStubType == 28) {
    let txt4 = "*✦━━━━✦⊰🕷️⊱✦━━━━✦*\n";
    txt4 += `*⦑🕷️⦒ ❐ تـم طـرد عــضــو*
*⦑🕷️⦒ ❐ الـمـتـسـبـب فـي الـطـرد 🔱↜* @${m.sender.split`@`[0]}
*⦑🕷️⦒ ❐ الـعـضـو الـذي تـم طــرده 👋👤↜* @${m.messageStubParameters[0].split`@`[0]}
*✦━━━━✦⊰🕷️⊱✦━━━━✦*`;
    if (!m.sender.endsWith('@g.us')) {

    }
    await conn.sendMessage(m.chat, { image: img, caption: txt4, mentions: mentionsContentM }, { quoted: fkontak2 });
  }

   if (chat.detect2 && m.messageStubType == 32) {
    let ax;
    if (m.messageStubParameters[0] === m.sender) {
      ax = 'غادر';
    } else {
      ax = 'تم إزالته';
    }
    let txt5 = ``;
    txt5 += `*⦑🕷️⦒ ❐ اشـعـار مـغـادرة 🥱👋↜ غــادر العـضـو @${m.sender.split`@`[0]} الـروم*`;
    if (ax === 'تم إزالته') {

      
    }
    await conn.sendMessage(m.chat, { image: img, caption: txt5, mentions: mentionsContentM }, { quoted: fkontak2 });
  }

  if (chat.detect2 && m.messageStubType == 26) {
    let accion;
    if (m.messageStubParameters[0].split`@`[0] === 'on') {
      accion = 'لـلـمـشـرفـيـن فـقـط👑';
    } else {
      accion = 'لـلجـمـيـع👥';
    }
    let txt6 = "*✦━━━━✦⊰🕷️⊱✦━━━━✦*\n";
    txt6 += `*⦑🕷️⦒ ❐ تـم تـغـيـر امـكـانـيـة ارسـال الـرسـائـل*
*⦑🕷️⦒ ❐ الـحـالـة↜${accion}* 
*⦑🕷️⦒ ❐ الـمـسـؤول 🔱↜* @${m.sender.split`@`[0]}
*✦━━━━✦⊰🕷️⊱✦━━━━✦*`;

    await conn.sendMessage(m.chat, { image: img, caption: txt6, mentions: mentionsContentM }, { quoted: fkontak2 });
  }

  if (chat.detect2 && m.messageStubType == 21) {
    let txt7 = "*✦━━━━✦⊰🕷️⊱✦━━━━✦*\n";
    txt7 += `*⦑🕷️⦒ ❐ تـم تـغـيـير اسـم الــروم*
*⦑🕷️⦒ ❐ الاسـم الـجـديـد✨🌝↜${groupName}* 
*⦑🕷️⦒ ❐ مـغـيـر الاســم🔱↜* @${m.sender.split`@`[0]}
*✦━━━━✦⊰🕷️⊱✦━━━━✦*`
    
    await conn.sendMessage(m.chat, { image: img, caption: txt7, mentions: mentionsContentM }, { quoted: fkontak2 });
  }
}
handler.help =['تفعيل/تعطيل ادارة_الروم', 'تفعيل/تعطيل ادارة_الروم2']
handler.tags =['bot']