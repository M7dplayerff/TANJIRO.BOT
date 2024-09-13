import speed from "performance-now";

let handler = async (m, { conn }) => {
  let ini_timestamp = speed();
  let ini_latensi = speed() - ini_timestamp;
  let text_ping = `- *🔱 ـ${ini_latensi.toFixed(4)}*\n\n- *🔱 تـــانــجــيــرو*`;
  conn.reply(m.chat, text_ping);
};
handler.command = ["بينج"];
handler.help = ["بينج"]
handler.tags = ["in"]
export default handler;
