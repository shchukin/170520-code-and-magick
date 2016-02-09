'use strict';

(function() {

  /* Constants */

  var REVIEW_RELEVANCE_TIME_IN_DAYS = 14;
  var LOWEST_POSITIVE_GRADE = 3;

  var REVIEW_AUTHOR_AVATAR_SIZE = 124;
  var LOADING_TIMEOUT = 10000;


  /* DOM elements */

  var reviewsListElement = document.querySelector('.reviews-list');
  var filtersElement = document.querySelector('.reviews-filter');
  var filtersItemElement = filtersElement.querySelectorAll('input[type="radio"]');


  /* Templates */

  var reviewTemplate = document.querySelector('#review-template');


  /* Data */

  var reviews = null;


  /* Application states */

  var activeFilter = filtersElement.querySelector('input[type="radio"]:checked').id;


  function convertGradeValueToWord( grade ) {
    var grades = [null, 'one', 'two', 'three', 'four', 'five'];
    return grades[grade];
  }


  function getElementFromTemplate( data ) {

    var reviewElement = ( 'content' in reviewTemplate ) ? ( reviewTemplate.content.children[0].cloneNode(true) ) : ( reviewTemplate.childNodes[0].cloneNode(true) );

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

    filtersElement.className += ' invisible';
    reviewsListElement.className += ' reviews-list-loading';

    xhr.open('GET', 'http://o0.github.io/assets/json/reviews.json');
    xhr.timeout = LOADING_TIMEOUT;
    
    xhr.onload = function (event) {
      reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
      filtersElement.className = filtersElement.className.replace('invisible', '').replace(/\s+/g, ' ').trim();
      reviews = JSON.parse( event.target.response );
      initFilters();
      setActiveFilter(activeFilter);
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


  function setActiveFilter(id) {

    activeFilter = id;

    var filteredReview = reviews.slice(0);


    switch (id) {

      case 'reviews-all':
        filteredReview = reviews.slice(0);
        break;

      case 'reviews-recent':
        var dateA;
        var dateB;
        var reviewDate;
        var reviewRelevanceExpireDate = new Date();
        reviewRelevanceExpireDate.setDate(reviewRelevanceExpireDate.getDate() - REVIEW_RELEVANCE_TIME_IN_DAYS);

        filteredReview = filteredReview.filter(function(element){
          reviewDate = new Date(element.date);
          return reviewDate > reviewRelevanceExpireDate;
        });

        filteredReview = filteredReview.sort(function(a, b){
          dateB = new Date(b.date);
          dateA = new Date(a.date);
          return dateB - dateA;
        });
        break;

      case 'reviews-good':
        filteredReview = filteredReview.filter(function(element){
          return element.rating >= LOWEST_POSITIVE_GRADE;
        });
        filteredReview = filteredReview.sort(function(a, b){
          return b.rating - a.rating;
        });
        break;

      case 'reviews-bad':
        filteredReview = filteredReview.filter(function(element){
          return element.rating < LOWEST_POSITIVE_GRADE;
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



  function initFilters() {
    var i;
    for( i = 0; i < filtersItemElement.length; i++ ) {
      filtersItemElement[i].onclick = function(event) {
        if ( activeFilter != event.target.id ) {
          setActiveFilter(event.target.id);
        }
      };
    }
  }



  getReviews();





})();
