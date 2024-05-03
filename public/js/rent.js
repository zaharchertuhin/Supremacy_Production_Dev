window.onload = function () {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "data", true);
  xhttp.onload = function () {
    if (xhttp.status >= 200 && xhttp.status < 300) {
      document.getElementById("container").innerHTML = xhttp.responseText;
    } else {
      document.getElementById("container").innerHTML = "Ошибка загрузки файла";
    }
  };
  xhttp.onerror = function () {
    document.getElementById("container").innerHTML = "Ошибка загрузки файла";
  };
  xhttp.send();
}
