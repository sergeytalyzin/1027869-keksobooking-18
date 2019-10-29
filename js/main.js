'use strict';
var TITLES = ['Лучший вид', 'Ретро квартира', 'Лучше не селиться', 'С запахом рыбы', 'Новый евроремонт', 'Отель с видом на Башню', 'Комната у парка', 'Эксклюзивный Пент-Хаус'];
var CARD_DISCRIPTION = [
  'Прекрасное жильё , хозяин достаточно отзывчивый человек! Рекомендую данное жильё!',
  'Шикарная 5комнатная квартира в центре Москвы: изолированные комнаты и большая лаундж зона. Отличное расположение позволяет быстро дойти до метро Маяковская, Белорусская и Краснопресненская.',
  'Уютная, современная, двухэтажная студия, расположена в историческом центре Москвы, в 10 мин. ходьбы от Площади Трёх Вокзалов (Казанский, Ярославский, Ленинградский) и в 5 минутах от станции метро Бауманская',
  'Потрясающая 4х комнатная квартира в центре Москвы. Отличное расположение позволяет быстро дойти до метро Баррикадная, Краснопресненская, Арбат.',
  'Прекрасная светлая Квартира на Красной Пресне с шикарным видом на Краснопресненскую набережную. Хорошая инфраструктура со всеми удобствами для гостей столицы.',
  'Квартира расположена в историческом районе Москвы. Лавочки, фонтаны, прокат велосипедов и лодок, большое количество всевозможных кафе неподалеку, курсирующий трамвай, красивая архитектура старой.',
  'Уютная, современная, двухэтажная студия, расположена в историческом центре Москвы.',
  'Апартамент расположен недалеко от центра Москвы. До м. Автозаводская 300 метров. Бесплатная свободная парковка во дворе.Вокруг множество мест отдыха - десятки ресторанов, кафе, деловых и торговых центров и парков.'
];
var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CLOUD_X = 0;
var CLOUD_Y = 0;
var CHEKINOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEAUTERS_TEMPLATE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var X_PIN = 32;
var Y_PIN = 75;

var getRandom = function (number, add) {
  add = add || 0;
  return Math.round(Math.random() * number) + add;
};

var generateFlat = function () {
  return FLAT_TYPE[getRandom(FLAT_TYPE.length - 1)];
};

var generateCordinate = function (cloudx, cloudy) {
  cloudx = getRandom(1000);
  cloudy = getRandom(1000);

  return cloudx + ',' + cloudy;
};
var generatePrice = function () {
  return getRandom(10000);
};

var generateRooms = function () {
  return getRandom(4, 1);
};

var generateGuest = function () {
  return getRandom(7, 1);
};

var generateCheckinOutTime = function () {
  return CHEKINOUT_TIMES [getRandom(2)];
};

var generateFeatures = function (feautersTemplate) {
  var length = getRandom(feautersTemplate.length - 1);
  var generatedFeatures = [];

  for (var i = 0; i < length; i++) {
    generatedFeatures.push(feautersTemplate[i]);
  }
  return generatedFeatures;
};

var generatePhotos = function () {
  var arrayLength = getRandom(4);
  var generatedPhotos = [];
  for (var i = 0; i < arrayLength; i++) {
    generatedPhotos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return generatedPhotos;
};

var generateMapCordinateY = function () {
  return getRandom(500, 130);
};

var generateMapCordinateX = function () {
  return getRandom(99, 1);
};

var generateArray = function () {
  var array = [];
  for (var i = 0; i < 8; i++) {
    var cardTempleate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': TITLES[i],
        'address': generateCordinate(CLOUD_X, CLOUD_Y),
        'price': generatePrice(),
        'type': generateFlat(),
        'rooms': generateRooms(),
        'guests': generateGuest(),
        'checkin': generateCheckinOutTime(),
        'checkout': generateCheckinOutTime(),
        'features': generateFeatures(FEAUTERS_TEMPLATE),
        'description': CARD_DISCRIPTION[i],
        'photos': generatePhotos()
      },

      'location': {
        'x': generateMapCordinateX(),
        'y': generateMapCordinateY()
      }
    };
    array[i] = cardTempleate;
  }
  return array;
};

var getContent = function (array, teamplate) {
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var newPin = teamplate.cloneNode(true);
    newPin.setAttribute('style', 'left: ' + array[i].location.x + '%; ' + 'top:' + array[i].location.y + 'px;');
    newPin.src = array[i].author.avatar;
    var imagePin = newPin.querySelector('img');
    imagePin.setAttribute('src', array[i].author.avatar);
    imagePin.setAttribute('alt', array[i].offer.title);

    fragmentPin.appendChild(newPin);
  }
  return fragmentPin;
};

var getFlatCard = function (objectType) {
  switch (objectType.offer.type) {
    case 'palace':
      return 'Дворец';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return 'Квартира';
  }
};

var getFeaturesCard = function (data) {
  var fragmentFeatures = document.createDocumentFragment();
  for (var i = 0; i < data.offer.features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'popup__feature' + ' popup__feature--' + data.offer.features[i];
    fragmentFeatures.appendChild(newElement);
  }
  return fragmentFeatures;
};

var generateCard = function (object, template) {
  var newCard = template.cloneNode(true);
  var newTitle = newCard.querySelector('.popup__title');
  var newAddress = newCard.querySelector('.popup__text--address');
  var newPrice = newCard.querySelector('.popup__text--price');
  var newFlat = newCard.querySelector('.popup__type');
  var numberGuestRooms = newCard.querySelector('.popup__text--capacity');
  var chekinOut = newCard.querySelector('.popup__text--time');
  var newFeatures = newCard.querySelector('.popup__features ');
  var newDescription = newCard.querySelector('.popup__description');
  var popupPhotos = newCard.querySelector('.popup__photos');
  var newPhoto = newCard.querySelector('.popup__photo');
  var newAvatar = newCard.querySelector('.popup__avatar');
  newTitle.textContent = object.offer.title;
  newAddress.textContent = object.offer.address;
  newPrice.textContent = object.offer.price + ' ₽/ночь';
  newFlat.textContent = getFlatCard(object);
  numberGuestRooms.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  chekinOut.textContent = 'Заезд после ' + object.offer.checkin + ' , выезд до ' + object.offer.checkout;
  newFeatures.innerHTML = '';
  newFeatures.appendChild(getFeaturesCard(object));
  newDescription.textContent = object.offer.description;
  newAvatar.setAttribute('src', object.author.avatar);

  popupPhotos.innerHTML = '';

  for (var i = 0; i < object.offer.photos.length; i++) {
    var photo = newPhoto.cloneNode(true);
    photo.src = object.offer.photos[i];
    popupPhotos.appendChild(photo);
  }

  return newCard;

};


var activationPin = function () {
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
  mapFiltres.removeAttribute('disabled');
  adFormHeader.removeAttribute('disabled');
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  advertPin.appendChild(content);
  findCoordination(address);

  var buttonCards = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var j = 0; j < appartments.length; j++) {
    getButtonPin(appartments[j], buttonCards[j]);
  }


};

var deactivationPin = function () {
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].setAttribute('disabled', 'disabled');
  }
  mapFiltres.setAttribute('disabled', 'disabled');
  adFormHeader.setAttribute('disabled', 'disabled');
};

var findCoordination = function (elem) {
  var coordX = buttonPin.getBoundingClientRect().x + X_PIN;
  var coordY = buttonPin.getBoundingClientRect().y + Y_PIN + pageYOffset;
  return elem.setAttribute('value', coordX + ', ' + coordY);
};

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

var getButtonPin = function (pin, buttoncard) {
  buttoncard.addEventListener('click', function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    var card = generateCard(pin, templateCard);
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
  if (typeHousing.value === 'bungalo') {
    price.setAttribute('placeholder', '0');
  } else if (typeHousing.value === 'flat') {
    price.setAttribute('placeholder', '1000');
  } else if (typeHousing.value === 'house') {
    price.setAttribute('placeholder', '5000');
  } else if (typeHousing.value === 'palace') {
    price.setAttribute('placeholder', '10000');
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

var advertPin = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var teamplatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var appartments = generateArray();
var content = getContent(appartments, teamplatePin);


var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var mapFiltersContainer = map.querySelector('.map__filters-container');

// generateCard(appartments[2], templateCard);  было записанно в переменную card


var adFormHeader = document.querySelector('.ad-form-header');
var adFormElements = document.querySelectorAll('.ad-form__element');
var mapFiltres = document.querySelector('.map__filters');
var address = document.querySelector('#address');
var buttonPin = document.querySelector('.map__pin--main');
var numberGuests = document.querySelector('#capacity');
var numberRooms = document.querySelector('#room_number');
var adForm = document.querySelector('.ad-form');
var buttonSubmit = document.querySelector('.ad-form__submit');
var titleInput = document.querySelector('#title');
var form = document.querySelector('.ad-form');
var price = document.querySelector('#price');
var typeHousing = document.querySelector('#type');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

deactivationPin();

buttonPin.addEventListener('mousedown', function () {
  activationPin();
});

buttonPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activationPin();
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
