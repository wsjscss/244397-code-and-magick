'use strict';

var getData = require('./get-data');
var drawElements = require('./draw-elements');

var reviewsContainer = document.querySelector('.reviews-list');

getData('data.js', draw);

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
