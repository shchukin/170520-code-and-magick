/**
 * @fileoverview Объект видео.
 * Содержит адрес видео и сформированный DOM-элемент
 * Обладает методами рендера на страницу и удаления самого себя со страницы
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

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

  this.element.addEventListener('click', function() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  });
}

/**
 * Рендер элемента видео на страницу
 * @param { Element } location нода в которую будут отрендерен элемент
 */
Video.prototype.renderElement = function(location) {
  location.appendChild(this.element);
};

/**
 * Удаление элемента со страницы
 */
Video.prototype.removeElement = function() {
  if (this.element.parentNode) {
    this.element.parentNode.removeChild(this.element);
  }
};

module.exports = Video;
