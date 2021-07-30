'use strict';

(function () {
  var accordion = document.querySelector('.accordion');

  if (accordion) {
    var accordionSwitchers = accordion.querySelectorAll('.accordion h2');
    var accordionContents = accordion.querySelectorAll('.accordion__links');
  }

  if (accordion) {
    accordion.classList.add('accordion--js');
  }

  function addAccordionSwitchersFocus() {
    if (accordionSwitchers) {
      accordionSwitchers.forEach(function (item) {
        if (accordion.classList.contains('accordion--js') && window.matchMedia('screen and (max-width: 767px)').matches) {
          item.setAttribute('tabindex', 0);
        } else if (item.getAttribute('tabindex')) {
          item.removeAttribute('tabindex');
        }
      });
    }
  }

  addAccordionSwitchersFocus();

  window.addEventListener('resize', function () {
    addAccordionSwitchersFocus();
  });

  function toggleAccordionContent(switcher, content) {
    switcher.classList.toggle('accordion__opened-item');
    content.classList.toggle('accordion__links--opened');
  }

  function hideAccordionContent(switcher, content) {
    if (switcher.classList.contains('accordion__opened-item')) {
      switcher.classList.remove('accordion__opened-item');
      content.classList.remove('accordion__links--opened');
    }
  }

  function controlAccordionContent(switcher, content) {
    accordionSwitchers.forEach(function (item, index) {
      if (item !== switcher) {
        hideAccordionContent(item, accordionContents[index]);
      }
    });

    toggleAccordionContent(switcher, content);
  }

  function addSwitcherEvents(switcher, content) {
    switcher.addEventListener('click', function () {
      controlAccordionContent(switcher, content);
    });

    switcher.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        controlAccordionContent(switcher, content);
      }
    });
  }

  if (accordionSwitchers) {
    accordionSwitchers.forEach(function (item, index) {
      addSwitcherEvents(item, accordionContents[index]);
    });
  }
})();

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

'use strict';

(function () {
  var body = document.querySelector('body');
  var askModalOpenButton = document.querySelector('.page-header__modal-open');
  var askModal = document.querySelector('.ask-form--modal');
  var askModalScrollbar = document.querySelector('.ask-form__modal-wrapper');
  var askModalCloseButton = askModal.querySelector('.ask-form__modal-close');
  var askModalCustomerName = askModal.querySelector('#ask-modal-customer-name');
  var askModalCustomerPhone = askModal.querySelector('#ask-modal-customer-tel');
  var askModalCustomerQuestion = askModal.querySelector('#ask-modal-customer-question');
  var overlay = document.querySelector('.overlay');

  // скрытие/показ вертикального скроллбара для браузерного скроллбара по умолчанию
  function toggleDefaultScrollbar(element, minHeight, styleClass) {
    if (window.matchMedia(minHeight).matches) {
      element.classList.add(styleClass);
    } else {
      element.classList.remove(styleClass);
    }
  }

  window.addEventListener('resize', function () {
    toggleDefaultScrollbar(askModalScrollbar, '(min-height: 605px)', 'ask-form__modal-wrapper--hidden-scroll');
  });

  var isStorageSupport = true;
  var nameStorage = '';
  var phoneStorage = '';
  var questionStorage = '';

  try {
    nameStorage = localStorage.getItem('askModalCustomerName');
    phoneStorage = localStorage.getItem('askModalCustomerPhone');
    questionStorage = localStorage.getItem('askModalCustomerQuestion');
  } catch (err) {
    isStorageSupport = false;
  }

  function isEscKeydown(evt) {
    return evt.key === 'Escape' || evt.key === 'Esc';
  }

  function onEscPress(evt) {
    if (isEscKeydown(evt)) {
      closeAskModal();
    }
  }

  function existVerticalScroll() {
    return document.body.offsetHeight > window.innerHeight;
  }

  function getBodyScrollTop() {
    return (
      self.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  }

  function openAskModal() {
    if (askModal && overlay) {
      askModal.classList.remove('ask-form--hidden');
      overlay.classList.remove('overlay--hidden');

      body.dataset.scrollY = getBodyScrollTop();

      if (existVerticalScroll()) {
        body.classList.add('body-lock');
        body.style.top = '-' + body.dataset.scrollY + 'px';
      }

      askModalCustomerName.focus();

      if (nameStorage && askModalCustomerName) {
        askModalCustomerName.value = nameStorage;
      }

      if (phoneStorage && askModalCustomerPhone) {
        askModalCustomerPhone.value = phoneStorage;
      }

      if (questionStorage && askModalCustomerQuestion) {
        askModalCustomerQuestion.value = questionStorage;
      }

      document.addEventListener('keydown', onEscPress);
      overlay.addEventListener('click', closeAskModal);
    }
  }

  function closeAskModal() {
    if (isStorageSupport) {
      localStorage.setItem('askModalCustomerName', askModalCustomerName.value);
      localStorage.setItem('askModalCustomerPhone', askModalCustomerPhone.value);
      localStorage.setItem('askModalCustomerQuestion', askModalCustomerQuestion.value);
    }

    askModal.classList.add('ask-form--hidden');
    overlay.classList.add('overlay--hidden');

    if (existVerticalScroll()) {
      body.classList.remove('body-lock');
      window.scrollTo(0, +body.dataset.scrollY);
    }

    document.removeEventListener('keydown', onEscPress);
    overlay.removeEventListener('click', closeAskModal);
  }

  if (askModalOpenButton) {
    askModalOpenButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openAskModal();
    });
  }

  if (askModalCloseButton) {
    askModalCloseButton.addEventListener('click', function () {
      closeAskModal();
    });
  }
})();

'use strict';

(function () {
  var featuresScroll = document.querySelector('.promo__scroll-link');
  var features = document.querySelector('#features');
  var askFormScroll = document.querySelector('.promo__button');
  var askForm = document.querySelector('#ask-form');

  function scrollTo(element) {
    window.scroll({
      left: 0,
      top: element.offsetTop,
      behavior: 'smooth'
    });
  }

  if (featuresScroll && features) {
    featuresScroll.addEventListener('click', function (evt) {
      evt.preventDefault();
      scrollTo(features);
    });
  }

  if (askFormScroll && askForm) {
    askFormScroll.addEventListener('click', function (evt) {
      evt.preventDefault();
      scrollTo(askForm);
    });
  }
})();
