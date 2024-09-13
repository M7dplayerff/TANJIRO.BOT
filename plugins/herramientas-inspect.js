const handler = async (m, { conn, text }) => {
  const [, code] = text.match(/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i) || [];
  if (!code) throw `*☜ قم بأدخال رابط المجموعه بعد الامر ليشتغل بشكل طبيعي*`;

  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  // طلب بيانات الجروب باستخدام رمز الدعوة
  const res = await conn.query({
    tag: 'iq',
    attrs: { type: 'get', xmlns: 'w:g2', to: '@g.us' },
    content: [{ tag: 'invite', attrs: { code } }]
  });

  const data = extractGroupMetadata(res);

  const txt = `*➤━━━━━❖⊰🕷️⊱❖━━━━━➤*
*❐ اسـم الـروم↜${data.subject}* 🔱

*❐ الـمـالـك↜ ${data.owner}* 👑

*❐ تـاريـخ الـانـشـاء↜${data.creation}* 🔱

*❐ الـوصـف↜${data.desc || 'لا يوجد وصف'}* 🔱

*❐ الـمـعـرف↜ ${data.id}* 🔱

*➤━━━━━❖⊰🕷️⊱❖━━━━━➤*
*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;

  // محاولة الحصول على صورة المجموعة
  let pp;
  try {
    pp = await conn.profilePictureUrl(data.id, 'image');
  } catch (e) {
    pp = null;
  }

  if (pp) {
    // إرسال الرسالة مع الصورة إذا كانت موجودة
    return conn.sendMessage(m.chat, { image: { url: pp }, caption: txt }, { quoted: m });
  } else {
    // إرسال الرسالة فقط إذا لم تكن هناك صورة
    await conn.reply(m.chat, txt, m);
  }
};
handler.help = ['معلومات_الروم']
handler.tags = ['to']
handler.command = /^(معلومات_روم)$/i;
export default handler;

// استخراج بيانات الجروب من الرد
const extractGroupMetadata = (result) => {
  const group = result.content.find(item => item.tag === 'group');
  const descChild = group.content.find(item => item.tag === 'description');
  let desc = '';
  if (descChild) desc = descChild.content.find(item => item.tag === 'body')?.content || '';

  const metadata = {
    id: group.attrs.id.includes('@') ? group.attrs.id : `${group.attrs.id}@g.us`,
    subject: group.attrs.subject || 'غير محدد',  // هذا هو اسم المجموعة
    creation: new Date(+group.attrs.creation * 1000).toLocaleString(),
    owner: group.attrs.creator ? 'wa.me/' + group.attrs.creator.split('@')[0] : group.attrs.id.includes('-') ? 'wa.me/' + group.attrs.id.split('-')[0] : '',
    desc: desc || 'لا يوجد وصف',
  };

  return metadata;
};