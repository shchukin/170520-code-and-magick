'use strict';

(function() {

  var theaterElements = document.querySelectorAll('.photogallery-image');

  var theater = new Gallery();

  [].forEach.call(theaterElements, function(element){
    element.addEventListener('click', function(event){
      event.preventDefault();
      theater.show();
    });
  });

})();
