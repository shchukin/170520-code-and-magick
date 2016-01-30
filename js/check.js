function getMessage(a,b){

  var sum = 0;
  var length = 0;
  var i;
  var minLength;

  
  if( typeof(a) === 'boolean') {
    if(a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
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