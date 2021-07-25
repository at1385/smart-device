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
