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
