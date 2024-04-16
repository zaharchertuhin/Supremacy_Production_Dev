
require('dotenv').config(); // Подключаем dotenv

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;


const bot = new TelegramBot(botToken, { polling: false });

app.use(bodyParser.json());
const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static('public'));

app.post('/contact', urlencodedParser, function (req, res) {
  const { Name, Email, Message } = req.body;


  if (Name === undefined || Email === undefined || Message === undefined) {
    return res.status(400).send('Не все данные были предоставлены.');
  }

  const text = `Новое сообщение от ${Name} (${Email}):\n${Message}`;


  bot.sendMessage(chatId, text)
    .then(() => {
      res.status(200).send('Сообщение успешно отправлено!');
    })
    .catch((error) => {
      console.error('Ошибка при отправке сообщения:', error);
      res.status(500).send('Произошла ошибка при отправке сообщения.');
    });
});

app.listen(port, '0.0.0.0',() => {
  console.log(`Сервер запущен на порту ${port}`);
});
