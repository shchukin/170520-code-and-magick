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

  var nameValidity;
  var textValidity;

  var i;


  function isGradePositive() {
    if ( formElement.querySelector('[name="review-mark"]:checked').value >= LOWEST_POSITIVE_GRADE) {
      return true;
    } else {
      return false;
    }
  }

  function labelsVisibility() {
    if ( nameValidity && textValidity ) {
      notifySectionElement.style.display = 'none';
    }
    else {
      notifySectionElement.style.display = 'inline-block';
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
      nameValidity = true;
      nameNotifyElement.style.display = 'none';
    } else {
      nameValidity = false;
      nameNotifyElement.style.display = 'inline';
    }
    labelsVisibility();
    checkRequirements();
  }

  function validateText() {
    if (isGradePositive() || textElement.value) {
      textValidity = true;
      textNotifyElement.style.display = 'none';
    } else {
      textValidity = false;
      textNotifyElement.style.display = 'inline';
    }
    labelsVisibility();
    checkRequirements();
  }


  validateName();
  validateText();

  nameElement.onchange = validateName;
  textElement.onchange = validateText;
  for (i = 0; i < markElements.length; i++ ) {
    markElements[i].onchange = validateText;
  }


})();
