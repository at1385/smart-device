'use strict';

(function () {
  var PHONE_LENGTH = 17;

  var askFormFields = document.querySelectorAll('.ask-form__field');
  var askFormCheckboxes = document.querySelectorAll('.ask-form__checkbox');
  var askFormLabels = document.querySelectorAll('.ask-form__label');
  var askFormPhones = document.querySelectorAll('.phone-field');
  var askFormSubmits = document.querySelectorAll('.ask-form__submit');

  // маска телефона
  window.$(document).ready(function () {
    window.$('.phone-field').mask('+7 (000) 000 00 00');
  });

  // Проверка длины номера телефона
  function addPhoneFieldInputEvent(phoneField) {
    phoneField.addEventListener('input', function () {
      if (phoneField.value.length < PHONE_LENGTH) {
        phoneField.setCustomValidity('+7 (XXX) XXX XX XX');
      } else {
        phoneField.setCustomValidity('');
      }

      phoneField.reportValidity();
    });
  }

  if (askFormPhones) {
    for (var m = 0; m < askFormPhones.length; m++) {
      addPhoneFieldInputEvent(askFormPhones[m]);
    }
  }

  // функции добавления/удаления класса стилей
  function addClass(styleClass, targetElement) {
    if (!targetElement.classList.contains(styleClass)) {
      targetElement.classList.add(styleClass);
    }
  }

  function removeClass(styleClass, targetElement) {
    if (targetElement.classList.contains(styleClass)) {
      targetElement.classList.remove(styleClass);
    }
  }

  // функции добавления/удаления класса стилей невалидного элемента формы
  function setInvalidStyle(formElement, styleClass, targetElement) {
    targetElement = targetElement || formElement;

    formElement.addEventListener('invalid', function () {
      addClass(styleClass, targetElement);
    });
  }

  function removeInvalidStyle(formElement, styleClass, targetElement) {
    targetElement = targetElement || formElement;

    formElement.addEventListener('keydown', function () {
      removeClass(styleClass, targetElement);
    });

    formElement.addEventListener('change', function () {
      removeClass(styleClass, targetElement);
    });
  }

  // добавление обработчиков события 'focus' элементам формы, для удаления класса стилей невалидного элемента
  function addFormElementFocusEvent(formElement, styleClass, targetElement) {
    formElement.addEventListener('focus', function () {
      removeInvalidStyle(formElement, styleClass, targetElement);
    });
  }

  if (askFormFields) {
    for (var i = 0; i < askFormFields.length; i++) {
      addFormElementFocusEvent(askFormFields[i], 'ask-form__field--invalid');
    }
  }

  if (askFormCheckboxes) {
    for (var j = 0; j < askFormCheckboxes.length; j++) {
      addFormElementFocusEvent(askFormCheckboxes[j], 'ask-form__label--invalid', askFormLabels[j]);
    }
  }

  // добавление обработчиков события 'click' кнопке отправки формы, для добавления класса стилей невалидного элемента
  function addFormSubmitClickEvent(askFormSubmit, formFields, formCheckboxes, styleClassFields, styleClassLabels, targetElements) {
    askFormSubmit.addEventListener('click', function () {
      for (var k = 0; k < formFields.length; k++) {
        setInvalidStyle(formFields[k], styleClassFields);
      }

      for (var l = 0; l < formCheckboxes.length; l++) {
        setInvalidStyle(formCheckboxes[l], styleClassLabels, targetElements[l]);
      }
    });
  }

  if (askFormSubmits && askFormFields && askFormCheckboxes && askFormLabels) {
    for (var n = 0; n < askFormSubmits.length; n++) {
      addFormSubmitClickEvent(askFormSubmits[n], askFormFields, askFormCheckboxes, 'ask-form__field--invalid', 'ask-form__label--invalid', askFormLabels);
    }
  }
})();
