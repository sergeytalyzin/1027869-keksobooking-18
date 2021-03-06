'use strict';
(function () {
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
    var arrayLength = getRandom(3);
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
  window.appartments = generateArray();

})();
