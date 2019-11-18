'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var isEscEvent = function (evt, func) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
  window.util = {
    isEscEvent: isEscEvent,
    debounce: debounce
  };
})();
