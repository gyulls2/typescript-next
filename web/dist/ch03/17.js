// 함수 호환
// export interface Todo {
//   id: number;
//   title: string;
//   content: string;
//   done: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }
(() => {
    const todo1 = {
        title: "할일 1",
        content: "등록에 사용",
    };
    const todo2 = {
        title: "목록 2",
        id: 2,
        done: false,
        content: "목록에 사용",
    };
    // 타입 호환
    // 두 타입이 호환되려면 한 타입이 다른 타입의 모든 프로퍼티와 메서드를 포함해야 함
    // 상속과 관련 없음
    // title, content가 있으면 호환 가능함
    function toString(todo) {
        let str = `[TodoRegist] title: ${todo.title}, content: ${todo.content}]`;
        return str;
    }
    // 오버스펙은 호환안됨
    // function toString(todo: TodoList) {
    //   let str = `[TodoList] id: ${todo.id}, title: ${todo.title}, done: ${todo.done}, content: ${todo.content}]`;
    //   return str;
    // }
    console.log(toString(todo1));
    console.log(toString(todo2));
    // 객체를 생성해서 바로 전달하는 경우 타입호환이 안됨
    console.log(toString({
        title: "목록 3",
        // id: 3,
        // done: false,
        content: "목록에 사용",
    }));
})();
export {};
