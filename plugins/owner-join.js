const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let enviando;

const handler = async (m, { conn, text, isMods, isOwner, isPrems }) => {
  if (enviando) return;
  enviando = true;

  try {
    const link = text;
    if (!link || !link.match(linkRegex)) throw '🚫 دخل رابط دعوة صح يا حب 🚫';
    const [_, code] = link.match(linkRegex) || [];

    if (isPrems || isMods || isOwner || m.fromMe) {
      await conn.groupAcceptInvite(code);

      // Message to be sent to the user who used the command
      await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
      const userConfirmationMessage = '*【✅┇تــــــــم ⍅  الـانـضــمــام】*';

      // Send the confirmation message to the user
      await conn.sendMessage(m.sender, { text: userConfirmationMessage }, { quoted: m });

      enviando = false;
    } else {
      conn.sendMessage(m.chat, { text: '🚫 الامر دا لمطور البوت بس يا عسل 🚫' }, { quoted: m });
      const data = global.owner.filter(([id]) => id)[0];
      const dataArray = Array.isArray(data) ? data : [data];
      for (const entry of dataArray) {
        await conn.sendMessage(entry + '@s.whatsapp.net', {
          text: 'رابط الدعوه دا اتبعت من @' + m.sender.split('@')[0] + '\n*—◉ رابط المجموعة:* ' + link,
          mentions: [m.sender],
          contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            mentionedJid: [m.sender],
            "externalAdReply": {
              "showAdAttribution": true,
              "containsAutoReply": true,
              "renderLargerThumbnail": true,
              "title": global.titulowm2,
              "containsAutoReply": true,
              "mediaType": 1,
              "thumbnail": imagen6,
              "mediaUrl": `${link}`,
              "sourceUrl": `${link}`
            }
          }
        }, { quoted: m });
      }
      enviando = false;
    }
  } catch {
    enviando = false;
    throw '🚫 لازم تحط رابط المجموعه الي عايز تخشها يا حب 🚫';
  }
};

handler.help = ['ادخل'];
handler.tags = ['ow'];
handler.command = /^(ادخل|انضم_الي)$/i;
handler.private = true;
export default handler;