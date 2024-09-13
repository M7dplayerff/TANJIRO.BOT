import fetch from "node-fetch";

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text) {
      throw "أدخل السؤال!\n\n*مثال:* من هو رئيس إندونيسيا؟";
    }

    let name = conn.getName(m.sender);

    await conn.sendMessage(m.chat, {
      react: {
        text: "🤖",
        key: m.key,
      },
    });

    let { key } = await conn.sendMessage(m.chat, {
      text: "*☜ انتظر سيقوم تانجيرو بلأجابه علي سؤالك الان*",
    });

    let response = await fetch(`https://api.neastooid.xyz/api/ai/gpt4?q=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error("*【❌| حـدث ⎗ خـطــأ |❌】*");
    }

    let result = await response.json();

    if (result.code !== 200 || !result.status) {
      throw new Error("*【❌| حـدث ⎗ خـطــأ |❌】*");
    }

    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

    // تعديل هنا لإضافة علامات النجمة للإجابة
    await conn.sendMessage(m.chat, {
      text: `*${result.gpt}*`,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `*☜ ادخل سؤال بعد الامر ليجيب عليه الذكاء الاصتناعي*`,
    });
  }
}

handler.help = ['اسأل_تانجيرو'];
handler.tags = ['to'];
handler.command = /^(اسأل_تانجيرو)$/i;
export default handler;