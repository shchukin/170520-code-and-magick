'use strict';

(function() {

  var REVIEW_AUTHOR_AVATAR_SIZE = 124;
  var LOADING_TIMEOUT = 10000;

  var reviews = null;

  var template = document.querySelector('#review-template');

  var filtersElement = document.querySelector('.reviews-filter');
  filtersElement.className += ' invisible';


  function convertGradeValueToWord( grade ) {
    var grades = [null, 'one', 'two', 'three', 'four', 'five'];
    return grades[grade];
  }


  function getElementFromTemplate( data ) {

    var reviewElement = ( 'content' in template ) ? ( template.content.children[0].cloneNode(true) ) : ( template.childNodes[0].cloneNode(true) );

    var avatarElement = reviewElement.querySelector('.review-author');
    var ratingElement = reviewElement.querySelector('.review-rating');
    var descriptionElement = reviewElement.querySelector('.review-text');

    var avatarValue = new Image();
    var ratingValue;
    var descriptionValue;

    var avatarLoadTimeout;


    avatarValue.onload = function() {
      clearTimeout(avatarLoadTimeout);
      avatarValue.width = REVIEW_AUTHOR_AVATAR_SIZE;
      avatarValue.height = REVIEW_AUTHOR_AVATAR_SIZE;
      avatarValue.alt = data.author.name;
      avatarValue.title = data.author.name;
      avatarValue.className = avatarElement.className;
      reviewElement.replaceChild(avatarValue, avatarElement);
    };

    avatarValue.onerror = function() {
      reviewElement.className += ' review-load-failure';
    };

    avatarLoadTimeout = setTimeout(function() {
      avatarValue.src = '';
      reviewElement.className += ' review-load-failure';
    }, LOADING_TIMEOUT);

    avatarValue.src = data.author.picture;

    ratingValue = convertGradeValueToWord(data.rating);
    ratingElement.className += data.rating >= 2 ? ' review-rating-' + ratingValue : '';

    descriptionValue = data.description;
    descriptionElement.textContent = descriptionValue;

    return reviewElement;
  }


  function reviewsOutput() {

    var containerElement = document.querySelector('.reviews-list');
    var reviewValue = document.createDocumentFragment();

    reviews.forEach(function(review) {
      reviewValue.appendChild( getElementFromTemplate(review) );
    });

    containerElement.appendChild(reviewValue);

    filtersElement.className = filtersElement.className.replace('invisible', '').replace(/\s+/g, ' ').trim();

  }

  function getReviewsData() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://o0.github.io/assets/json/reviews.json');
    xhr.timeout = 10000;
    
    xhr.onload = function (event) {
      console.log( JSON.parse(event.target.response) );
    };

    xhr.send();

  }

  getReviewsData();


  if (reviews) {
    reviewsOutput();
  }

})();
