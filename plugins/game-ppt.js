const handler = async (m, { conn, text, command, usedPrefix, args }) => {
  const pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';

  // 60000 = 1 دقيقة // 30000 = 30 ثانية // 15000 = 15 ثانية // 10000 = 10 ثواني
  const time = global.db.data.users[m.sender].wait + 10000;
  if (new Date() - global.db.data.users[m.sender].wait < 10000) {
    throw `استني شويه ${Math.floor((time - new Date()) / 1000)} ثانية`;
  }

  if (!args[0]) {
    return conn.reply(m.chat, `*⦧🕹️⦨ قــم بـــوضـــع الـعـنـصـر بــعــد الـامـر*

- *${usedPrefix + command} حجر*
- *${usedPrefix + command} ورقة*
- *${usedPrefix + command} مقص*`, m);
  }

  let astro = Math.random();
  if (astro < 0.34) {
    astro = 'حجر';
  } else if (astro > 0.34 && astro < 0.67) {
    astro = 'مقص';
  } else {
    astro = 'ورقة';
  }

  const textm = text.toLowerCase();
  let exp = 0;
  let result = '';

  if (textm === astro) {
    result = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*🔱 تــعــادل*

- *انــت↜${textm}*

- *الـبـوت↜${astro}*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
  } else if (textm === 'ورقة') {
    if (astro === 'حجر') {
      exp = 1000;
      global.db.data.users[m.sender].exp += exp;
      result = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*🔱 لــقــد فــــزت*

- *انــت↜${textm}*

- *الـبـوت↜${astro}*

- *🎁 الـجـائــزة↜${exp} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
    } else {
      exp = -300;
      global.db.data.users[m.sender].exp += exp;
      result = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*🔱 لــقــد خــســرت*

- *انــت↜${textm}*

- *الـبـوت↜${astro}*

- *☠️ الــخــســارة↜${exp} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
    }
  } else if (textm === 'مقص') {
    if (astro === 'ورقة') {
      exp = 1000;
      global.db.data.users[m.sender].exp += exp;
      result = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*🔱 لــقــد فــــزت*

- *انــت↜${textm}*

- *الـبـوت↜${astro}*

- *🎁 الـجـائــزة↜${exp} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
    } else {
      exp = -300;
      global.db.data.users[m.sender].exp += exp;
      result = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*🔱 لــقــد خــســرت*

- *انــت↜${textm}*

- *الـبـوت↜${astro}*

- *☠️ الــخــســارة↜${exp} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
    }
  } else if (textm === 'حجر') {
    if (astro === 'مقص') {
      exp = 1000;
      global.db.data.users[m.sender].exp += exp;
      result = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*🔱 لــقــد فــــزت*

- *انــت↜${textm}*

- *الـبـوت↜${astro}*

- *🎁 الـجـائــزة↜${exp} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
    } else {
      exp = -300;
      global.db.data.users[m.sender].exp += exp;
      result = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*🔱 لــقــد خــســرت*

- *انــت↜${textm}*

- *الـبـوت↜${astro}*

- *☠️ الــخــســارة↜${exp} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
    }
  }

  m.reply(result);
  global.db.data.users[m.sender].wait = new Date() * 1;
};

handler.help = ['ح_و_م2'];
handler.tags = ['ga'];
handler.command = /^(ح_و_م2)$/i;
export default handler;