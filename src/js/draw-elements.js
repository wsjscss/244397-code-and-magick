'use strict';

var reviewTemplate = document.querySelector('#review-template');
var reviewClone;

if ('content' in reviewTemplate) {
  reviewClone = reviewTemplate.content.querySelector('.review');
} else {
  reviewClone = reviewTemplate.querySelector('.review');
}

/**
 * Получаем объект их массива и сонтейнер
 * Создаем новый элемент на основе данных из data, ждем загрузки картинок,
 * вставляем элемент в контейнер
 * @param {object} data
 * @param {object} cont
 */
module.exports = function(data, cont) {

  var element = reviewClone.cloneNode(true);
  element.querySelector('.review-rating').style.width = data.rating * 40 + 'px';
  element.querySelector('.review-rating').style.maxWidth = '200px';
  element.querySelector('.review-text').textContent = data.text;

  var img = new Image(124, 124);

  img.onload = function() {
    element.querySelector('.review-author').src = data.authorImg;
  };

  img.onerror = function() {
    element.querySelector('.review-author').classList.add('review-load-failure');
  };

  img.src = data.authorImg;

  cont.appendChild(element);

  return element;
};
