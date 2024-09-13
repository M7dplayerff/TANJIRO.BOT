

const handler = async (m, { conn, usedPrefix, command }) => {
  const room = Object.values(conn.game).find((room) => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender));
  if (room == undefined) {
    const message = `*⦧🕹️⦨انــت غــيــر مـشـتـرك فــي اي لـعـبـة*

- *لـلـانـشـاء↜.اكس_او ❴الـاسـم❵*`;
    return conn.sendButton(m.chat, message, '', null, [[`🆕 ابدأ لعبة جديدة`, `${usedPrefix}ttt start`]], m);
  }
  delete conn.game[room.id];
  const replyMessage = `- *🔱 تـــم حـــذف الـعـبـة بـنـجـاح*`;
  await m.reply(replyMessage);
};
handler.help = ['حذف']
handler.tags = ['ga']
handler.command = /^(حذف)$/i;
handler.fail = null;
export default handler;