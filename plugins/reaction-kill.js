import axios from 'axios';

const dir = [
    'https://l.arzfun.com/T1Wd0',
    'https://l.arzfun.com/oF20v',
    'https://l.arzfun.com/9MCnX',
    'https://l.arzfun.com/bPDjj',
    'https://l.arzfun.com/UmWTU',
    'https://l.arzfun.com/EKg0O',
    'https://l.arzfun.com/0gneu',
    'https://l.arzfun.com/SpHq6'  // الروابط الجديدة المضافة
];

let handler = async (m, { conn, command, usedPrefix, text }) => {

    // تحقق من وجود المنشن
    if (!m.mentionedJid[0]) {
        return conn.reply(m.chat, '- *🔱 قــم بـعـمـل مـنـشـن لـلـعـضـو الـذي تــريد قـتـلـه 😈*', m);
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
*🔥👿 هذا المجنون الشيطاني 😈 @${senderUser.split('@')[0]} قام بقتل 💀 @${mentionedUser.split('@')[0]} بدون أي رحمة 🩸⚔️*`;

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

handler.help = ['قتل'];
handler.tags = ['re'];
handler.command = ['قتل'];  // الأوامر التي يمكن استخدامها لتشغيل هذا الكود

export default handler;