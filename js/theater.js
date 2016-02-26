/* global Gallery */
/* global Photo */

'use strict';

(function() {

  var theaterElements = document.querySelectorAll('.photogallery-image');

  var theaterData = [].map.call(theaterElements, function(item) {
    return new Photo(item.querySelector('img').currentSrc);
  });

  var theaterGallery = new Gallery();

  theaterGallery.setPictures(theaterData);

  [].forEach.call(theaterElements, function(element) {
    element.addEventListener('click', function() {
      theaterGallery.show( [].indexOf.call(theaterElements, this) );
    });
  });

})();


