import fetch from 'node-fetch';
import fs from 'fs';
import uploader from '../lib/uploadImage.js';

const handler = async (m, {conn, text, command}) => {
  if (command === 'صنع_صوره') {
    if (!text) throw '*☜ قم بأدخال الوصف الذي تريد صنع صوره له*';

    await conn.sendMessage(m.chat, { react: { text: "🤖",key: m.key,}
  })
    try {
      const BK9 = `https://bk9.fun/ai/photoleap?q=${encodeURIComponent(text)}`;
      const response = await fetch(BK9);
      const result = await response.json();
      await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}
  })
      if (result.status) {
        await conn.sendMessage(m.chat, {image: {url: result.BK9}}, {quoted: m});
      }
    } catch (error) {
      throw '*【❌| حـدث ⎗ خـطــأ |❌】*';
    }
  } else if (command === 'اسأل_تانجيرو2') { // تم التغيير هنا
    if (!text) throw '*☜ ادخل السؤال الذي تريد سؤاله لتانجيرو*';

    await conn.sendMessage(m.chat, { react: { text: "🤖",key: m.key,}
  })
    try {
      conn.sendPresenceUpdate('composing', m.chat);
      const BK9api = `https://bk9.fun/ai/gpt4?q=${encodeURIComponent(text)}`;
      const BK99 = await fetch(BK9api);
      const BK8 = await BK99.json();
      if (BK8.status && BK8.BK9) {
        const respuestaAPI = BK8.BK9;
        await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}
  })
        conn.reply(m.chat, respuestaAPI, m);
      } else {
        throw '*【❌| حـدث ⎗ خـطــأ |❌】*';
      }
    } catch (error) {
      throw '*【❌| حـدث ⎗ خـطــأ |❌】*';
    }
  } else if (command === 'شرح_صوره') {
    let BK7 = m.quoted ? m.quoted : m;
    let BK8 = (BK7.msg || BK7).mimetype || BK7.mediaType || '';
    await conn.sendMessage(m.chat, { react: { text: "🤖",key: m.key,}
  })
    if (/image/g.test(BK8) && !/webp/g.test(BK8)) {
      let BK0 = await BK7.download();
      let BK9img = await uploader(BK0);
      let BK9api = await (await fetch(`https://bk9.fun/ai/geminiimg?url=${BK9img}&q=${text}`)).json();
      conn.sendMessage(m.chat, { text: BK9api.BK9 }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}
  })
    } else {
      throw '☜ قم بلرد علي صوره واسأل السؤال الذي تريده عنها*';
    }
  }
};
handler.command = ['صنع_صوره', 'اسأل_تانجيرو2', 'شرح_صوره']; // تم التغيير هنا
handler.tags = ['to'];
handler.help = ['صنع_صوره', 'اسأل_تانجيرو2', 'شرح_صوره']
export default handler;