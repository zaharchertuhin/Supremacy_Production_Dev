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
