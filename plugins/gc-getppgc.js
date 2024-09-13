import fetch from "node-fetch";
let handler = async (m, { conn, command }) => {
	await conn.sendMessage(m.chat, { react: { text: "🍷",key: m.key,}
  })
	try {
		let q = m.quoted ? m.quoted : m
		let pp = await conn
			.profilePictureUrl(q.chat, "image")
			.catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
		conn.sendFile(m.chat, pp, "nih bang.png", "- *🔱 تــفــضــل صــورة الـمـجـمـوعــة*", m, {
			jpegThumbnail: await (await fetch(pp)).buffer(),
		});
	} catch {
		let pp = await conn
			.profilePictureUrl(m.chat, "image")
			.catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
		conn.sendFile(m.chat, pp, "ppsad.png", "- *🔱 تــفــضــل صــورة الـمـجـمـوعــة*", m, {
			jpegThumbnail: await (await fetch(pp)).buffer(),
		});
	}
};
handler.help = ["صورة_الروم"];
handler.tags = ['gc'];
handler.command = /^(صورة_الروم)$/i;
export default handler;
