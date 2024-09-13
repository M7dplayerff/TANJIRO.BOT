const handler = async (m, { conn }) => {
  const datas = global;
  const tradutor = {
    texto1: [
      "🔍 أنت الآن تعمل في مجال الهندسة 🛠️",
      "🛠️ تبدأ مغامرتك كمبرمج عبقري! 💻",
      "🚀 أنت في مهمة لتصميم تطبيقات مذهلة! 🌟",
      "🏗️ تبدأ في بناء مشاريع جديدة اليوم! ⚙️",
      "🔧 الآن أنت تعمل على حل مشاكل تقنية معقدة! 🧩",
      "⚙️ تبدأ رحلتك كمهندس برمجيات محترف! 🎯",
      "🌐 تدخل الآن إلى عالم تطوير البرمجيات! 🖥️",
      "🔍 مغامرتك كمصمم واجهات تبدأ الآن! ✨",
      "💼 تبدأ عملك كمستشار تقني في هذا المجال المثير! 🧑‍💼",
      "🎓 تبدأ مشوارك في مجال تطوير البرمجيات الرائع! 🚀",
      "📊 تدخل في عالم التحليل البياني والذكاء الصناعي! 🤖",
      "🧪 تبدأ رحلة البحث والتطوير في مجال التكنولوجيا! 🔬",
      "🔐 تعمل الآن على تطوير أنظمة أمان متقدمة! 🔒",
      "📝 تبدأ كتابة الكود لإنشاء أدوات مبتكرة! 📈",
      "🌟 تسعى لتصميم تجربة مستخدم مميزة وسلسة! 🖌️",
      "📅 تدير الآن مشاريع البرمجة بفعالية وتنظيم! 📋",
      "⚡ تبدأ في إنشاء حلول برمجية مبتكرة وسريعة! ⚙️",
      "🔄 تشارك في تطوير وتحديث التطبيقات الحالية! 🔧",
      "🖥️ تتعامل مع أحدث تقنيات البرمجة والتطوير! 💡",
      "📚 تتعلم وتكتسب مهارات جديدة في البرمجة! 📖",
      "🧩 تحل الألغاز التقنية وتبتكر حلولاً مبدعة! 🔍",
      "💡 تساهم في إنشاء حلول تقنية جديدة وتطويرها! ⚙️",
      "🌐 تبدأ رحلتك كمطور ويب في هذا المجال المثير! 🌍",
      "🎨 تبدأ العمل كمصمم جرافيك وتخلق أعمالاً فنية مذهلة! 🖼️",
      "🍳 تدخل الآن إلى عالم الطهي وتصبح شيفاً محترفاً! 👨‍🍳",
      "🎭 تشارك في مسرحيات وتمثيليات وتصبح نجمًا في هذا المجال! 🎬",
      "📖 تبدأ كتابة روايتك الخاصة وتستكشف عالم الأدب! 📚",
      "🛠️ تبدأ العمل كحرفي ماهر في إنشاء منتجات يدوية رائعة! 🛠️",
      "🌱 تبدأ زراعة النباتات والاعتناء بالحدائق كخبير نباتات! 🌻",
      "🏀 تبدأ التدريب في مجال الرياضة وتحقق إنجازات رياضية! ⚽",
      "🎵 تشارك في إنشاء موسيقى رائعة وتصبح موسيقياً موهوباً! 🎹",
      "🚀 تدخل عالم ريادة الأعمال وتبدأ في تطوير شركتك الخاصة! 📈"
    ]
  };

  global.work = tradutor.texto1;

  let enviando;
  if (enviando) return;
  enviando = true;
  const hasil = Math.floor(Math.random() * 5000);
  const time = global.db.data.users[m.sender].lastwork + 7200000; // 7200000 milliseconds = 2 hours
  if (new Date - global.db.data.users[m.sender].lastwork < 7200000) 
    throw `⏳ *توقف قليلاً أيها البطل!* ⏳\n\n*—◉ سيتعين عليك الانتظار حتى مرور ${msToTime(time - new Date())} قبل أن تتمكن من العودة إلى المغامرة.*\n*🔄 استخدم الوقت للاستعداد وتدريب نفسك!*`;
  await conn.sendMessage(m.chat, { react: { text: "💪",key: m.key,}
  })
  conn.sendMessage(m.chat, { text: `🏞️ *تنطلق في مغامرة مثيرة:*\n\n *${pickRandom(global.work)}*\n\n*💪 لقد حصلت على ${hasil} نقاط خبرة لشجاعتك!*` }, { quoted: m });
  global.db.data.users[m.sender].exp += hasil;
  global.db.data.users[m.sender].lastwork = new Date() * 1;
  enviando = false;
};
handler.help = ['عمل'];
handler.tags = ['rp'];
handler.command = /^(عمل)$/i;
handler.fail = null;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return `${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`;
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}