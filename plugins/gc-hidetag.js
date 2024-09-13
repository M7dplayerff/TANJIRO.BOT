import * as fs from 'fs';

const handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  await conn.sendMessage(m.chat, { react: { text: "🤫",key: m.key,}
  })
  try {
    // استخراج معرّفات المستخدمين المشاركين
    const users = participants.map((u) => conn.decodeJid(u.id));
    
    // الحصول على الرسالة المقتبسة أو الرسالة الحالية
    const q = m.quoted ? m.quoted : m || m.text || m.sender;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;

    // إنشاء الرسالة المعدلة مع الإشارة إلى المستخدمين
    const msg = conn.cMod(m.chat, {
      extendedTextMessage: {
        text: text || q.text || '',
        contextInfo: { mentionedJid: users }
      }
    }, text || q.text, conn.user.jid, { mentions: users });

    // إرسال الرسالة المعدلة
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch {
    /**
    [ By @NeKosmic || https://github.com/NeKosmic/ ]
    **/

    // استخراج معرّفات المستخدمين المشاركين
    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);
    const htextos = `*${text ? text : '🔱 تــانـجـيـرو عــمــك'}*`;

    // إذا كانت الرسالة صورة مع نص
    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: m });
    
    // إذا كانت الرسالة فيديو مع نص
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
    
    // إذا كانت الرسالة صوتية مع نص
    } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
      var mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3` }, { quoted: m });
    
    // إذا كانت الرسالة ملصق
    } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
      var mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
    
    // إذا كانت الرسالة نص فقط
    } else {
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${masss}${htextos}`,
          contextInfo: { mentionedJid: users }
        }
      }, {});
    }
  }
};
handler.help = ['مخفي']
handler.tags = ['gc']
handler.command = /^(مخفي)$/i;
handler.group = true;
handler.admin = true;
export default handler;