import cp, {exec as _exec} from 'child_process';
import {promisify} from 'util';
import fs from 'fs'; // إضافة استيراد fs إذا لم يكن موجودًا

const exec = promisify(_exec).bind(cp);
const handler = async (m, {conn, isOwner, command, text, usedPrefix, args, isROwner}) => {
  const datas = global;

  if (!isROwner) return;
  if (global.conn.user.jid != conn.user.jid) return;
  m.reply('╔════════════════════╗\n║  🚫 معكش صلاحية عشان تطلب مني الأمر دا يا حب 💖  ║\n╚════════════════════╝');

  let o;
  try {
    o = await exec(command.trimStart() + ' ' + text.trimEnd());
  } catch (e) {
    o = e;
  } finally {
    const {stdout, stderr} = o;
    if (stdout.trim()) m.reply(stdout);
    if (stderr.trim()) m.reply(stderr);
  }
};

handler.customPrefix = /^[$]/;
handler.command = new RegExp;
export default handler;