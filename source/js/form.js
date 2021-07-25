'use strict';

(function () {
  var PHONE_LENGTH = 18;

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
  if (askFormFields) {
    askFormFields.forEach(function (item) {
      item.addEventListener('focus', function () {
        removeInvalidStyle(item, 'ask-form__field--invalid');
      });
    });
  }

  if (askFormCheckboxes) {
    askFormCheckboxes.forEach(function (item, index) {
      item.addEventListener('focus', function () {
        removeInvalidStyle(item, 'ask-form__label--invalid', askFormLabels[index]);
      });
    });
  }

  // добавление невалидным элементам класса стилей невалидного элемента формы при её отправке
  if (askFormSubmits && askFormFields && askFormCheckboxes && askFormLabels) {
    askFormSubmits.forEach(function (item) {
      item.addEventListener('click', function () {
        for (var i = 0; i < askFormFields.length; i++) {
          setInvalidStyle(askFormFields[i], 'ask-form__field--invalid');
        }

        for (var j = 0; j < askFormCheckboxes.length; j++) {
          setInvalidStyle(askFormCheckboxes[j], 'ask-form__label--invalid', askFormLabels[j]);
        }
      });
    });
  }
})();
