/**
 * @fileoverview Объект отзыва.
 * Формирует ноду отзыва и заполняет ее данными.
 * Работает с рейтингами полезности отзыва
 * Обладает методом рендера
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var tools = require('tools');

/**
 * Содержит данные заданного формата и элемент для отображения на страницы
 * При вызове немедленно формирует элемент
 * @param {Object} data
 * @constructor
 */
function Review(data) {
  this._data = data;
  this._element = '';

  this._voteYesElement = '';
  this._voteNoElement = '';

  this.createElement();

  this._rated = false; // если за ревью голосовали

  this._onVoteYesClick = this._onVoteYesClick.bind(this);
  this._onVoteNoClick = this._onVoteNoClick.bind(this);
}

Review.prototype.AVATAR_MAX_LOADING_TIME = 10000;
Review.prototype.REVIEW_AUTHOR_AVATAR_SIZE = 124; // Оба измерения: ширина и высота

// html шаблон отзывы хранится в разметке. Получаем его
Review.prototype.reviewTemplate = document.querySelector('#review-template');

/**
 * Вспомогательная функция, конвертирующая рйтинг заданный числов в строковый синоним
 * @param {number} grade
 * @returns {string}
 */
Review.prototype.convertGradeValueToWord = function( grade ) {
  var grades = [null, 'one', 'two', 'three', 'four', 'five'];
  return grades[grade];
};

/**
 * Формирование элемента.
 * На основе шаблона создается пустой элемент и заполняется даннымми
 * Строковые данные (Имя автора, содержание отзыва) сразу записываются в элемент.
 * Изображение аватар снабжается проверками на доступность, таймаутом загрузки,
 * а в случае провала проставляется соответствующий класс
 * Рэйтинг проставляется как html-класс отвечающий за количество звезд.
 */
Review.prototype.createElement = function() {
  // формирование элемента на основе html-шаблона. Кейсы для кроссбраузерной поддержки
  this._element = ( 'content' in this.reviewTemplate ) ? ( this.reviewTemplate.content.children[0].cloneNode(true) ) : ( this.reviewTemplate.childNodes[0].cloneNode(true) );
  var avatarElement = this._element.querySelector('.review-author');
  var ratingElement = this._element.querySelector('.review-rating');
  var descriptionElement = this._element.querySelector('.review-text');
  var voteYesElement = this._element.querySelector('.review-quiz-answer-yes');
  var voteNoElement = this._element.querySelector('.review-quiz-answer-no');

  var avatarValue = new Image();
  var ratingValue;
  var descriptionValue;

  var avatarLoadTimeout;


  // в случае успешной загрузки изображения аватара формируем ноду img, заполняем данными и заменяем ту, что предоставлена в шаблоне

  avatarValue.addEventListener('load', function() {
    clearTimeout(avatarLoadTimeout);
    avatarValue.width = this.REVIEW_AUTHOR_AVATAR_SIZE;
    avatarValue.height = this.REVIEW_AUTHOR_AVATAR_SIZE;
    avatarValue.alt = this._data.author.name;
    avatarValue.title = this._data.author.name;
    avatarValue.className = avatarElement.className;
    this._element.replaceChild(avatarValue, avatarElement);
  }.bind(this));

  // в случае ошибки добавляем класс символизирующий ошибку - крестик на фотографии
  avatarValue.addEventListener('error', function() {
    tools.addClass(this._element, 'review-load-failure');
  }.bind(this));

  // устанавливаем таймаут на загрузку изображения аватара. Если он превосходит заданное константой время, то трактуем как кейс ошибки
  avatarLoadTimeout = setTimeout(function() {
    avatarValue.src = '';
    tools.addClass(this._element, 'review-load-failure');
  }.bind(this), this.AVATAR_MAX_LOADING_TIME);

  avatarValue.src = this._data.author.picture;

  ratingValue = this.convertGradeValueToWord(this._data.rating);
  if ( this._data.rating >= 2 ) {
    tools.addClass(ratingElement, 'review-rating-' + ratingValue);
  }

  descriptionValue = this._data.description;
  descriptionElement.textContent = descriptionValue;

  this._voteYesElement = voteYesElement;
  this._voteNoElement = voteNoElement;
};



/**
 * Рендер элемента отзыва на страницу
 * @param {Element} element
 */
Review.prototype.render = function(element) {
  element.appendChild(this._element);

  this._voteYesElement.addEventListener('click', this._onVoteYesClick);
  this._voteNoElement.addEventListener('click', this._onVoteNoClick);
};

/**
 * Удаление элемента со страницы
 */
Review.prototype.remove = function() {
  if (this._element.parentNode) {
    this._element.parentNode.removeChild(this._element);
  }

  this._voteYesElement.removeEventListener('click', this._onVoteYesClick);
  this._voteNoElement.removeEventListener('click', this._onVoteNoClick);
};

/**
 * Обработка клика по "да" на полезности отзыва
 * @param event
 * @private
 */
Review.prototype._onVoteYesClick = function(event) {
  if ( !tools.hasClass(event.target, 'review-quiz-answer-active') ) {
    this._data.review_usefulness += this._rated ? 2 : 1;
    this._rated = true;
  }
  tools.addClass(this._voteYesElement, 'review-quiz-answer-active');
  tools.removeClass(this._voteNoElement, 'review-quiz-answer-active');
};

/**
 * Обработка клика по "нет" на полезности отзыва
 * @param event
 * @private
 */
Review.prototype._onVoteNoClick = function(event) {
  if ( !tools.hasClass(event.target, 'review-quiz-answer-active') ) {
    this._data.review_usefulness -= this._rated ? 2 : 1;
    this._rated = true;
  }
  tools.addClass(this._voteNoElement, 'review-quiz-answer-active');
  tools.removeClass(this._voteYesElement, 'review-quiz-answer-active');
};


module.exports = Review;
