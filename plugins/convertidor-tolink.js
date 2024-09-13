// مقدم من قناه Zoro Codes 
import axios from 'axios';
import uploadImage from '../lib/uploadImage.js';

const Zoro_API = 'https://zoro-foryou.vercel.app/api/img-to-url';

let handler = async (m) => {
  let q = m.quoted || m;
  let mime = (q.msg || q).mimetype || '';

    if (!mime) {
    throw '- *🔱 قـــم بــلــرد عــلــي صــورة*';
  }
await conn.sendMessage(m.chat, { react: { text: "🔗",key: m.key,}
  })
  
  if (!mime.startsWith('image/')) {
    throw '- *🔱 يــجــب الــرد عــلــي صــورة*';
  }

  let media = await q.download();

  try {
        let imageBase64 = media.toString('base64');

        const response = await axios.post(Zoro_API, {
      image: imageBase64
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

        if (response.data.status) {
      let imageLink = response.data.imageUrl;
      m.reply(`- *🔱 تـــم الــتــحــويــل*\n\n- *الــرابــط↜* ${imageLink}`);
    } else {
      m.reply(`- *🔱 حــدث خــطــأ* ${response.data.message}`);
    }
  } catch (error) {

    m.reply(`- *🔱 حــدث خــطــأ اثــنــاء الــرفــع*\n${error.message}`);
  }
};

handler.help = ['تحويل_لرابط'];
handler.tags = ['co'];
handler.command = ['تحويل_لرابط'];

export default handler;