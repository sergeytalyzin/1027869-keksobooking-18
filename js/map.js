'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var CORDY_X = 603;
  var CORDY_Y = 440;
  var form = document.querySelector('.ad-form');
  var mapCords = document.querySelector('.map').getBoundingClientRect();
  var buttonPin = document.querySelector('.map__pin--main');
  var pinCords = buttonPin.getBoundingClientRect();
  var pinWidth = pinCords.width;
  var pinHeight = pinCords.height;
  var load = window.backend.load;
  var createCard = window.generateCard.createCard;
  var addPin = window.pin.addPin;
  var isEscEvent = window.util.isEscEvent;
  var close;

  var deletePins = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPin) {
      for (var i = 0; i < mapPin.length; i++) {
        mapPin[i].remove();
      }
    }
  };
  var deactivationPin = function () {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
    mapFiltres.setAttribute('disabled', 'disabled');
    adFormHeader.setAttribute('disabled', 'disabled');
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    resetMapPinMain();
    deletePins();
  };

  var activationPin = function (obj) {
    deletePins();
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

    for (var j = 0; j < obj.length; j++) {
      getButtonPin(obj[j], buttonCards[j]);
    }
  };

  var resetMapPinMain = function () {
    buttonPin.style.left = CORDY_X - pinWidth / 2 + 'px';
    buttonPin.style.top = CORDY_Y - pinHeight + 'px';
    findCoordination(window.address);
  };

  var pins = [];
  var succsessHandler = function (data) {
    pins = data;
    updatePin();
  };

  var filterByType = function (item) {
    return selectType.value === item.offer.type || selectType.value === 'any';
  };

  var updatePin = function () {
    var data = pins.filter(function (it) {
      return filterByType(it);
    }).slice(0, 5);
    activationPin(data);
  };
  var selectType = document.querySelector('#housing-type');
  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', updatePin);

  var onActivateMap = function () {
    load(succsessHandler, onError);
    buttonPin.removeEventListener('mousedown', onActivateMap);
  };
  var findCoordination = function (elem) {
    var coordX = Math.round(buttonPin.getBoundingClientRect().x - mapCords.left + pinWidth / 2);
    var coordY = Math.round(buttonPin.getBoundingClientRect().y + pinHeight + pageYOffset);
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

  var onEscErrorSuccess = function (evt) {
    isEscEvent(evt, close);
    document.removeEventListener('keydown', onEscErrorSuccess);
  };

  var onClick = function () {
    close();
    document.removeEventListener('click', onClick);
  };

  var resetFieldset = function () {
    form.reset();
  };

  var teamplateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var onError = function () {
    var error = teamplateError.cloneNode(true);
    close = function () {
      error.remove();
    };
    document.body.appendChild(error);
    document.addEventListener('keydown', onEscErrorSuccess);
    document.addEventListener('click', onClick);
    document.body.appendChild(error);

  };

  var teamplateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');

  var onSuccess = function () {
    resetFieldset();
    deactivationPin();
    buttonPin.addEventListener('mousedown', onActivateMap);
    var successfully = teamplateSuccess.cloneNode(true);
    close = function () {
      successfully.remove();
    };
    document.body.appendChild(successfully);
    document.addEventListener('keydown', onEscErrorSuccess);
    document.addEventListener('click', onClick);
  };

  var onPopupEscPress = function (evt) {
    var mapCards = document.querySelector('.map__card');
    var removeCards = function () {
      mapCards.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    };
    isEscEvent(evt, removeCards);

  };

  buttonPin.addEventListener('mousedown', onActivateMap);
  buttonPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activationPin();
    }
  });

  buttonPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var left = moveEvt.pageX - mapCords.left - pinWidth / 2;
      var top = moveEvt.pageY - pinHeight / 2;
      var limitedX = Math.min(1200 - pinWidth / 2, Math.max(0 - pinWidth / 2, left));
      var limitedY = Math.min(630 - pinHeight, Math.max(130 - pinHeight, top));
      buttonPin.style.left = limitedX + 'px';
      buttonPin.style.top = limitedY + 'px';
      findCoordination(window.address);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      findCoordination(window.address);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');
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
    onActivateMap: onActivateMap,
    onError: onError,
    onSuccess: onSuccess,
  };
})();
