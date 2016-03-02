/**
 * @fileoverview Вспомогательные тулзы.
 * По сути маленькая jQuery
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var tools = {
  /**
   * @param {object} node
   * @param {string} className
   * @returns {boolean}
   */
  hasClass: function(node, className) {
    return node.className.indexOf(className) !== -1;
  },
  /**
   * @param {object} node
   * @param {string} className
   */
  addClass: function(node, className) {
    if( !tools.hasClass(node, className) ) {
      node.className += ' ' + className;

      //когда добавили первый класс, он добавился с пробелом перед ( <div class=" example"></div> )
      node.className = node.className.trim();
    }
  },
  /**
   * @param {object} node
   * @param {string} className
   */
  removeClass: function(node, className) {
    node.className = node.className.replace(className, '').replace(/\s+/g, ' ').trim();

    // в случае когда классов совсем не осталось ( <div class></div> ) убираем атрибут
    if( !node.className ) {
      node.removeAttribute('class');
    }
  }
};

module.exports = tools;
