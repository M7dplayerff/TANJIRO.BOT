const handler = async (m, {conn, isAdmin, isOwner, args, usedPrefix, command}) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  
  const isClose = {
    'open': 'not_announcement',
    'فتح': 'not_announcement',
    'on': 'not_announcement',
    '1': 'not_announcement',
    'close': 'announcement',
    'قفل': 'announcement',
    'off': 'announcement',
    '0': 'announcement',
  }[(args[0] || '')];
  
  if (isClose === undefined) {
    const caption = `*⦙🍷⦘ ↫ طريقة الاستخدام الصحيحه للأمر*
- *.جروب_مؤقت فتح 1د*
- *.جروب_مؤقت فتح 1س*
- *.جروب_مؤقت فتح 1ي*
- *.جروب_مؤقت قفل 1د*
- *.جروب_مؤقت قفل 1س*
- *.جروب_مؤقت قفل 1ي*`;
    m.reply(caption);
    throw false;
  }
await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  const timeUnits = {
    'د': 60000,    // دقيقة
    'س': 3600000,  // ساعة
    'ي': 86400000  // يوم
  };
  
  const timeUnit = args[1]?.slice(-1); // الحصول على الوحدة الزمنية
  const timeValue = parseInt(args[1]?.slice(0, -1)); // الحصول على القيمة الرقمية
  
  if (!timeUnits[timeUnit] || isNaN(timeValue)) {
    const caption = `*⦙🍷⦘ ↫ طريقة الاستخدام الصحيحه للأمر*
- *.جروب_مؤقت فتح 1د*
- *.جروب_مؤقت فتح 1س*
- *.جروب_مؤقت فتح 1ي*
- *.جروب_مؤقت قفل 1د*
- *.جروب_مؤقت قفل 1س*
- *.جروب_مؤقت قفل 1ي*`;
    m.reply(caption);
    throw false;
  }
  
  const timeoutset = timeUnits[timeUnit] * timeValue;
  await conn.groupSettingUpdate(m.chat, isClose).then(async (_) => {
    m.reply(`*⦙🍷⦘ ↫ تــم تـغـيـر وضـع الـمـجـمـوعـة*${args[1] ? `\n
- *الــوضــع↫${isClose == 'announcement' ? 'لـلـمـشـرفـيـن فـقـط' : 'لــلــجــمــيــع'}*\n
- *الــمـــدة↫${clockString(timeoutset)}` : ''}*`);
  });
  
  // إزالة الرسالة المرسلة قبل انتهاء المؤقت
  if (args[1]) {
    setTimeout(async () => {
      await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async (_) => {
        conn.reply(m.chat, `*⦙🍷⦘ ↫ انتهي الوقت تم ارجاع المجموعه لحالتها الاصليه*

- *${isClose == 'announcement' ? 'لـلـجـمـيـع' : 'لـلـمـشـرفـيـن فـقـط'}*\n`);
      });
    }, timeoutset);
  }
};

handler.help = ['جروب_مؤقت'];
handler.tags = ['gc'];
handler.command = /^(جروب_مؤقت|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ms, h, m, s});
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}