'use strict';

define(function() {

  function Photo(url) {
    this.element = document.createElement('img');
    this.element.src = url;
  }

  Photo.prototype.renderElement = function(location) {
    location.appendChild(this.element);
  };

  Photo.prototype.removeElement = function() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  };

  return Photo;

});
