'use strict';

(function() {

  var reviews = null;

  var REVIEW_AUTHOR_AVATAR_SIZE = 124;
  var LOADING_TIMEOUT = 10000;

  var template = document.querySelector('#review-template');

  var filtersElement = document.querySelector('.reviews-filter');
  var reviewsListElement = document.querySelector('.reviews-list');


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


  function renderReviews(data) {

    var reviewValue = document.createDocumentFragment();

    data.forEach(function(item) {
      reviewValue.appendChild( getElementFromTemplate(item) );
    });

    reviewsListElement.innerHTML = '';
    reviewsListElement.appendChild(reviewValue);

  }


  function getReviews() {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://o0.github.io/assets/json/reviews.json');
    xhr.timeout = LOADING_TIMEOUT;
    
    xhr.onload = function (event) {
      reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
      filtersElement.className = filtersElement.className.replace('invisible', '').replace(/\s+/g, ' ').trim();
      reviews = JSON.parse( event.target.response );
      renderReviews( reviews );
    };

    xhr.onerror = function (event) {
      reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
      reviewsListElement.className += ' reviews-load-failure';
    };

    xhr.ontimeout = function (event) {
      reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
      reviewsListElement.className += ' reviews-load-failure';
    };

    xhr.send();

  }

  filtersElement.className += ' invisible';
  reviewsListElement.className += ' reviews-list-loading';

  getReviews();


  var activeFilter = 'reviews-all';
  var filters = filtersElement.querySelectorAll('input[type="radio"]');
  var i;

  function setActiveFilter(id) {
    if ( activeFilter === id ) {
      return;
    }

    var filteredReview = reviews.slice(0);

    switch (id) {

      case 'reviews-good':
        filteredReview = filteredReview.filter(function(element){
          return element.rating > 2;
        });
        filteredReview = filteredReview.sort(function(a, b){
          return b.rating - a.rating;
        });
        break;


      case 'reviews-bad':
        filteredReview = filteredReview.filter(function(element){
          return element.rating <= 2;
        });
        filteredReview = filteredReview.sort(function(a, b){
          return a.rating - b.rating;
        });
        break;

      case 'reviews-popular':
        filteredReview = filteredReview.sort(function(a, b){
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }

    renderReviews(filteredReview);
  }

  for( i = 0; i < filters.length; i++ ) {
    filters[i].onclick = function(event) {
      setActiveFilter(event.target.id);
    };
  }

})();
