import fetch from 'node-fetch'; 

let handler = async function (m, { text }) {

  try {
    if (!text) {
      m.reply("*❐ الاستخدام الصحيح للأمر هو ☜ الامر ثم الرابط وسيقوم البوت بتقصيره يمكنك ادخال + بعد الرابط ثم نص تريده لجعل وسامك علي الرابط المختصر*");
      return;
    }
    const [link, alias] = text.split("+").map(part => part.trim());
    let apiUrl = `https://bk9.site/api/create?url=${encodeURIComponent(link)}`;
    if (alias) apiUrl += `&alias=${encodeURIComponent(alias)}`;
    await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.BK99) {
      return m.reply("*☜ الرابط مستخدم بلفعل استخدم رابط اخر*");
    }
    const shortURL = data.BK9; // تم تصحيح هذا السطر أيضًا
    return m.reply(`${shortURL}`);
  } catch (error) {
    console.error(error);
    return m.reply("*【❌| حـدث ⎗ خـطــأ |❌】*");
  }
};
handler.tags = ['to']
handler.help = ['تقصير_رابط2']
handler.command = ['تقصير_رابط2'];
export default handler;