'use strict';

(function () {
  var body = document.querySelector('body');
  var askModalOpenButton = document.querySelector('.page-header__modal-open');
  var askModal = document.querySelector('.ask-form--modal');
  var askModalCloseButton = askModal.querySelector('.ask-form__modal-close');
  var overlay = document.querySelector('.overlay');

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

      document.addEventListener('keydown', onEscPress);
      overlay.addEventListener('click', closeAskModal);
    }
  }

  function closeAskModal() {
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
