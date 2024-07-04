// 함수 오버로딩 - 동일한 이름의 함수를 중복으로 정의

(() => {
  type TodoRegist = {
    title: string;
    content: string;
  };

  type TodoList = {
    title: string;
    id: number;
    done: boolean;
    updatedAt: Date;
  };

  const todo1: TodoRegist = {
    title: "할일 1",
    content: "등록에 사용",
  };

  const todo2: TodoList = {
    title: "목록 2",
    id: 2,
    done: false,
    updatedAt: new Date(),
  };

  // 자바스크립트에서는 같은 이름의 함수를 중복으로 정의하면, 마지막 함수로 덮어씌워진다.
  // 타입스크립트는 동일한 이름의 함수를 중복으로 정의해서 오버로딩을 사용할 수 있다.
  // 동일한 이름의 함수 시그니처 정의​
  function toString(todo: TodoList): string;
  function toString(todo: TodoRegist): string;
  function toString(todo: TodoList | TodoRegist) {
    let str = "";
    if ("id" in todo) {
      str = `[TodoList] id: ${todo.id}, title: ${todo.title}, done: ${todo.done}, updatedAt: ${todo.updatedAt}]`;
    } else {
      str = `[TodoRegist] title: ${todo.title}, content: ${todo.content}]`;
    }
    return str;
  }

  console.log(toString(todo1));
  console.log(toString(todo2));
})();
