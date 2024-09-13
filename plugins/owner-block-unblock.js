const handler = async (m, {text, conn, usedPrefix, command}) => {
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  const why = `${usedPrefix + command} @${m.sender.split('@')[0]}*`;
  
  if (!who) {
    conn.reply(m.chat, why, m, {mentions: [m.sender]});
    return;
  }
  
  const res = [];
  switch (command) {
    case 'بلوك':
      if (who) {
        await conn.updateBlockStatus(who, 'block').then(() => {
          res.push(who);
        }).catch(err => {
          conn.reply(m.chat, `فشل في تنفيذ البلوك: ${err.message}`, m);
        });
      } else {
        conn.reply(m.chat, why, m, {mentions: [m.sender]});
      }
      break;
    case 'الغاء_البلوك':
      if (who) {
        await conn.updateBlockStatus(who, 'unblock').then(() => {
          res.push(who);
        }).catch(err => {
          conn.reply(m.chat, `فشل في تنفيذ إلغاء البلوك: ${err.message}`, m);
        });
      } else {
        conn.reply(m.chat, why, m, {mentions: [m.sender]});
      }
      break;
  }
  
  if (res[0]) {
    await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
    const action = command === 'بلوك' ? 'بلوك ل' : 'الغاء البلوك ل';
    conn.reply(m.chat, `╔════════════════════════════╗\n║   🛡️ تم عملت ${action} ${res ? `${res.map((v) => '@' + v.split('@')[0]).join(', ')}` : ''}   ║\n╚════════════════════════════╝`, m, {mentions: res});
  }
};
handler.help = ['بلوك','الغاء_البلوك'];
handler.tags = ['ow'];
handler.command = /^(بلوك|الغاء_البلوك)$/i;
handler.rowner = true;
export default handler;