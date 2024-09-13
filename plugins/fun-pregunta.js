const handler = async (m, { command, text }) => {
  // نصوص ثابتة باللغة العربية
  const textos = {
    texto1: [
      'مرحبا! يمكنك طرح سؤالك الآن.',
      'سؤالك هو:',
      'الإجابات المتوقعة هي:',
      'بــتـأكــيــد',
      'مـــن الـمـمـكـن',
      'مـسـتـحـيـل',
      'بـكـل اخـتـصـار هــو عــمــك'
    ]
  };

  // دالة للحصول على إجابة عشوائية
  const getRandom = array => array[Math.floor(Math.random() * array.length)];

  // التحقق مما إذا كان النص غير موجود
  if (!text) {
    return m.reply('*⟆👾⟅ قـــم بــأدخــال سـؤالــك*');
  }

  // تنسيق الرسالة
  await conn.sendMessage(m.chat, { react: { text: "👾",key: m.key,}
  })
  const message = `*⟆👾⟅ هـــــل ${text}*

- *🔱 الــجــواب↜${getRandom([textos.texto1[3], textos.texto1[4], textos.texto1[5], textos.texto1[6]])}*`.trim();

  m.reply(message, null, m.mentionedJid ? {
    mentions: m.mentionedJid,
  } : {});
}

handler.help = ['هل'];
handler.tags = ['fu'];
handler.command = /^هل$/i;
export default handler;