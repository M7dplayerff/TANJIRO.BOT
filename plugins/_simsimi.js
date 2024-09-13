import fetch from 'node-fetch';
import axios from 'axios';

const handler = (m) => m;
handler.before = async (m) => {
  const chat = global.db.data.chats[m.chat];

  // تحقق إذا كانت الرسالة مرسلة من البوت نفسه وتجاهلها
  if (m.key.fromMe) return; 

  if (chat.simi) {
    if (/^.*false|تعطيل|(تفعيل)?off|0/i.test(m.text)) return;
    let textodem = m.text;

    // قائمة بالكلمات التي يتم تجاهلها إذا كانت ضمن الرسالة
    if (m.text.includes('serbot') || 
        m.text.includes('bots') || 
        m.text.includes('jadibot') || 
        m.text.includes('menu') || 
        m.text.includes('play') || 
        m.text.includes('play2') || 
        m.text.includes('playdoc') || 
        m.text.includes('tiktok') || 
        m.text.includes('facebook') || 
        m.text.includes('menu2') || 
        m.text.includes('infobot') || 
        m.text.includes('estado') || 
        m.text.includes('ping') || 
        m.text.includes('instalarbot') || 
        m.text.includes('sc') || 
        m.text.includes('sticker') || 
        m.text.includes('s') || 
        m.text.includes('wm') || 
        m.text.includes('qc')) return;

    try {
      // إرسال رد فعل مبدئي
      await conn.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

      // استدعاء دالة الذكاء الاصطناعي
      const ressimi = await newAiResponse(textodem); 

      // إرسال رد الذكاء الاصطناعي
      await m.conn.sendMessage(m.chat, { text: ressimi }, { quoted: m });
    } catch {
      throw '*[❗] واجهت API الخاصة بالذكاء الاصطناعي خطأ.*';
    }
    
    return !0;
  }
  
  return m.text === 'تفعيل';  // التحقق من كلمة "تفعيل" بدلاً من "true"
};

export default handler;

// دالة التواصل مع الذكاء الاصطناعي
async function newAiResponse(text) {
  if (!text) throw new Error("أدخل السؤال!\n\n*مثال:* من هو رئيس إندونيسيا؟");

  let response = await fetch(`https://api.neastooid.xyz/api/ai/gpt4?q=${encodeURIComponent(text)}`);
  
  if (!response.ok) throw new Error("*【❌| حـدث ⎗ خـطــأ |❌】*");

  let result = await response.json();
  
  if (result.code !== 200 || !result.status) throw new Error("*【❌| حـدث ⎗ خـطــأ |❌】*");

  return `*${result.gpt}*`;  // تهيئة النص ليكون ضمن علامات نجمة
}
handler.help =['تفعيل/تعطيل تانجيرو', 'تفعيل/تعطيل ادارة_الروم', 'تفعيل/تعطيل ادارة_الروم2', 'تفعيل/تعطيل مضاد_الروابط', 'تفعيل/تعطيل مضاد_الروابط2', 'تفعيل/تعطيل حظر_الخاص', 'تفعيل/تعطيل مكافح_الفيروسات', 'تفعيل/تعطيل مضاد_الاسبام', 'تفعيل/تعطيل للرومات_فقط', 'تفعيل/تعطيل للخاص_فقط', 'تفعيل/تعطيل مكافح_السب']
handler.tags =['bot']