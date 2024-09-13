import fetch from 'node-fetch'
let handler = async(m) => {
    await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let url = await conn.profilePictureUrl(who, 'image')
    await conn.sendFile(m.chat, url, 'profile.jpg', `- *🔱 صــورة الـعـضـو↜*\n@${who.split`@`[0]}`, m, null, { mentions: [who]})
}
handler.command = /^(صورة(_عضو|صورة_عضو))$/i
handler.help = ['صورة_عضو']
handler.tags = ['gc']
handler.group = true
handler.limit = false
export default handler
