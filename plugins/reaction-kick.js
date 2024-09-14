import axios from 'axios';

const dir = [
    'https://l.arzfun.com/TkAyG',
    'https://l.arzfun.com/g0e9z',
    'https://l.arzfun.com/1aXck',
    'https://l.arzfun.com/TIoVM',
    'https://l.arzfun.com/BKYx1',
    'https://l.arzfun.com/6mHfv',
    'https://l.arzfun.com/Bxnd2',
    'https://l.arzfun.com/nYWRc',
    'https://l.arzfun.com/pvqoC',
    'https://l.arzfun.com/t7dPI'
];

let handler = async (m, { conn, command, usedPrefix, text }) => {

    // التحقق مما إذا كان هناك منشن أو رد على رسالة
    let mentionedUser = m.mentionedJid[0];
    let replyToUser = m.replyingToMessage ? m.replyingToMessage.sender : null; 

    // إذا لم يكن هناك منشن أو رد على رسالة
    if (!mentionedUser && !replyToUser) {
        return conn.reply(m.chat, '- *🔱 قــم بـعـمـل مـنـشـن لـلـعـضـو الـذي تــريد ركــلــه 🦶*', m);
    }

    // تحديد المستخدم الذي سيتم منشنه بناءً على المنشن أو الرد
    mentionedUser = mentionedUser || replyToUser;
    const senderUser = m.sender; // الشخص الذي استخدم الأمر

    try {
        let imageUrl = dir[Math.floor(Math.random() * dir.length)];
        await conn.sendMessage(m.chat, { react: { text: "🦶", key: m.key } });

        // تحميل الصورة من الرابط
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // إرسال الصورة مع النص المطلوب
        const captionMessage = `
*🔥👿 هذا المجنون الشيطاني 😈 @${senderUser.split('@')[0]} قام بركل 💀 @${mentionedUser.split('@')[0]} بدون أي رحمة 🩸🦶*`;

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

handler.help = ['ركل'];
handler.tags = ['re'];
handler.command = ['ركل'];  // الأوامر التي يمكن استخدامها لتشغيل هذا الكود

export default handler;