const items = ['diamond', 'exp'];
const confirmation = {};

async function handler(m, { conn, args, usedPrefix, command }) {
  const datas = global
  const user = global.db.data.users[m.sender];
  const item = items.filter((v) => v in user && typeof user[v] == 'number');
  const lol = `*الاستخدام الصحيح للأمر*\n\n*.تحويل exp|diamond العدد @user*`.trim();
  const type = (args[0] || '').toLowerCase();
  if (!item.includes(type)) return conn.sendMessage(m.chat, {text: lol, mentions: [m.sender]}, {quoted: m});
  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  if (!who) return conn.sendMessage(m.chat, {text: '*منشن شخص تريد التحويل له*', mentions: [m.sender]}, {quoted: m});
  if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, {text: `المستخدم ${who} غير موجود في قاعدة البيانات.`, mentions: [m.sender]}, {quoted: m});
  if (user[type] * 1 < count) return conn.sendMessage(m.chat, {text: `*لا يوجد لديك اكسبي او الماس كافي* ${type}.`, mentions: [m.sender]}, {quoted: m});
  await conn.sendMessage(m.chat, { react: { text: "💱",key: m.key,}
  })
const confirm = `*هل تريد تحويل${count} ${type} إلى @${(who || '').replace(/@s.whatsapp\.net/g, '')}؟*\n- *🔱 نعم للتاكيد*\n- *🔱 لا للرفض*`.trim();
  await conn.sendMessage(m.chat, {text: confirm, mentions: [who]}, {quoted: m});
  confirmation[m.sender] = { sender: m.sender, to: who, message: m, type, count, timeout: setTimeout(() => (conn.sendMessage(m.chat, {text: '*تم الغاء العماليه لا يوجد رد من المستخدم*', mentions: [m.sender]}, {quoted: m}), delete confirmation[m.sender]), 60 * 1000)};
}

handler.before = async (m) => {
  const datas = global
  if (m.isBaileys) return;
  if (!(m.sender in confirmation)) return;
  if (!m.text) return;
  const { timeout, sender, message, to, type, count } = confirmation[m.sender];
  if (m.id === message.id) return;
  const user = global.db.data.users[sender];
  const _user = global.db.data.users[to];
  if (/^لا$/i.test(m.text)) {
    clearTimeout(timeout);
    delete confirmation[sender];
    return conn.sendMessage(m.chat, {text: '*تم إلغاء التحويل.*', mentions: [m.sender]}, {quoted: m});
  }
  if (/^نعم$/i.test(m.text)) {
    const previous = user[type] * 1;
    const _previous = _user[type] * 1;
    user[type] -= count * 1;
    _user[type] += count * 1;
    if (previous > user[type] * 1 && _previous < _user[type] * 1) {
      conn.sendMessage(m.chat, {text: `*تم تحويل ${count} ${type} إلى @${(to || '').replace(/@s\.whatsapp\.net/g, '')}.*`, mentions: [to]}, {quoted: m});
    } else {
      user[type] = previous;
      _user[type] = _previous;
      conn.sendMessage(m.chat, {text: `*فشل تحويل ${count} ${type} إلى @${(to || '').replace(/@s\.whatsapp\.net/g, '')}.*`, mentions: [to]}, {quoted: m});
    }
    clearTimeout(timeout);
    delete confirmation[sender];
  }
};
handler.help = ['تحويل'];
handler.tags = ['rp'];
handler.command = ['تحويل', ];
handler.disabled = false;
export default handler;

function special(type) {
  const b = type.toLowerCase();
  const special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '');
  return special;
}
function isNumber(x) {
  return !isNaN(x);
}