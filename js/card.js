'use strict';
(function () {
    var createCard = function (object, template) {
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

  window.generateCard = {
    createCard
  }
})();
