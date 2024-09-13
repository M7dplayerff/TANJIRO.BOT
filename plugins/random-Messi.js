 import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // تأكد من تثبيت مكتبة node-fetch لتحميل الصور

// تحديد مسار الملف يدوياً
const filePath = 'RPW/Messi.json';

// تعريف معالج الأوامر
const handler = async (m, { conn, usedPrefix, command }) => {
  // قراءة بيانات JSON من الملف المحلي
  const res = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // اختيار رابط صورة عشوائية من البيانات
  const url = res[Math.floor(res.length * Math.random())];

  // تحميل الصورة من الرابط
  const response = await fetch(url);
  const buffer = await response.buffer();

  // إطار زخرفي مع إيموجيات فوق وتحت النص
  await conn.sendMessage(m.chat, { react: { text: "🏆",key: m.key,}
  })
  const text = `*كـامـيـرا واوا🏆⚽*`;

  // إرسال الصورة بدلاً من الرابط
  const caption = ``;

  conn.sendMessage(m.chat, { 
    image: buffer, 
    caption: text + '\n' + caption 
  }, { 
    quoted: m 
  });
};

// تعريف المساعدة والأوامر
handler.help = ['ميسي'];
handler.tags = ['ra'];
handler.command = /^(ميسي)$/i;

export default handler;
