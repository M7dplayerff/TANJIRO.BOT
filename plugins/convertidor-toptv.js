let handler = async (m, { conn, usedPrefix, command }) => {
    // تحديد الرسالة المقتبسة أو الأصلية
    let p = m.quoted ? m.quoted : m
    
    // التحقق من نوع الميديا في الرسالة المقتبسة أو الأصلية
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    
    // إذا لم يكن الميديا فيديو أو صوت، إرسال رسالة خطأ
    if (!/video|audio/.test(mime)) throw `- *🔱 قــم بــلــرد عــلــي فـيـديــو او صـــوت*`

    // الحصول على الرسالة (سواء كانت رسالة عادية أو رسالة ميديا)
    let q = p.message ? p.message : p.mediaMessage
    
    // إرسال الرسالة كمحتوى PTV
    conn.relayMessage(m.chat, { ptvMessage: q.videoMessage }, {})
}

// إعدادات الأوامر والمساعدة
handler.help = ['تحويل_لملاحظه']
handler.tags = ['co']
handler.command = /^تحويل(_لملاحظه)$/i

// تصدير المكون الإضافي
export default handler
