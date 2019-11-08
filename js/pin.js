'use strict';
(function () {
  var load = window.xhr.load;

  var getContent = function (array) {
    var fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var newPin = teamplatePin.cloneNode(true);
      newPin.setAttribute('style', 'left: ' + array[i].location.x + 'px; ' + 'top:' + array[i].location.y + 'px;');
      newPin.src = array[i].author.avatar;
      var imagePin = newPin.querySelector('img');
      imagePin.setAttribute('src', array[i].author.avatar);
      imagePin.setAttribute('alt', array[i].offer.title);

      fragmentPin.appendChild(newPin);
      window.content = fragmentPin;
    }
    return window.content;
  };


  var teamplatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var teamplateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var url = 'https://js.dump.academy/keksobooking/data';
  var onError = function () {
    var a = teamplateError.cloneNode(true);
    document.body.appendChild(a);
  };
  load(url, getContent, onError);
})();
