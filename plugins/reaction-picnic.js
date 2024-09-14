import axios from 'axios';

const dir = [
    'https://l.arzfun.com/N0hqd',
    'https://l.arzfun.com/xMM5r',
    'https://l.arzfun.com/FJyeL',
    'https://l.arzfun.com/sgBEz',
    'https://l.arzfun.com/vnPSz',
    'https://l.arzfun.com/gPvwg',
    'https://l.arzfun.com/PmmRG',
    'https://l.arzfun.com/CxPZ6',
    'https://l.arzfun.com/v2RBl'
];

let handler = async (m, { conn, command, usedPrefix, text }) => {

    // التحقق مما إذا كان هناك منشن أو رد على رسالة
    let mentionedUser = m.mentionedJid[0];
    let replyToUser = m.replyingToMessage ? m.replyingToMessage.sender : null; 

    // إذا لم يكن هناك منشن أو رد على رسالة
    if (!mentionedUser && !replyToUser) {
        return conn.reply(m.chat, '- *🔱 قــم بـعـمـل مـنـشـن لـلـعـضـو الـذي تــريد الـتـنـزه مـعـه 🍨*', m);
    }

    // تحديد المستخدم الذي سيتم منشنه بناءً على المنشن أو الرد
    mentionedUser = mentionedUser || replyToUser;
    const senderUser = m.sender; // الشخص الذي استخدم الأمر

    try {
        let imageUrl = dir[Math.floor(Math.random() * dir.length)];
        await conn.sendMessage(m.chat, { react: { text: "🍨", key: m.key } });

        // تحميل الصورة من الرابط
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // إرسال الصورة مع النص المطلوب
        const captionMessage = `
*⛷️👫 هذا المحب للمشاركة 🍨 @${senderUser.split('@')[0]} قرر ان يتنزه مع 💞 @${mentionedUser.split('@')[0]} اعتقد انها ستكون افضل نزهة 🏇❣️*`;

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

handler.help = ['نزهة'];
handler.tags = ['re'];
handler.command = ['نزهة', 'تنزه'];  // الأوامر التي يمكن استخدامها لتشغيل هذا الكود

export default handler;