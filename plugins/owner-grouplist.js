const handler = async (m, { conn }) => {
  let txt = '';
  try {    
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
      const participantStatus = isParticipant ? 'موجود ✅' : 'غير موجود ❌';
      const totalParticipants = participants.length;
      txt += `╔════════════════════╗
      ║🔹 المجموعة رقم: ${i + 1}
      ║📛 اسم المجموعة: ${await conn.getName(jid)}
      ║🆔 معرف المجموعة: ${jid}
      ║🛡️ هل البوت مشرف: ${isBotAdmin ? '✔ نعم' : '❌ لا'}
      ║👤 حالة البوت: ${participantStatus}
      ║👥 عدد الأعضاء: ${totalParticipants}
      ║🔗 رابط الدعوة: ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '--- (خطأ) ---'}` : '--- (ليس مشرف) ---'}
      ╚════════════════════╝\n\n`;
    }
    m.reply(`╔════════════════════╗\n🔍 إجمالي المجموعات: ${totalGroups}\n\n${txt}╚════════════════════╝`.trim());
  } catch {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? 'موجود ✅' : 'غير موجود ❌';
      const totalParticipants = participants.length;    
      txt += `╔════════════════════╗
      ║🔹 المجموعة رقم: ${i + 1}
      ║📛 اسم المجموعة: ${await conn.getName(jid)}
      ║🆔 معرف المجموعة: ${jid}
      ║🛡️ هل البوت مشرف: ${isBotAdmin ? '✔ نعم' : '❌ لا'}
      ║👤 حالة البوت: ${participantStatus}
      ║👥 عدد الأعضاء: ${totalParticipants}
      ║🔗 رابط الدعوة: ${isBotAdmin ? '--- (خطأ) ---' : '--- (ليس مشرف) ---'}
      ╚════════════════════╝\n\n`;
    }
    m.reply(`╔════════════════════╗\n🔍 إجمالي المجموعات: ${totalGroups}\n\n${txt}╚════════════════════╝`.trim());
  }    
};

handler.help = ['جروب_ليست'];
handler.tags = ['ow'];
handler.command = /^(جروب_ليست)$/i;
handler.rowner = true;
handler.private = true;

export default handler;