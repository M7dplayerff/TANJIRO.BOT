import fetch from 'node-fetch';

const handler = async (m, {conn, text, usedPrefix, command}) => {
    if (!text) throw `- *🔱 هـذا الـأمــر خــاص بــصــنــع صــور بــذكــاء اصــتــنــاعــي مــدفــوع اكــتــب نــص الـصـورة الـذي تـريـدهـا يـسـتـحـسـن ان يـكـون بـلـأنـجـيـلـيـزيــة*`;
    await conn.sendMessage(m.chat, { react: { text: "🦾",key: m.key,}
  })
    await conn.sendMessage(m.chat, {text: '- *🔱 جـــاري الـانــشــاء*'}, {quoted: m});
    
    try {
        // استخدام API لإنشاء صورة من النص
        const response = await fetch(`https://api-xovvip.vercel.app/text2img?text=${encodeURIComponent(text)}`);
        if (!response.ok) throw new Error('حدث خطأ في الشبكة');
        
        const buffer = await response.buffer();
        
        await conn.sendMessage(m.chat, {image: buffer}, {quoted: m});
    } catch {
        throw 'خطأ، (API غير متاحة) يرجى المحاولة لاحقاً.';
    }
}
handler.tags = ['to']
handler.help = ['تخيل'];
handler.command = ['تخيل'];
export default handler;
