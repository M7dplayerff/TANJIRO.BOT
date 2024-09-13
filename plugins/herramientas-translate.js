import fetch from "node-fetch"

let handler = async (m, {
    args,
    usedPrefix,
    command
}) => {
    let lang, text
    if (args.length >= 2) {
        lang = args[0] ? args[0] : "ar", text = args.slice(1).join(" ")
    } else if (m.quoted && m.quoted.text) {
        lang = args[0] ? args[0] : "ar", text = m.quoted.text
    } else throw `*🔱 الــطــريــقــة الصـحـيـحـة لـلـامـر هـي*\n\n- *مـــثـــال↜.تــرجـمـة ar*`
    try {
    const prompt = text.trim();
        let res = await translate(prompt, lang)
        let lister = Object.keys(await langList())
        let supp = `- 🔱 *فــشــلــت الــتــرجـمـة*`
        if (!lister.includes(lang)) return m.reply(supp + "\n\n*مثال:*\n." + command + " ar hello\n\n*حدد الرمز الموجود*\n" + lister.map((v, index) => `${index +1}. ${v}`).join("\n"))

        let Detect = (res[1].toUpperCase() ? res[1].toUpperCase() : "US")
        let ToLang = (lang.toUpperCase())
        let caption = `- *🔱 الــتــرجــمــة↜* *${res[0].trim()}*
`
        await m.reply(caption, null, m.mentionedJid ? {
        mentions: conn.parseMention(caption)
    } : {})
    } catch (e) {
        await m.reply('ops .. error ')
    }
}
handler.help = ["ترجمه"]
handler.tags = ["to"]
handler.command = /^(ترجمة|ترجمه)$/i
export default handler

async function langList() {
    let data = await fetch("https://translate.google.com/translate_a/l?client=webapp&sl=auto&tl=en&v=1.0&hl=en&pv=1&tk=&source=bh&ssel=0&tsel=0&kc=1&tk=626515.626515&q=")
        .then((response) => response.json())
    return data.tl;
}

async function translate(query = '', lang) {
    if (!query.trim()) return '';
    const url = new URL('https://translate.googleapis.com/translate_a/single');
    url.searchParams.append('client', 'gtx');
    url.searchParams.append('sl', 'auto');
    url.searchParams.append('dt', 't');
    url.searchParams.append('tl', lang);
    url.searchParams.append('q', query);

    try {
        const response = await fetch(url.href);
        const data = await response.json();
        if (data) {
            return [data[0].map((item) => item[0].trim()).join('\n'), data[2]];
        } else {
            return '';
        }
    } catch (err) {
        throw err;
    }
}
