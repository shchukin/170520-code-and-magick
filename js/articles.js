'use strict';

(function() {

  /* Constants */

  var REVIEW_RELEVANCE_TIME_IN_DAYS = 14;
  var REVIEW_LOWEST_POSITIVE_GRADE = 3;

  var REVIEW_AUTHOR_AVATAR_SIZE = 124;
  var TIMEOUT_OF_LOADING = 10000;

  var REVIEWS_PAGE_SIZE = 3;

  /* DOM elements */

  var reviewsListElement = document.querySelector('.reviews-list');
  var filtersElement = document.querySelector('.reviews-filter');
  var filtersItemElement = filtersElement.querySelectorAll('input[type="radio"]');
  var moreElement = document.querySelector('.reviews-controls-more');


  /* Templates */

  var reviewTemplate = document.querySelector('#review-template');


  /* Data */

  var reviews = null;
  var reviewsFiltered = null;


  /* Filtering module */

  var filters = {
    'reviews-all': function(data) {
      return data;
    },
    'reviews-recent': function(data) {
      var dateA;
      var dateB;
      var reviewDate;
      var reviewRelevanceExpireDate = new Date();
      reviewRelevanceExpireDate.setDate(reviewRelevanceExpireDate.getDate() - REVIEW_RELEVANCE_TIME_IN_DAYS);

      return data.filter(function(element) {
        reviewDate = new Date(element.date);
        return reviewDate > reviewRelevanceExpireDate;
      }).sort(function(a, b) {
        dateB = new Date(b.date);
        dateA = new Date(a.date);
        return dateB - dateA;
      });
    },
    'reviews-good': function(data) {
      return data.filter(function(element) {
        return element.rating >= REVIEW_LOWEST_POSITIVE_GRADE;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
    },
    'reviews-bad': function(data) {
      return data.filter(function(element) {
        return element.rating < REVIEW_LOWEST_POSITIVE_GRADE;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
    },
    'reviews-popular': function(data) {
      var filteredData = data.slice(0);
      return filteredData.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
    }
  };


  /* Application states */

  var filterActive = filtersElement.querySelector('input[type="radio"]:checked').id;

  var reviewsCurrentPage = 0;


  /* Functions */

  function applyFilter(id) {
    filterActive = id;
    reviewsFiltered = filters[id](reviews);
    renderReviews(reviewsFiltered, reviewsCurrentPage = 0, true);
  }

  function initSingleFilter(event) {
    if ( filterActive !== event.target.id ) {
      applyFilter(event.target.id);
    }
  }

  function initFilters() {
    var i;
    for ( i = 0; i < filtersItemElement.length; i++ ) {
      filtersItemElement[i].onclick = initSingleFilter;
    }
  }

  function initMoreButton() {
    moreElement.addEventListener('click', function(event){
      if( reviewsCurrentPage < Math.ceil(reviewsFiltered.length / REVIEWS_PAGE_SIZE) ) {
        renderReviews(reviewsFiltered, ++reviewsCurrentPage, false);
      }
    });
  }


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
    }, TIMEOUT_OF_LOADING);

    avatarValue.src = data.author.picture;

    ratingValue = convertGradeValueToWord(data.rating);
    ratingElement.className += data.rating >= 2 ? ' review-rating-' + ratingValue : '';

    descriptionValue = data.description;
    descriptionElement.textContent = descriptionValue;

    return reviewElement;
  }


  function renderReviews(data, pageNumber, replace) {

    var reviewValue = document.createDocumentFragment();

    var from = pageNumber * REVIEWS_PAGE_SIZE;
    var to = from + REVIEWS_PAGE_SIZE;
    var pageOfData = data.slice(from, to);

    pageOfData.forEach(function(item) {
      reviewValue.appendChild( getElementFromTemplate(item) );
    });

    if (replace) {
      reviewsListElement.innerHTML = '';
    }

    reviewsListElement.appendChild(reviewValue);

  }


  function getReviews() {

    var xhr = new XMLHttpRequest();

    filtersElement.className += ' invisible';
    reviewsListElement.className += ' reviews-list-loading';

    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.timeout = TIMEOUT_OF_LOADING;

    xhr.onload = function(event) {
      reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
      filtersElement.className = filtersElement.className.replace('invisible', '').replace(/\s+/g, ' ').trim();
      reviews = JSON.parse( event.target.response );
      applyFilter(filterActive);
    };

    xhr.onerror = function() {
      reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
      reviewsListElement.className += ' reviews-load-failure';
    };

    xhr.ontimeout = function() {
      reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
      reviewsListElement.className += ' reviews-load-failure';
    };

    xhr.send();

  }

  getReviews();
  initFilters();
  initMoreButton();



})();
