'use strict';

/**
 * Получем данные из JSONP запросв и сохраняем полученые данные в reviews
 * Вызываем функцию callback с полученными данными из reviews
 * @param {string} url
 * @param {function} url
 */
module.exports = function(url, callback) {

  /**
   * Инициализируем функцию для получения данных из JSONP файла и запускаем
   * функцию callback
   * @param {string} data
   */
  window.jspCallack = function(data) {
    var reviews = data;
    callback(reviews);
  };

  var sc = document.createElement('script');
  sc.src = url;
  document.body.appendChild(sc);
};
