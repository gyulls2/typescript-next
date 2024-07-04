// 타입 가드 함수 작성

(() => {
  interface User {
    name: string;
    age: number;
    admin: false; // 타입 추론으로 식별할 수 있도록 구체화된 값을 설정(리터럴 타입)
  }

  interface AdminUser {
    name: string;
    admin: true;
  }

  interface GuestUser {
    name: "게스트";
    age: 0;
  }

  const user1: User = {
    name: "무지",
    age: 20,
    admin: false,
  };

  const user2: AdminUser = {
    name: "라이언",
    admin: true,
  };

  const user3: GuestUser = {
    name: "게스트",
    age: 0,
  };

  // function helloUser(user: User | AdminUser | GuestUser) {
  //   if ("admin" in user && user.admin) {
  //     console.log(`안녕하세요 ${user.name} 관리자님`);
  //   } else {
  //     console.log(`안녕하세요 ${user.name} 회원님`);
  //   }
  // }

  function helloUser(user: User | AdminUser | GuestUser) {
    if (isAdmin(user)) {
      console.log(`안녕하세요 ${user.name} 관리자님`);
    } else {
      console.log(`안녕하세요 ${user.name} 회원님`);
    }
  }

  // 타입 가드 구문이 복잡하고 여러번 사용해야 할 경우,
  // is 연산자를 사용해 타입 가드 함수로 작성
  // user is AdminUser: true를 리턴할 경우 user의 타입이 AdminUser로 확정
  function isAdmin(user: User | AdminUser | GuestUser): user is AdminUser {
    return "admin" in user && user.admin;
  }

  helloUser(user1);
  helloUser(user2);
  helloUser(user3);
})();
