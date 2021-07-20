'use strict';

(function () {
  var PHONE_LENGTH = 17;

  var askForm = document.querySelector('#ask-form');
  var askFormFields = askForm.querySelectorAll('.ask-form__field');
  var askFormCheckboxes = askForm.querySelectorAll('.ask-form__checkbox');
  var askFormLabels = askForm.querySelectorAll('.ask-form__label');
  var askFormPhone = askForm.querySelector('#ask-form-customer-tel');
  var askFormSubmit = askForm.querySelector('.ask-form__submit');

  // маска телефона
  window.$(document).ready(function () {
    window.$('#ask-form-customer-tel').mask('+7 (000) 000 00 00');
  });

  // Проверка длины номера телефона
  askFormPhone.addEventListener('input', function () {
    if (askFormPhone.value.length < PHONE_LENGTH) {
      askFormPhone.setCustomValidity('+7 (XXX) XXX XX XX');
    } else {
      askFormPhone.setCustomValidity('');
    }

    askFormPhone.reportValidity();
  });

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
  function addFormElementFocus(formElement, styleClass, targetElement) {
    formElement.addEventListener('focus', function () {
      removeInvalidStyle(formElement, styleClass, targetElement);
    });
  }

  for (var i = 0; i < askFormFields.length; i++) {
    addFormElementFocus(askFormFields[i], 'ask-form__field--invalid');
  }

  for (var j = 0; j < askFormCheckboxes.length; j++) {
    addFormElementFocus(askFormCheckboxes[j], 'ask-form__label--invalid', askFormLabels[j]);
  }

  askFormSubmit.addEventListener('click', function () {
    for (var k = 0; k < askFormFields.length; k++) {
      setInvalidStyle(askFormFields[k], 'ask-form__field--invalid');
    }

    for (var l = 0; l < askFormCheckboxes.length; l++) {
      setInvalidStyle(askFormCheckboxes[l], 'ask-form__label--invalid', askFormLabels[l]);
    }
  });
})();
