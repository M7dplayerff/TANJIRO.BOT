let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  let tag = `@${m.sender.replace(/@.+/, '')}`
  let mentionedJid = [m.sender]
  conn.reply(m.chat, tag, m, { contextInfo: { mentionedJid }})
}

handler.help = ['منشني']
handler.tags = ['gc']
handler.command = /^منشني$/i

handler.group = false

export default handler
