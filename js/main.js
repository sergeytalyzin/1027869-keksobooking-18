'use strict';
var advertPin = document.querySelector('.map__pins');

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var titles = ['Лучший вид', 'Ретро квартира', 'Лучше не селиться', 'С запахом рыбы', 'Новый евроремонт', 'Отель с видом на Башню', 'Комната у парка', 'Эксклюзивный Пент-Хаус'];
var cardDiscription = [
  'Прекрасное жильё , хозяин достаточно отзывчивый человек! Рекомендую данное жильё!',
  'Шикарная 5комнатная квартира в центре Москвы: изолированные комнаты и большая лаундж зона. Отличное расположение позволяет быстро дойти до метро Маяковская, Белорусская и Краснопресненская.',
  'Уютная, современная, двухэтажная студия, расположена в историческом центре Москвы, в 10 мин. ходьбы от Площади Трёх Вокзалов (Казанский, Ярославский, Ленинградский) и в 5 минутах от станции метро Бауманская',
  'Потрясающая 4х комнатная квартира в центре Москвы. Отличное расположение позволяет быстро дойти до метро Баррикадная, Краснопресненская, Арбат.',
  'Прекрасная светлая Квартира на Красной Пресне с шикарным видом на Краснопресненскую набережную. Хорошая инфраструктура со всеми удобствами для гостей столицы.',
  'Квартира расположена в историческом районе Москвы. Лавочки, фонтаны, прокат велосипедов и лодок, большое количество всевозможных кафе неподалеку, курсирующий трамвай, красивая архитектура старой.',
  'Уютная, современная, двухэтажная студия, расположена в историческом центре Москвы.',
  'Апартамент расположен недалеко от центра Москвы. До м. Автозаводская 300 метров. Бесплатная свободная парковка во дворе.Вокруг множество мест отдыха - десятки ресторанов, кафе, деловых и торговых центров и парков.'
];

var generateFlat = function () {
  var flatType = ['palace', 'flat', 'house', 'bungalo'];
  return flatType[Math.round((Math.random() * 4))];
};

var generateCordinate = function () {
  var cloudx = Math.round(Math.random() * 1000);
  var cloudy = Math.round(Math.random() * 1000);

  return cloudx + ',' + cloudy;
};
var generatePrice = function () {
  return Math.round(Math.random() * 10000);
};

var generateRooms = function () {
  return Math.round(Math.random() * 4 + 1);
};

var generateGuest = function () {
  return Math.round(Math.random() * 7);
};

var generateCheckinOutTime = function () {
  var checkintimes = ['12:00', '13:00', '14:00'];
  return checkintimes[Math.round(Math.random() * 2)];
};

var generateFeatures = function () {
  var feautersTemplate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var length = Math.round(Math.random() * 5);
  var generatedFeatures = [];

  for (var i = 0; i < length; i++) {
    var number = Math.round(Math.random() * 5);
    generatedFeatures[i] = feautersTemplate[number];
  }
  return generatedFeatures;
};

var generatePhotos = function () {
  var arrayLength = Math.round(Math.random() * 20);
  var generatedPhotos = [];
  for (var i = 0; i < arrayLength; i++) {
    generatedPhotos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg';
  }
  return generatedPhotos;
};

var generateMapCordinateY = function () {
  return Math.round(Math.random() * 500 + 130);
};

var generateMapCordinateX = function () {
  return Math.round(Math.random() * 99 + 1);
};

var generateArray = function () {
  var array = [];
  for (var i = 0; i < 8; i++) {
    var cardTempleate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': titles[i],
        'address': generateCordinate(),
        'price': generatePrice(),
        'type': generateFlat(),
        'rooms': generateRooms(),
        'guests': generateGuest(),
        'checkin': generateCheckinOutTime(),
        'checkout': generateCheckinOutTime(),
        'features': generateFeatures(),
        'description': cardDiscription[i],
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

var appartments = generateArray();
var teamplatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  var newPin = teamplatePin.cloneNode(true);
  newPin.setAttribute('style', 'left: ' + appartments[i].location.x + '%; ' + 'top:' + appartments[i].location.y + 'px;');
  newPin.src = appartments[i].author.avatar;
  var imagePin = newPin.querySelector('img');
  imagePin.setAttribute('src', appartments[i].author.avatar);
  imagePin.setAttribute('alt', appartments[i].offer.title);

  fragmentPin.appendChild(newPin);
}
advertPin.appendChild(fragmentPin);
