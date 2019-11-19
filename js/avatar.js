'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooserAvatar = document.querySelector('#avatar');
  var chooserImages = document.querySelector('#images');
  var preview = document.querySelector('.ad-form-header__preview img');
  var newImage = document.querySelector('.ad-form__photo');
  chooserAvatar.addEventListener('change', function () {
    var file = chooserAvatar.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  });
  chooserImages.addEventListener('change', function () {
    var file = chooserImages.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var img = document.createElement('img');
          img.setAttribute('style', 'width:70px; height:70px');
          img.src = reader.result;
          newImage.appendChild(img);
        });
        reader.readAsDataURL(file);
      }
    }
  });
})();
