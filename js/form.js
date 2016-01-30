'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

})();



(function() {

  var LOWEST_POSITIVE_GRADE = 3;

  var formElement = document.querySelector('.review-form');
  var nameElement = formElement.querySelector('#review-name');
  var textElement = formElement.querySelector('#review-text');
  var markElement = formElement.querySelectorAll('[name="review-mark"]');


})();
