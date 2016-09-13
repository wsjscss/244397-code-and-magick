'use strict';

var getData = require('./get-data');
var drawElements = require('./draw-elements');
var Review = require('./review.js');

var reviewsContainer = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewFilterInput = reviewsFilter.querySelectorAll('input');
var reviewsMore = document.querySelector('.reviews-controls-more');

var PAGE_SIZE = 3;
var page = 0;
var filterId = 'reviews-all';

reviewsMore.classList.remove('invisible');

/** @param {function(Array.<Object>)} callback
 * @param {string} url
 */
var load = function(url, callback, filterId) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} evt*/
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData, filterId);
  };

  xhr.open('GET', url);
  xhr.send();
};

load('reviews.json', draw, filterId);

reviewsMore.addEventListener('click', function () {
  load('reviews.json', draw, filterId);
});

/**
 * Добавляем событие клика для .reviews-filter на стадии захвата, а не всплытия
 * Удаляем все что было в контейнере с отзывами
 * Обнуляем переменную page
 */
[].forEach.call(reviewFilterInput, function (el) {
  el.addEventListener('click', function (evt) {
    filterId = evt.target.getAttribute('id');
    reviewsContainer.innerHTML = '';
    page = 0;
    load('reviews.json', draw, filterId);
  }, false)
});


/**
 * Проходим по массиву data и для каждого объекта массива отрисовываем
 * данные на в контейнер
 * @param {Array} data
 * @param {string} filterId
 */
function draw(data, filterId) {

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  var filteredData;

  /**
   * В зависимости от фильтра, готовим новый массив
   */
  switch (filterId) {

    case 'reviews-all' :
      filteredData = data;
      break;

    case 'reviews-recent':
      /* А тут ошибочка. В JSON файле нет параметров по которым
      * можно сделать сортировку по времени
      */
      filteredData = data;
      break;

    case 'reviews-good':
      filteredData = data.filter(function (el) {
        return el.rating >= 3;
      });
      break;

    case 'reviews-bad':
      filteredData = data.filter(function (el) {
        return el.rating < 3;
      });
      break;

    case 'reviews-popular':
      filteredData = data.sort(function (a, b) {
        if (a.review_usefulness < b.review_usefulness) return 1;
        if (a.review_usefulness > b.review_usefulness) return -1;
      });
      break;

    case null:
      filteredData = data;
      break;
  }

  /**
   * Прячем кнопку "Ещё отзывы", если конец списка
   */
  if ( to >= filteredData.length) {
    reviewsMore.classList.add('invisible');
  }

  /**
   * Отрисовываем по 3 отзыва на странице
   */
  filteredData.slice(from, to).forEach(function(el) {
    var rev = new Review(el, reviewsContainer);
  });

  page++;
}
