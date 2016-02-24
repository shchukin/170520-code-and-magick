/* global Gallery */

'use strict';

(function() {

  var Theater = function() {
    this.elements = document.querySelectorAll('.photogallery-image');
    this.data = [].map.call(this.elements, function(item) {
      return item.querySelector('img').currentSrc;
    });

    this.gallery = new Gallery();

    this._onElementClick = this._onElementClick.bind(this);
    this._init();
  };

  Theater.prototype._onElementClick = function(event) {
    event.preventDefault();
    this.gallery.show();
  };

  Theater.prototype._init = function() {

    [].forEach.call(this.elements, function(element) {
      element.addEventListener('click', this._onElementClick);
    }.bind(this));
    
    this.gallery.setPictures(this.data);
  };

  window.Theater = Theater;

})();

var photos = new Theater();


