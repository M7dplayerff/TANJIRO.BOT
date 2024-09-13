import { tmpdir } from 'os';
import path, { join } from 'path';
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
} from 'fs';

const handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;

  // ترجمة النصوص إلى العربية مباشرة
  await conn.sendMessage(m.chat, { react: { text: "🔱",key: m.key,}
  })
  const texto1 = `
*【✅┇تــــــــم ⍅  الــحــذف】*`;

  conn.reply(m.chat, texto1, m);

  const tmp = [tmpdir(), join(__dirname, '../tmp')];
  const filename = [];
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
  
  // حذف الملفات فقط وتخطي المجلدات
  filename.forEach((file) => {
    const stats = statSync(file);
    if (stats.isFile()) {
      unlinkSync(file);
    }
  });
};

handler.help = ['حذف_التخزين_المؤقت'];
handler.tags = ['ow'];
handler.command = /^(حذف_التخزين_المؤقت)$/i;
handler.rowner = true;
export default handler;