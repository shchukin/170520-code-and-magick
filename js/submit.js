'use strict';

(function() {

  var BIRTH_MONTH = 10;
  var BIRTH_DAY = 27;

  var formElement = document.querySelector('.review-form');
  var nameElement = formElement.querySelector('#review-name');
  var markElements = formElement.querySelectorAll('[name="review-mark"]');

  var markCookie = docCookies.getItem('mark');
  var nameCookie = docCookies.getItem('name');


  /* Get cookies */

  if ( markCookie ) {
    for ( var i = 0; i < markElements.length; i++ ) {
      markElements[i].checked = false;
    }
    formElement.querySelector('#review-mark-' + markCookie ).checked = true;
  }

  if ( nameCookie ) {
    nameElement.value = nameCookie;
  }


  /* Set cookies */

  formElement.onsubmit = function() {
    event.preventDefault();

    var currentYear = new Date().getFullYear();
    var birthdayThisYear = new Date(currentYear,  BIRTH_MONTH - 1, BIRTH_DAY).getTime();
    var currentDate = Date.now();

    var cookiesExpire = currentDate > birthdayThisYear ? currentDate - birthdayThisYear : currentDate - birthdayThisYear + (1000 * 60 * 60 * 24 * 365);

    markCookie = formElement.querySelector('[name="review-mark"]:checked').value;
    nameCookie = formElement.querySelector('#review-name').value;

    docCookies.setItem('mark', markCookie, cookiesExpire);
    docCookies.setItem('name', nameCookie, cookiesExpire);

    formElement.submit();
  }

})();
