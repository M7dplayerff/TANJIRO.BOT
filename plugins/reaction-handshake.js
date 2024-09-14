import axios from 'axios';

const dir = [
    'https://l.arzfun.com/ybQGm',
    'https://l.arzfun.com/JplgE',
    'https://l.arzfun.com/89upM',
    'https://l.arzfun.com/8zS9P',
    'https://l.arzfun.com/iy7Yz',
    'https://l.arzfun.com/lhlbL'
];

let handler = async (m, { conn, command, usedPrefix, text }) => {

    // التحقق مما إذا كان هناك منشن
    let mentionedUser = m.mentionedJid[0];
    let replyToUser = m.replyingToMessage ? m.replyingToMessage.sender : null; 

    // إذا لم يكن هناك منشن، تحقق من الرد على رسالة
    if (!mentionedUser && !replyToUser) {
        return conn.reply(m.chat, '- *🔱 قــم بـعـمـل مـنـشـن لـلـعـضـو الـذي تــريد مـصـافـحـتـه 🤝*', m);
    }

    // تحديد المستخدم الذي سيتم منشنه بناءً على المنشن أو الرد
    mentionedUser = mentionedUser || replyToUser;
    const senderUser = m.sender; // الشخص الذي استخدم الأمر

    try {
        let imageUrl = dir[Math.floor(Math.random() * dir.length)];
        await conn.sendMessage(m.chat, { react: { text: "🤝", key: m.key } });

        // تحميل الصورة من الرابط
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // إرسال الصورة مع النص المطلوب
        const captionMessage = `
*🔥💪 هذا الاسطورة 😎 @${senderUser.split('@')[0]} قام بمصافحة 🤜 @${mentionedUser.split('@')[0]} بكل شدة وفخر 🔥🤝*`;

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

handler.help = ['مصافحه'];
handler.tags = ['re'];
handler.command = ['مصافحة', 'مصافحه'];  // الأوامر التي يمكن استخدامها لتشغيل هذا الكود

export default handler;