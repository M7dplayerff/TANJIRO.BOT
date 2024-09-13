import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/^/i.test(m.quoted.text)) return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        let answer = json.response;
        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            m.reply(`*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ اجــابــة صـحـيـحـة*

- *🎁 جــائــزتــك↜${this.tekateki[id][2]} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`.trim())
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (m.text.toLowerCase() == 'انسحب') {
            global.db.data.users[m.sender].exp - this.tekateki[id][2]
            m.reply(`*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ تـــم الـانـسـحـاب*\n
- *الـاجــابــة كــانــت↜${conn.tekateki[id][1].response}*\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`.trim())
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (m.text.toLowerCase() == 'تلميح') {            
        m.reply(`*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
- *🔱 الـاجــابــة هــي↜${answer}*

*⦑🕷️⦒ ❐ لــقــد اظـــهــرت الـاجــابــة كـامـلـة 😴 ↜اتـعـلـم لـمـاذا اظـهـرت الـاجـابــة و لــيــس تـلـمـيـح فــقــط لـانـنـي اشـفـقـت عـلـيـك مــن فـشـلـك 🥱👋*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`.trim())          
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
            m.reply(`*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*🔱 اجـابـتـك قــريـبـة*

- *اعــد الــمــحــاولــة مــرة اخــري*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`.trim())
        } else {
            m.reply(`- *🔱 اجــابــتــك خــاطــئــه حــاول مــره اخـــري*`.trim())
        }
    }
    return !0
}

handler.exp = 0

export default handler