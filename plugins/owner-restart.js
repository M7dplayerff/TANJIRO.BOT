import fs from 'fs';

const handler = async (m, { conn, isROwner, text }) => {
  if (!process.send) throw '❗ معرفتش اعمل ريستارت، آسف 😔';

  // Send confirmation message before restart
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  await m.reply('╔═══════════════════╗\n🔄 بعمل ريستارت استني\n╚═══════════════════╝');
  
  // Restart the bot
  process.send('reset');

  // Send confirmation message after restart
  await m.reply('╔═══════════════════╗\n✅ انا خلاص عملت ريستارت، تقدر تستعملني دلوقت\n╚═══════════════════╝');
};

handler.help = ['اعادة_تشغيل'];
handler.tags = ['ow'];
handler.command = ['ريستارت', 'اعادة_تشغيل'];
handler.rowner = true;

export default handler;