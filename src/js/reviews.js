'use strict';

var getData = require('./get-data');
var drawElements = require('./draw-elements');

var reviewsContainer = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');
reviewsFilter.classList.add('invisible');

getData('data.js', draw);

reviewsFilter.classList.remove('invisible');

/**
 * Проходим по массиву data и для каждого объекта массива отрисовываем
 * данные на в контейнер
 * @param {Array} data
 */
function draw(data) {
  data.forEach(function(el) {
    drawElements(el, reviewsContainer);
  });
}
