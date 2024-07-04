// 속성 값으로 체크

(() => {
  interface User {
    name: string;
    age: number;
    admin: false;  // 타입 추론으로 식별할 수 있도록 구체화된 값을 설정(리터럴 타입)
  }

  interface AdminUser {
    name: string;
    admin: true;
    level: 1 | 2 | 3;
  }

  const user1: User = {
    name: "무지",
    age: 20,
    admin: false,
  };

  const user2: AdminUser = {
    name: "라이언",
    admin: true,
    level: 2,
  };

  function helloUser(user: User | AdminUser) {
    if (user.admin) {
      console.log(`안녕하세요 레벨 ${user.level} ${user.name} 관리자님`);
    } else {
      console.log(`안녕하세요 ${user.name} 회원님`);
    }
  }

  helloUser(user1);
  helloUser(user2);
})();
