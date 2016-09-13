'use strict';

/**
 * Функция конструктор, которая открывает полноэкранную галлерею с просмотром изображений
 * @param {Array} pictures
 */
window.Gallery = function(pictures) {
  var self = this;

  this.galleryOverlay = document.querySelector('.overlay-gallery');
  this.currentImageIndicator = this.galleryOverlay.querySelector('.preview-number-current');
  this.totalImagesIndicator = this.galleryOverlay.querySelector('.preview-number-total');
  this.closeButton = this.galleryOverlay.querySelector('.overlay-gallery-close');
  this.galleryPreview = this.galleryOverlay.querySelector('.overlay-gallery-preview');
  this.btnNextImage = this.galleryOverlay.querySelector('.overlay-gallery-control-right');
  this.btnPrevImage = this.galleryOverlay.querySelector('.overlay-gallery-control-left');

  this.pictures = pictures;
  this.activePicture = 0;

  /**
   * Закрываем галлерею при клике на кнопку closeButton
   */
  this.closeButton.onclick = function() {
    self.hide();
  };

  /**
   * Показываем следующее изображение
   */
  this.btnNextImage.onclick = function() {
    if (self.activePicture < self.pictures.length - 1) {
      self.activePicture++;
      self.setActivePicture(self.activePicture);
      self.setActiveControls();
    }
  };

  /**
   * Показываем предыдущее изображение
   */
  this.btnPrevImage.onclick = function() {
    if (self.activePicture > 0) {
      self.activePicture--;
      self.setActivePicture(self.activePicture);
      self.setActiveControls();
    }
  };
};

/**
 * Открываем галлерею с тем изображением, на которое кликнул пользователь
 * Проверяем если контролы активны
 * @param {number} index
 */
Gallery.prototype.show = function(index) {
  this.galleryOverlay.classList.remove('invisible');
  this.setActivePicture(index);
  this.setActiveControls();
};

/**
 * Создаём изображение, вставляем в него линк на нужное изображение,
 * вставляем в контейнер
 * Если изображение уже существует, то заменяем старое на новое
 * @param {number} index
 */
Gallery.prototype.setActivePicture = function(index) {
  this.activePicture = index;
  this.currentImageIndicator.innerHTML = this.activePicture + 1;
  this.totalImagesIndicator.innerHTML = this.pictures.length;

  var elm = new Image();
  elm.src = this.pictures[this.activePicture];

  if (this.galleryPreview.querySelector('img')) {
    this.galleryPreview.replaceChild(elm, this.galleryPreview.querySelector('img') );
  } else {
    this.galleryPreview.appendChild(elm);
  }

};

/**
 * Закрываем галлерею и очищаем все события
 */
Gallery.prototype.hide = function() {
  this.galleryOverlay.classList.add('invisible');
  this.closeButton.onclick = null;
  this.btnNextImage.onclick = null;
  this.btnPrevImage.onclick = null;
};

/**
 * Устанавливаем контролы в активное и неактивное состояние
 */
Gallery.prototype.setActiveControls = function() {
  if (this.activePicture <= 0) {
    this.btnPrevImage.style.opacity = '.2';
    this.btnPrevImage.style.pointerEvents = 'none';
    this.btnNextImage.style.opacity = '1';
    this.btnNextImage.style.pointerEvents = 'all';
  } else if (this.activePicture >= this.pictures.length - 1) {
    this.btnNextImage.style.opacity = '.2';
    this.btnNextImage.style.pointerEvents = 'none';
    this.btnPrevImage.style.opacity = '1';
    this.btnPrevImage.style.pointerEvents = 'all';
  } else {
    this.btnNextImage.style.opacity = '1';
    this.btnNextImage.style.pointerEvents = 'all';
    this.btnPrevImage.style.opacity = '1';
    this.btnPrevImage.style.pointerEvents = 'all';
  }
};
