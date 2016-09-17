'use strict';

var reviewTemplate = document.querySelector('#review-template');
var reviewClone;

if ('content' in reviewTemplate) {
  reviewClone = reviewTemplate.content.querySelector('.review');
} else {
  reviewClone = reviewTemplate.querySelector('.review');
}


var Review = function (data, cont) {

  this.data = data;
  this.cont = cont;

  this.element = reviewClone.cloneNode(true);
  this.element.querySelector('.review-rating').style.width = this.data.rating * 40 + 'px';
  this.element.querySelector('.review-rating').style.maxWidth = '200px';
  this.element.querySelector('.review-text').textContent = this.data.description;
  this.element.querySelector('.review-author-name').textContent = this.data.author.name;
  this.loadImage = this.loadImage.bind(this);
  this.errorImage = this.errorImage.bind(this);

  this.img = new Image(124, 124);

  this.img.onload = this.loadImage();
  this.img.onerror = this.errorImage();
  this.img.src = this.data.author.picture;

  /**
   * Добавляем событие клика для всех элементов .review-quiz-answer
   */
  this.quizAnswer = this.element.querySelectorAll('.review-quiz-answer');
  [].forEach.call(this.quizAnswer, function(el) {
    el.onclick = function() {
      this.quizAnswer.forEach(function(e) {
        e.classList.remove('review-quiz-answer-active');
      });
      this.classList.add('review-quiz-answer-active');
    };
  });

  /**
   * Удаляем событие клика со всех эллементов .review-quiz-answer
   */
  this.remove = function() {
    this.quizAnswer.forEach(function(el) {
      el.onclick = null;
    });
  };

  cont.appendChild(this.element);

};

/**
 * Если изображение загрузилось, то вставляем его в src
 */
Review.prototype.loadImage = function () {
  this.element.querySelector('.review-author').src = this.data.author.picture;
};

/**
 * Если изображение не загрузилось, добавляем специальный класс
 */
Review.prototype.errorImage = function () {
  this.element.querySelector('.review-author').classList.add('review-load-failure');
}


module.exports = Review;
