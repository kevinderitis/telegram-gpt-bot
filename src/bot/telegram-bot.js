import config from '../config/config.js';
import messages from '../config/messages.js';
import { telegramBotMsg, mainTelegramBotMsg } from '../services/gptService.js';
import TelegramBot from 'node-telegram-bot-api';
import { createPaymentPreference } from '../services/mpService.js';

const token = config.API_KEY_TELEGRAM;
const mainToken = config.MAIN_API_KEY_TELEGRAM;

const bot = new TelegramBot(token, { polling: true });
const mainBot = new TelegramBot(mainToken, { polling: true });

const welcomeMessage = messages.CHAT_WELCOME_MESSAGE;

const verifyLink = async (text, chatId) => {
    const pattern = messages.LINK_PATTERN;

    if (text.match(pattern)) {
        let paymentPreference = await createPaymentPreference(chatId);
        return messages.PREFERENCE_MESSAGE(paymentPreference);
    } else {
        return text;
    }
}

export const notifyPayment = async chatId => {
    try {
        let msg = messages.PAYMENT_RECEIVED_MESSAGE;
        await mainBot.sendMessage(chatId, msg);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw error;
    }
};


export const initBot = () => {

    mainBot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;
        const name = `${msg.chat.first_name} ${msg.chat.last_name}`;
        let response;
        try {
            response = await mainTelegramBotMsg(name, messageText, chatId)
            let msgText = await verifyLink(response, chatId);
            mainBot.sendMessage(chatId, msgText);
        } catch (error) {
            console.log(error)
        }
    });

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        if (!messageText.startsWith('/start')) {
            const name = `${msg.chat.first_name} ${msg.chat.last_name}`;
            let response;
            try {
                response = await telegramBotMsg(name, messageText, chatId)
            } catch (error) {
                console.log(error)
            }

            bot.sendChatAction(chatId, 'typing');

            setTimeout(() => {
                bot.sendMessage(chatId, response);
            }, 8000);
            
        } else {
            bot.sendMessage(chatId, welcomeMessage, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Comenzar',
                                callback_data: 'aceptar'
                            }
                        ]
                    ],
                },
            });
        }

    });


    bot.on('callback_query', (callbackQuery) => {
        const chatId = callbackQuery.message.chat.id;
        const action = callbackQuery.data;

        if (action === 'aceptar') {
            setTimeout(() => {
                bot.sendMessage(chatId, messages.BOT_WELCOME_MESSAGE);
            }, 5000);

        }
    });
};

