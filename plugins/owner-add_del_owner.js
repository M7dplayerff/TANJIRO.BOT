const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  if (!who) return conn.reply(m.chat, 
    `*⤶ ❐┇ الاستخدام الصحيح للأمر*\n` +
    `*☜ ${usedPrefix}اونر @user*\n` +
    `*☜ ${usedPrefix}حذف_اونر @user*`, 
    m, 
    { mentions: [m.sender] }
  );
  await conn.sendMessage(m.chat, { react: { text: "👑",key: m.key,}
  })
  switch (command) {
    case 'اونر':
      const nuevoNumero = who;
      global.owner.push([nuevoNumero]);
      await conn.reply(m.chat, '*【👑┇تم رفعه ⍅  مالك للبوت】*', m);
      break;
    case 'حذف_اونر':
      const numeroAEliminar = who;
      const index = global.owner.findIndex(owner => owner[0] === numeroAEliminar);
      if (index !== -1) {
        global.owner.splice(index, 1);
        await conn.reply(m.chat, '*【✅┇تم ازالته ⍅  من مالكين البوت】*', m);
      } else {
        await conn.reply(m.chat, '*【🚫┇المستخدم ⍅  ليس من مالكين البوت】*', m);
      }
      break;
  }
};
handler.help = ['اونر','حذف_اونر'];
handler.tags = ['ow'];
handler.command = /^(اونر|حذف_اونر)$/i;
handler.rowner = true;
export default handler;