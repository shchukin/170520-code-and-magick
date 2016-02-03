'use strict';

  var REVIEW_AUTHOR_AVATAR_SIZE = 124;

  var container = document.querySelector('.reviews-list');

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

    
    avatarValue = new Image();
    avatarValue.src = data.author.picture;

    avatarValue.onload = function(){
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


    ratingValue = convertGradeValueToWord(data.rating);
    ratingElement.className += data.rating >= 2 ? ' review-rating-' + ratingValue : '';

    descriptionValue = data.description;
    descriptionElement.textContent = descriptionValue;

    return reviewElement;
  }

  function reviewsOutput() {
    if ( reviews ) {
      reviews.forEach(function(review){
        var element = getElementFromTemplate(review);
        container.appendChild(element);
      });
    }
  }


  var reviews = null;

  function __reviewsLoadCallback(data) {
    reviews = data;
    reviewsOutput();
  }

  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js';
  document.body.appendChild(scriptElement);
