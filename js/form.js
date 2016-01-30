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
  var markElements = formElement.querySelectorAll('[name="review-mark"]');
  var submitElement = formElement.querySelector('.review-submit');

  var i;

  function isGradePositive() {
    if ( formElement.querySelector('[name="review-mark"]:checked').value >= LOWEST_POSITIVE_GRADE) {
      return true;
    } else {
      return false;
    }
  }

  function checkRequirements() {
    if ( nameElement.value && (isGradePositive() || textElement.value) ) {
      submitElement.disabled = false;
    } else {
      submitElement.disabled = true;
    }
  }

  function validate() {
    
    checkRequirements();
  }


  validate();

  nameElement.onchange = function() {
    validate();
  };

  textElement.onchange = function() {
    validate();
  };

  for (i = 0; i < markElements.length; i++ ) {
    markElements[i].onchange = function() {
      validate();
    }
  }


})();
