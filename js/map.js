'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var X_PIN = 32;
  var Y_PIN = 75;
  var createCard = window.generateCard.createCard;
  var addPin = window.pin.addPin;

  var deactivationPin = function () {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
    mapFiltres.setAttribute('disabled', 'disabled');
    adFormHeader.setAttribute('disabled', 'disabled');
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPin.length; j++) {
      mapPin[j].remove();
    }
  };

  var activationPin = function (obj) {
    var pins = addPin(obj);
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
    mapFiltres.removeAttribute('disabled');
    adFormHeader.removeAttribute('disabled');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    advertPin.appendChild(pins);
    findCoordination(window.address);

    var buttonCards = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var j = 0; j < window.appartments.length; j++) {
      getButtonPin(obj[j], buttonCards[j]);
    }
  };

  var findCoordination = function (elem) {
    var coordX = buttonPin.getBoundingClientRect().x + X_PIN;
    var coordY = buttonPin.getBoundingClientRect().y + Y_PIN + pageYOffset;
    return elem.setAttribute('value', coordX + ', ' + coordY);
  };
  var getButtonPin = function (pin, buttoncard) {
    buttoncard.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
      var card = createCard(pin, templateCard);
      map.insertBefore(card, mapFiltersContainer);
      closeCard();
    });
  };
  var closeCard = function () {
    var closeCards = document.querySelector('.popup__close');
    var mapCards = document.querySelector('.map__card');
    closeCards.addEventListener('click', function () {
      mapCards.remove();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    var mapCards = document.querySelector('.map__card');
    if (evt.keyCode === ESC_KEYCODE) {
      mapCards.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var escPress = function (evt, func) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };

  var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var buttonPin = document.querySelector('.map__pin--main');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var mapFiltres = document.querySelector('.map__filters');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var advertPin = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  window.address = document.querySelector('#address');

  window.map = {
    activationPin: activationPin,
    deactivationPin: deactivationPin,
    findCoordination: findCoordination,
    escPress: escPress
  };
})();
