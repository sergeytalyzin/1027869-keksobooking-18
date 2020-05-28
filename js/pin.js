'use strict';
(function () {
  var addPin = function (array) {
    var fragmentPin = document.createDocumentFragment();
    array.forEach(function (it) {
      var newPin = teamplatePin.cloneNode(true);
      newPin.setAttribute('style', 'left: ' + it.location.x + 'px; ' + 'top:' + it.location.y + 'px;');
      newPin.src = it.author.avatar;
      var imagePin = newPin.querySelector('img');
      imagePin.setAttribute('src', it.author.avatar);
      imagePin.setAttribute('alt', it.offer.title);

      fragmentPin.appendChild(newPin);
    });
    return fragmentPin;
  };
  var teamplatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.pin = {
    addPin: addPin
  };

})();
