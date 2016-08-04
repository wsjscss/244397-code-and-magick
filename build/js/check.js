'use strict';

/**
* Получение 2 переменных и проверка их типов
* В зависимости от типа переменных выводится сообщение
* @param {*} a
* @param {*} b
*/
function getMessage(a, b){

  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  }

  if (typeof a === 'number'){
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }

  if (Array.isArray(a) && !Array.isArray(b)){
    var numberOfSteps = a.reduce(function (sum, current) {
      return sum + current;
    });

    return 'Я прошёл ' + numberOfSteps + ' шагов';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    var distancePath = calculatePath(a, b);
    
    return 'Я прошёл ' + distancePath + ' метров';
  }
}

/**
* Попарно перемножаем значения из 2 массивов и складываем полученные результаты
* @param {Array} - arr
* @param {Array} - arr
* @return {Number}
*/
function calculatePath(a, b) {
  var result = 0;

  for (var i = 0; i < a.length; i++) {
    result = result + a[i] * b[i];
  }

  return result;
}
