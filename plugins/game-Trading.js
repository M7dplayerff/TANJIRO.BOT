import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn, command, text }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        global.db.data.users[m.sender] = { exp: 1000, level: 0 }; // افتراض أن المستخدم يبدأ بـ 1000 XP ومستوى 0
        user = global.db.data.users[m.sender];
    }

    const startGame = async (amount) => {
        let direction = Math.random() < 0.5 ? 'up' : 'down';
        user.game = {
            amount: amount,
            direction: direction,
            started: true
        };

        const buttonMessage = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            hasMediaAttachment: false,
                            mediaType: 1,  // 1 للإشارة إلى نص فقط
                        },
                        body: {
                            text: '*╔══════════════════════════════════╗*\n*║ 🎯 توقع: هل السهم سيرتفع (🔼) أم سينخفض (🔽)؟ ║*\n*║  𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧 ║*\n*╚══════════════════════════════════╝*',
                            subtitle: "*🎲 لعبة التداول*"
                        },
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'quick_reply',
                                    buttonParamsJson: `{"display_text":"🔼","id":".توقع 🔼"}`
                                },
                                {
                                    name: 'quick_reply',
                                    buttonParamsJson: `{"display_text":"🔽","id":".توقع 🔽"}`
                                }
                            ]
                        }
                    }
                }
            }
        };

        await conn.relayMessage(m.chat, buttonMessage, {});
        return;
    };

    const endGame = async (guess) => {
        let game = user.game;
        if (!game || !game.started) {
            return conn.reply(m.chat, `*╔════════════════════╗*\n*║ ❌ لا يوجد لعبة جارية حاليا. ابدأ لعبة جديدة باستخدام الأمر: "تداول [كمية]" ║*\n*║  𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧 ║*\n*╚════════════════════╝*`, m);
        }

        let win = (guess === 'up' && game.direction === 'up') || (guess === 'down' && game.direction === 'down');
        if (win) {
            user.exp += game.amount * 2;
            await conn.reply(m.chat, `*╔════════════════════╗*\n*║ ✅ توقعك كان صحيح! لقد ربحت ${game.amount * 2} XP. رصيدك الحالي: ${user.exp} XP ║*\n*║  𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧 ║*\n*╚════════════════════╝*`, m);
        } else {
            user.exp -= game.amount;
            await conn.reply(m.chat, `*╔════════════════════╗*\n*║ ❌ توقعك كان خاطئ. لقد خسرت ${game.amount} XP. رصيدك الحالي: ${user.exp} XP ║*\n*║  𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧 ║*\n*╚════════════════════╝*`, m);
        }
        user.game = {};

        // تحقق من ترقية المستوى
        let before = user.level * 1;
        while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
    };

    if (command === 'تداول') {
        let amount = parseInt(text);
        if (isNaN(amount) || amount <= 0) {
            return conn.reply(m.chat, `*╔════════════════════╗*\n*║ 🚫 يرجى إدخال كمية صحيحة من الـ XP للمراهنة. ║*\n*║  𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧 ║*\n*╚════════════════════╝*`, m);
        }
        if (user.exp < amount) {
            return conn.reply(m.chat, `*╔════════════════════╗*\n*║ ❌ ليس لديك ما يكفي من الـ XP. رصيدك الحالي: ${user.exp} XP ║*\n*║  𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧 ║*\n*╚════════════════════╝*`, m);
        }
        await startGame(amount);
    }

    if (command === 'توقع') {
        let guess = text.trim().toLowerCase();
        if (guess !== '🔼' && guess !== '🔽') {
            return conn.reply(m.chat, `*╔════════════════════╗*\n*║ ❓ يرجى التوقع باستخدام 🔼 للسهم للأعلى أو 🔽 للسهم للأسفل. ║*\n*║  𝗧𝗔𝗡𝗝𝗜𝗥𝗢.𝗕𝗢𝗧 ║*\n*╚════════════════════╝*`, m);
        }
        guess = guess === '🔼' ? 'up' : 'down';
        await endGame(guess);
    }
};

handler.help = ['تداول'];
handler.tags = ['ga'];
handler.command = ['تداول', 'توقع'];
handler.group = true;

export default handler;