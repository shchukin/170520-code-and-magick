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

  var nameNotifyElement = formElement.querySelector('.review-fields-name');
  var textNotifyElement = formElement.querySelector('.review-fields-text');
  var notifySectionElement = formElement.querySelector('.review-fields');

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

  function validateName() {
    if( nameElement.value ) {
      nameNotifyElement.style.display = 'none';
    } else {
      nameNotifyElement.style.display = 'inline';
    }
    checkRequirements();
  }

  function validateText() {
    if (isGradePositive() || textElement.value) {
      textNotifyElement.style.display = 'none';
    } else {
      textNotifyElement.style.display = 'inline';
    }
    checkRequirements();
  }


  validateName();
  validateText();

  nameElement.onchange = function() {
    validateName();
  };

  textElement.onchange = function() {
    validateText();
  };

  for (i = 0; i < markElements.length; i++ ) {
    markElements[i].onchange = function() {
      validateText();
    }
  }


})();
