'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  //formOpenButton.onclick = function(evt) {
  //  evt.preventDefault();
    formContainer.classList.remove('invisible');
  //};

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
  var submitElement = formElement.querySelector('.review-submit');



  function isGradePositive() {
    if( formElement.querySelector('[name="review-mark"]:checked').value >= LOWEST_POSITIVE_GRADE) {
      return true;
    } else {
      return false;
    }
  }


  function checkRequirements() {

    if ( ! nameElement.value) {

      ;

    } else if( ! isGradePositive() && ! textElement.value ) {

      ;

    } else {

      submitElement.disabled = false;

    }
  }
  

  submitElement.disabled = true;

  checkRequirements();

})();
