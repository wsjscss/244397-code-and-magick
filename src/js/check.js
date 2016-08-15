function getMessage(a, b){
  
  // Если первый аргумент, a, имеет тип boolean
  /*  жаль что a возвращает false и в результате пишет "Я никуда не попал"
  хотя я попадаю в дерево и b возвращает "крона дерева"  */
  if (typeof a === 'boolean') {
    if (a === true) {                         //Если он true
      return 'Я попал в ' + b;
    } else {                                  //Если он false
      return 'Я никуда не попал';
    }
  }


  //Если первый аргумент имеет числовой тип
  if (typeof a === 'number'){
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }


  // Если первый аргумент массив
  if (typeof a === 'object' && typeof b !== 'object'){
    var numberOfSteps = a.reduce(add, 0);
    return 'Я прошёл '+ numberOfSteps +' шагов';
  }


  // Если оба аргумента массивы
  if (typeof a === 'object' && typeof b === 'object') {
    var distancePath = a.reduce(add, 0) + b.reduce(add, 0);
    return 'Я прошёл '+ distancePath +' метров'
  }


  //Вспомогательная ф-ция для суммы чисел в массиве
  function add(c,d) {
    return c + d
  };
};
