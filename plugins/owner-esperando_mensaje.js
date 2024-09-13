/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync, readFileSync } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  const datas = global;
  const chatId = m.isGroup ? [m.chat, m.sender] : [m.sender];
  const sessionPath = 'system/sessions';
  try {
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      for (const id of chatId) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file));
          filesDeleted++;
          break;
        }
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: '*【🚫┇لم يتم العثور على ملفات】*'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `*【✅┇تم حذف ${filesDeleted} ملف】*`}, {quoted: m});
    }
  } catch (err) {
    console.error('حدث خطأ أثناء* محاولة حذف الملفات.*', err);
    await conn.sendMessage(m.chat, {text: '*【❌┇حدث خطأ】*\n*⌫ ❒ حدث خطأ حاول لاحقاً*'}, {quoted: m});
  }
};

handler.help = ['حذف_رسائل_الجلسه'];
handler.tags = ['ow'];
handler.command = /^(حذف_رسائل_الجلسه)$/i;
export default handler;