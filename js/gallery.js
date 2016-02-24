'use strict';

var keyCodes = {
  Escape: 27,
  ArrowLeft: 37,
  ArrowRight: 39
};

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._stage = this.element.querySelector('.overlay-gallery-preview');
    this._numberCurrent = this.element.querySelector('.preview-number-current');
    this._numberTotal = this.element.querySelector('.preview-number-total');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this._arrowButtons = this.element.querySelectorAll('.overlay-gallery-control');

    this._photos = [];

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onArrowClick = this._onArrowClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);

  };

  Gallery.prototype.show = function(startFrom) {

    /* Show gallery */
    this.element.className = this.element.className.replace('invisible', '').replace(/\s+/g, ' ').trim();

    /* Close button add event */
    this._closeButton.addEventListener('click', this._onCloseClick);

    /* Arrow buttons add event */
    [].forEach.call(this._arrowButtons, function(arrow) {
      arrow.addEventListener('click', this._onArrowClick);
    }.bind(this));

    /* Keyboard */
    document.addEventListener('keydown', this._onDocumentKeyDown);

    this.setCurrentPicture(startFrom);
  };

  Gallery.prototype.hide = function() {

    /* Hide gallery */
    this.element.className += ' invisible';

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

  Gallery.prototype._onArrowClick = function(event) {
    if ( event.target.className.indexOf('overlay-gallery-control-left') > -1 ) {
      console.log('Left arrow has been clicked');
    } else if ( event.target.className.indexOf('overlay-gallery-control-right') > -1 ) {
      console.log('Right arrow has been clicked');
    }
  };

  Gallery.prototype._onDocumentKeyDown = function(event) {
    switch (event.keyCode) {
      case keyCodes.Escape:
        this.hide();
        break;
      case keyCodes.ArrowLeft:
        console.log('Left key has been pressed');
        break;
      case keyCodes.ArrowRight:
        console.log('Right key has been pressed');
        break;
    }
  };

  Gallery.prototype.setPictures = function(photos) {
    this._photos = photos;
    this.element.querySelector('.preview-number-total').innerHTML = photos.length;
  };

  Gallery.prototype.setCurrentPicture = function(index) {
    var olderElement = this._stage.querySelector('img');
    if (olderElement) {
      olderElement.remove();
    }
    this._stage.appendChild(this._photos[index].element);
    this._numberCurrent.innerHTML = index + 1;
  };

  window.Gallery = Gallery;

})();
