import express from 'express';
import cookieParser from 'cookie-parser';
import gptRouter from './src/routes/gptRouter.js';
import leadRouter from './src/routes/leadRouter.js';
import mpRouter from './src/routes/mpRouter.js';
import config from './src/config/config.js';
import { initBot } from './src/bot/telegram-bot.js';
import { startPaymentsCron } from './src/config/cron/payment-cron.js';

const app = express();
const PORT = config.PORT || 8080;

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

initBot();
startPaymentsCron();

app.use('/gpt', gptRouter);
app.use('/lead', leadRouter);
app.use('/mp', mpRouter);

const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`))