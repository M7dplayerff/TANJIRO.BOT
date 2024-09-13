import { format } from 'util';

const debugMode = false;
const winScore = 5099; // تحديث قيمة جائزة الفائز إلى 5099
const playScore = 99;

export async function before(m) {
  let ok;
  let isWin = false;
  let isTie = false;
  let isSurrender = false;
  this.game = this.game ? this.game : {};
  const room = Object.values(this.game).find((room) => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state === 'PLAYING');
  if (room) {
    if (!/^([1-9]|(me)?nyerah|\rendirse\|rendirse|RENDIRSE|surr?ender)$/i.test(m.text)) {
      return true;
    }
    isSurrender = !/^[1-9]$/.test(m.text);
    if (m.sender !== room.game.currentTurn) {
      if (!isSurrender) {
        return true;
      }
    }
    if (debugMode) {
      m.reply('[DEBUG]\n' + require('util').format({
        isSurrender,
        text: m.text
      }));
    }
    if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
      m.reply({
        '-3': 'الرقم غلط، حاول تاني',
        '-2': 'الرقم مش صح',
        '-1': 'رقم مش موجود',
        '0': 'الرقم مش موجود، اختر رقم تاني',
      }[ok]);
      return true;
    }
    if (m.sender === room.game.winner) {
      isWin = true;
    } else if (room.game.board === 511) {
      isTie = true;
    }
    const arr = room.game.render().map((v) => {
      return {
        X: '❎',
        O: '⭕',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      }[v];
    });
    if (isSurrender) {
      room.game._currentTurn = m.sender === room.game.playerX;
      isWin = true;
    }
    const winner = isSurrender ? room.game.currentTurn : room.game.winner;
    const xpEarned = winScore - playScore; // عدد نقاط الخبرة المكتسبة

    const str = `*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*
*🕹️ لـعـبـة اكــس او*

❎ = @${room.game.playerX.split('@')[0]}

⭕ = @${room.game.playerO.split('@')[0]}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

${isWin ? `*لــقــد فـــزت بــ* *${xpEarned}* *🔱 اكــســبــي*` : isTie ? '*تــعــادل*' : `*🧑‍💻 دورك يـــا↜* @${room.game.currentTurn.split('@')[0]}`}

*✦━━━━━✦⊰🕷️⊱✦━━━━━✦*\n*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*`.trim();
    
    const users = global.db.data.users;
    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) {
      room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat;
    }
    if (room.x !== room.o) {
      await this.sendMessage(room.x, { text: str, mentions: this.parseMention(str) }, { quoted: m });
    }
    await this.sendMessage(room.o, { text: str, mentions: this.parseMention(str) }, { quoted: m });
    if (isTie || isWin) {
      users[room.game.playerX].exp += playScore;
      users[room.game.playerO].exp += playScore;
      if (isWin) {
        users[winner].exp += xpEarned;
      }
      if (debugMode) {
        m.reply('[DEBUG]\n' + format(room));
      }
      delete this.game[room.id];
    }
  }
  return true;
}