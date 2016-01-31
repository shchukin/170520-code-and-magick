'use strict';

(function() {

  var formElement = document.querySelector('.review-form');

  formElement.onsubmit = function() {
    event.preventDefault();

    var BIRTH_MONTH = 10;
    var BIRTH_DAY = 27;

    var currentYear = new Date().getFullYear();
    var birthdayThisYear = new Date(currentYear,  BIRTH_MONTH - 1, BIRTH_DAY).getTime();
    var currentDate = Date.now();

    var cookiesExpire = currentDate > birthdayThisYear ? currentDate - birthdayThisYear : currentDate - birthdayThisYear + (1000 * 60 * 60 * 24 * 365);
    var cookiesExpireFormatted = new Date(cookiesExpire).toUTCString();

    var markCookie = formElement.querySelector('[name="review-mark"]:checked').value;
    var nameCookie = formElement.querySelector('#review-name').value;

    document.cookie = 'mark=' + markCookie + ';'// + ' expires=' + cookiesExpireFormatted + ';';
    document.cookie = 'name=' + nameCookie + ';'// + ' expires=' + cookiesExpireFormatted + ';';

    formElement.submit();
  }
  
})();
