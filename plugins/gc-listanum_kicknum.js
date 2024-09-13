/*              Codigo Creado Por Bruno Sobrino
      (https://github.com/BrunoSobrino/TheMystic-Bot-MD)
*/

const countryCodes = {
  '20': 'مصر 🇪🇬',
  '966': 'السعودية 🇸🇦',
  '971': 'الإمارات 🇦🇪',
  '974': 'قطر 🇶🇦',
  '968': 'عمان 🇴🇲',
  '965': 'الكويت 🇰🇼',
  '962': 'الأردن 🇯🇴',
  '961': 'لبنان 🇱🇧',
  '963': 'سوريا 🇸🇾',
  '964': 'العراق 🇮🇶',
  '970': 'فلسطين 🇵🇸',
  '218': 'ليبيا 🇱🇾',
  '212': 'المغرب 🇲🇦',
  '249': 'السودان 🇸🇩',
  '673': 'البحرين 🇧🇭',
  '967': 'اليمن 🇾🇪',
  '686': 'جزر القمر 🇲🇲',
  '91': 'الهند 🇮🇳',
  '1': 'أمريكا 🇺🇸',
  '7': 'روسيا 🇷🇺',
  '44': 'بريطانيا 🇬🇧',
  // أضف المزيد من رموز الدول حسب الحاجة
};
const handler = async (m, {conn, groupMetadata, participants}) => {
  await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  // حساب عدد الأعضاء لكل رمز دولة
  const countryCounts = {};
  Object.keys(countryCodes).forEach(code => {
    countryCounts[countryCodes[code]] = 0; // تعيين العدد الابتدائي لكل دولة بصفر
  });

  participants.forEach((u) => {
    const userId = u.id;
    for (const [code, country] of Object.entries(countryCodes)) {
      if (userId.startsWith(code)) {
        countryCounts[country]++; // زيادة العدد للدولة المطابقة
        break; // إذا وجد رمز دولة مطابق، لا تحتاج إلى التحقق من الرموز الأخرى
      }
    }
  });

  // ترتيب الدول بناءً على عدد الأعضاء من الأكثر إلى الأقل
  const sortedCountries = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([country, count]) => `-  *عدد الأعضاء من ${country} هو: ${count}*`)
    .join('\n\n'); // استخدم \n\n لإضافة مسافة بين الأسطر

  // إنشاء الرسالة لعرض عدد الأعضاء لكل دولة مع إطار زخرفي
  const message = sortedCountries.length > 0 ? sortedCountries : '*📊 لا توجد بيانات كافية لعرض الأعضاء حسب الدولة.*';
  
  const borderedMessage = `
${message}

`.trim();

  conn.reply(m.chat, borderedMessage, m);
};
handler.help = ['احصاء_الاعضاء']
handler.tags = ['gc']
handler.command = /^(احصاء_الاعضاء)$/i;
handler.group = true;
handler.fail = null;

export default handler;