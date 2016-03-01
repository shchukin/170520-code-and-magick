/**
 * @fileoverview части страницы отвечающая за фидбек.
 * XHR запрашивает данные и формирует список отзывов (объекты Review)
 * К отзывам применяется фильтрация, присутствует секция с фильтрами.
 * Список отзывов разбивается на страницы-секции, которые отображаются
 * одна под другой по нажатие на кнопку "показать еще"
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */


'use strict';

var Review = require('review');
var Tools = require('tools');

var tools = new Tools();

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

/**
 * Список фильтров по их синонимам.
 * @type {function}
 */
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



/**
 * Формируесть массив объектов ревью применением соответствующей сортировки.
 * Вызывается функция рендера для этого массива. Выбранный фильтр сохраняется в local storage
 * @param {string} id синоним фильтра
 */
function applyFilter(id) {
  filterActive = id;
  reviewsFiltered = filters[id](reviews); // [] - способ обращения к методу объекта. Через точку невозможно, так как в их именах есть символ "-"
  renderReviews(reviewsFiltered, reviewsCurrentPage = 0, true);
  localStorage.setItem('filterActive', id);
  filtersElement.querySelector('#' + filterActive).checked = true; // устанавливаем активный фильтр в ручную, в случае если вызов был не по клику на фильтр (например из local storage)
}

/**
 * Динамика фильтров. Клик отлавливается на всей секции фильтров,
 * затем проверяется какой конкретно фильтр был выбран и вызывается функция применения фильтра
 */
function initFilters() {
  filtersElement.addEventListener('click', function(event) {
    var clickedItem = event.target;
    if ( clickedItem.type === 'radio' && clickedItem.id !== filterActive ) {
      applyFilter(clickedItem.id);
    }
  });
}

/**
 * Если есть еще не показанные отзывы
 * @returns {boolean}
 */
function isMoreReviewToShow() {
  return reviewsCurrentPage + 1 < Math.ceil(reviewsFiltered.length / REVIEWS_PAGE_SIZE);
}

/**
 * Динамика кнопки "показать еще".
 * При возможности кликнуть на кнопку клик вызывает функцию рендера ревью для сдеующей страницы данных.
 */
function initMoreButton() {
  moreElement.addEventListener('click', function() {
    if ( isMoreReviewToShow() ) {
      renderReviews(reviewsFiltered, ++reviewsCurrentPage, false);
    }
  });
}

/**
 * Скрытие кнопки "показать еще" когда отображены все возможные ревью для текущего фильтра
 */
function disableMoreButton() {
  if ( isMoreReviewToShow() && moreElement.className.indexOf('invisible') > -1 ) {
    moreElement.className = tools.removeClass(moreElement.className, 'invisible');
  }
  if ( !isMoreReviewToShow() && moreElement.className.indexOf('invisible') === -1 ) {
    moreElement.className += ' invisible';
  }
}

/**
 * Вывод списка ревью. Осуществляется секциями.
 * По нажатию на кнопку "показать еще" к текущей страницы добавляется следующая
 * При применении фильтра отрендеренный ранее список зануляется
 * @param {Array.<Object>} data массив данных
 * @param {number} pageNumber номер страницы
 * @param {boolean} replace обновить страницу или добавить секцию
 */
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

/**
 * Запрос отзывов. Формирование данных.
 */
function getReviews() {

  var xhr = new XMLHttpRequest();

  // Скрываем фильтры до получения данных
  filtersElement.className += ' invisible';

  // Показываем индикатор загрузки
  reviewsListElement.className += ' reviews-list-loading';

  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
  xhr.timeout = XHR_MAX_LOADING_TIME;

  // В случае успешного получения данных показываем фильтры, скрываем индикатор загрузки,
  // парсим данные и применяем фильтр (сохраняется в local storage выше), которое вызывает рендер


  xhr.addEventListener("load", function(event) {
    reviewsListElement.className = tools.removeClass(reviewsListElement.className, 'reviews-list-loading');
    filtersElement.className = tools.removeClass(filtersElement.className, 'invisible');
    reviews = JSON.parse( event.target.response );
    applyFilter(filterActive);
  });

  xhr.addEventListener("error", function() {
    reviewsListElement.className = tools.removeClass(reviewsListElement.className, 'reviews-list-loading');
    reviewsListElement.className += ' reviews-load-failure';
  });

  xhr.addEventListener("timeout", function() {
    reviewsListElement.className = tools.removeClass(reviewsListElement.className, 'reviews-list-loading');
    reviewsListElement.className += ' reviews-load-failure';
  });

  xhr.send();

}

getReviews();
initFilters();
initMoreButton();
