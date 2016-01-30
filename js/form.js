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

  /* Form elements */
  var formElement = document.querySelector('.review-form');
  var nameElement = formElement.querySelector('#review-name');
  var textElement = formElement.querySelector('#review-text');
  var markElements = formElement.querySelectorAll('[name="review-mark"]');
  var submitElement = formElement.querySelector('.review-submit');

  /* Form notification labels elements */
  var nameNotifyElement = formElement.querySelector('.review-fields-name');
  var textNotifyElement = formElement.querySelector('.review-fields-text');
  var notifyContainerElement = formElement.querySelector('.review-fields');

  /* Form state */
  var markPositive;
  var nameValidity;
  var textValidity;

  /* Helpers */
  var i;


  function changeMarkPositive() {
    if ( formElement.querySelector('[name="review-mark"]:checked').value >= LOWEST_POSITIVE_GRADE) {
      markPositive = true;
    } else {
      markPositive = false;
    }
  }

  function validateName() {
    if ( nameElement.value ) {
      nameValidity = true;
    } else {
      nameValidity = false;
    }
  }

  function validateText() {
    if (markPositive || textElement.value) {
      textValidity = true;
    } else {
      textValidity = false;
    }
  }

  function setValidationHelpers() {

    if ( nameValidity ) {
      nameNotifyElement.style.display = 'none';
    } else {
      nameNotifyElement.style.display = 'inline';
    }

    if( textValidity ) {
      textNotifyElement.style.display = 'none';
    } else {
      textNotifyElement.style.display = 'inline';
    }

    if ( nameValidity && textValidity ) {
      notifyContainerElement.style.display = 'none';
    } else {
      notifyContainerElement.style.display = 'inline-block';
    }

    if ( nameValidity && textValidity ) {
      submitElement.disabled = false;
    } else {
      submitElement.disabled = true;
    }

  }

  changeMarkPositive();
  validateName();
  validateText();
  setValidationHelpers();

  nameElement.oninput = function() {
    validateName();
    setValidationHelpers();
  };
  textElement.oninput = function() {
    validateText();
    setValidationHelpers();
  };

  function onMarkChange () {
    changeMarkPositive();
    validateText();
    setValidationHelpers();
  }

  for (i = 0; i < markElements.length; i++ ) {
    markElements[i].onchange = onMarkChange;
  }


})();
