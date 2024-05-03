require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
/*const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));*/
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(botToken, {polling: false});

app.use(bodyParser.json());
const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static('public'));

app.post('/contact', urlencodedParser, function (req, res) {
  const {Name, Email, Message} = req.body;

  if (Name === undefined || Email === undefined || Message === undefined) {
    return res.status(400).send('Not all data was provided');
  }

  const text = `Новое сообщение от ${Name} (${Email}):\n${Message}`;
  bot.sendMessage(chatId, text)
    .then(() => {
      res.status(200).send('Message sent successfully!');
    })
    .catch((error) => {
      console.error('Ошибка при отправке сообщения:', error);
      res.status(500).send('Произошла ошибка при отправке сообщения.');
    });
});


const fs = require('fs');
const csvParser = require('csv-parser');

app.get('/data', (req, res) => {
  let data = [];

  fs.createReadStream('server/equipment.csv')
    .pipe(csvParser({ separator: ';' }))
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      // Once all data is read from the CSV file
      // render it in a simple HTML table
      let tableHtml = '<table>';
      tableHtml += '<tr><th>Name</th><th>Price</th></tr>';
      data.forEach((row) => {
        if(row.name === ""){
          /*tableHtml += '</table>';*/
          tableHtml += `<td class="table_title" colspan="2">${row.description}</td>`;
          /*tableHtml += '<table border="1">';*/
        }
        else {
          tableHtml += `<tr><td>${row.name}</td><td>${row.description}</td></tr>`;
        }
      });
      tableHtml += '</table>';

      const html = `
            <div class="csv_data">
              ${tableHtml}
            </div>
      `;
      res.send(html);
    });
});


const hostname = '0.0.0.0';
app.listen(port, hostname, () => {
  console.log(`Сервер запущен: Port: ${port}`);
});
