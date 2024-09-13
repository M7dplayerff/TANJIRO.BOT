import fs from 'fs'; // تأكد من استيراد fs في حالة استخدامه

const handler = async (m, { conn, args, participants }) => {
  await conn.sendMessage(m.chat, { react: { text: "👑", key: m.key, } });

  const imagePath = './PCB/المتصدرين.jpg'; // تعريف مسار الصورة الجديد

  // فلترة بيانات المستخدمين بناءً على الموجودين في المجموعة فقط
  const users = participants.map(p => {
    const user = global.db.data.users[p.id] || {};
    return { ...user, jid: p.id };
  });

  const sortedUsers = users.sort((a, b) => (b.exp || 0) - (a.exp || 0)).slice(0, args[0] ? Math.min(100, Math.max(parseInt(args[0]), 10)) : 10);

  // تحديد مستوى الفلات بناءً على الأكسبي
  const getFlatLevel = (exp) => {
    if (exp < 1000) return 1;
    if (exp < 3000) return 2;
    if (exp < 6000) return 3;
    if (exp < 10000) return 4;
    if (exp < 15000) return 5;
    if (exp < 21000) return 6;
    if (exp < 28000) return 7;
    if (exp < 36000) return 8;
    if (exp < 45000) return 9;
    if (exp < 55000) return 10;
    if (exp < 66000) return 11;
    if (exp < 78000) return 12;
    if (exp < 91000) return 13;
    if (exp < 105000) return 14;
    if (exp < 120000) return 15;
    if (exp < 136000) return 16;
    if (exp < 153000) return 17;
    if (exp < 171000) return 18;
    if (exp < 190000) return 19;
    if (exp < 210000) return 20;
    if (exp < 231000) return 21;
    if (exp < 253000) return 22;
    if (exp < 276000) return 23;
    if (exp < 300000) return 24;
    if (exp < 325000) return 25;
    if (exp < 351000) return 26;
    if (exp < 378000) return 27;
    if (exp < 406000) return 28;
    if (exp < 435000) return 29;
    if (exp < 465000) return 30;
    if (exp < 496000) return 31;
    if (exp < 528000) return 32;
    if (exp < 561000) return 33;
    if (exp < 595000) return 34;
    if (exp < 630000) return 35;
    if (exp < 666000) return 36;
    if (exp < 703000) return 37;
    if (exp < 741000) return 38;
    if (exp < 780000) return 39;
    if (exp < 820000) return 40;
    if (exp < 861000) return 41;
    if (exp < 903000) return 42;
    if (exp < 946000) return 43;
    if (exp < 990000) return 44;
    if (exp < 1030000) return 45;
    if (exp < 1071000) return 46;
    if (exp < 1113000) return 47;
    if (exp < 1156000) return 48;
    if (exp < 1200000) return 49;
    if (exp < 1245000) return 50;
    if (exp < 1291000) return 51;
    if (exp < 1338000) return 52;
    if (exp < 1386000) return 53;
    if (exp < 1435000) return 54;
    if (exp < 1485000) return 55;
    if (exp < 1536000) return 56;
    if (exp < 1588000) return 57;
    if (exp < 1641000) return 58;
    if (exp < 1695000) return 59;
    if (exp < 1750000) return 60;
    if (exp < 1806000) return 61;
    if (exp < 1863000) return 62;
    if (exp < 1921000) return 63;
    if (exp < 1980000) return 64;
    if (exp < 2040000) return 65;
    if (exp < 2101000) return 66;
    if (exp < 2163000) return 67;
    if (exp < 2226000) return 68;
    if (exp < 2290000) return 69;
    if (exp < 2355000) return 70;
    if (exp < 2421000) return 71;
    if (exp < 2488000) return 72;
    if (exp < 2556000) return 73;
    if (exp < 2625000) return 74;
    if (exp < 2695000) return 75;
    if (exp < 2766000) return 76;
    if (exp < 2838000) return 77;
    if (exp < 2911000) return 78;
    if (exp < 2985000) return 79;
    if (exp < 3060000) return 80;
    if (exp < 3136000) return 81;
    if (exp < 3213000) return 82;
    if (exp < 3291000) return 83;
    if (exp < 3370000) return 84;
    if (exp < 3450000) return 85;
    if (exp < 3531000) return 86;
    if (exp < 3613000) return 87;
    if (exp < 3696000) return 88;
    if (exp < 3780000) return 89;
    if (exp < 3865000) return 90;
    if (exp < 3951000) return 91;
    if (exp < 4038000) return 92;
    if (exp < 4126000) return 93;
    if (exp < 4215000) return 94;
    if (exp < 4305000) return 95;
    if (exp < 4396000) return 96;
    if (exp < 4488000) return 97;
    if (exp < 4581000) return 98;
    if (exp < 4675000) return 99;
    return 100; // For experience 4675000 and above
  };

  // تحديد الرتبة بناءً على الأكسبي
  const getRank = (exp) => {
 
if (exp < 1000) return 'مستجد 🐣';
if (exp < 3000) return 'مبتدئ 🧑‍🎓';
if (exp < 6000) return 'تلميذ ⚔️';
if (exp < 10000) return 'تلميذ خبير 🧠';
if (exp < 15000) return 'متمرس 🔥';
if (exp < 21000) return 'استاذ 🏆';
if (exp < 28000) return 'استاذ خبير 🌟';
if (exp < 36000) return 'اسطوري مبتدئ ✨';
if (exp < 45000) return 'اسطوري تلميذ 💎';
if (exp < 55000) return 'اسطوري تلميذ خبير 🏅';
if (exp < 66000) return 'اسطوري استاذ 🎖️';
if (exp < 78000) return 'استاذ خبير 🏅';
if (exp < 91000) return 'اسطوري 🏅';
if (exp < 105000) return 'اسطوري نخبة 👑';
if (exp < 120000) return 'اسطوري نخبة 🌠';
if (exp < 136000) return 'اسطوري نخبة 🚀';
if (exp < 153000) return 'اسطوري نخبة ⚡';
if (exp < 171000) return 'اسطوري نخبة 🔱';
if (exp < 190000) return 'اسطوري نخبة 🌌';
if (exp < 210000) return 'اسطوري نخبة 🌟';
if (exp < 231000) return 'اسطوري نخبة 🌍';
if (exp < 253000) return 'اسطوري نخبة 🔮';
if (exp < 276000) return 'اسطوري نخبة 🔥';
if (exp < 300000) return 'اسطوري نخبة 🌠';
if (exp < 325000) return 'اسطوري نخبة 👑';
if (exp < 351000) return 'اسطوري نخبة 🌌';
if (exp < 378000) return 'اسطوري نخبة 🚀';
if (exp < 406000) return 'اسطوري نخبة 🔱';
if (exp < 435000) return 'اسطوري نخبة 🌟';
if (exp < 465000) return 'اسطوري نخبة 🌍';
if (exp < 496000) return 'اسطوري نخبة 🔮';
if (exp < 528000) return 'اسطوري نخبة 🔥'; // for exp >= 528000
};
  

  const texto = sortedUsers.map(({ jid, exp, limit, money, name }, i) => 
    `
*✧━════━⊰🤴⊱━════━✧*
*❐⤶الـمـركـز↜${i + 1}*
*❐⤶الاسـم↜${name || 'غير مسجل'}*
*❐⤶الاكـسـبـي↜${exp || 0} نقاط*
*❐⤶الـرتـبـة↜${getRank(exp || 0)}*
*❐⤶المستوي↜${getFlatLevel(exp || 0)}*
*✠ ─── ✷ ─ ‹🕷️› ─ ✷ ─── ✠*
`.trim()
  ).join('\n\n');

  // تحقق من وجود الصورة وأرسلها مع الرسالة
  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    conn.sendMessage(m.chat, { image: imageBuffer, caption: texto }, { quoted: m });
  } else {
    console.log(`File not found at ${imagePath}`);
    conn.reply(m.chat, 'الصورة المطلوبة غير موجودة.', m);
  }
};

handler.help = ['متصدرين'];
handler.tags = ['rp'];
handler.command = ['', 'متصدرين', 'المتصدرين'];
handler.fail = null;

export default handler;