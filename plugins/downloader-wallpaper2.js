import axios from 'axios';

let handler = async (m, { conn, command, usedPrefix }) => {
    await conn.sendMessage(m.chat, { react: { text: "📸",key: m.key,}
  })
    const fakecontact = { 
        key: { 
            participants: '0@s.whatsapp.net', 
            remoteJid: 'status@broadcast', 
            fromMe: false, 
            id: '*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*' 
        }, 
        message: { 
            contactMessage: { 
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        participant: '0@s.whatsapp.net' 
    };

    try {
        // تحميل الصورة من الإنترنت
        const response = await axios.get('https://picsum.photos/1920/1080', { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        
        // إرسال الصورة
        await conn.sendMessage(
            m.chat, 
            { 
                image: imageBuffer, 
                caption: '- *🔱 خـلـفـيـتـك جــاهــزة*' 
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
                            subtitle: "*📸 نتائج الخلفيات*"
                        },
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'quick_reply',
                                    buttonParamsJson: `{"display_text":"🔱 خــلــفــيــة اخــري","id":".خلفية"}`
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

handler.help = ['خلفيه'];
handler.tags = ['do'];
handler.command = ['خلفية', 'خلفيه'];

export default handler;