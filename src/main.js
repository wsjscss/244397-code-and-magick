'use strict';

require('./check');
require('./form');
require('./game');
require('./reviews');
require('./gallery');


(function() {
  var game = new window.Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(window.Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

/* @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    window.form.open(function() {
      game.setGameStatus(window.Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  window.form.onClose = function() {
    game.setDeactivated(false);
  };

  /**
   * Для всех эллементов .photogallery-image добавить открытие галлереи при клике,
   * заменить ссылку в href на void(0), взять ссылку на изображение и поставить в массив
   * Массив с сылками на изображения передать в функцию-конструктор Gallery
   */
  var galleryImages = document.querySelectorAll('.photogallery-image');
  var galleryImagesSrc = [];

  [].forEach.call(galleryImages, function(el, i) {
    galleryImagesSrc.push( el.querySelector('img').src );
    el.setAttribute('href', 'javascript:void(0)');

    el.onclick = function() {
      var gallery = new Gallery(galleryImagesSrc);
      gallery.show(i);
    };
  });

})();
