import { performance } from 'perf_hooks';

const handler = async (m, { conn, text }) => {
    await conn.sendMessage(m.chat, { react: { text: "☠️",key: m.key,}
  })
    const start = performance.now();
    const end = performance.now();
    const executionTime = (end - start);

    const ipParts = [];
    for (let i = 0; i < 4; i++) {
        ipParts.push(Math.floor(Math.random() * 256));
    }
    const ipAddress = ipParts.join('.');
    const fakeData = {
        name_tag: '',
        ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        fakeCameraLink: `http://${ipAddress}.com/camera-feed`,
        n: Math.floor(Math.random() * 100000),
        w: (Math.random() * (20 - 10) + 10).toFixed(4),
        ssNumber: Math.floor(Math.random() * 10000000000000000),
        ipv6: `fe80:${(Math.random() * 65535).toString(16)}:${(Math.random() * 65535).toString(16)}:${(Math.random() * 65535).toString(16)}:${(Math.random() * 65535).toString(16)}%${Math.floor(Math.random() * 100)}`,
        upnp: getRandomValue(['مفعل', 'معطل']),
        dmz: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        mac: `${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}`,
        isp: getRandomValue(['Ucom universal', 'ISP Co', 'Internet Solutions Inc']),
        dns: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        altDns: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        dnsSuffix: getRandomValue(['Dlink', 'DNS', 'ISPsuffix']),
        wan: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        wanType: getRandomValue(['شبكة خاصة', 'شبكة عامة', 'Dynamic IP']),
        gateway: `192.${Math.floor(Math.random() * 256)}.0.1`,
        subnetMask: `255.255.${Math.floor(Math.random() * 256)}.0`,
        udpOpenPorts: `${Math.floor(Math.random() * 10000)}.${Math.floor(Math.random() * 10000)}`,
        tcpOpenPorts: `${Math.floor(Math.random() * 10000)}`,
        routerVendor: getRandomValue(['ERICCSON', 'TPLINK', 'Cisco']),
        deviceVendor: getRandomValue(['WIN32-X', 'Device Co', 'SecureTech']),
        connectionType: getRandomValue(['TPLINK COMPANY', 'ISP Connect', 'Home Network']),
        icmphops: `192.${Math.floor(Math.random() * 256)}.0.1 192.${Math.floor(Math.random() * 256)}.1.1 100.${Math.floor(Math.random() * 256)}.43.4`,
        http: `192.168.${Math.floor(Math.random() * 256)}.1:433-->92.28.211.234:80`,
        http2: `192.168.${Math.floor(Math.random() * 256)}.625-->92.28.211.455:80`,
        http3: `192.168.${Math.floor(Math.random() * 256)}.817-->92.28.211.8:971`,
        udp: `192.168.${Math.floor(Math.random() * 256)}.452-->92.28.211.7265288`,
        tcp1: `192.168.${Math.floor(Math.random() * 256)}.682-->92.28.211.62227.7`,
        tcp2: `192.168.${Math.floor(Math.random() * 256)}.725-->92.28.211.67wu2`,
        tcp3: `192.168.${Math.floor(Math.random() * 256)}.629-->92.28.211.167:8615`,
        externalMac: `${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}:${Math.floor(Math.random() * 256).toString(16).toUpperCase()}`,
        modemJumps: Math.floor(Math.random() * 100)
    };
    if (m.mentionedJid[0]) {
        fakeData.name_tag = text;
    } else {
        fakeData.name_tag = text;
    }

    const doxeo = `- *🔱 ابـــــلـــــع*`;
    

    async function loading() {
        const hawemod = [
            "*تحميل البيانات*\n_《 █▒▒▒▒▒▒▒▒▒▒▒》10%_",
            "*محاولة الدخول للجهاز*\n_《 ████▒▒▒▒▒▒▒▒》30%_",
            "*نجح الوصول*\n_《 ███████▒▒▒▒▒》50%_",
            "*يتم سحب بيانات المستخدم*\n_《 ██████████▒▒》80%_",
            "*تم سحب معلومات المستخدم بنجاح*\n_《 ████████████》100%_"
        ];
        let { key } = await conn.sendMessage(m.chat, { text: `*جــاري الــتــهـكـيـر...*` }, { quoted: m });
        for (let i = 0; i < hawemod.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await conn.sendMessage(m.chat, { text: hawemod[i], edit: key }, { quoted: m });
        }
        await conn.sendMessage(m.chat, { text: "- *🔱 تــم ارســال الــبــيــانــات لـلـمـطـور*" }, { quoted: m });
        await conn.sendMessage(conn.user.jid, { text: doxeo }, {});
    }
    loading();
};

handler.help = ['تهكير'];
handler.tags = ['fu'];
handler.command = /^تهكير/i;
export default handler;

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}