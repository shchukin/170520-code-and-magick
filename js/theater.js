/* global Gallery */

'use strict';

(function() {

  var theaterItemElements = document.querySelectorAll('.photogallery-image');

  var photos = [].map.call(theaterItemElements, function(item) {
    return item.querySelector('img').currentSrc;
  });

  var screenshotGallery = new Gallery();
  screenshotGallery.setPictures(photos);


  function _onClick(event) {
    event.preventDefault();
    gallery.show();
  }

  [].forEach.call(theaterItemElements, function(element) {
    element.addEventListener('click', _onClick);
  });

})();
