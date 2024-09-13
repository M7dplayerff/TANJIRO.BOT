import fs from 'fs';

// دالة لحساب التجربة المطلوبة لكل مستوى
const getExperienceForLevel = (level) => {
  return Math.max(level * 12000, 12000); // معادلة بسيطة لتحديد XP المطلوب لكل مستوى
};

// دالة لحساب الرتبة بناءً على كمية الـ XP
const getRank = (exp) => {

  const thresholds = [
    { exp: 0, rank: 'مستجد 🐣' },
    { exp: 1000, rank: 'مبتدئ 🧑‍🎓' },
    { exp: 3000, rank: 'تلميذ ⚔️' },
    { exp: 6000, rank: 'تلميذ خبير 🧠' },
    { exp: 10000, rank: 'متمرس 🔥' },
    { exp: 15000, rank: 'استاذ 🏆' },
    { exp: 21000, rank: 'استاذ خبير 🌟' },
    { exp: 28000, rank: 'اسطوري مبتدئ ✨' },
    { exp: 36000, rank: 'اسطوري تلميذ 💎' },
    { exp: 45000, rank: 'اسطوري تلميذ خبير 🏅' },
    { exp: 55000, rank: 'اسطوري استاذ 🎖️' },
    { exp: 66000, rank: 'استاذ خبير 🏅' },
    { exp: 78000, rank: 'اسطوري 🏅' },
    { exp: 91000, rank: 'اسطوري نخبة 👑' },
    { exp: 105000, rank: 'اسطوري نخبة 🌠' },
    { exp: 120000, rank: 'اسطوري نخبة 🚀' },
    { exp: 136000, rank: 'اسطوري نخبة ⚡' },
    { exp: 153000, rank: 'اسطوري نخبة 🔱' },
    { exp: 171000, rank: 'اسطوري نخبة 🌌' },
    { exp: 190000, rank: 'اسطوري نخبة 🌟' },
    { exp: 210000, rank: 'اسطوري نخبة 🌍' },
    { exp: 231000, rank: 'اسطوري نخبة 🔮' },
    { exp: 253000, rank: 'اسطوري نخبة 🔥' },
    { exp: 276000, rank: 'اسطوري نخبة 🌠' },
    { exp: 300000, rank: 'اسطوري نخبة 👑' },
    { exp: 325000, rank: 'اسطوري نخبة 🌌' },
    { exp: 351000, rank: 'اسطوري نخبة 🚀' },
    { exp: 378000, rank: 'اسطوري نخبة 🔱' },
    { exp: 406000, rank: 'اسطوري نخبة 🌟' },
    { exp: 435000, rank: 'اسطوري نخبة 🌍' },
    { exp: 465000, rank: 'اسطوري نخبة 🔮' },
    { exp: 496000, rank: 'اسطوري نخبة 🔥' },
    { exp: 528000, rank: 'اسطوري نخبة 🌠' }
  ];

  // العثور على الرتبة المناسبة بناءً على الـ XP
  let rank = thresholds[0].rank;  // الافتراضية
  for (let i = 0; i < thresholds.length; i++) {
    if (exp >= thresholds[i].exp) {
      rank = thresholds[i].rank;  // تعيين الرتبة بناءً على XP
    } else {
      break;  // توقف عند العثور على الرتبة المناسبة
    }
  }

  return rank;  // تعيد اسم الرتبة فقط بدون الرقم
};

// دالة للتعامل مع رسالة المستخدم
const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: "🔝", key: m.key, } });
  const userId = m.sender;
  const userName = conn.getName(m.sender);

  // الوصول إلى بيانات المستخدم من قاعدة بيانات البوت
  let user = global.db.data.users[userId];

  // التحقق مما إذا كانت بيانات المستخدم موجودة في قاعدة البيانات
  if (!user) {
    user = {
      name: userName,
      level: 1,
      exp: 0,
    };
    global.db.data.users[userId] = user; // تسجيل المستخدم الجديد
  }

  // تحديد مستوى المستخدم بناءً على الـ XP
  let level = 1;
  while (user.exp >= getExperienceForLevel(level)) {
    level++;
  }
  user.level = level;

  const requiredExpForCurrentLevel = getExperienceForLevel(user.level); // XP المطلوب للمستوى الحالي
  const remainingExp = requiredExpForCurrentLevel - user.exp; // كم باقي للترقية

  if (user.exp < requiredExpForCurrentLevel) {
    // رسالة عدم الترقية
    const message = `
╔═════ *⌠الــرتــبــة⌡* ═════╗
║
╠ *※ ❒ الاكسبي الحالي: ${user.exp}*
╠ *※ ❒ الاكسبي المطلوب: ${requiredExpForCurrentLevel}*
╠ *※ ❒ المتبقي للترقي: ${remainingExp}*
╠ *※ ❒ الــرتــبــة ↜ ${getRank(user.exp)}*
║
╚═════ ⌠🕷️⌡ ═════╝`.trim();

    try {
      const noLevelUpImage = fs.readFileSync('./PCB/لفل2.jpg');
      await conn.sendMessage(m.chat, { image: noLevelUpImage, caption: message, mentions: [m.sender] }, { quoted: m });
    } catch (e) {
      conn.sendMessage(m.chat, { text: message, mentions: [m.sender] }, { quoted: m });
    }
    return;
  }

  // ترقية المستخدم
  const oldLevel = user.level;
  while (user.exp >= getExperienceForLevel(user.level)) {
    user.level++;
  }

  // إذا تغير المستوى، نعرض رسالة الترقية
  if (oldLevel !== user.level) {
    const levelUpMessage = `
╔═════ *⌠اشعار ترقية⌡* ═════╗
║ *❐ لقد ترقيت*
║
╠ *※ ❒ الاكسبي السابق: ${user.exp - (user.exp % 1000)}*
╠ *※ ❒ الاكسبي الحالي: ${user.exp}*
╠ *※ ❒ الــرتــبــة┇ ${getRank(user.exp)}*
╠ *※ ❒ المتبقي: ${getExperienceForLevel(user.level + 1) - user.exp}*
╚═════ ⌠🕷️⌡ ═════╝`.trim();

    try {
      const levelUpImage = fs.readFileSync('./PCB/لفل.jpg');
      await conn.sendMessage(m.chat, { image: levelUpImage, caption: levelUpMessage, mentions: [m.sender] }, { quoted: m });
    } catch (e) {
      conn.sendMessage(m.chat, { text: levelUpMessage, mentions: [m.sender] }, { quoted: m });
    }
  }
};

handler.help = ['رتبتي'];
handler.tags = ['rp'];
handler.command = [, 'رتبتي'];

export default handler;