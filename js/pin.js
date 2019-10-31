'use strict';
(function () {
  var appartments = window.appartments;

  var getContent = function (array, elem) {
    var fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var newPin = elem.cloneNode(true);
      newPin.setAttribute('style', 'left: ' + array[i].location.x + '%; ' + 'top:' + array[i].location.y + 'px;');
      newPin.src = array[i].author.avatar;
      var imagePin = newPin.querySelector('img');
      imagePin.setAttribute('src', array[i].author.avatar);
      imagePin.setAttribute('alt', array[i].offer.title);

      fragmentPin.appendChild(newPin);
    }
    return fragmentPin;
  };


  var teamplatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.content = getContent(appartments, teamplatePin);
})();
