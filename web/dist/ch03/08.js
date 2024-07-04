"use strict";
// 함수의 타입 추론
(() => {
    // 매개변수의 타입을 지정하지 않으면 num은 any 타입  
    function add10(num) {
        return num + 10;
    }
    function add20(num = 20) {
        return num + 10;
    }
    // 리턴할 수 있는 모든 케이스를 다 계산해서 최대한 좁은 범위의 타입으로 추론
    // 좁은 범위의 타입과 넓은 범위의 타입이 같이 있을 경우, 서로 호환된다면 넓은 범위의 타입에 포함
    function checkNumber(x, y) {
        let z;
        if (x === 10) {
            return 'x는 10';
        }
        else if (x > y) {
            return '큰 수: ' + x;
        }
        else if (x > 5) {
            return '5';
        }
    }
    const returnValue = checkNumber(10, 20);
    console.log(returnValue);
    const result = add10(100.12345);
    const result2 = add20(100.12345);
    console.log(result, result2.toFixed(2));
})();
