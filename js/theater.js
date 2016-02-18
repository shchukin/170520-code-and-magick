'use strict';

(function() {

  var theaterElements = document.querySelectorAll('.photogallery-image');

  var gallery = new Gallery();

  function _onClick(event) {
    event.preventDefault();
    gallery.show();
  }

  [].forEach.call(theaterElements, function(element){
    element.addEventListener('click', _onClick);
  });

})();
