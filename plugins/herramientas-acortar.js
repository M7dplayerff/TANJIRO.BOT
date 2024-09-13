import fetch from 'node-fetch';

const handler = async (m, { conn, args, text }) => {
  if (!text) throw '*☜ ضع الرابط المراد تقصيره*';
  
  // تصغير الرابط
  const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
  
  if (!shortUrl1) throw '*【❌┇حــــدث ⍅  خـــطـــأ】*';
  
  // إعداد الرسالة النهائية
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const done = `🔱 *رابـطـك جـاهـز↜* ${shortUrl1}`.trim();
  
  m.reply(done);
};

handler.help = ['تقصير_رابط']
handler.tags = ['to'];
handler.command = /^(تقصير_رابط)$/i;
handler.fail = null;

export default handler;