/* global Gallery */

'use strict';

(function() {

  var Photos = function() {
    this.elements = document.querySelectorAll('.photogallery-image');
    this.data = [].map.call(this.elements, function(item) {
      return item.querySelector('img').currentSrc;
    });
  };

  Photos.prototype._onClick = function(event) {
    event.preventDefault();
    gallery.show();
  };

  Photos.prototype.init = function() {
    [].forEach.call(this.elements, function(element) {
      element.addEventListener('click', this._onClick);
    }.bind(this));
  };

  window.Photos = Photos;

})();

var photos = new Photos();
photos.init();

var gallery = new Gallery();
gallery.setPictures(photos.data);

