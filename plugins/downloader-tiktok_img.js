// Code by Xnuvers007 ft. Jikarinka
// https://github.com/Xnuvers007/
// 
// Mejorado por @BrunoSobrino
////////////////////////////////////

import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text: tiktok, args, command, usedPrefix }) => {
    const datas = global
    const idioma = datas.db.data.users[m.sender].language

    // النصوص الثابتة بالعربية
    const texto1 = "- *🔱 ادخــل رابــط صـــور تــيــك تـــوك*";
    await conn.sendMessage(m.chat, { react: { text: "📥",key: m.key,}
  })
    const texto2 = "- *🔱 فــشــل الـتـحـمـيـل*";
    const texto3 = "- *🔱 لــم يــتــم الـعـثـور عــلــي الــصــور*";
    const texto4 = "- *🔱 فــشــل الـتـحـمـيـل*";

    if (!tiktok) throw texto1;
    let imagesSent
    if (imagesSent) return;
    imagesSent = true
    try {
        let tioShadow = await ttimg(tiktok);
        let result = tioShadow?.data;
        for (let d of result) {
            await conn.sendMessage(m.chat, { image: { url: d } }, { quoted: m });
        };
        imagesSent = false
    } catch {
        imagesSent = false
        throw texto2
    }
};
handler.help = ['صور_تيكتوك']
handler.tags = ['do']
handler.command = /^(صور_تيكتوك)$/i;
export default handler;

async function ttimg(link) {
    try {
        let url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`;
        let response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let imgSrc = [];
        $('div.col-md-12 > img').each((index, element) => {
            imgSrc.push($(element).attr('src'));
        });
        if (imgSrc.length === 0) {
            return { data: texto3 };
        }
        return { data: imgSrc };
    } catch (error) {
        console.log(error);
        return { data: texto4 };
    };
};