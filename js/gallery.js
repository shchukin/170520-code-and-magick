'use strict';

define([
  'keycode'
], function() {

  var Gallery = function() {
    this._element = document.querySelector('.overlay-gallery');
    this._stageElement = this._element.querySelector('.overlay-gallery-preview');
    this._numberCurrentElement = this._element.querySelector('.preview-number-current');
    this._numberTotalElement = this._element.querySelector('.preview-number-total');
    this._closeButtonElement = this._element.querySelector('.overlay-gallery-close');
    this._arrowButtonElements = this._element.querySelectorAll('.overlay-gallery-control');

    this._current = 0;
    this._photos = [];

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onArrowClick = this._onArrowClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);

  };

  Gallery.prototype.show = function(startFrom) {

    /* Show gallery */
    this._element.className = this._element.className.replace('invisible', '').replace(/\s+/g, ' ').trim();

    /* Close button add event */
    this._closeButtonElement.addEventListener('click', this._onCloseClick);

    /* Arrow buttons add event */
    [].forEach.call(this._arrowButtonElements, function(arrow) {
      arrow.addEventListener('click', this._onArrowClick);
    }.bind(this));

    /* Keyboard */
    document.addEventListener('keydown', this._onDocumentKeyDown);

    this.choosePicture(startFrom);
  };

  Gallery.prototype.hide = function() {

    /* Hide gallery */
    this._element.className += ' invisible';

    /* Close button remove event */
    this._closeButtonElement.removeEventListener('click', this._onCloseClick);

    /* Arrow buttons remove event */
    [].forEach.call(this._arrowButtonElements, function(arrow) {
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
      this.choosePicture( this._prevIndex() );
    } else if ( event.target.className.indexOf('overlay-gallery-control-right') > -1 ) {
      this.choosePicture( this._nextIndex() );
    }
  };

  Gallery.prototype._onDocumentKeyDown = function(event) {
    switch (event.keyCode) {
      case keyCode.Escape:
        this.hide();
        break;
      case keyCode.ArrowLeft:
        this.choosePicture( this._prevIndex() );
        break;
      case keyCode.ArrowRight:
        this.choosePicture( this._nextIndex() );
        break;
    }
  };

  Gallery.prototype._prevIndex = function() {
    return ( this._current === 0 ) ? ( this._photos.length - 1 ) : ( this._current - 1 );
  };

  Gallery.prototype._nextIndex = function() {
    return ( this._current === this._photos.length - 1 ) ? ( 0 ) : ( this._current + 1 );
  };

  Gallery.prototype.setPictures = function(photos) {
    this._photos = photos;
    this._numberTotalElement.innerHTML = photos.length;
  };

  Gallery.prototype.choosePicture = function(index) {
    this._photos[this._current].removeElement();
    this._photos[index].renderElement( this._stageElement );
    this._numberCurrentElement.innerHTML = index + 1;
    this._current = index;
  };

  return Gallery;

});
