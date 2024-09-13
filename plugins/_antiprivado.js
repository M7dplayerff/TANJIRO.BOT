// الكود بعد التعديل

export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
    const datas = global
    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};

    // التحقق من الشروط
    if (m.isBaileys && m.fromMe) return true;
    if (m.isGroup) return false;
    if (!m.message) return true;
    if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return true;

    // التحقق من تفعيل الوضع الخاص ومن أن المرسل ليس المالك
    if (bot.antiPrivate && !isOwner && !isROwner) {
        await m.reply('*⦑🕷️⦒ ❐ الـخـاص مـقـفـل🚫 ↜مـمـنـوع الـتـحـدث مــع الـبـوت خـــاص سـيـتـم حـظـرك🥱👋*', false, {mentions: [m.sender]});
        await this.updateBlockStatus(m.chat, 'block');
    }

    return false;
}