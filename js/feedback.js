/**
 * @fileoverview Работа с фидбеком.
 * Форма отправки отзыва находится в модальном окне, скрыто по умолчанию.
 * Главная задача модуля - валидация. Условия:
 * «Имя пользователя» — обязательное поле
 * Поле «Описание» становится обязательным, если поле «Оценка» ниже 3
 * Форма снабжается подсказками с информацие о том, какие из необходимых
 * полей не заполнены. Имя - это первое обязательное поле.
 * Описание обязательно только в том случае, если проставлена оценка
 * ниже заданного значения в константе LOWEST_POSITIVE_GRADE
 * Видимость формы фидбека завязана на хэш #feedback
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var tools = require('tools');

require('submit');

/**
 * Объект фидбека.
 * Включает в себя контролы формы: текстовые поля, кнпоку сабмита и т.д.
 * Содержит состояния с информацией о том позитивна ли оценка, валидны ли поля
 * @constructor
 */
function Feedback() {
  this._overlayElement = document.querySelector('.overlay-container');
  this._closeElement = document.querySelector('.review-form-close');

  /* Form elements */
  this._formElement = document.querySelector('.review-form');
  this._nameElement = this._formElement.querySelector('#review-name');
  this._textElement = this._formElement.querySelector('#review-text');
  this._markElements = this._formElement.querySelectorAll('[name="review-mark"]');
  this._submitElement = this._formElement.querySelector('.review-submit');

  /* Form notification labels elements */
  this._nameNotifyElement = this._formElement.querySelector('.review-fields-name');
  this._textNotifyElement = this._formElement.querySelector('.review-fields-text');
  this._notifyContainerElement = this._formElement.querySelector('.review-fields');

  /* Form state */
  this._markPositive = false; // если оценка позитивная (значение больше или равно константе LOWEST_POSITIVE_GRADE)
  this._nameValidity = false; // валидность имени
  this._textValidity = false; // валидность сообщения

  this._LOWEST_POSITIVE_GRADE = 3;

  this._onCloseClick = this._onCloseClick.bind(this);
  this._onRatingChange = this._onRatingChange.bind(this);
  this._onNameInput = this._onNameInput.bind(this);
  this._onTextInput = this._onTextInput.bind(this);

  window.addEventListener('hashchange', this._onHashChange.bind(this) );

  // при создании объекта запускаем валидацию: значения могут быть установлены из вне (прямо в html или через куки)
  this._changeRatingPositive();
  this._validateName();
  this._validateText();
  this._setValidationHelpers();

}

Feedback.prototype._show = function() {

  // непосредственный показ формы
  tools.removeClass(this._overlayElement, 'invisible');

  // установка клика по крестику
  this._closeElement.addEventListener('click', this._onCloseClick);

  // установка кликов по оценкам
  [].forEach.call(this._markElements, function(item) {
    item.addEventListener('change', this._onRatingChange);
  }.bind(this));

  // установка ввода имени
  this._nameElement.addEventListener('input', this._onNameInput);

  // установка ввода текста
  this._textElement.addEventListener('input', this._onTextInput);
};

Feedback.prototype._hide = function() {

  // непосредственное скрытие формы
  tools.addClass(this._overlayElement, 'invisible');

  // снятие клика по крестику
  this._closeElement.removeEventListener('click', this._onCloseClick);

  // снятие кликов по оценкам
  [].forEach.call(this._markElements, function(item) {
    item.removeEventListener('change', this._onRatingChange);
  }.bind(this));

  // снятие ввода имени
  this._nameElement.removeEventListener('input', this._onNameInput);

  // снятие ввода текста
  this._textElement.removeEventListener('input', this._onTextInput);

};

/**
 * Проверяет хэш на наличие информации о фидбеке.
 * @returns {boolean}
 * @private
 */
Feedback.prototype._doesHashContainsFeedback = function() {
  return location.hash.indexOf('feedback') !== -1;
};

/**
 * Необходимо для случая обновления/открытия страницы, когда хэш не был изменен, а был изначально
 */
Feedback.prototype.restoreFromHash = function() {
  if ( this._doesHashContainsFeedback() ) {
    this._show();
  }
};

/**
 * Показал или скрытие фидбека при изменении хэша
 * @private
 */
Feedback.prototype._onHashChange = function() {
  if ( this._doesHashContainsFeedback() ) {
    this._show();
  } else {
    this._hide();
  }
};


/**
 * Изменяет значение позитивности оценки, по правилам описанным выше
 * @private
 */
Feedback.prototype._changeRatingPositive = function() {
  this._markPositive = this._formElement.querySelector('[name="review-mark"]:checked').value >= this._LOWEST_POSITIVE_GRADE;
};

/**
 * Очищаем хэш, что в итоге приводит к закрытию фидбека
 * @private
 */
Feedback.prototype._onCloseClick = function() {
  location.hash = '';
};

/**
 * Изменяем установленный рейтинг.
 * Запускаем валидацию, так как оценка на нее влияет
 * @private
 */
Feedback.prototype._onRatingChange = function() {
  this._changeRatingPositive();
  this._validateText();
  this._setValidationHelpers();
};

/**
 * Ввод имени и его валидация
 * @private
 */
Feedback.prototype._onNameInput = function() {
  this._validateName();
  this._setValidationHelpers();
};

/**
 * Ввод сообщения и его валидация
 * @private
 */
Feedback.prototype._onTextInput = function() {
  this._validateText();
  this._setValidationHelpers();
};

/**
 * Динамика скрытия и показа хелперов с информацией о том, что осталось заполнить
 * @private
 */
Feedback.prototype._setValidationHelpers = function() {

  this._nameNotifyElement.style.display = this._nameValidity ? 'none' : 'inline';
  this._textNotifyElement.style.display = this._textValidity ? 'none' : 'inline';

  if ( this._nameValidity && this._textValidity ) {
    this._notifyContainerElement.style.display = 'none';
    this._submitElement.disabled = false;
  } else {
    this._notifyContainerElement.style.display = 'inline-block';
    this._submitElement.disabled = true;
  }
};

/**
 * Валидация имени: введено или нет
 * @private
 */
Feedback.prototype._validateName = function() {
  this._nameValidity = !!this._nameElement.value; // !! двойное отрицание преобразует в true или false значение имени (введено или нет соответствено)
};

/**
 * Валидация сообщения: обязательно при негативной оценке
 */
Feedback.prototype._validateText = function() {
  this._textValidity = this._markPositive || !!this._textElement.value; // см. выше
};

module.exports = Feedback;
