'use strict';

(function () {
  var accordion = document.querySelector('.accordion');
  var accordionSwitchers = accordion.querySelectorAll('.accordion h2');
  var accordionContents = accordion.querySelectorAll('.accordion__links');

  accordion.classList.add('accordion--js');

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

  accordionSwitchers.forEach(function (item, index) {
    addSwitcherEvents(item, accordionContents[index]);
  });
})();
