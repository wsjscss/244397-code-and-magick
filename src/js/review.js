'use strict';

var reviewTemplate = document.querySelector('#review-template');
var reviewClone;

if ('content' in reviewTemplate) {
  reviewClone = reviewTemplate.content.querySelector('.review');
} else {
  reviewClone = reviewTemplate.querySelector('.review');
}

module.exports = function Review(data, cont) {
  // console.log('Review start');

  var self = this;

  this.data = data;
  this.cont = cont;

  this.element = reviewClone.cloneNode(true);
  this.element.querySelector('.review-rating').style.width = this.data.rating * 40 + 'px';
  this.element.querySelector('.review-rating').style.maxWidth = '200px';
  this.element.querySelector('.review-text').textContent = this.data.text;

  this.img = new Image(124, 124);

  this.img.onload = function() {
    self.element.querySelector('.review-author').src = self.data.authorImg;
  };

  this.img.onerror = function() {
    self.element.querySelector('.review-author').classList.add('review-load-failure');
  };

  this.img.src = this.data.authorImg;


  /**
   * Добавляем событие клика для всех элементов .review-quiz-answer
   */
  this.quizAnswer = this.element.querySelectorAll('.review-quiz-answer');

  for (var i = 0; i < this.quizAnswer.length; i++) {
    this.quizAnswer[i].onclick = function() {
      self.removeClassFromAllElements(self.quizAnswer, 'review-quiz-answer-active');
      this.classList.add('review-quiz-answer-active');
    };
  }

  /**
   * Удаляем событие клика со всех эллементов .review-quiz-answer
   */
  this.remove = function() {
    this.quizAnswer.forEach(function(el) {
      el.onclick = null;
    });
  };

  /**
   * Удаляем класс из всех эллементов массива
   * @param {Array} element
   * @param {String} classname
   */
  this.removeClassFromAllElements = function(el, cname) {
    for (var j = 0; j < el.length; j++) {
      el[j].classList.remove(cname);
    }
  };


  cont.appendChild(this.element);
};
