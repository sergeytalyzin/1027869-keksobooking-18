'use strict';
(function () {
  var appartments = window.appartments;

  var getContent = function (array) {
    var fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var newPin = teamplatePin.cloneNode(true);
      newPin.setAttribute('style', 'left: ' + array[i].location.x + '%; ' + 'top:' + array[i].location.y + 'px;');
      newPin.src = array[i].author.avatar;
      var imagePin = newPin.querySelector('img');
      imagePin.setAttribute('src', array[i].author.avatar);
      imagePin.setAttribute('alt', array[i].offer.title);

      fragmentPin.appendChild(newPin);
    }
    return fragmentPin;
  };

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('get', url);
    xhr.send();

  };

  var onError = function (message) {
    console.error(message);
  };
  var teamplatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var url = 'https://js.dump.academy/keksobooking/data';
  //window.content = getContent(appartments, teamplatePin);
  console.log(window.load);
  window.content = window.load(url, getContent, onError);

})();
