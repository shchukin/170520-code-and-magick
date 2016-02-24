'use strict';

(function() {

  function Photo(url) {
    this._element = document.createElement('img');
    this._element.src = url;
  }

  window.Photo = Photo;

})();
