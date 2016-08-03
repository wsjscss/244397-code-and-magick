/**
 * Ф-ция получает данные, проверяет их тип и позвращает сообщение
 * @param {неопределенно} a - первое значение
 * @param {неопределенно} b - второе хначение
 */

function getMessage(a, b){

  /**
   * Если первый аргумент, a, имеет тип boolean
   */
  if (typeof a === 'boolean') {
    if (a) {                                  //Если он true
      return 'Я попал в ' + b;
    } else {                                  //Если он false
      return 'Я никуда не попал';
    }
  }


  /**
   * Если первый аргумент имеет числовой тип
   */
  if (typeof a === 'number'){
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }


  /**
   * Если первый аргумент массив
   */
  if (Array.isArray(a) && !Array.isArray(b)){
    var numberOfSteps = summArrays(a);
    return 'Я прошёл '+ numberOfSteps +' шагов';
  }


  /**
   * Если оба аргумента массивы
   */
  if (Array.isArray(a) && Array.isArray(b)) {
    var distancePath = summArrays(a) + summArrays(b)
    return 'Я прошёл '+ distancePath +' метров'
  }


  /**
   * Calculate sum of all array elements
   * @param {Array} - arr
   * @return sum of all Array elements
   */
  function summArrays(arr) {
    var result = 0

    arr.forEach(function (a) {
      result += a
    })

    return result
  };
};
