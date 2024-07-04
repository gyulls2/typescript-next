// 함수가 null을 리턴할 수 있을 경우

(()=>{
  const a = document.querySelector('a[href="dist/ch03/11.js"]');

  // a태그의 고유한 속성이나 메서드를 사용하고 싶을때는 타입을 명확하게 명시
  // const a = document.querySelector<HTMLAnchorElement>('a[href="dist/ch03/11.js"]');

  // bad
  // Non-null assertion(!)
  // a!.innerHTML += ' 클릭!!';

  // good: 타입 가드
  if(a !== null) {
    a.innerHTML += ' 클릭!!';
    // console.log(a.href);
  }

})();