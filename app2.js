import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'whatsapp-web.js';
import { botMsg } from './src/services/gptService.js';
import ejs from 'ejs';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

let qrData;

app.get('/qr', async (req, res) => {
    const data = qrData;

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

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath:
            "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
});

client.on('qr', (qr) => {
    qrData = qr;
    console.log(`Este es la data de qr: ${qrData}`);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    let chatId = msg.from;
    let response = await botMsg(chatId, msg.body, chatId);
    client.sendMessage(chatId, response);
});

client.initialize();
