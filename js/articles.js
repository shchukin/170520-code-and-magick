'use strict';

var Review = require('review');

/* Constants */

var REVIEW_RELEVANCE_TIME_IN_DAYS = 14;
var REVIEW_LOWEST_POSITIVE_GRADE = 3;
var REVIEWS_PAGE_SIZE = 3;
var XHR_MAX_LOADING_TIME = 10000;


/* DOM elements */

var reviewsListElement = document.querySelector('.reviews-list');
var filtersElement = document.querySelector('.reviews-filter');
var moreElement = document.querySelector('.reviews-controls-more');


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
var filterActive = localStorage.getItem('filterActive') ? localStorage.getItem('filterActive') : filtersElement.querySelector('input[type="radio"]:checked').id;
var reviewsCurrentPage = 0;


/* Functions */

function applyFilter(id) {
  filterActive = id;
  reviewsFiltered = filters[id](reviews);
  renderReviews(reviewsFiltered, reviewsCurrentPage = 0, true);
  localStorage.setItem('filterActive', id);
  filtersElement.querySelector('#' + filterActive).checked = true; // in case it was changed from somewhere else and radio button was not clicked (eg. local storage init)
}

function initFilters() {
  filtersElement.addEventListener('click', function(event) {
    var clickedItem = event.target;
    if ( clickedItem.type === 'radio' && clickedItem.id !== filterActive ) {
      applyFilter(clickedItem.id);
    }
  });
}


function isMoreReviewToShow() {
  return reviewsCurrentPage + 1 < Math.ceil(reviewsFiltered.length / REVIEWS_PAGE_SIZE);
}

function initMoreButton() {
  moreElement.addEventListener('click', function() {
    if ( isMoreReviewToShow() ) {
      renderReviews(reviewsFiltered, ++reviewsCurrentPage, false);
    }
  });
}

function disableMoreButton() {
  if ( isMoreReviewToShow() && moreElement.className.indexOf('invisible') > -1 ) {
    moreElement.className = moreElement.className.replace('invisible', '').replace(/\s+/g, ' ').trim();
  }
  if ( !isMoreReviewToShow() && moreElement.className.indexOf('invisible') === -1 ) {
    moreElement.className += ' invisible';
  }
}


function renderReviews(data, pageNumber, replace) {

  var reviewValue = document.createDocumentFragment();

  var from = pageNumber * REVIEWS_PAGE_SIZE;
  var to = from + REVIEWS_PAGE_SIZE;
  var pageOfData = data.slice(from, to);

  pageOfData.forEach(function(item) {
    var reviewElement = new Review(item);
    reviewElement.render(reviewValue);
  });

  if (replace) {
    reviewsListElement.innerHTML = '';
  }

  reviewsListElement.appendChild(reviewValue);

  disableMoreButton();

}


function getReviews() {

  var xhr = new XMLHttpRequest();

  filtersElement.className += ' invisible';
  reviewsListElement.className += ' reviews-list-loading';

  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
  xhr.timeout = XHR_MAX_LOADING_TIME;

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
