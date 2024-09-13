import fetch from 'node-fetch';
import fs from 'fs';

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

const handler = async (m, {args, usedPrefix, command}) => {
  if (!args[0]) {
    throw `- *🔱 ضــع رابــط الـمـشـروع الــذي تــريــد تـنـزيــلـه مــن جـيـتـهـاب*`;
  }
  if (!regex.test(args[0])) {
    throw '- *🔱 رابــطــك غــيــر صـحـيـح*';
  }

  // إضافة التفاعل باستخدام رمز التعبير 📄 مباشرة بعد التحقق من وجود الرابط الصحيح
  await conn.sendMessage(m.chat, { react: { text: "📄", key: m.key } });

  let match = args[0].match(regex);
  if (!match) {
    throw '- *🔱 لـا يـمـكـن اسـتـخـراج الـمـعـلـومـات مــن الــرابــط*';
  }

  let [_, user, repo] = match;
  repo = repo.replace(/.git$/, '');
  const url = `https://api.github.com/repos/${user}/${repo}/zipball`;

  const headRes = await fetch(url, { method: 'HEAD' });
  if (!headRes.ok) {
    throw '- *🔱 لـا يـمـكـنـنـي الـوصــول الــي الـمـشـروع*';
  }

  const filename = headRes.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
  m.reply('- *🔱 جــاري الــمــعــالــجــة*');

  conn.sendFile(m.chat, url, filename, null, m);
};
handler.help = ['جيتهاب']
handler.tags = ['do']
handler.command = /^(جيتهاب)$/i;
export default handler;