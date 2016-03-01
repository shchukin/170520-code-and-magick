/**
 * @fileoverview Вспомогательные тулзы.
 * По сути маленькая jQuery
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

function Tools() {

}

/**
 * Снятие класса с элемента
 * @param {string} classList откуда убираем класс
 * @param {string} className какой класс
 * @returns {string} 
 */
Tools.prototype.removeClass = function( classList, className ) {
  return classList.replace(className, '').replace(/\s+/g, ' ').trim();
};


module.exports = Tools;
