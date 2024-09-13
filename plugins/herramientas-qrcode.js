import { toDataURL } from 'qrcode';

const handler = async (m, { text, conn }) => {
  if (!text) throw `*☜ قم بكتابة النص المراد تحويله لرمز استجابة سريعه*`;

  await conn.sendMessage(m.chat, { react: { text: "🖨️",key: m.key,}
  })
  conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', `🔱 *تـم الـانـشـاء*`, m);
};

handler.help = ['صنع_رمز_استجابة_سريعة']
handler.tags = ['to'];
handler.command = /^صنع(_رمز_استجابة_سريعة)?$/i;

export default handler;