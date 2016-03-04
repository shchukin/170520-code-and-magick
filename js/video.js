/**
 * @fileoverview Объект видео.
 * Является наследником Photo
 * Дополняется функционалом play/pause
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var Photo = require('photo');
var inherit = require('inherit');

/**
 * Конструктор принимает на вход ссылку на видео,
 * по которой сразуже формирует элемент
 * Тут же добавляется обработка клика по видео,
 * которая тугглит play/pause
 * @param {string} url
 * @constructor
 */
function Video(url) {
  this.src = url;
  this.element = document.createElement('video');
  this.element.src = this.src;

  this._onVideoClick = this._onVideoClick.bind(this);
}

inherit(Photo, Video);


/**
 * Рендер элемента видео на страницу
 * @param { Element } location нода в которую будут отрендерен элемент
 */
Video.prototype.renderElement = function(location) {
  location.appendChild(this.element);
  this.element.addEventListener('click', this._onVideoClick);
};

/**
 * Удаление элементы видео со страницы
 */
Video.prototype.removeElement = function() {
  if (this.element.parentNode) {
    this.element.parentNode.removeChild(this.element);
  }
  this.element.removeEventListener('click', this._onVideoClick);
};

/**
 * Динамика play/pause по клику
 * @private
 */
Video.prototype._onVideoClick = function() {
  if ( this.element.paused ) {
    this.element.play();
  } else {
    this.element.pause();
  }
};


module.exports = Video;

