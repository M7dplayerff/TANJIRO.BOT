const xpperlimit = 350;
const handler = async (m, {conn, command, args}) => {
  const datas = global;
  await conn.sendMessage(m.chat, { react: { text: "🏛️",key: m.key,}
  })
  
  let count = command.replace(/^buy/i, '');
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
  count = Math.max(1, count);
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xpperlimit * count;
    global.db.data.users[m.sender].limit += count;
    conn.reply(m.chat, `
تم الشراء يا حب✔️
الكمية: + ${count}💎 
الخصم: -${xpperlimit * count} XP
`, m);
  } else conn.reply(m.chat, `معكش اكسبي يكفي يا حب🙂 *${count}* عناصر`, m);
};
handler.help = ['شراء', 'شراء_الكل'];
handler.tags = ['rp'];
handler.command = ['شراء', 'شراء_الكل'];

handler.disabled = false;

export default handler;