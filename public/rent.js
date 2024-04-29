window.onload = function() {
  // Создаем объект XMLHttpRequest
  const xhttp = new XMLHttpRequest();

  // Открываем запрос на получение данных из файла
  xhttp.open("GET", "data", true);

  // Устанавливаем обработчик события загрузки
  xhttp.onload = function() {
// Проверим статус ответа
 if (xhttp.status >= 200 && xhttp.status < 300) {
 // Если статус успешный, выводим содержимое файла в элемент <div id="container">
 document.getElementById("container").innerHTML = xhttp.responseText;
 } else {
 // Если статус неуспешный, выводим сообщение об ошибке
 document.getElementById("container").innerHTML = "Ошибка загрузки файла";
 }
 };

    xhttp.onerror = function() {
      // В случае ошибки выводим сообщение об ошибке
      document.getElementById("container").innerHTML = "Ошибка загрузки файла";
    };

// Отправляем запрос
    xhttp.send();
}
