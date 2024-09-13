import axios from 'axios';

// دالة لترجمة الأوصاف إلى العربية
const translateWeatherDescription = (description) => {
  const translations = {
    'clear sky': 'سماء صافية',
    'few clouds': 'بضع سحب',
    'scattered clouds': 'غيوم متفرقة',
    'broken clouds': 'غيوم متكسرة',
    'shower rain': 'أمطار خفيفة',
    'rain': 'أمطار',
    'thunderstorm': 'عاصفة رعدية',
    'snow': 'ثلج',
    'mist': 'ضباب'
    // يمكنك إضافة المزيد من الترجمات حسب الحاجة
  };
  return translations[description] || description; // إذا لم تكن الترجمة موجودة، إرجاع الوصف كما هو
};

const handler = async (m, { args }) => {
  if (!args[0]) throw `╔════════════════════════════╗\n║ *📍 حدد مدينة أو بلد عايز تعرف طقسها انهارده 🌤️* ║\n╚════════════════════════════╝`;
  await conn.sendMessage(m.chat, { react: { text: "☁️",key: m.key,}
  })
  try {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = await response;
    const name = res.data.name;
    const Country = res.data.sys.country;
    const Weather = translateWeatherDescription(res.data.weather[0].description);
    const Temperature = res.data.main.temp + '°C';
    const Minimum_Temperature = res.data.main.temp_min + '°C';
    const Maximum_Temperature = res.data.main.temp_max + '°C';
    const Humidity = res.data.main.humidity + '%';
    const Wind = res.data.wind.speed + 'km/h';
    const wea = `╔════════════════════════════╗\n║ *🌆 المدينة:* ${name} ║\n║ *🏴 البلد:* ${Country} ║\n║ *🌤️ الطقس:* ${Weather} ║\n║ *🌡️ درجة الحرارة:* ${Temperature} ║\n║ *🌡️ درجة الحرارة الدنيا:* ${Minimum_Temperature} ║\n║ *🌡️ درجة الحرارة القصوى:* ${Maximum_Temperature} ║\n║ *💧 الرطوبة:* ${Humidity} ║\n║ *💨 سرعة الرياح:* ${Wind} ║\n╚════════════════════════════╝\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
    m.reply(wea);
  } catch {
    throw `╔════════════════════════════╗\n║ *⚠️ في حاجة غلط حصلت وانا بجيب الطقس حاول تاني بعدين 🌧️* ║\n╚════════════════════════════╝`;
  }
};

handler.help = ['الطقس'];
handler.tags = ['to'];
handler.command = /^(الطقس)$/i;
export default handler;