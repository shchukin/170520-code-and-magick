/**
 * @fileoverview Работа с формой отправки отзыва
 * Форма отправки отзыва находится в модальном окне, скрыто по умолчанию
 * Главная задача модуля - валидация. Условия:
 * «Имя пользователя» — обязательное поле
 * Поле «Описание» становится обязательным, если поле «Оценка» ниже 3
 * Форма снабжается подсказками с информацие о том, какие из необходимых
 * полей не заполнены. Имя - это первое обязательное поле.
 * Описание обязательно только в том случае, если проставлена оценка
 * ниже заданного значения в константе LOWEST_POSITIVE_GRADE
 *
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var Tools = require('tools');

var tools = new Tools();


var formContainer = document.querySelector('.overlay-container');
var formOpenButton = document.querySelector('.reviews-controls-new');
var formCloseButton = document.querySelector('.review-form-close');

// показ формы
formOpenButton.addEventListener('click', function(event) {
  event.preventDefault();
  formContainer.className = tools.removeClass(formContainer.className, 'invisible');
});

// скрытие формы
formCloseButton.addEventListener('click', function(event) {
  event.preventDefault();
  formContainer.className += 'invisible';
});




var LOWEST_POSITIVE_GRADE = 3;

/* Form elements */
var formElement = document.querySelector('.review-form');
var nameElement = formElement.querySelector('#review-name');
var textElement = formElement.querySelector('#review-text');
var markElements = formElement.querySelectorAll('[name="review-mark"]');
var submitElement = formElement.querySelector('.review-submit');

/* Form notification labels elements */
var nameNotifyElement = formElement.querySelector('.review-fields-name');
var textNotifyElement = formElement.querySelector('.review-fields-text');
var notifyContainerElement = formElement.querySelector('.review-fields');

/* Form state */
var markPositive; // если оценка позитивная (значение больше или равно константе LOWEST_POSITIVE_GRADE)
var nameValidity; // валидность имени
var textValidity; // валидность сообщения


function changeMarkPositive() {
  markPositive = formElement.querySelector('[name="review-mark"]:checked').value >= LOWEST_POSITIVE_GRADE;
}

function validateName() {
  nameValidity = !!nameElement.value; // !! двойное отрицание преобразует в true или false значение имени (введено или нет соответствено)
}

function validateText() {
  textValidity = markPositive || textElement.value;
}

// динамика показа подсказок
function setValidationHelpers() {

  if ( nameValidity ) {
    nameNotifyElement.style.display = 'none';
  } else {
    nameNotifyElement.style.display = 'inline';
  }

  if ( textValidity ) {
    textNotifyElement.style.display = 'none';
  } else {
    textNotifyElement.style.display = 'inline';
  }

  if ( nameValidity && textValidity ) {
    notifyContainerElement.style.display = 'none';
    submitElement.disabled = false;
  } else {
    notifyContainerElement.style.display = 'inline-block';
    submitElement.disabled = true;
  }

}

changeMarkPositive();
validateName();
validateText();
setValidationHelpers();

nameElement.addEventListener('input', function() {
  validateName();
  setValidationHelpers();
});

textElement.addEventListener('input', function() {
  validateText();
  setValidationHelpers();
});

function onMarkChange() {
  changeMarkPositive();
  validateText();
  setValidationHelpers();
}

// установка кликов по оценкам
[].forEach.call(markElements, function(item) {
  item.addEventListener('change', onMarkChange);
});
