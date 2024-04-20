

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let name = document.querySelector('input[name="name"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let message = document.querySelector('textarea[name="message"]').value;

  const formData = {
    'Name': name,
    'Email': email,
    'Message': message
  };
  console.log(JSON.stringify(formData))



  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

    .catch(error => {
      console.error('Ошибка при отправке данных:', error);
      alert('Произошла ошибка при отправке данных.');
    });
});



let lastScroll = 0;
const defaultOffset = 0;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
  if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
    //scroll down
    header.classList.add('hide');
  }
  else if(scrollPosition() < lastScroll && containHide()){
    //scroll up
    header.classList.remove('hide');
  }

  lastScroll = scrollPosition();
})


const marqueeContainer = document.querySelector('.marquee-container');
const marqueeText = document.querySelector('.marquee-text');
const marqueeText2 = document.querySelector('.marquee-text2');

// Получаем ширину текста бегущей строки
const textWidth = marqueeText.offsetWidth;

// Создаем разделительный знак (можно использовать символ, например, '-')
const separator = ' | ';

// Рассчитываем количество повторений текста, необходимых для заполнения экрана
const screenWidth = marqueeContainer.offsetWidth;
const repeatCount = Math.ceil(screenWidth / textWidth) + 1;

// Создаем строку с повторениями текста и разделителем
const repeatedText = (new Array(repeatCount)).fill(marqueeText.textContent).join(separator);

// Устанавливаем повторенный текст как содержимое бегущей строки
marqueeText.textContent = repeatedText + ' | ';
marqueeText2.textContent = repeatedText;


let minSize=150,
  el=document.querySelector('#info'),
  page=document.querySelector('html'),
  height={
    el:el.offsetHeight-minSize,
    page:500
  }
document.addEventListener('scroll',()=>{
  let st=page.scrollTop
  if(st>=height.page) return
  let percent=height.page/st,
    value=height.el/percent
  el.style.height=height.el-value+minSize+'px'
})

