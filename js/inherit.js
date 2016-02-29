'use strict';

/**
 * делает ChildClass наследником класса ParentClass
 * подробно о деталях метода: https://dikmax.name/post/jsinheritance/
 * @param {function} ParentClass
 * @param {function} ChildClass
 */
module.exports = function(ParentClass, ChildClass) {
  var TempConstructor = function() {};
  TempConstructor.prototype = ParentClass.prototype;
  ChildClass.prototype = new TempConstructor();
  ChildClass.prototype.constructor = ChildClass;
};
