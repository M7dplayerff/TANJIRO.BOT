const handler = async (m, {conn, participants, groupMetadata}) => {
  await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './PCB/منيو1.png';
  const {antiToxic, antiTraba, antidelete, antiviewonce, isBanned, welcome, detect, detect2, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, modoadmin, audios, delete: del} = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  const text = `
════════════════════════════════════
*رابط المجموعة:* ${groupMetadata.id} 🔗

*اسم المجموعة:* ${groupMetadata.subject} 🏷️

*الوصف:* ${groupMetadata.desc?.toString() || 'لا يوجد وصف'} 📝

*عدد الأعضاء:* ${participants.length} 👥

*المالك:* @${owner.split('@')[0]} 👑

*المشرفين:*
${listAdmin}

*الميزات:*

┠≽ 🎉 *الترحيب:* ${welcome ? '✅' : '❌'}

┠≽ 🕵️‍♂️ *الكاشف:* ${detect ? '✅' : '❌'}

┠≽ 🔍 *الكاشف الإضافي:* ${detect2 ? '✅' : '❌'}

┠≽ 🚫 *مضاد روابط:* ${antiLink ? '✅' : '❌'}

┠≽ 🚫 *مضاد روابط إضافي:* ${antiLink2 ? '✅' : '❌'}

┠≽ 🚫 *مكافح محتوى +18:* ${modohorny ? '✅' : '❌'}

┠≽ 📜 *ستكر تلقائي:* ${autosticker ? '✅' : '❌'}

┠≽ 🎤 *الريكورد:* ${audios ? '✅' : '❌'}

┠≽ 👁️ *عرض لمرة واحدة:* ${antiviewonce ? '✅' : '❌'}

┠≽ 🗑️ *حذف:* ${antidelete ? '✅' : '❌'}

┠≽ 🦠 *مضاد للفيروسات:* ${antiToxic ? '✅' : '❌'}

┠≽ 🚫📢 *مضاد للترويج:* ${antiTraba ? '✅' : '❌'}

┠≽ 👮 *تحديد مشرفين:* ${modoadmin ? '✅' : '❌'}
════════════════════════════════════
    *𝚃𝙰𝙽𝙹𝙸𝚁𝙾.𝙱𝙾𝚃*
`.trim();

  conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['معلومات_الروم'];
handler.tags = ['gc'];
handler.command = /^(معلومات_الروم|gro?upinfo|info(gro?up|gc))$/i;
handler.group = true;
export default handler;