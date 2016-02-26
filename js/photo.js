'use strict';

(function() {

  function Photo(url) {
    this.element = document.createElement('img');
    this.element.src = url;
  }

  window.Photo = Photo;

})();
