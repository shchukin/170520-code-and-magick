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

  this.element.addEventListener('click', function() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  });
}

inherit(Photo, Video);

module.exports = Video;
