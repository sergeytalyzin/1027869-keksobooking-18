'use strict';
(function () {
  var ENTER_KEYCODE = 13;


  var buttonPin = document.querySelector('.map__pin--main');
  var numberGuests = document.querySelector('#capacity');
  var numberRooms = document.querySelector('#room_number');
  var buttonSubmit = document.querySelector('.ad-form__submit');
  var titleInput = document.querySelector('#title');
  var form = document.querySelector('.ad-form');
  var price = document.querySelector('#price');
  var typeHousing = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var activateMap = window.map.activationPin;


  var onErrorRoomGuest = function () {
    numberRooms.setCustomValidity('');
    numberGuests.setCustomValidity('');

    if ((+numberRooms.value === 100 && +numberGuests.value !== 0) || (+numberRooms.value !== 100 && +numberGuests.value === 0)) {
      numberGuests.setCustomValidity('Количество не совпадает');
      numberRooms.setCustomValidity('Количество не совпадает');
    } else if (+numberRooms.value < +numberGuests.value) {
      numberGuests.setCustomValidity('Количество не совпадает');
      numberRooms.setCustomValidity('Количество не совпадает');
    }
  };

  var chackingNumberOfDigits = function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Имя должно состоять минимум из 30-и символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Имя должно состоять не более 100-а символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var chackingTypeOfPrice = function () {
    switch (typeHousing.value) {
      case 'flat':
        return price.setAttribute('placeholder', '1000');
      case 'house':
        return price.setAttribute('placeholder', '5000');
      case 'palace' :
        return price.setAttribute('placeholder', '10000');
      default :
        return price.setAttribute('placeholder', '0');
    }
  };

  var onErrorPriceNumber = function () {
    if (price.value > 1000000) {
      price.setCustomValidity('очень Дорого');
    } else {
      price.setCustomValidity('');
    }
  };

  var onChackingTypeOfPrice = function () {
    price.setCustomValidity('');
    if (typeHousing.value === 'flat') {
      if (price.value < 1000) {
        price.setCustomValidity('От 1000');
      }
    } else if (typeHousing.value === 'house') {
      if (price.value < 5000) {
        price.setCustomValidity('От 5000');
      }
    } else if (typeHousing.value === 'palace') {
      if (price.value < 10000) {
        price.setCustomValidity('От 10000');
      }
    }
  };


  buttonPin.addEventListener('mousedown', function () {
    activateMap();
  });

  buttonPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateMap();
    }
  });

  numberGuests.addEventListener('change', onErrorRoomGuest);

  numberRooms.addEventListener('change', onErrorRoomGuest);

  buttonSubmit.addEventListener('click', onErrorRoomGuest);


  titleInput.addEventListener('invalid', function () {
    chackingNumberOfDigits();
  });

  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Текст должен  состоять минимум из 30-и символов');
    } else {
      target.setCustomValidity('');
    }
  });

  price.addEventListener('change', function () {
    onErrorPriceNumber();
  });


  document.addEventListener('DOMContentLoaded', function () {
    price.setAttribute('placeholder', '1000');
  });

  typeHousing.addEventListener('change', function () {
    chackingTypeOfPrice();
  });


  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  price.addEventListener('change', onChackingTypeOfPrice);
  typeHousing.addEventListener('change', onChackingTypeOfPrice);

  form.addEventListener('submit', function (evt) {
    if (!titleInput.value) {
      evt.preventDefault();
    }
    if (!price.value) {
      evt.preventDefault();
    }
    if (onErrorRoomGuest()) {
      evt.preventDefault();
    }
    if (timeIn.value !== timeOut.value) {
      evt.preventDefault();
    }
  });

})();
