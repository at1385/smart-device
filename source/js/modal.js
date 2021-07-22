'use strict';

(function () {
  var body = document.querySelector('body');
  var askModalOpenButton = document.querySelector('.page-header__modal-open');
  var askModal = document.querySelector('.ask-form--modal');
  var askModalCloseButton = askModal.querySelector('.ask-form__modal-close');
  var askModalCustomerName = askModal.querySelector('#ask-modal-customer-name');
  var askModalCustomerPhone = askModal.querySelector('#ask-modal-customer-tel');
  var askModalCustomerQuestion = askModal.querySelector('#ask-modal-customer-question');
  var overlay = document.querySelector('.overlay');

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

  function openAskModal() {
    if (askModal && overlay) {
      askModal.classList.remove('ask-form--hidden');
      overlay.classList.remove('overlay--hidden');

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
