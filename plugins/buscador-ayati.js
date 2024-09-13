import fetch from 'node-fetch';

const fetchQuranData = async (surahNumber) => {
  try {
    const response = await fetch(`https://quran-wudy.vercel.app/surah/${surahNumber}`);
    const data = await response.json();
    return data.data.verses;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handler = async (m, { conn }) => {
conn.qurannData = conn.qurannData ? conn.qurannData : {};

  const surahNumber = parseInt(m.text.split(' ')[1]);
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    m.reply("- *🔱 ادخـــل بــعــد الـامــر رقــم صــورة مــا بــيــن 1 - 114*\n\n- *بعدما تظهر لك الاية يمكنك الرد علي الرساله الخاصة بلأية برقم الايه الذي تريد ان يرسل لك مقطع صوتي بشيخ يقرأها*");
    return;
  }
await conn.sendMessage(m.chat, { react: { text: "🤲",key: m.key,}
  })
  const ayahs = await fetchQuranData(surahNumber);
  if (!ayahs) {
    m.reply("Failed to fetch Quran data.");
    return;
  }

  const formattedList = Object.values(ayahs).map(v => (
    `*${v.number.inSurah}.* ${v.text.arab}`
  )).join('\n');

  const instructions = "";

  let { key } = await m.reply(`*📖 قـائـمـة ايــات الـصــورة${surahNumber}:*\n${formattedList}\n\n${instructions}`);
  // Store the Quran data in conn.qurannData variable for later use
  conn.qurannData[m.chat] = { list: Object.values(ayahs), key };
};

handler.before = async (m, { conn }) => {
conn.qurannData = conn.qurannData ? conn.qurannData : {};

if (m.isBaileys || !(m.chat in conn.qurannData)) return;
  const input = m.text.trim();
  if (!/^\d+$/.test(input)) return; // If the input is not a number, do nothing

  const { list, key } = conn.qurannData[m.chat];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
  const index = parseInt(input);

  if (isNaN(index) || index < 1 || index > list.length) {
    m.reply("- *🔱 رقـــم ايـــة غــيــر صــحــيــح*");
  } else {
  const selectedObj = list[index - 1];

  // Check if the message is a reply and the quoted message id matches the key.id from the list
    await conn.sendMessage(m.chat, {
      audio: {
        url: selectedObj.audio.primary,
      },
      mimetype: "audio/mpeg",
      filename: "quran_audio.mp3",
      ptt: true,
    }, { quoted: m });

    clearTimeout(conn.qurannData[m.chat].timeout);
    //delete conn.qurannData[m.chat];
  }
};

handler.help = ["اياتي"];
handler.tags = ["bu"];
handler.command = /^اياتي$/i;

export default handler;
