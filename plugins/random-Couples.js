import axios from 'axios';

let handler = async (m, { conn, usedPrefix }) => {
    await conn.sendMessage(m.chat, { react: { text: "📸",key: m.key,}
  })

try {
const fileId = '15gGTm92kBBUk3TFT1M_0dKFdJW0ip2Db';

const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
const res = await axios.get(url);

if (res.data && Array.isArray(res.data)) {
            let rdata = res.data;
            let json = rdata[Math.floor(Math.random() * rdata.length)];
            
            let boy = json.boy;
            let girl = json.girl;
             const cap1 = `- *🔱 صــــورتـــــك يـــا مــــز 🫦*`.trim();
             const cap2 = `- *🔱 صـــورتـــك يــا مــــزة 🫦*`.trim();

            
            conn.sendMessage(m.chat, { image: { url: boy }, caption: cap1}, { quoted: m });
           
            conn.sendMessage(m.chat, { image: { url: girl }, caption: cap2}, { quoted: m });
                

        } else {
            console.error('The received data is not a valid JSON array.');
        }
    } catch (error) {
        console.error('Error fetching data from Google Drive:', error);
    }




};
handler.help = ['طقم'];
handler.tags = ['ra'];
handler.command = /^(ماتشينج|تطقيم|طقم)$/i;

export default handler;