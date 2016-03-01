/**
 * @fileoverview Работа с отправкой отзывов
 * Главным образом идет работа с куками.
 * Сохраненяется имя и оценка.
 * Срок жизни - количество дней, прошедшее с ближайшего дня рождения.
 *
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var docCookies = require('doc-cookies');

var BIRTH_MONTH = 10;
var BIRTH_DAY = 27;

var formElement = document.querySelector('.review-form');
var nameElement = formElement.querySelector('#review-name');
var markElements = formElement.querySelectorAll('[name="review-mark"]');

var markCookie = docCookies.getItem('mark');
var nameCookie = docCookies.getItem('name');


// Извлечение куки и установка соответтсвующих значений
// Бежим по всем радиокнопка и проставляем false всем, кроме значения из кук
if ( markCookie ) {
  [].forEach.call(markElements, function(item, index) {
    item.checked = (index + 1 === +markCookie);
  });
}

if ( nameCookie ) {
  nameElement.value = nameCookie;
}


/* Сохранение куки */

/**
 * Возможны две ситуации: наступил или не наступил день рождения в текущем году
 * Проверяется сравнением текущей даты с датой дня рождения
 */
formElement.addEventListener('submit', function(event) {
  event.preventDefault();

  var currentYear = new Date().getFullYear();
  var birthdayThisYear = new Date(currentYear, BIRTH_MONTH - 1, BIRTH_DAY).getTime();
  var currentDate = Date.now();

  var cookiesExpire = currentDate > birthdayThisYear ? currentDate - birthdayThisYear : currentDate - birthdayThisYear + (1000 * 60 * 60 * 24 * 365);

  markCookie = formElement.querySelector('[name="review-mark"]:checked').value;
  nameCookie = formElement.querySelector('#review-name').value;

  docCookies.setItem('mark', markCookie, cookiesExpire);
  docCookies.setItem('name', nameCookie, cookiesExpire);

  formElement.submit();
});
