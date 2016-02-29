/**
 * @fileoverview Объект фотографии.
 * Содержит адрес фотографии и сформированный DOM-элемент
 * Обладает методами рендера на страницу и удаления самого себя со страницы
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

/**
 * Конструктор принимает на вход ссылку на изображение,
 * по которой сразуже формирует элемент
 * @param {string} url
 * @constructor
 */
function Photo(url) {
  this.src = url;
  this.element = document.createElement('img');
  this.element.src = this.src;
}

/**
 * Рендер элемента фотографии на страницу
 * @param { Element } location нода в которую будут отрендерен элемент
 */
Photo.prototype.renderElement = function(location) {
  location.appendChild(this.element);
};

/**
 * Удаление элементы со страницы
 */
Photo.prototype.removeElement = function() {
  if (this.element.parentNode) {
    this.element.parentNode.removeChild(this.element);
  }
};

module.exports = Photo;
