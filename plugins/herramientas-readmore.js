const handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  let [l, r] = text.split`|`;
  if (!l) l = '';
  if (!r) r = '';

  // قائمة الرسائل العشوائية
  const messages = [
    '🔱 *بهزر معاك يا عسل*',
    '🔱 *كيفك يا غالي*',
    '🔱 *تانجيرو بيحبك بما انك بتستخدم البوت*',
    '🔱 *كمل استعمال في البوت في اوامر اغرب صدقني*',
    '🔱 *لماذا نحن هنا*',
    '🔱 *بحبك في الله*',
    '🔱 *خد خش سلم علمطور❴ wa.me/201220864180 ❵*',
    '🔱 *لماذا يعيش السمك في الماء*',
    '🔱 *امممممم تانجيرو عمك*',
    '🔱 *خد بوسه يا حلو امواه*'
  ];

  // اختيار رسالة عشوائية من القائمة
  const randomMessage = messages[getRandomInt(0, messages.length - 1)];
  
  conn.reply(m.chat, l + readMore + r + randomMessage, m);
};

handler.help = ['قراءة_المزبد']
handler.tags = ['to'];
handler.command = /^(قراءة_المزيد)$/i;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

// دالة للحصول على عدد عشوائي بين min و max (شاملة)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}