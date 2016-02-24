/* global Gallery */

'use strict';

(function() {

  var Theater = function() {
    this.elements = document.querySelectorAll('.photogallery-image');
    this.data = [].map.call(this.elements, function(item) {
      return item.querySelector('img').currentSrc;
    });
  };

  Theater.prototype._onClick = function(event) {
    event.preventDefault();
    gallery.show();
  };

  Theater.prototype.init = function() {
    [].forEach.call(this.elements, function(element) {
      element.addEventListener('click', this._onClick);
    }.bind(this));
  };

  window.Theater = Theater;

})();

var photos = new Theater();
photos.init();

var gallery = new Gallery();
gallery.setPictures(photos.data);

