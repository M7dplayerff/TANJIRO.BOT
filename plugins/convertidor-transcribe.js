import { transcribe } from '../lib/transcribe.js';

let handler = async(m, { conn, text, args, command, usedPrefix }) => {

    let q = m.quoted ? m.quoted : m;
    if (!q) return m.reply('- *🔱 لـــم يــتــم الــعــثــور عــلــي وســائــط*');
    
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
    if (!/audio/.test(mime)) return m.reply(`- *🔱 قــم بـلـرد عــلــي صــوت بـاسـتـخـدام الـامــر*`);

    let media = await q.download?.();
    let { data, success } = await transcribe(media);

    if (!success) return m.reply('- *🔱 فــشــل الــتــحــميــل*');
    conn.sendMessage(m.chat, { text: data.text }, { quoted: m });
}

handler.help = ['تحويل_لنص'];
handler.tags = ['co'];
handler.command = /^(تحويل_لنص)$/i;
export default handler;
