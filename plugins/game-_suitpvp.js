const handler = (m) => m;
handler.before = async function(m) {
  this.suit = this.suit ? this.suit : {};
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0;
  const room = Object.values(this.suit).find((room) => room.id && room.status && [room.p, room.p2].includes(m.sender));
  if (room) {
    let win = '';
    let tie = false;
    if (m.sender == room.p2 && /^(اقبل|قبول)/i.test(m.text) && m.isGroup && room.status == 'wait') {
      if (/^(رفض|رفض)/i.test(m.text)) {
        const textno = `
*⦧🕹️⦨ لــم يـقـبـل مـنـافـسـك الـطـلـب*`;
        m.reply(textno, null, {mentions: this.parseMention(textno)});
        delete this.suit[room.id];
        return !0;
      }
      room.status = 'play';
      room.asal = m.chat;
      clearTimeout(room.waktu);
const textplay = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ مـنـافـســة بــيــن*

- *ـ 🧑‍💻 ${db.data.users[room.p].name || `@${room.p.split`@`[0]}` }*

- *ـ 🧑‍💻 ${db.data.users[room.p2].name || `@${room.p2.split`@`[0]}` }*

*🎮 لــعــبــة⤶*

- *حــجــر ورقــة مــقــص*

*🎁 الـجـوائــز⤶*

- *الـفـائــز↜${room.poin} XP*

- *الـخـاســر↜${room.poin_lose} XP*

*🔱 اجــب فــي الـخـاص وعــد لـلروم مــره اخــري*\n\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;
      m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)});
      const comienzop = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ قـــم بلـاخـتـيـار*

- *حــجــر 🪨*

- *ورقـــة 📄*

- *مــقــص ✂️*

*🎁 الـجـوائــز⤶*

- الـفـائــز↜${room.poin} XP

- *الـخـاســر↜${room.poin_lose} XP*\n\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`;
      const comienzop2 = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*⦧🕹️⦨ قـــم بلـاخـتـيـار*

- *حــجــر 🪨*

- *ورقـــة 📄*

- *مــقــص ✂️*

*🎁 الـجـوائــز⤶*

- *الـفـائــز↜${room.poin} XP*

- *الـخـاســر↜${room.poin_lose} XP*\n\n*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`;

      if (!room.pilih) this.sendMessage(room.p, {text: comienzop}, {quoted: m});
      if (!room.pilih2) this.sendMessage(room.p2, {text: comienzop2}, {quoted: m});
      room.waktu_milih = setTimeout(() => {
        const iniciativa = '- *🔱 انــتــهــي الــوقــت*';
        if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, {text: iniciativa}, {quoted: m});
        else if (!room.pilih || !room.pilih2) {
          win = !room.pilih ? room.p2 : room.p;
          const textnull = `*🔱 لــم يـشـارك الــمـنـافــس ${db.data.users[room.pilih ? room.p2 : room.p].name || `@${(room.pilih ? room.p2 : room.p).split`@`[0]}`} فـــي الــجــولــة*`;
this.sendMessage(m.chat, {text: textnull}, {quoted: m}, {mentions: [room.p, room.p2]});
          this.sendMessage(m.chat, {text: textnull}, {quoted: m}, {mentions: this.parseMention(textnull)});
          db.data.users[win == room.p ? room.p : room.p2].exp += room.poin;
          db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot;
          db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose;
        }
        delete this.suit[room.id];
        return !0;
      }, room.timeout);
    }
    const jwb = m.sender == room.p;
    const jwb2 = m.sender == room.p2;
    const rock = /حجر/i;
    const paper = /ورقة/i;
    const scissors = /مقص/i;
    const reg = /^(حجر|ورقة|مقص)/i;
    if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
      room.pilih = reg.exec(m.text.toLowerCase())[0];
      room.text = m.text;
      m.reply(`*🔱 تــم الـاخـتـيـار بـنـجـاح*

- *اخـتـيـارك↜${m.text}*

ـ *عــد لـلـمـجـمـوعــة مـــرة اخــري*\n`);
      if (!room.pilih2) this.reply(room.p2, '*⦧🕹️⦨ الـخـصـم قــام بلـاخـتـيـار قــم بلـاخـتـيـار وعــد لـلـمـجـمـوعــة*', 0);
    }
    if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
      room.pilih2 = reg.exec(m.text.toLowerCase())[0];
      room.text2 = m.text;
      m.reply(`*🔱 تــم الـاخـتـيـار بـنـجـاح*

- *اخـتـيـارك↜${m.text}*

ـ *عــد لـلـمـجـمـوعــة مـــرة اخــري*\n`);
      if (!room.pilih) this.reply(room.p, '*⦧🕹️⦨ الـخـصـم قــام بلـاخـتـيـار قــم بلـاخـتـيـار وعــد لـلـمـجـمـوعــة*', 0);
    }
    const stage = room.pilih;
    const stage2 = room.pilih2;
    if (room.pilih && room.pilih2) {
      clearTimeout(room.waktu_milih);
      if (rock.test(stage) && scissors.test(stage2)) win = room.p;
      else if (rock.test(stage) && paper.test(stage2)) win = room.p2;
      else if (scissors.test(stage) && paper.test(stage2)) win = room.p;
      else if (scissors.test(stage) && rock.test(stage2)) win = room.p2;
      else if (paper.test(stage) && rock.test(stage2)) win = room.p;
      else if (paper.test(stage) && scissors.test(stage2)) win = room.p2;
      else if (stage == stage2) tie = true;
const getDisplayName = (userId) => {
  const user = db.data.users[userId];
  return user && user.name ? user.name : `@${userId.split`@`[0]}`;
};

const winnerName = getDisplayName(room.p);
const loserName = getDisplayName(room.p2);

const resultText = `
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

- *🔱 الــفــائــز↜${winnerName}*

- *🔱 الــخــاســر↜${loserName}*

*🎁 الـجـائــزة⤶*

- *الــفــائــز↜${room.poin} XP*

- *الــخــاســر↜${room.poin_lose} XP*

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*
`.trim();

const tieText = `
*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*⦧🕹️⦨ نـتـيـجـة الـمـبـارة*

*- 🔱 تــعــادل*

✦━━━━━✦⊰🕷️⊱✦━━━━━✦*`.trim();

const finalText = tie ? tieText : resultText;

this.reply(room.asal, finalText, m);
      if (!tie) {
        db.data.users[win == room.p ? room.p : room.p2].exp += room.poin;
        db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot;
        db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose;
      }
      delete this.suit[room.id];
    }
  }
  return !0;
};
handler.exp = 0;
export default handler;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}