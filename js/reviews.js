'use strict';

var REVIEW_AUTHOR_AVATAR_SIZE = 124;
var LOADING_TIMEOUT = 10000;

var containerElement;
var reviews;


function convertGradeValueToWord( grade ) {
  if( grade == 1 ) return 'one';
  if( grade == 2 ) return 'two';
  if( grade == 3 ) return 'three';
  if( grade == 4 ) return 'four';
  if( grade == 5 ) return 'five';
}

function getElementFromTemplate(data) {

  var template = document.querySelector('#review-template');
  var reviewElement = 'content' in template ? template.content.children[0].cloneNode(true) : template.children[0].cloneNode(true);

  var avatarElement      = reviewElement.querySelector('.review-author');
  var ratingElement      = reviewElement.querySelector('.review-rating');
  var descriptionElement = reviewElement.querySelector('.review-text');

  var avatarValue;
  var ratingValue;
  var descriptionValue;

  var avatarLoadTimeout;


  avatarValue = new Image();
  avatarValue.src = data.author.picture;

  avatarValue.onload = function(){
    clearTimeout(avatarLoadTimeout);
    avatarValue.width = REVIEW_AUTHOR_AVATAR_SIZE;
    avatarValue.height = REVIEW_AUTHOR_AVATAR_SIZE;
    avatarValue.alt = data.author.name;
    avatarValue.title = data.author.name;
    avatarValue.className = avatarElement.className;
    reviewElement.replaceChild(avatarValue, avatarElement);
  };

  avatarValue.onerror = function(){
    reviewElement.className += ' review-load-failure';
  };

  avatarLoadTimeout = setTimeout(function(){
    avatarValue.src = '';
    reviewElement.className += ' review-load-failure';
  }, LOADING_TIMEOUT);


  ratingValue = convertGradeValueToWord(data.rating);
  ratingElement.className += data.rating >= 2 ? ' review-rating-' + ratingValue : '';

  descriptionValue = data.description;
  descriptionElement.textContent = descriptionValue;

  return reviewElement;
}


containerElement = document.querySelector('.reviews-list');

function reviewsOutput() {
  reviews.forEach(function(review){
    var reviewValue = getElementFromTemplate(review);
    containerElement.appendChild(reviewValue);
  });
}


reviews = null;

function __reviewsLoadCallback(data) {
  reviews = data;
  if ( reviews ) {
    reviewsOutput();
  }
}

var scriptElement = document.createElement('script');
scriptElement.src = 'https://up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js';
document.body.appendChild(scriptElement);
