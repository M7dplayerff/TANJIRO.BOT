import fs from 'fs'; // تأكد من استيراد fs في حالة استخدامه

const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "🧗",key: m.key,}
  })
  const نصوص = {
    texto1: [
      "🔒 اقفل لمدة خمس دقائق",
      "🐕 قول انا كلب",
      "✍️ اكتب للبيست فريند انتهت صداقتنا وشوف ردة فعله",
      "🚫 اعمل بلوك لأخر شات وفكو بعد عشر دقائق",
      "📸 غير صورة البروفايل لصورة يختارها الي معطيك التحدي واكتب اسمو واكتب بعد اسمو انت عمي",
      "🔤 غير اسمك لأسم يخطاره الي معطيك التحدي",
      "😍 قول اسم بنت/شب معجب/ه بيه",
      "🔊 سجل صوت تقول فيه حكي يختاره الي معطيك التحدي",
      "🖼️ غير صورة البروفايل لصورة يتفق عليها اعضاء المملكه",
      "📸 صورة لأخر شات",
      "📞 اعترف اخر مكالمه كانت مع مين وشو كان محتواها",
      "🤝 اعترف وقول اكتر حد تثق فيه",
      "😲 روح اعمل مقلب بلبيست وقول له ان علاقتك بي انتهت عشان الشخص المرتبط بي انت بدو هيك",
      "🔗 منشن شخص بدك يصير البيست تبعك",
      "💖 اعترف كم مره قولت بحبك",
      "⏳ سوي الي يقول علي الي معطيك التحدي لمدة خمس دقائق",
      "💔 روح قول لاعز شخص عندك بكرهك",
      "📞 اتصل علي حد يختاره الي معطيك التحدي وقول له بكرهك",
      "📞 اتصل علي حد يقول عليه الي معطيك التحدي وقول له بحبك",
      "🎙️ سجل ريكورد للمعطي التحدي قوله في بحبك",
      "📹 قول اكثر موقف حصلك ولكن ريكورد",
      "🎥 قول اكثر موقع حسيت في نفسك شجاع ولكن ريكورد",
      "🤔 احكي شي الي معطي التحدي يبيك تحكي",
      "😡 قول حد تكرهه في الروم",
      "💖 قول حد تحبه في الروم حب اخوي",
      "😍 قول حد معجب في بلروم",
      "👎 قول حد ما تطيقه بلروم",
      "🤥 قول حد تنافقه بلروم",
      "🔍 قول اكثر حد تحكي معو خاص بلروم",
      "🤗 قول اكتر حد مستعد تشارك معو كل شي في الروم",
      "📷 قول كم واحد من الروم وريتهم صورتك",
      "🔊 قول كم واحد من الروم سمع صوتك",
      "🌟 قول مفضلينك بلروم",
      "📸 ارسل صورتك الحين",
      "📷 ارسل صوره يطلبها منك الي معطي التحدي",
      "🖼️ حط صورة بروفايل يطلبها منك صاحب التحدي",
      "❤️ عيش انت والي معطي التحدي قصة حب لمدة يوم",
      "👊 عيش انت والي معطي التحدي كأعداء لمدة يوم",
      "🤥 عيش انت والي معطي التحدي قصة نفاق لمدة يوم",
      "🗣️ اعترف للي معطي التحدي اعتراف",
      "🗣️ اعترف لصاحب المملكه اعتراف",
      "👥 كل الي بلروم هيعطوك اعتراف واحد تقوله لشخص عندك الي معط الامر يختاره",
      "🎤 غني اغنيه بصوتك",
      "💃 ارقص وارسل فيديو للرقصه امر مطبق عرجال فقط",
      "💔روح لرقم ما تعرفه وقول اكرهك ",
      "🦓سجل فويس قول انا حمار",
      "😵حط بروفايل ابشع صورة ليك",
      "📸صور المكان الي جالس فيه الحين",
      "🥔حط استوري اكتب فيه انا بطاطا اتشان"
    ]
  };

  global.bucin = نصوص.texto1;

  const challenge = pickRandom(global.bucin);
  const message = `*⟆👾⟅ تــــــحــــدي*

- *🔱 ${challenge}*
\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;

  const imagePath = './PCB/تحدي.jpg'; // مسار الصورة

  // تحقق من وجود الصورة وأرسلها مع الرسالة
  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    conn.sendMessage(m.chat, { image: imageBuffer, caption: message }, { quoted: m });
  } else {
    console.log(`File not found at ${imagePath}`);
    conn.reply(m.chat, 'الصورة المطلوبة غير موجودة.', m);
  }
};

handler.help = ['تحدي'];
handler.tags = ['fu'];
handler.command = /^تحدي/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}