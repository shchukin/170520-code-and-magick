'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this._arrowButtons = this.element.querySelectorAll('.overlay-gallery-control');

    this._onCloseClick = this._onCloseClick.bind(this);
    //this._onArrowClick = this._onArrowClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);

  };

  Gallery.prototype.show = function() {

    /* Show gallery */
    this.element.classList.remove('invisible');

    /* Close button add event */
    this._closeButton.addEventListener('click', this._onCloseClick);

    /* Arrow buttons add event */
    [].forEach.call(this._arrowButtons, function(arrow) {
      arrow.addEventListener('click', this._onArrowClick);
    }.bind(this));

    /* Keyboard */
    document.addEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype.hide = function() {

    /* Hide gallery */
    this.element.classList.add('invisible');

    /* Close button remove event */
    this._closeButton.removeEventListener('click', this._onCloseClick);

    /* Arrow buttons remove event */
    [].forEach.call(this._arrowButtons, function(arrow) {
      arrow.removeEventListener('click', this._onArrowClick);
    }.bind(this));

    /* Keyboard */
    document.removeEventListener('keydown', this._onDocumentKeyDown);
  };


  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onArrowClick = function() {
    if ( this.classList.contains('overlay-gallery-control-left') ) {
      console.log('Left arrow has been clicked');
    }
    if ( this.classList.contains('overlay-gallery-control-right') ) {
      console.log('Right arrow has been clicked');
    }
    //console.log(this);
  };

  Gallery.prototype._onDocumentKeyDown = function(event) {
    if (event.keyCode === 27) {
      this.hide();
    }
    if (event.keyCode === 37) {
      console.log('Left key has been pressed');
    }
    if (event.keyCode === 39) {
      console.log('Right key has been pressed');
    }
  };

  window.Gallery = Gallery;

})();
