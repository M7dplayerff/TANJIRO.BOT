const handler = async (m, { conn, text }) => {
    const datas = global;

    const numberPattern = /\d+/g;
    let user = '';
    const numberMatches = text.match(numberPattern);
    if (numberMatches) {
        const number = numberMatches.join('');
        user = number + '@s.whatsapp.net';
    } else if (m.quoted && m.quoted.sender) {
        const quotedNumberMatches = m.quoted.sender.match(numberPattern);
        if (quotedNumberMatches) {
            const number = quotedNumberMatches.join('');
            user = number + '@s.whatsapp.net';
        } else {
            return conn.sendMessage(m.chat, { text: "> ❐ *مطلوب منشن او رقم هاتف المراد حذف بيانته*" }, { quoted: m });
        }
    } else {
        return conn.sendMessage(m.chat, { text: "> ❐ *مطلوب منشن او رقم هاتف المراد حذف بيانته*" }, { quoted: m });
    }

    const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
    const participants = m.isGroup ? groupMetadata.participants : [];
    const userInGroup = m.isGroup ? participants.find(u => u.jid == user) : {};
    const userNumber = user.split('@')[0];

    if (!global.global.db.data.users[user] || global.global.db.data.users[user] == '') {
        return conn.sendMessage(m.chat, { text: `*【🚫┇لـا يـوجـد ⍅  مـسـتـخـدم】*`, mentions: [user] }, { quoted: m });
    }

    // حذف بيانات المستخدم
    delete global.global.db.data.users[user];

    // رسالة التأكيد
    await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
    const successMessage = `*⦑🕷️⦒ ❐ تـم حـذف بـيـانـاتـك مـن الـبـوت🚫 ↜اذا اردت الاسـتـفـسـار عـن الـسـبـب تـواصـل مـع الـمـطـور🥱👋*`;

    // إرسال رسالة تأكيد للمستخدم في الدردشة الخاصة
    await conn.sendMessage(user, { text: successMessage });

    // إذا كان المستخدم في المجموعة، يتم إرسال رسالة في المجموعة
    if (userInGroup) {
        conn.sendMessage(m.chat, { text: `*【✅┇تــــــــم ⍅  الـحـذف】*`, mentions: [user] }, { quoted: m });
    }
};
handler.help = ['ريستارت_يوزر'];
handler.tags = ['ow'];
handler.command = /(حذف_بيانات_المستخدم|ريستارت_يوزر)$/i;
handler.rowner = true;
export default handler;