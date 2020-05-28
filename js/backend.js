'use strict';
(function () {
  var STATUSCODE_OK = 200;

  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };


  var startXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUSCODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = 10000;
    return xhr;
  };
  var load = function (onSuccess, onError) {
    var xhr = startXhr(onSuccess, onError);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = startXhr(onSuccess, onError);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();

