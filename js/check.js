function getMessage(a,b){

    if( typeof(a) === 'boolean') {
        if(a) {
            return 'Я попал в ' + b;
        }
        else {
            return 'Я никуда не попал';
        }
    }


    if( typeof(a) === 'number' ) {
        return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    }


    if( Array.isArray(a) && ! Array.isArray(b) ) {

        var sum = 0;

        a.forEach(function(value){
            sum += value;
        });

        return 'Я прошёл ' + sum + ' шагов';
    }


    if( Array.isArray(a) && Array.isArray(b) ) {

        var length = 0;

        for( var i = 0; i < Math.min(a.length, b.length); i++ ) {
            length += a[i] * b[i];
        }

        return 'Я прошёл ' + length + ' метров';
    }

}