const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `📩 ابعت البادئة اللي عايزني أشغل بيها الأوامر يا تانجيرو`;

  // التحقق من النص
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  await m.reply(`⏳ استني شوية، بتحقق إن النص اللي حطيته هيبقى تمام وهيمشي الأوامر`);

  // تحديث البادئة
  global.prefix = new RegExp('^[' + (text.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-') + ']');

  await m.reply(`✅ تمام، عينت البادئة بتاعت الأوامر يا تانجيرو إلى *${text}*`);
};

handler.help = ['تعيين_البادئة'];
handler.tags = ['ow'];
handler.command = /^(تعين_بداية_الاوامر)$/i;
handler.rowner = true;

export default handler;