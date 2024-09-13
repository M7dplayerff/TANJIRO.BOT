import google from 'google-it';
import axios from 'axios';

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const fetch = (await import('node-fetch')).default;
  const text = args.join(' ');
  
  // التحقق من إدخال النص
  if (!text) return conn.reply(m.chat, ' ☜ *ادخل النص الذي تريد البحث عنه في جوجل*', m);

  await conn.sendMessage(m.chat, { react: { text: "🔍",key: m.key,}
  })
  
  const url = 'https://google.com/search?q=' + encodeURIComponent(text);

  await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}
  })
  
  google({'query': text}).then(res => {
    let teks = `*نتائج البحث عن↜ ${text}*\n\n${url}\n\n`;
    for (let g of res) {
      teks += `*${g.title}*\n${g.link}\n*${g.snippet}*\n\n`;
    } 
    
    const ss = `https://image.thum.io/get/fullpage/${url}`;
    conn.sendFile(m.chat, ss, 'result.png', teks, m);
  }).catch(error => {
    console.error(error);
    m.reply('*【❌| حـدث ⎗ خـطــأ |❌】*');
  });
};

handler.help = ['google', 'googlef'].map((v) => v + ' <بحث>');
handler.tags = ['internet'];
handler.command = /^بحث_جوجل?$/i;

export default handler;