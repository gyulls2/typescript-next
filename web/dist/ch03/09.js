"use strict";
// 타입 단언
// 가능한 타입 단언은 사용하지 않는 것이 좋음
// any 타입을 사용해야 한다면 타입 안전성이 높음 unknown 타입을 사용
// 타입 가드를 사용해도 타입을 인식하지 못하는 경우, 타입 단언을 사용하기도 함
// 타입스크립트가 타입 추론을 100% 완벽하게 하지 못하기 때문
(() => {
    // bad
    // function getMsg(msg) {  // 리턴 타입 any
    //   return msg;
    // }
    function getMsg(msg) {
        return msg;
    }
    const msg1 = getMsg(123.456);
    console.log(msg1.toFixed(2));
    const msg2 = getMsg('hello');
    console.log(msg2.toUpperCase());
})();
