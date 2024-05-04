

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

/*document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
    const cameraImg = document.querySelector('.camera-img');
    const scrollPosition = window.scrollY;

    // Задаем угол поворота картинки кинокамеры в зависимости от скролла страницы
    cameraImg.style.transform = `rotate(${scrollPosition / 20 - 50}deg)`;
  });
});*/


document.addEventListener('DOMContentLoaded', function() {
  const link1 = document.querySelector('#rent')
  const link2 = document.querySelector('#portf')
  const link3 = document.querySelector('#cont')
  const menu = document.querySelector('.menu-items');
  link1.addEventListener('click', function() {
    document.getElementById("check").checked = false;
    menu.style.transform = `transform: translateX(-150%);`;
  });
  link2.addEventListener('click', function() {
    document.getElementById("check").checked = false;
    menu.style.transform = `translateX(-150%);`;

  });
  link3.addEventListener('click', function() {
    document.getElementById("check").checked = false;
    menu.style.transform = `translateX(-150%);`;

  });
});


const cards = [...document.querySelectorAll(".team-member-card")];

cards.forEach(el => {
  el.addEventListener("mousemove", fCardRotate);
  el.addEventListener("mouseout", fCardDefault);
});

function fCardRotate(ev) {
  this.style.transform = `perspective(2000px) rotatey(${(ev.offsetX - this.offsetWidth / 2) / 10}deg) rotatex(${((ev.offsetY - this.offsetHeight / 2) / 8) * -1}deg)`;
}
function fCardDefault() {
  this.style.transform = ``;
}

let minSize=150,
  el=document.querySelector('#video-back'),
  page=document.querySelector('html'),
  height={
    el:el.offsetHeight-minSize,
    page:500
  }
document.addEventListener('scroll',()=>{
  let top=page.scrollTop;
  el.style.opacity= 1- (top > 500 ? 1 : top * 2 / 1000);
})

const videos = document.querySelectorAll('.info_video');

videos.forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

