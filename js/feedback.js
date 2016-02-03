'use strict';

  var reviews = null;

  function __reviewsLoadCallback(data) {
    reviews = data;
    console.log(reviews);
  }

  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js';
  document.body.appendChild(scriptElement);
