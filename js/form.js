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

  function labelsContainerVisibility() {
    if ( nameValidity && textValidity ) {
      notifyContainerElement.style.display = 'none';
    }
    else {
      notifyContainerElement.style.display = 'inline-block';
    }
  }

  function checkAllRequirements() {
    if ( nameValidity && textValidity ) {
      submitElement.disabled = false;
    } else {
      submitElement.disabled = true;
    }
  }

  function validateName() {
    if( nameElement.value ) {
      nameValidity = true;
      nameNotifyElement.style.display = 'none';
    } else {
      nameValidity = false;
      nameNotifyElement.style.display = 'inline';
    }
    labelsContainerVisibility();
    checkAllRequirements();
  }

  function validateText() {
    if (markPositive || textElement.value) {
      textValidity = true;
      textNotifyElement.style.display = 'none';
    } else {
      textValidity = false;
      textNotifyElement.style.display = 'inline';
    }
    labelsContainerVisibility();
    checkAllRequirements();
  }

  changeMarkPositive();
  validateName();
  validateText();

  nameElement.onchange = validateName;
  textElement.onchange = validateText;

  for (i = 0; i < markElements.length; i++ ) {
    markElements[i].onchange = function(){
      changeMarkPositive();
      validateText();
    };
  }


})();
