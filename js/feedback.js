'use strict';

  var REVIEW_AUTHOR_AVATAR_SIZE = 124;

  var container = document.querySelector('.reviews-list');

  function getElementFromTemplate(data) {

    var template = document.querySelector('#review-template');
    var element = 'content' in template ? template.content.children[0].cloneNode(true) : template.children[0].cloneNode(true);
    
    var grade;

    switch (data.rating) {
      case 2:
        grade = 'two';
        break;
      case 3:
        grade = 'three';
        break;
      case 4:
        grade = 'four';
        break;
      case 5:
        grade = 'five';
        break;
    }

    element.querySelector('.review-rating').className += data.rating >= 2 ? ' review-rating-' + grade : '';
    element.querySelector('.review-text').textContent = data.description;


    var avatar = new Image();
    avatar.src = data.author.picture;

    avatar.onload = function(){
      element.querySelector('.review-author').src = avatar.src;
      element.querySelector('.review-author').width = REVIEW_AUTHOR_AVATAR_SIZE;
      element.querySelector('.review-author').height = REVIEW_AUTHOR_AVATAR_SIZE;
      element.querySelector('.review-author').alt = 'data.author.name';
      element.querySelector('.review-author').title = data.author.name;
    };

    avatar.onload.onerror = function(){
      element.className += ' review-load-failure';
    };


    return element;
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
