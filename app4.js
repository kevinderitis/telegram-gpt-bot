import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'whatsapp-web.js';
import { botMsg } from './src/services/gptService.js';
import ejs from 'ejs';
import fs from 'fs';

const { Client, LocalAuth } = pkg;

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

let clients = [];
let qrData = {};

const sessionsDir = path.join(__dirname, 'whatsapp-sessions');
if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true });
}

function createClient(instanceId) {
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: `client-${instanceId}`, dataPath: sessionsDir }),
        webVersionCache: {
            type: "remote",
            remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
        },
    });

    client.on('qr', (qr) => {
        qrData[instanceId] = qr;
        console.log(`QR data for instance ${instanceId}: ${qr}`);
    });

    client.on('ready', () => {
        console.log(`Client ${instanceId} is ready!`);
    });

    client.on('message', async msg => {
        let chatId = msg.from;
        let response = await botMsg(instanceId, msg.body, chatId);
        client.sendMessage(chatId, response);
    });

    client.initialize();
    return client;
}

for (let i = 0; i < 3; i++) { 
    clients.push(createClient(i));
}

app.get('/qr', async (req, res) => {
    const instanceId = req.query.instanceId;
    const data = qrData[instanceId];

    try {
        const qrText = data;
        res.render('qr-code', { qrText });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating QR code');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
