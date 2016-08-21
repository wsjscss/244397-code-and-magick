'use strict';

var reviews = null;
var reviewsFilter = document.querySelector('.reviews-filter');
reviewsFilter.classList.add('invisible');

var reviewsContainer = document.querySelector('.reviews-list');
var reviewTemplate = document.querySelector('#review-template');
var reviewClone;

if ('content' in reviewTemplate) {
  reviewClone = reviewTemplate.content.querySelector('.review');
} else {
  reviewClone = reviewTemplate.querySelector('.review');
}


/**
 * Получем данные из JSONP запросв и сохраняем полученые данные в reviews
 * Вызываем функцию callback с полученными данными из reviews
 * @param {string} url
 * @param {function} url
 */
var getData = function(url, callback) {

  /**
   * Инициализируем функцию для получения данных из JSONP файла и запускаем
   * функцию callback
   * @param {string} data
   */
  window.jspCallack = function(data) {
    reviews = data;
    callback(reviews);
  };

  var sc = document.createElement('script');
  sc.src = url;
  document.body.appendChild(sc);
};

getData('data.js', draw);

/**
 * Проходим по массиву data и для каждого объекта массива отрисовываем
 * данные на в контейнер
 * @param {Array} data
 */
function draw(data) {
  data.forEach(function(el) {
    drawElemOnStage(el, reviewsContainer);
  });
}

/**
 * Получаем объект их массива и сонтейнер
 * Создаем новый элемент на основе данных из data, ждем загрузки картинок,
 * вставляем элемент в контейнер
 * @param {object} data
 * @param {object} cont
 */
function drawElemOnStage(data, cont) {
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

  reviewsFilter.classList.remove('invisible');

  return element;
}
