var AVATAR_MAX_LOADING_TIME = 10000;
var REVIEW_AUTHOR_AVATAR_SIZE = 124;


function convertGradeValueToWord( grade ) {
  var grades = [null, 'one', 'two', 'three', 'four', 'five'];
  return grades[grade];
}

(function() {

  function Review(data) {
    this._data = data;
    this.element = '';
  }

  Review.prototype.render = function() {
    var template = document.querySelector('#review-template');
    this.element = ( 'content' in template ) ? ( template.content.children[0].cloneNode(true) ) : ( template.childNodes[0].cloneNode(true) );

    var avatarElement = this.element.querySelector('.review-author');
    var ratingElement = this.element.querySelector('.review-rating');
    var descriptionElement = this.element.querySelector('.review-text');

    var avatarValue = new Image();
    var ratingValue;
    var descriptionValue;

    var avatarLoadTimeout;


    avatarValue.onload = function() {
      clearTimeout(avatarLoadTimeout);
      avatarValue.width = REVIEW_AUTHOR_AVATAR_SIZE;
      avatarValue.height = REVIEW_AUTHOR_AVATAR_SIZE;
      avatarValue.alt = this._data.author.name;
      avatarValue.title = this._data.author.name;
      avatarValue.className = avatarElement.className;
      this.element.replaceChild(avatarValue, avatarElement);
    };

    avatarValue.onerror = function() {
      this.element.className += ' review-load-failure';
    };

    avatarLoadTimeout = setTimeout(function() {
      avatarValue.src = '';
      this.element.className += ' review-load-failure';
    }, AVATAR_MAX_LOADING_TIME);

    avatarValue.src = this._data.author.picture;

    ratingValue = convertGradeValueToWord(this._data.rating);
    ratingElement.className += this._data.rating >= 2 ? ' review-rating-' + ratingValue : '';

    descriptionValue = this._data.description;
    descriptionElement.textContent = descriptionValue;
  };

  window.Review = Review;

})();