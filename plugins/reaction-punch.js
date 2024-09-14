import axios from 'axios';

const dir = [
    'https://l.arzfun.com/lZfRg',
    'https://l.arzfun.com/ALmd5',
    'https://l.arzfun.com/i4yyi',
    'https://l.arzfun.com/fG81S',
    'https://l.arzfun.com/O1jjF',
    'https://l.arzfun.com/TFyhe'
];

let handler = async (m, { conn, command, usedPrefix, text }) => {

    // التحقق مما إذا كان هناك منشن
    let mentionedUser = m.mentionedJid[0];
    let replyToUser = m.replyingToMessage ? m.replyingToMessage.sender : null; 

    // إذا لم يكن هناك منشن، تحقق من الرد على رسالة
    if (!mentionedUser && !replyToUser) {
        return conn.reply(m.chat, '- *🔱 قــم بـعـمـل مـنـشـن لـلـعـضـو الـذي تــريد لـكـمـه 👊*', m);
    }

    // تحديد المستخدم الذي سيتم منشنه بناءً على المنشن أو الرد
    mentionedUser = mentionedUser || replyToUser;
    const senderUser = m.sender; // الشخص الذي استخدم الأمر

    try {
        let imageUrl = dir[Math.floor(Math.random() * dir.length)];
        await conn.sendMessage(m.chat, { react: { text: "👊", key: m.key } });

        // تحميل الصورة من الرابط
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // إرسال الصورة مع النص المطلوب
        const captionMessage = `
*🔥👿 هذا المجنون الشيطاني 😈 @${senderUser.split('@')[0]} قام بلكم 💀 @${mentionedUser.split('@')[0]} بدون أي رحمة 🩸👊*`;

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

handler.help = ['لكم'];
handler.tags = ['re'];
handler.command = ['لكم'];  // الأوامر التي يمكن استخدامها لتشغيل هذا الكود

export default handler;