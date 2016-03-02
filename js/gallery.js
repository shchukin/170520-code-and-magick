/**
 * @fileoverview Объект галереи - слайшоу в модальном окне.
 * Объект включает в себе элементы галереи: сцена галереи, кнопки навигаци и т.д.
 * Хранит индекс текущего элемента, набор фотографий (объекты класса Photo)
 * Описаны методы показа, скрытия, навигации по галерее.
 * Навигация, показ и другие действия завязаны на изменения хэша адресной строки
 * Структура хэша: #photo/%image-url%
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var tools = require('tools');
var keyCode = require('keycode');

/**
 * Констурктор галереи инициализирует объект дом элементами и функциями обработчиками.
 * Не устанавливает данные. Для того, чтобы заполнить объект фотографиями
 * нужно воспользовать описанным ниже методом setPictures
 * @constructor
 */
function Gallery() {
  this._element = document.querySelector('.overlay-gallery');
  this._stageElement = this._element.querySelector('.overlay-gallery-preview');
  this._numberCurrentElement = this._element.querySelector('.preview-number-current');
  this._numberTotalElement = this._element.querySelector('.preview-number-total');
  this._closeButtonElement = this._element.querySelector('.overlay-gallery-close');
  this._arrowButtonElements = this._element.querySelectorAll('.overlay-gallery-control');

  this._current = 0;
  this._photos = [];
  this._active = false;

  this._onCloseClick = this._onCloseClick.bind(this);
  this._onArrowClick = this._onArrowClick.bind(this);
  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);

  window.addEventListener('hashchange', this._onHashChange.bind(this) );
}

/**
 * Проверяет хэш на наличие скриншотов. Если скриншоты есть, то идет показ галереи или
 * переключение слайдов. Если нет, то галерею необходимо закрыть.
 * @returns {boolean}
 * @private
 */
Gallery.prototype._doesHashContainsScreenshot = function() {
  var regexp = /#photo\/(\S+)/;
  return !!location.hash.match(regexp); // !! converting null to false and object to true
};

/**
 * Необходимо для случая обновления/открытия страницы, когда хэш не был изменен, а был изначально
 */
Gallery.prototype.restoreFromHash = function() {
  if ( this._doesHashContainsScreenshot() ) {
    this._show(location.hash.replace('#photo/', ''));
  }
};

/**
 * Показ галереи. Инициализирует обработчики событий
 * @param {number|string} [startFrom] может принимать индекс элемента или ссылку на изображение
 * @private
 */
Gallery.prototype._show = function(startFrom) {

  // show gallery
  tools.removeClass(this._element, 'invisible');

  // close button add event
  this._closeButtonElement.addEventListener('click', this._onCloseClick);

  // Arrow buttons add event
  [].forEach.call(this._arrowButtonElements, function(arrow) {
    arrow.addEventListener('click', this._onArrowClick);
  }.bind(this));

  // Keyboard add event
  document.addEventListener('keydown', this._onDocumentKeyDown);

  // move to init picture
  this._choosePicture(startFrom);

  // mark gallery active
  this._active = true;
};

/**
 * Закрытии галереи. Убираем обработчики
 * @private
 */
Gallery.prototype._hide = function() {

  // Hide gallery
  tools.addClass(this._element, 'invisible')

  // Close button remove event
  this._closeButtonElement.removeEventListener('click', this._onCloseClick);

  // Arrow buttons remove event
  [].forEach.call(this._arrowButtonElements, function(arrow) {
    arrow.removeEventListener('click', this._onArrowClick);
  }.bind(this));

  // Keyboard remove event
  document.removeEventListener('keydown', this._onDocumentKeyDown);

  // mark gallery not an active
  this._active = false;
};

/**
 * Очищаем хэш, что в итоге приводит к закрытию галереи
 * @private
 */
Gallery.prototype._onCloseClick = function() {
  location.hash = '';
};

/**
 * Навигация элементами-стрелками вперед/назад, обновляем хэш
 * @param event
 * @private
 */
Gallery.prototype._onArrowClick = function(event) {
  if ( tools.hasClass(event.target, 'overlay-gallery-control-left') ) {
    location.hash = 'photo/' + this._photos[this._prevIndex()].src;
  } else if ( tools.hasClass(event.target, 'overlay-gallery-control-right') ) {
    location.hash = 'photo/' + this._photos[this._nextIndex()].src;
  }
};

/**
 * Ловим нажатия на необходимые клавишы: Esc, Arrow left, Arrow right и манипулируем
 * хэшом соответствующим образом: очищаем или устанавливаем следующий скриншот
 * @param event
 * @private
 */
Gallery.prototype._onDocumentKeyDown = function(event) {
  switch (event.keyCode) {
    case keyCode.Escape:
      location.hash = '';
      break;
    case keyCode.ArrowLeft:
      location.hash = 'photo/' + this._photos[this._prevIndex()].src;
      break;
    case keyCode.ArrowRight:
      location.hash = 'photo/' + this._photos[this._nextIndex()].src;
      break;
  }
};

/**
 * Изменение хэша - основной способ навигации по галереи
 * @private
 */
Gallery.prototype._onHashChange = function() {
  if ( this._active && this._doesHashContainsScreenshot() ) {
    this._choosePicture( location.hash.replace('#photo/', '') );
  } else if ( !this._active && this._doesHashContainsScreenshot() ) {
    this._show(location.hash.replace('#photo/', ''));
  } else if ( this._active && !this._doesHashContainsScreenshot() ) {
    this._hide();
  }
};

/**
 * Возвращает индекс предыдущего скриншота относительно текущего.
 * Это может быть как предыдущий порядковый, так и последний в пачке, если галерея прокручена к началу
 * @returns {number}
 * @private
 */
Gallery.prototype._prevIndex = function() {
  return ( this._current === 0 ) ? ( this._photos.length - 1 ) : ( this._current - 1 );
};

/**
 * Возвращает индекс следующего скриншота относительно текущего.
 * Это может быть как следующий порядковый, так и первый, если галерея прокручена до конца
 * @returns {number}
 * @private
 */
Gallery.prototype._nextIndex = function() {
  return ( this._current === this._photos.length - 1 ) ? ( 0 ) : ( this._current + 1 );
};

/**
 * Устанавливаем массив изображений в галерею
 * @param {Array.<Photo>} photos
 */
Gallery.prototype.setPictures = function(photos) {
  this._photos = photos;
  this._numberTotalElement.innerHTML = photos.length;
};

/**
 * Переключение на заданный индекс элемента или по ссылке на изображение
 * @param {number|string} index
 * @private
 */
Gallery.prototype._choosePicture = function(index) {

  if ( typeof (index) === 'string' ) {
    index = this._photos.map(function(item) {
      return item.src;
    }).indexOf(index);
  }

  this._photos[this._current].removeElement();
  this._photos[index].renderElement( this._stageElement );
  this._numberCurrentElement.innerHTML = index + 1;
  this._current = index;
};

module.exports = Gallery;
