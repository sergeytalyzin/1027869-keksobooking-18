'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var isEscEvent = function (evt, func) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };
  window.util = {
    isEscEvent: isEscEvent
  };
})();
