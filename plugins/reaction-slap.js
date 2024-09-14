import axios from 'axios';

const dir = [
    'https://l.arzfun.com/uQGOt',
    'https://l.arzfun.com/QwTB0',
    'https://l.arzfun.com/g1Rs1',
    'https://l.arzfun.com/67G8l',
    'https://l.arzfun.com/fBRcQ',
    'https://l.arzfun.com/Xc1DH'
];

let handler = async (m, { conn, command, usedPrefix, text }) => {

    // تحقق من وجود المنشن
    if (!m.mentionedJid[0]) {
        return conn.reply(m.chat, '- *🔱 قــم بـعـمـل مـنـشـن لـلـعـضـو الـذي تــريد صـفـعـه 😈*', m);
    }

    const mentionedUser = m.mentionedJid[0]; // الشخص الذي تم منشنه
    const senderUser = m.sender; // الشخص الذي استخدم الأمر

    try {
        let imageUrl = dir[Math.floor(Math.random() * dir.length)];
        await conn.sendMessage(m.chat, { react: { text: "🔪", key: m.key } });

        // تحميل الصورة من الرابط
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // إرسال الصورة مع النص المطلوب
        const captionMessage = `
*🔥👿 هذا المجنون الشيطاني 😈 @${senderUser.split('@')[0]} قام بصفع 💀 @${mentionedUser.split('@')[0]} بدون أي رحمة 😡🖐️*`;

        await conn.sendMessage(
            m.chat, 
            { 
                image: imageBuffer, 
                caption: captionMessage, 
                mentions: [senderUser, mentionedUser] // المنشن للشخصين
            },
            { quoted: m }
        );

    } catch (error) {
        console.error('Error fetching image:', error);
        await conn.sendMessage(
            m.chat, 
            '- *🔱 حـــدث خـــطـــأ*', 
            { quoted: m }
        );
    }
};

handler.help = ['صفع'];
handler.tags = ['re'];
handler.command = ['صفع'];  // الأوامر التي يمكن استخدامها لتشغيل هذا الكود

export default handler;