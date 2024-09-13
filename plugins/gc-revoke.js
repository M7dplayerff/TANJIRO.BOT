/* Creditos a https://github.com/ALBERTO9883 */

const handler = async (m, {conn}) => {
  await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  const revoke = await conn.groupRevokeInvite(m.chat);
  const message = `*⦙🍷⦘ ↫ تـــــم تـغـيـيـر رابــط الـمـجـمـوعـه بـنـجـاح*\n\n- *الـرابـط الـجـديـد↜* ${'https://chat.whatsapp.com/' + revoke}`;
  await conn.reply(m.chat, message, m);
};
handler.help = ['تغيير_الرابط']
handler.tags = ['gc']
handler.command = ['تغيير_الرابط'];
handler.botAdmin = true;
handler.admin = true;
handler.group = true;

export default handler;