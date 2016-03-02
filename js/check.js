/**
 * @fileoverview Функция вывода соответствующего сообщения на действия игрока.
 * Описание работы функции
 *
 * Если первый аргумент, a, имеет тип boolean, то:
 *     Если он true, вернуть строку, в которую подставлен параметр b:
 *         "Я попал в [b]"
 *     Если он false, то вернуть строку:
 *         "Я никуда не попал"
 *
 * Если первый аргумент имеет числовой тип, то вернуть строку:
 *     "Я прыгнул на [a] * 100 сантиметров"
 *
 * Если первый аргумент массив, то вернуть строку:
 *     "Я прошёл [sum] шагов"
 *      где [sum] — это сумма значений переданного массива
 *
 * Если оба аргумента массивы, то вернуть строку:
 *     "Я прошёл [length] метров"
 *     где [length] — это сумма произведений соответствующих элементов массивов a и b,
 *     cумма произведения первого элемента a с первым элементом b, второго со вторым и так далее
 *     
 * @param {boolean|number|Array} a
 * @param {boolean|number|Array} b
 * @returns {string}
 */

function getMessage(a,b) {

  var sum = 0;
  var length = 0;
  var i;
  var minLength;

  
  if( typeof(a) === 'boolean') {
    return a ? ('Я попал в ' + b) : ('Я никуда не попал');
  }

  if( typeof(a) === 'number' ) {
    return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
  }


  if( Array.isArray(a) ) {

    if( Array.isArray(b) ) {

      for( i = 0, minLength = Math.max(a.length, b.length); i < minLength; i++ ) {
        length += a[i] * b[i];
      }

      return 'Я прошёл ' + length + ' метров';

    } else {

      sum = a.reduce(function(previousValue, currentValue){
        return previousValue + currentValue;
      });

      return 'Я прошёл ' + sum + ' шагов';
    }

  }

}
