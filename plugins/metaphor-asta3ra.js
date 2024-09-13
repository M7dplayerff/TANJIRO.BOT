import axios from 'axios'; 

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "- *🔱 ادخــل اســم الـصـوره الــذي تــريــد الــبـحـث عـنـهـا*", m);
    }

    // إضافة رمز التفاعل بعد إدخال النص
    await conn.sendMessage(m.chat, { react: { text: "📸", key: m.key } });

    // جلب الصور من Pinterest بناءً على استعلام المستخدم
    let searchQuery = encodeURIComponent(text.trim()); // تحويل النص إلى استعلام URL صالح
    let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q=${searchQuery}&data={"options":{"isPrefetch":false,"query":"${searchQuery}","scope":"pins","no_fetch_context_on_resource":false}}`);

    let imageUrls = data.resource_response.data.results.map(result => result.images?.orig?.url).filter(url => url);

    if (imageUrls.length === 0) {
        return conn.reply(m.chat, "- *🔱 لــم يــتــم الــعــثــور عــلــي بـحـثـك*", m);
    }

    // خلط الصور بشكل عشوائي قبل إرسالها
    shuffle(imageUrls);

    // تحديد صورة واحدة لإرسالها
    let selectedImage = imageUrls[0]; // اختيار أول صورة فقط

    await conn.sendFile(m.chat, selectedImage, 'image.jpg', '- *🔱 صــورتــك جــاهــزة*', m);

    // إرسال رسالة تفاعلية مع زر للحصول على صورة أخرى
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
                        subtitle: "*📸 نتائج الصور*"
                    },
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'quick_reply',
                                buttonParamsJson: `{"display_text":"🔱 صــورة اخــري","id":".صوره ${text}"}`
                            }
                        ]
                    }
                }
            }
        }
    };

    await conn.relayMessage(m.chat, buttonMessage, {});
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

handler.help = ["*🔱 جــمــيــع حــقــوق قــســم الـاسـتـعـارة مـحـفـوظـة لـسـيـلـانـا بـوت ونــور مــطــور سـيـلـانـا* ", "txt2video", "tozombie", "removebg", "remini", "qc", "mic", "lyric", "logo", "kora", "gpt4", "gpt", "gimage", "geminipro", "gemini", "emoji", "download", "apk2", "apk", "aivoice", "42logo", "zmoai", "ytcoment", "animevoice", "3dcartoon", "ytmp3"];
handler.tags = ["ph"];
handler.command = /^(|)$/i;

export default handler;