const handler = async (m, {conn, text}) => {
  const id = m.chat;
  conn.math = conn.math ? conn.math : {};
  if (id in conn.math) {
    clearTimeout(conn.math[id][3]);
    delete conn.math[id];
    m.reply(`*【❌┇فــشــلـت ⍅  الـعـمـلـيـة】*`);
  }
  await conn.sendMessage(m.chat, { react: { text: "📟",key: m.key,}
  })
  const val = text
      .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π|pi/gi, 'Math.PI')
      .replace(/e/gi, 'Math.E')
      .replace(/\/+/g, '/')
      .replace(/\++/g, '+')
      .replace(/-+/g, '-');
  const format = val
      .replace(/Math\.PI/g, 'π')
      .replace(/Math\.E/g, 'e')
      .replace(/\//g, '÷')
      .replace(/\*×/g, '×');
  try {
    console.log(val);
    const result = (new Function('return ' + val))();
    if (!result) throw result;
    m.reply(`- *الــســـؤال↜${format}*

- *الـاجـابـة↜${result}*`);
  } catch (e) {
    m.reply(`*☜ بعد الامر قم بأدخال العمليه الحسابيه وسيتم ارسال الناتج*`);
  }
};
handler.help = ['الةحاسبة'];
handler.tags = ['to'];
handler.command = /^(الة(حا(سبة|or))?|kalk(ulator)?)$/i;
handler.exp = 5;
export default handler;