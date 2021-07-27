'use strict';

(function () {
  var PHONE_LENGTH = 18;

  var askFormPersonalDataWrappers = document.querySelectorAll('.ask-form__personal-data');
  var askFormPersonalDataFields = document.querySelectorAll('.ask-form__personal-data input');
  var askFormConsentWrappers = document.querySelectorAll('.ask-form__consent');
  var askFormConsentCheckboxes = document.querySelectorAll('.ask-form__consent input');
  var askFormPhones = document.querySelectorAll('.ask-form__phone input');
  var askFormSubmits = document.querySelectorAll('.ask-form__submit');

  // маска телефона
  window.$(document).ready(function () {
    window.$('.ask-form__phone input').mask('+7 (000) 000 00 00');
  });

  // Проверка длины номера телефона
  function checkPhoneLength(phoneField) {
    if (phoneField.value.length < PHONE_LENGTH) {
      phoneField.setCustomValidity('+7 (XXX) XXX XX XX');
    } else {
      phoneField.setCustomValidity('');
    }

    phoneField.reportValidity();
  }

  if (askFormPhones) {
    askFormPhones.forEach(function (item) {
      item.addEventListener('input', function () {
        checkPhoneLength(item);
      });
    });
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
  if (askFormPersonalDataWrappers && askFormPersonalDataFields) {
    askFormPersonalDataFields.forEach(function (item, index) {
      item.addEventListener('focus', function () {
        removeInvalidStyle(item, 'ask-form__field--invalid', askFormPersonalDataWrappers[index]);
      });
    });
  }

  if (askFormConsentWrappers && askFormConsentCheckboxes) {
    askFormConsentCheckboxes.forEach(function (item, index) {
      item.addEventListener('focus', function () {
        removeInvalidStyle(item, 'ask-form__field--invalid-checkbox', askFormConsentWrappers[index]);
      });
    });
  }

  // добавление невалидным элементам класса стилей невалидного элемента формы при её отправке
  if (askFormSubmits && askFormPersonalDataFields && askFormPersonalDataWrappers && askFormConsentCheckboxes && askFormConsentWrappers) {
    askFormSubmits.forEach(function (item) {
      item.addEventListener('click', function () {
        for (var i = 0; i < askFormPersonalDataFields.length; i++) {
          setInvalidStyle(askFormPersonalDataFields[i], 'ask-form__field--invalid', askFormPersonalDataWrappers[i]);
        }

        for (var j = 0; j < askFormConsentCheckboxes.length; j++) {
          setInvalidStyle(askFormConsentCheckboxes[j], 'ask-form__field--invalid-checkbox', askFormConsentWrappers[j]);
        }
      });
    });
  }
})();
