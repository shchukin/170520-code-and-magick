'use strict';

(function() {
  
  function Review(data) {
    this._data = data;
    this.element = '';
    this.createElement();
  }

  Review.prototype.AVATAR_MAX_LOADING_TIME = 10000;
  Review.prototype.REVIEW_AUTHOR_AVATAR_SIZE = 124;

  Review.prototype.reviewTemplate = document.querySelector('#review-template');

  Review.prototype.convertGradeValueToWord = function( grade ) {
    var grades = [null, 'one', 'two', 'three', 'four', 'five'];
    return grades[grade];
  };

  Review.prototype.createElement = function() {
    this.element = ( 'content' in this.reviewTemplate ) ? ( this.reviewTemplate.content.children[0].cloneNode(true) ) : ( this.reviewTemplate.childNodes[0].cloneNode(true) );

    var avatarElement = this.element.querySelector('.review-author');
    var ratingElement = this.element.querySelector('.review-rating');
    var descriptionElement = this.element.querySelector('.review-text');

    var avatarValue = new Image();
    var ratingValue;
    var descriptionValue;

    var avatarLoadTimeout;


    avatarValue.onload = function() {
      clearTimeout(avatarLoadTimeout);
      avatarValue.width = this.REVIEW_AUTHOR_AVATAR_SIZE;
      avatarValue.height = this.REVIEW_AUTHOR_AVATAR_SIZE;
      avatarValue.alt = this._data.author.name;
      avatarValue.title = this._data.author.name;
      avatarValue.className = avatarElement.className;
      this.element.replaceChild(avatarValue, avatarElement);
    }.bind(this);

    avatarValue.onerror = function() {
      this.element.className += ' review-load-failure';
    }.bind(this);

    avatarLoadTimeout = setTimeout(function() {
      avatarValue.src = '';
      this.element.className += ' review-load-failure';
    }.bind(this), this.AVATAR_MAX_LOADING_TIME);

    avatarValue.src = this._data.author.picture;

    ratingValue = this.convertGradeValueToWord(this._data.rating);
    ratingElement.className += this._data.rating >= 2 ? ' review-rating-' + ratingValue : '';

    descriptionValue = this._data.description;
    descriptionElement.textContent = descriptionValue;

  };

  Review.prototype.render = function(element) {
    element.appendChild(this.element);
  };


  window.Review = Review;

})();
