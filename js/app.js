import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm'


const form = document.getElementById('contactForm');

const CHAT_ID = "-1001826284527";
const URI_API = 'https://api.telegram.org/bot799604842:AAHnQSUGIui4pUP-PO4wBtSkYNCdxmWYc4E/sendMessage';

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let name = document.querySelector('input[name="name"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let message = document.querySelector('textarea[name="message"]').value;

  const surveyResults = {
    'Name': name,
    'Email': email,
    'Message': message
  };

  sendResultsToTelegram(surveyResults)
  form.reset();
});

 function sendResultsToTelegram(results) {
  try {

    let message = 'New message:\n';
    for (let [question, answer] of Object.entries(results)) {
      message += `${question}: ${answer}\n`;
    }

    axios.post(URI_API, {
      chat_id: CHAT_ID,
      text: message
    })


    console.log('Результаты опроса успешно отправлены в Телеграм.');
    alert("Сообщение отправлено");
  } catch (error) {
    console.error('Ошибка при отправке результатов опроса в Телеграм:', error);
  }
}
