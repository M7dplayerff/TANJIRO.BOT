import fs from 'fs';

const handler = async (m, { conn, args }) => {
  await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;

  // الحصول على صورة الملف الشخصي للمجموعة أو تعيين الصورة الافتراضية
  let ppgc;
  try {
    ppgc = await conn.profilePictureUrl(m.chat, 'image');
  } catch {
    ppgc = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png';
  }
  
  // جلب ملف الصورة
  const ppgcbuff = await conn.getFile(ppgc);

  // التأكد من نوع الجهاز المستخدم
  const device = (m.key.id.startsWith('3EB0') || m.key.id.startsWith('3EB1')) ? 'web' : 'mobile';

  // إذا كان الجهاز ليس ديسكتوب أو ويب
  if (device !== 'desktop' && device !== 'web') {
    const linkcode = await conn.groupInviteCode(m.chat);
    const imageMsg = {
      image: { url: ppgc },
      caption: `- *⦙🍷⦘ ↬* https://chat.whatsapp.com/${linkcode}`
    };

    // إرسال رسالة تحتوي على صورة ورابط المجموعة
    await conn.sendMessage(m.chat, imageMsg, { quoted: m });

  } else {
    // إرسال الرابط فقط إذا كان الجهاز ويب أو ديسكتوب
    await conn.reply(m.chat, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat), m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          description: null,
          title: 'Group Invite',
          body: '*ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ*',
          previewType: 0,
          thumbnail: fs.readFileSync('./PCB/منيو1.png'),
        }
      }
    });
  }
};

handler.help = ['رابط_المجموعه'];
handler.tags = ['gc'];
handler.command = /^(رابط(_المج?موعه)?)$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;