'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
  };

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');
    this._closeButton.addEventListener('click', function() {
      this.hide();
    }.bind(this));
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
  };

  window.Gallery = Gallery;

})();
