'use strict';

  var container = document.querySelector('.reviews-list');

  function getElementFromTemplate(data) {
    var template = document.querySelector('#review-template');
    var element = template.content.children[0].cloneNode(true);

    element.querySelector('.review-text').textContent = data.description;

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
