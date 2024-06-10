import config from '../config/config.js';
import messages from '../config/messages.js';
import { botMsg, mainTelegramBotMsg } from '../services/gptService.js';
import TelegramBot from 'node-telegram-bot-api';
import { createPaymentPreference } from '../services/mpService.js';

const token = config.API_KEY_TELEGRAM;

const bot = new TelegramBot(token, { polling: true });

const welcomeMessage = messages.CHAT_WELCOME_MESSAGE;

export const initBot = () => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        if (!messageText.startsWith('/start')) {
            const name = `${msg.chat.first_name} ${msg.chat.last_name}`;
            let response;
            try {
                response = await botMsg(name, messageText, chatId)
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
            bot.sendMessage(chatId, messages.BOT_WELCOME_MESSAGE);
        }
    });
};

