import moment from 'moment-timezone';

const handler = async (m, {conn}) => {
  await conn.sendMessage(m.chat, { react: { text: "🕒",key: m.key,}
  })
  // تحديث المناطق الزمنية لتشمل جميع الدول العربية
  const tzEG = moment().tz('Africa/Cairo').format('HH:mm');  // مصر
  const dtEG = moment().tz('Africa/Cairo').format('DD/MM');   // مصر تاريخ
  const tzSA = moment().tz('Asia/Riyadh').format('HH:mm');  // السعودية
  const dtSA = moment().tz('Asia/Riyadh').format('DD/MM');   // السعودية تاريخ
  const tzJO = moment().tz('Asia/Amman').format('HH:mm');   // الأردن
  const dtJO = moment().tz('Asia/Amman').format('DD/MM');    // الأردن تاريخ
  const tzLB = moment().tz('Asia/Beirut').format('HH:mm');   // لبنان
  const dtLB = moment().tz('Asia/Beirut').format('DD/MM');    // لبنان تاريخ
  const tzAE = moment().tz('Asia/Dubai').format('HH:mm');    // الإمارات
  const dtAE = moment().tz('Asia/Dubai').format('DD/MM');     // الإمارات تاريخ
  const tzSY = moment().tz('Asia/Damascus').format('HH:mm'); // سوريا
  const dtSY = moment().tz('Asia/Damascus').format('DD/MM');  // سوريا تاريخ
  const tzQA = moment().tz('Asia/Qatar').format('HH:mm');    // قطر
  const dtQA = moment().tz('Asia/Qatar').format('DD/MM');     // قطر تاريخ
  const tzKW = moment().tz('Asia/Kuwait').format('HH:mm');   // الكويت
  const dtKW = moment().tz('Asia/Kuwait').format('DD/MM');    // الكويت تاريخ
  const tzOM = moment().tz('Asia/Muscat').format('HH:mm');    // عمان
  const dtOM = moment().tz('Asia/Muscat').format('DD/MM');     // عمان تاريخ
  const tzBH = moment().tz('Asia/Bahrain').format('HH:mm');   // البحرين
  const dtBH = moment().tz('Asia/Bahrain').format('DD/MM');    // البحرين تاريخ
  const tzMA = moment().tz('Africa/Casablanca').format('HH:mm'); // المغرب
  const dtMA = moment().tz('Africa/Casablanca').format('DD/MM'); // المغرب تاريخ
  const tzLY = moment().tz('Africa/Tripoli').format('HH:mm');  // ليبيا
  const dtLY = moment().tz('Africa/Tripoli').format('DD/MM');   // ليبيا تاريخ
  const tzDZ = moment().tz('Africa/Algiers').format('HH:mm');  // الجزائر
  const dtDZ = moment().tz('Africa/Algiers').format('DD/MM');   // الجزائر تاريخ
  const tzTN = moment().tz('Africa/Tunis').format('HH:mm');    // تونس
  const dtTN = moment().tz('Africa/Tunis').format('DD/MM');     // تونس تاريخ
  const tzSD = moment().tz('Africa/Khartoum').format('HH:mm');  // السودان
  const dtSD = moment().tz('Africa/Khartoum').format('DD/MM');   // السودان تاريخ
  const tzMR = moment().tz('Africa/Nouakchott').format('HH:mm'); // موريتانيا
  const dtMR = moment().tz('Africa/Nouakchott').format('DD/MM'); // موريتانيا تاريخ

  const message = `\`\`\`
═══════════════════════════════════════════
█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
█          أوقات وتواريخ الدول العربية          █
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█

█ 🇪🇬 مصر        : ${dtEG} ${tzEG}  █
█ 🇸🇦 السعودية   : ${dtSA} ${tzSA}  █
█ 🇯🇴 الأردن     : ${dtJO} ${tzJO}  █
█ 🇱🇧 لبنان      : ${dtLB} ${tzLB}  █
█ 🇦🇪 الإمارات   : ${dtAE} ${tzAE}  █
█ 🇸🇾 سوريا      : ${dtSY} ${tzSY}  █
█ 🇶🇦 قطر        : ${dtQA} ${tzQA}  █
█ 🇰🇼 الكويت     : ${dtKW} ${tzKW}  █
█ 🇴🇲 عمان       : ${dtOM} ${tzOM}  █
█ 🇧🇭 البحرين    : ${dtBH} ${tzBH}  █
█ 🇲🇦 المغرب     : ${dtMA} ${tzMA}  █
█ 🇱🇾 ليبيا      : ${dtLY} ${tzLY}  █
█ 🇩🇿 الجزائر    : ${dtDZ} ${tzDZ}  █
█ 🇹🇳 تونس       : ${dtTN} ${tzTN}  █
█ 🇸🇩 السودان    : ${dtSD} ${tzSD}  █
█ 🇲🇷 موريتانيا  : ${dtMR} ${tzMR}  █
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
═══════════════════════════════════════════
الوقت المحلي للخادم:\n • ${moment().format('DD/MM HH:mm')}

╔════════════════════════════════════════════╗
║               𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧               ║
╚════════════════════════════════════════════╝`;

  await conn.sendMessage(m.chat, {text: message}, {quoted: m});
};
handler.help = ['التوقيت_المحلي']
handler.tags = ['to']
handler.command = /^(التوقيت_المحلي)$/i;
export default handler;