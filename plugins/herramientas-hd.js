import FormData from "form-data";
import Jimp from "jimp";

const handler = async (m, {conn, usedPrefix, command}) => {
  try {    
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime) throw `*『🚫┇حـدث⟢خـطـأ』*`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `*☜ قم بأرسال صورة مع الامر او قم بعمل ريبلاي علي صورة لرفع جودتها*`;
    await conn.sendMessage(m.chat, { react: { text: "🔝",key: m.key,}
  })
    m.reply(`*『🤌┇جـاري⟢الـمـعـالـجـة』*`);
    let img = await q.download?.();
    let pr = await remini(img, "enhance");
    
    // إرسال الصورة مع الختم
    const caption = `🔱 *تــم الـمـعـالـجـة*`;
    
    conn.sendMessage(m.chat, {image: pr, caption: caption}, {quoted: m});
  } catch {
    throw `*☜ قم بأرسال صورة مع الامر او قم بعمل ريبلاي علي صورة لرفع جودتها*`;
  }
};
handler.help = ["اتش_دي"];
handler.tags = ["to"];
handler.command = ["اتش_دي"];
export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (availableOperations.includes(operation)) {
      operation = operation;
    } else {
      operation = availableOperations[0];
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"});
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"});
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
          reject(err);
        });
      },
    );
  });
}