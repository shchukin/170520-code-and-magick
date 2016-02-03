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
    var avatarElement = reviewElement.querySelector('.review-author');

    var gradeFormatted = convertGradeValueToWord(data.rating);
    var avatarImage;

    avatarImage = new Image();
    avatarImage.src = data.author.picture;

    avatarImage.onload = function(){
      avatarImage.width = REVIEW_AUTHOR_AVATAR_SIZE;
      avatarImage.height = REVIEW_AUTHOR_AVATAR_SIZE;
      avatarImage.alt = data.author.name;
      avatarImage.title = data.author.name;
      avatarImage.className = avatarElement.className;
      reviewElement.replaceChild(avatarImage, avatarElement);
    };

    avatarImage.onload.onerror = function(){
      reviewElement.className += ' review-load-failure';
    };

    reviewElement.querySelector('.review-rating').className += data.rating >= 2 ? ' review-rating-' + gradeFormatted : '';
    reviewElement.querySelector('.review-text').textContent = data.description;

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
