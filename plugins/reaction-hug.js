import axios from 'axios';

const dir = [
    'https://l.arzfun.com/8j9dD',
    'https://l.arzfun.com/rASRW',
    'https://l.arzfun.com/ysWIc',
    'https://l.arzfun.com/7w7tO',
    'https://l.arzfun.com/kA1T2',
    'https://l.arzfun.com/bT0S1',
    'https://l.arzfun.com/nasSh',
    'https://l.arzfun.com/6bfTb',
    'https://l.arzfun.com/t68Qn',
    'https://l.arzfun.com/Zq8yc',
    'https://l.arzfun.com/eOAUL'
];

let handler = async (m, { conn, command, usedPrefix, text }) => {

    // التحقق مما إذا كان هناك منشن
    let mentionedUser = m.mentionedJid[0];
    let replyToUser = m.replyingToMessage ? m.replyingToMessage.sender : null; 

    // إذا لم يكن هناك منشن، تحقق من الرد على رسالة
    if (!mentionedUser && !replyToUser) {
        return conn.reply(m.chat, '- *🔱 قــم بـعـمـل مـنـشـن لـلـعـضـو الـذي تــريد عـنـاقـه 🫂*', m);
    }

    // تحديد المستخدم الذي سيتم منشنه بناءً على المنشن أو الرد
    mentionedUser = mentionedUser || replyToUser;
    const senderUser = m.sender; // الشخص الذي استخدم الأمر

    try {
        let imageUrl = dir[Math.floor(Math.random() * dir.length)];
        await conn.sendMessage(m.chat, { react: { text: "🫂", key: m.key } });

        // تحميل الصورة من الرابط
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // إرسال الصورة مع النص المطلوب
        const captionMessage = `
*❤️🥺 هذا الطيف 🥺 @${senderUser.split('@')[0]} قام بعناق 🫂 @${mentionedUser.split('@')[0]} بكل ود وامتنان 🫂🥺*`;

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

handler.help = ['عناق'];
handler.tags = ['re'];
handler.command = ['عناق', 'حضن'];  // الأوامر التي يمكن استخدامها لتشغيل هذا الكود

export default handler;