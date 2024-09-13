const handler = async (m, { conn, text, command, usedPrefix }) => {

  try {

    const datas = global;

    const pp = './src/warn.jpg';

    let who;

    if (m.isGroup) {

      who = m.mentionedJid[0] ?

        m.mentionedJid[0] :

        m.quoted ?

        m.quoted.sender :

        text;

    } else who = m.chat;

    

    const user = global.db.data.users[who] || { warn: 0 };

    const bot = global.db.data.settings[conn.user.jid] || {};

    const dReason = 'سبب غير محدد';

    const msgtext = text ? text.replace(/@\S+/g, '') : dReason;

    // التحقق إذا كان العضو مسجل في البوت أو لا

    const userName = user && user.registered ? user.name : `@${who.split`@`[0]}`;

    if (!who) {

      return await m.reply(

        `*⦙🍷⦘ ↫ مـنـشـن الـشـخـص الـمـراد انــذاره*`,

        m.chat,

        { mentions: conn.parseMention(who) }

      );

    }

    

    // إضافة التحذير للعضو

    user.warn = user.warn || 0;  // تعيين عدد التحذيرات إذا لم يكن موجودًا

    user.warn += 1;  // زيادة عدد التحذيرات

    

    await conn.sendMessage(m.chat, { react: { text: "⚠️", key: m.key } });

    await m.reply(

      `*⦙🍷⦘ ↫ تــم عـمـل انــذار جــديــد*

- *🤴 الـعـضـو↜ ${userName}*

- *الــســبــب↜* ${msgtext}

- 💳 *عــدد الـانـــذارات↜ ${user.warn}/3*`,

      null,

      { mentions: [who] }

    );

    if (user.warn >= 3) {

      const groupMetadata = await conn.groupMetadata(m.chat);

      const ownerJid = groupMetadata.owner;

      

      if (who === ownerJid) {

        await m.reply(

          `*⦙🍷⦘ ↫ مـمـنـوع طــرد الـمـالك*`

        );

      } else {

        user.warn = 0;  // إعادة تعيين عدد التحذيرات بعد الطرد

        await m.reply(

          `*⦙🍷⦘ ↫ تــم طــرد عــضــو بـسـبـب مـخـالـفـتـه الـقـوانـيـن اكـثـر مـن مـرة*

- *🤴 الـعـضـو↜ ${userName}*\n`,

          null,

          { mentions: [who] }

        );

        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');

      }

    }

  } catch (error) {

    console.error('Error handling warn command:', error);

  }

  return;

};

handler.help = ['انذار'];

handler.tags = ['gc'];

handler.command = /^(انذار)$/i;

handler.group = true;

handler.admin = true;

handler.botAdmin = true;

export default handler;