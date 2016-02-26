'use strict';

window.inherit = function(ParentClass, ChildClass) {
  var TempConstructor = function() {};
  TempConstructor.prototype = ParentClass.prototype;
  ChildClass.prototype = new TempConstructor();
  ChildClass.prototype.constructor = ChildClass;
};
