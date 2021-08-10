const TelegramBot = require('node-telegram-bot-api');
const token = 'token';
const bot = new TelegramBot(token, { polling: true });
export function Send(full_name:string, phone:string, content:string){
    bot.sendMessage('groupid', `Фио: ${full_name}, Телефон: ${phone}, Заказ: ${content}`);
}
