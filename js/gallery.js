'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this._arrowButtons = this.element.querySelectorAll('.overlay-gallery-control');

    this._onCloseClick = this._onCloseClick.bind(this);
    //this._onArrowClick = this._onArrowClick.bind(this);
  };

  Gallery.prototype.show = function() {

    /* Show gallery */
    this.element.classList.remove('invisible');

    /* Close button add event */
    this._closeButton.addEventListener('click', this._onCloseClick);

    /* Arrow buttons add event */
    [].forEach.call(this._arrowButtons, function(arrow){
      arrow.addEventListener('click', this._onArrowClick);
    }.bind(this));
  };

  Gallery.prototype.hide = function() {

    /* Hide gallery */
    this.element.classList.add('invisible');

    /* Close button remove event */
    this._closeButton.removeEventListener('click', this._onCloseClick);

    /* Arrow buttons remove event */
    [].forEach.call(this._arrowButtons, function(arrow){
      arrow.removeEventListener('click', this._onArrowClick);
    }.bind(this));
  };


  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onArrowClick = function() {
    if ( this.classList.contains('overlay-gallery-control-left') ) {
      alert('Left arrow has been clicked')
    }
    if ( this.classList.contains('overlay-gallery-control-right') ) {
      alert('Right arrow has been clicked')
    }
    //console.log(this);
  };

  window.Gallery = Gallery;

})();
