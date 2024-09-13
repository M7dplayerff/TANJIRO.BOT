import axios from 'axios';

const dir = [
    'https://l.arzfun.com/CcXV9',
    'https://l.arzfun.com/FfJik',
    'https://l.arzfun.com/UxROE',
    'https://l.arzfun.com/eoKQE',
    'https://l.arzfun.com/n3lqf',
    'https://l.arzfun.com/z8OIk',
    'https://l.arzfun.com/j6O7u',
    'https://l.arzfun.com/HbGJH',
    'https://l.arzfun.com/XMfZk',
    'https://l.arzfun.com/GptIE',
    'https://l.arzfun.com/sz7fr',
    'https://l.arzfun.com/cIkqc',
    'https://l.arzfun.com/xI4TF',
    'https://l.arzfun.com/LUu8q',
    'https://l.arzfun.com/Z3rpQ',
    'https://l.arzfun.com/EMyYN',
    'https://l.arzfun.com/tqutO',
    'https://l.arzfun.com/vwyMf',
    'https://l.arzfun.com/bN8HF',
    'https://l.arzfun.com/pPbbE',
    'https://l.arzfun.com/ZeHsb',
    'https://l.arzfun.com/8ICNE'
];

let handler = async (m, { conn, command, usedPrefix }) => {

    const fakecontact = {
        key: { 
            participants: '0@s.whatsapp.net', 
            remoteJid: 'status@broadcast', 
            fromMe: false, 
            id: '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓' 
        }, 
        message: { 
            contactMessage: { 
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        participant: '0@s.whatsapp.net' 
    };

    try {
        let img = dir[Math.floor(Math.random() * dir.length)];
        await conn.sendMessage(m.chat, { react: { text: "💘", key: m.key } });

        // تحميل الصورة من الرابط
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // إرسال الصورة
        await conn.sendMessage(
            m.chat, 
            { 
                image: imageBuffer, 
                caption: '- *🔱 بــوســتــك جــاهــز*' 
            }, 
            { quoted: fakecontact }
        );
        
        // إرسال رسالة تفاعلية مع زر للحصول على خلفية أخرى
        const buttonMessage = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            hasMediaAttachment: false,
                            mediaType: 1,  // 1 للإشارة إلى نص فقط
                        },
                        body: {
                            text: '- *👑 مــن صــنــع تــانــجــيرو*',
                            subtitle: "*💘 نــتــائــج الــبــوســتــات*"
                        },
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'quick_reply',
                                    buttonParamsJson: `{"display_text":"🔱 بــوســت اخــر","id":".بوستات"}`
                                }
                            ]
                        }
                    }
                }
            }
        };

        await conn.relayMessage(m.chat, buttonMessage, {});

    } catch (error) {
        console.error('Error fetching image:', error);
        await conn.sendMessage(
            m.chat, 
            '- *🔱 حـــدث خـــطـــأ*', 
            { quoted: fakecontact }
        );
    }
};

handler.help = ['بوستات'];
handler.tags = ['do'];
handler.command = ['بوستات'];

export default handler;