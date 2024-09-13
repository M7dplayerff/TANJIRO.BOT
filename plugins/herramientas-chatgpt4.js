import { G4F } from 'g4f';

const handler = async (m, { text }) => {
  if (!text) {
    return m.reply("- *🔱 ادخــل الـســؤال الــذي تــريــد ســؤالــه لـجـي بــي تــي*");
  }
await conn.sendMessage(m.chat, { react: { text: "🤖",key: m.key,}
  })
  let g4f = new G4F();

  try {
    const message = [
      {
        role: "system",
        content: "You are a good component",
      },
      {
        role: "assistant",
        content: "Hello, how can I help you?",
      },
      {
        role: "user",
        content: text,
      },
    ];

    let result = await g4f.chatCompletion(message);
    m.reply(result);
  } catch (e) {
    console.log(e);
    m.reply("- *🔱 حــدث خــطــأ*");
  }
};

handler.command = handler.help = ["جيبيتي"];
handler.tags = ["to"];

export default handler;
